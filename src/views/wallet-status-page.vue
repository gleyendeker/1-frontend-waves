<template>

    <div class="body col-md-4 offset-md-4 text-center">

        <div class="col-md-8 offset-md-2 pt-4">First you need to get connected with your wallet, please follow this
            steps:
        </div>

        <!-- status table -->
        <div class="text-center pt-4">
            <div class="col-md-10 offset-md-1 border border-1 rounded-3 p-3">
                <h1 class="title">Steps to get connected</h1>

                <div class="mt-3 row table-row">
                    <!-- column 1 -->
                    <div class="col-1">#1</div>
                    <!-- column 2 -->
                    <div class="col-6">wallet installed</div>
                    <!-- column 3 if -->
                    <div v-if="this.$store.state.walletInstalled" class="col-5">
                        <i class="fa-solid fa-circle-check fa-lg text-success"></i>
                    </div>
                    <!-- column 1 else -->
                    <div v-else class="col-5 row">
                        <div class="col-4">
                            <i class="fa-solid fa-circle-xmark fa-lg text-danger"></i>
                        </div>
                        <div class="col-8">
                            <a href="https://metamask.io/" target="_blank" class="btn btn-primary mx-3">install</a>
                        </div>
                    </div>
                </div>


                <div class="mt-3 row table-row">
                    <!-- column 1 -->
                    <div class="col-1">#2</div>
                    <!-- column 2 -->
                    <div class="col-6">wallet connected</div>
                    <!-- column 3 if -->
                    <div v-if="this.$store.state.walletConnected" class="col-5">
                        <i class="fa-solid fa-circle-check fa-lg text-success"></i>
                    </div>
                    <!-- column 1 else -->
                    <div v-else class="col-5 row">
                        <div class="col-4">
                            <i class="fa-solid fa-circle-xmark fa-lg text-danger"></i>
                        </div>
                        <div class="col-8">
                            <button v-if="!this.$store.state.walletConnected" class="btn btn-primary"
                                    :class="!this.$store.state.walletInstalled ? 'disabled' : ''"
                                    @click="connectWallet">connect
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="this.$store.state.walletConnected">
            <div class="pt-3">Great! You got connected!</div>
            <div>your wallet address is</div>
            <div class="text-muted">{{ this.$store.state.account }}</div>
        </div>

        <!-- navigation buttons -->
        <div class="row col-12 pt-5">
            <button class="col-3 offset-3 btn btn-primary btn-warning mt-3" @click="goToHomePage">previous</button>
            <button class="col-3 offset-1 btn btn-primary btn-success mt-3" @click="goToWavePage"
                    :disabled="!this.$store.state.walletConnected">next
            </button>
        </div>

    </div>

</template>

<script>
    import store from '@/store/store';
    import {ethers} from 'ethers';
    import abi from "@/utils/WavePortal.json";

    export default {
        name: "theStatus",

        props: {},

        data: () => ({
            ethereumObject: null,
            contractABI: abi.abi,

        }),

        mounted() {
            // try to get the account and save status flags to store
            this.getWeb3Account();
        },

        computed: {},

        methods: {

            /*
            * try to get the ethereum object and save it. Set the walletInstalled flag
            */
            getEthereumObject: async function () {
                try {
                    const {ethereum} = window;

                    if (!ethereum) {
                        console.log("Looks you don't have a Web3 wallet installed. Try installing Metamask!");
                        store.dispatch("setWalletInstalled", false);
                    } else {
                        console.log("Web3 wallet installed, we have the ethereum object :)");
                        store.dispatch("setWalletInstalled", true);
                        this.ethereumObject = ethereum;
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            /*
            * try to get the user account and save it to the store. Set the walletConnected flag
            */
            getWeb3Account: async function () {

                await this.getEthereumObject();

                if (this.$store.state.setWalletInstalled !== false) {
                    try {
                        const accounts = await this.ethereumObject.request({method: "eth_accounts"});

                        if (accounts.length !== 0) {
                            const account = accounts[0];
                            console.log("Found an authorized account:", account);
                            store.dispatch("setWalletConnected", true);
                            store.dispatch("setCurrentAccount", account);
                        } else {
                            console.log("No authorized account found");
                            store.dispatch("setWalletConnected", false);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            /*
            * connect wallet method
            */
            connectWallet: async function () {
                try {
                    const {ethereum} = window;

                    const accounts = await ethereum.request({method: "eth_requestAccounts"});

                    console.log("Connected", accounts[0]);
                    store.dispatch("setWalletConnected", true);
                    store.dispatch("setCurrentAccount", accounts[0]);
                } catch (error) {
                    console.log(error)
                }
            },

            /*
            * connect wallet method
            */
            wave: async function () {
                try {
                    const {ethereum} = window;

                    if (ethereum) {
                        const provider = new ethers.providers.Web3Provider(ethereum);
                        const signer = provider.getSigner();
                        const wavePortalContract = new ethers.Contract(this.$store.state.contractAddress, this.contractABI, signer);

                        let count = await wavePortalContract.getTotalWaves();
                        console.log("Retrieved total wave count...", count.toNumber());
                    } else {
                        console.log("Ethereum object doesn't exist!");
                    }
                } catch (error) {
                    console.log(error);
                }

            },

            goToWavePage() {
                this.$router.push({name: "wave-page"});
            },
            goToHomePage() {
                this.$router.push({name: "home-page"});
            },

        },
    };
</script>

<style lang="scss" scoped>
    .title {
        font-size: 1rem;
        font-weight: bold;
    }

    .table-row {
        height: 40px;
        line-height: 40px;
    }
</style>