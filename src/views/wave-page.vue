<template>
    <div class="body col-md-6 offset-md-3 text-center">

        <!-- wave button -->
        <div class="text-center pt-4">Send a customized wave Guille!</div>

        <div class="input-group pt-4">
            <input type="text" class="form-control" v-model="message" placeholder="menssage">
            <div class="input-group-append ">
                <button class="btn btn-primary"
                        :class="this.$store.state.mining ? 'disabled' : '' "
                        type="button"
                        @click="wave(message)">{{ waveButtonMessage }}
                </button>
            </div>
        </div>

        <!-- status table -->
        <div class="text-center pt-4">
            <div class="border border-1 rounded-3 p-3">

                <!-- stats -->
                <h2 class="title">Blockchain stats</h2>

                <div class="mt-3 row table-row">
                    <!-- column 1 -->
                    <div class="col-5">waves received</div>
                    <!-- column 2 -->
                    <div class="col-2">
                        {{ this.$store.state.wavesReceived }}
                    </div>
                    <!-- column 3 -->
                    <button class="col-4 btn pt-1 px-0 border-0" @click="getWaves">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                </div>

                <!-- eaves messages-->
                <h1 class="title mt-4">Waves messages</h1>

                <div v-for="cleanWave in cleanedWaves" :key="cleanWave.id" class="row text-center">
                    <div class="col-4 col-md-2">
                        {{ moment(cleanWave.timestamp).format('DD-MM-YYYY') }}
                    </div>
                    <div class="d-none d-md-block col-md-7">
                        {{ cleanWave.address }}
                    </div>
                    <div class="col-8 col-md-3">
                        {{ cleanWave.message }}
                    </div>
                </div>

            </div>
        </div>

        <!-- navigation buttons -->
        <div class="row col-12 pt-5">
            <button class="col-3 offset-3 btn btn-primary btn-warning mt-3" @click="goToStatusPage">previous</button>
            <button class="col-3 offset-1 btn btn-primary btn-success mt-3" disabled>next</button>
        </div>

    </div>

</template>

<script>
    import store from '@/store/store';
    import {ethers} from 'ethers';
    import abi from "@/utils/WavePortal.json";
    import moment from 'moment';

    export default {
        name: "wavePage",

        props: {},

        data: () => ({
            ethereumObject: null,
            contractABI: abi.abi,
            wavePortalContract: null,
            message: "",
        }),

        created: function () {
            this.moment = moment;
        },

        mounted() {
            this.getWaves();
            this.getAllWaves();
        },

        computed: {
            waveButtonMessage: () => {
                if (store.state.mining)
                    return 'mining...';
                else
                    return 'wave!';
            },

            cleanedWaves: () => store.state.cleanedWaves,
        },

        methods: {

            /*
            * setup ethereum object with contract data and getContract
            */
            getContract: function () {
                const {ethereum} = window;
                if (ethereum) {
                    this.ethereumObject = ethereum;
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    this.wavePortalContract = new ethers.Contract(this.$store.state.contractAddress, this.contractABI, signer);
                } else {
                    console.log("Ethereum object doesn't exist!");
                }
            },

            /*
            * get waves from blockchain
            */
            getWaves: async function () {
                try {
                    this.getContract();
                    let count = await this.wavePortalContract.getTotalWaves();
                    console.log("Retrieved total wave count...", count.toNumber());
                    store.dispatch("setWavesReceived", count.toNumber());

                } catch (error) {
                    console.log(error);
                }

            },

            /*
            * do a wave
            */
            wave: async function (message) {

                let waveTxn = await this.wavePortalContract.wave(message);
                console.log("Mining...", waveTxn.hash);
                store.dispatch("setMining", true);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);
                store.dispatch("setMining", false);

                this.getWaves();
                this.getAllWaves();

            },

            goToStatusPage() {
                this.$router.push({name: "status-page"});
            },


            getAllWaves: async function () {

                try {
                    this.getContract();
                    // Call the getAllWaves method from your Smart Contract
                    const waves = await this.wavePortalContract.getAllWaves();

                    /*
                     * We only need address, timestamp, and message in our UI so let's pick those out
                     */
                    let wavesCleaned = [];
                    waves.forEach(wave => {
                        wavesCleaned.push({
                            address: wave.waver,
                            timestamp: new Date(wave.timestamp * 1000),
                            message: wave.message
                        });
                    });

                    /*
                     * Store our data in Store
                     */
                    store.dispatch("setCleanedWaves", wavesCleaned);

                } catch (error) {
                    console.log(error);
                }
            }
        },

    };
</script>

<style lang="scss" scoped>
    .title {
        font-size: 1rem;
        font-weight: bold;
    }

    .body {
        .input-group {
            .form-control {
                margin-right: 10px;;
            }
        }
    }
</style>