<template>

    <!-- wave button -->

    <div class="col-8 offset-2 text-center pt-5">Send a customized wave Guille!</div>

    <div class="text-center">
        <input v-model="message" placeholder="menssage">

        <button class="btn btn-primary mx-3 mt-3"
                :class="this.$store.state.mining ? 'disabled' : '' "
                @click="wave(message)">{{ waveButtonMessage }}
        </button>
    </div>


    <!-- status table -->
    <div class="m-3 text-center">
        <div class="col-12 col-md-10 offset-md-1 border border-1 rounded-3 p-3">

            <h1 class="title">Blockchain data</h1>

            <div class="mt-3 row table-row">
                <!-- column 1 -->
                <div class="col-1 px-0">#1</div>
                <!-- column 2 -->
                <div class="col-5">waves received</div>
                <!-- column 3 -->
                <div class="col-2">
                    {{ this.$store.state.wavesReceived }}
                </div>
                <!-- column 4 -->
                <button class="col-4 btn pt-1 px-0 border-0" @click="getWaves">
                    <i class="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>

        </div>
    </div>

    <!-- waves table -->
    <div class="m-3 text-center">
        <div v-for="cleanWave in cleanedWaves" :key="cleanWave.id">
            {{ key }} - {{ cleanWave.timestamp }} - {{ cleanWave.waver }} - {{ cleanWave.message }}
        </div>
    </div>

    <!-- navigation buttons -->
    <div class="row col-12 mt-5">
        <button class="col-3 offset-3 btn btn-primary btn-warning mt-3" @click="goToStatusPage">previous</button>
        <button class="col-3 offset-1 btn btn-primary btn-success mt-3" disabled >next</button>
    </div>

</template>

<script>
    import store from '@/store/store';
    import { ethers } from 'ethers';
    import abi from "@/utils/WavePortal.json";

    export default {
        name: "wavePage",

        props: {},

        data: () => ({
            ethereumObject: null,
            contractABI: abi.abi,
            wavePortalContract: null,
            message: "",
        }),

        mounted() {
            this.getWaves();
            this.getAllWaves();
        },

        computed: {
            waveButtonMessage: () => {
                if(store.state.mining)
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
            getContract: function() {
                const { ethereum } = window;
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
            getWaves: async function() {
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
            wave: async function(message) {

                let waveTxn = await this.wavePortalContract.wave(message);
                console.log("Mining...", waveTxn.hash);
                store.dispatch("setMining", true);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);
                store.dispatch("setMining", false);

                this.getWaves();

            },

            goToStatusPage() {
                this.$router.push({ name: "status-page" });
            },


            getAllWaves: async function() {

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
</style>