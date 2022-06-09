<template>

    <!-- wave button -->

    <div class="col-8 offset-2 text-center pt-5">Click to wave Guille!</div>

    <div class="text-center">
        <button class="btn btn-primary mx-3 mt-3"
                :class="this.$store.state.mining ? 'disabled' : '' "
                @click="wave">{{ waveButtonMessage }}
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
        }),

        mounted() {
            this.getWaves();
        },

        computed: {
            waveButtonMessage: () => {
                if(store.state.mining)
                    return 'mining...';
                else
                    return 'wave!';
            }
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
                    if (this.wavePortalContract) {
                        let count = await this.wavePortalContract.getTotalWaves();
                        console.log("Retrieved total wave count...", count.toNumber());
                        store.dispatch("setWavesReceived", count.toNumber());
                    } else {
                        console.log("Ethereum object doesn't exist!");
                    }
                } catch (error) {
                    console.log(error);
                }

            },

            /*
            * do a wave
            */
            wave: async function() {

                let waveTxn = await this.wavePortalContract.wave();
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

        },
    };
</script>

<style lang="scss" scoped>
    .title {
        font-size: 1rem;
        font-weight: bold;
    }
</style>