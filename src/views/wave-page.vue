<template>

    <!-- status table -->
    <div class="row m-3 justify-content-center">
        <div class="col-12 col-md-auto border border-1 rounded-3 p-3">
            <h1 class="text-center title">Blockchain data</h1>

            <div class="row mt-3">

                <div class="col-7 pt-1">waves received</div>
                <div class="col-3 pt-1">{{ this.$store.state.wavesReceived }}</div>
                <button class="col-2 btn pt-1 border-0" @click="getWaves">
                    <i class="fa-solid fa-arrows-rotate"></i>
                </button>

            </div>

        </div>
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

        mounted() {},

        computed: {},

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

        },
    };
</script>

<style lang="scss" scoped>
    .title {
        font-size: 1rem;
        font-weight: bold;
    }
</style>