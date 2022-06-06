<template>

  <!-- connect wallet button -->

  <div class="col-8 offset-2 text-center pt-5">First you need to get connected with your wallet, please follow this steps:</div>

  <div class="text-end">
    <button v-if="this.$store.walletInstalled" class="btn btn-primary mx-3 mt-3" @click="connectWallet">connect wallet</button>
  </div>

  <!-- status table -->
  <div class="row m-3 justify-content-center">
    <div class="col-12 col-md-auto border border-1 rounded-3 p-3">
      <h1 class="text-center title">Steps to get connected</h1>

      <div class="row mt-3">

        <div class="col-1">#1</div>
        <div class="col-6">wallet installed</div>
        <div class="col-5">
          <i v-if="this.$store.state.walletInstalled" class="fa-solid fa-circle-check fa-lg text-success"></i>
          <i v-else class="fa-solid fa-circle-xmark fa-lg text-danger"></i>
        </div>

      </div>
      <div class="row mt-3">

        <div class="col-1">#2</div>
        <div class="col-6">wallet connected</div>
        <div class="col-5">
          <i v-if="this.$store.state.walletConnected" class="fa-solid fa-circle-check fa-lg text-success"></i>
          <i v-else class="fa-solid fa-circle-xmark fa-lg text-danger"></i>
        </div>

      </div>
    </div>
  </div>

  <div v-if="this.$store.state.walletConnected" class="text-center">
    <div class="text-center my-3">Great! You got connected!</div>
    <div class="text-center">your wallet address is</div>
    <div class="text-center text-muted">{{ this.$store.state.account }}</div>
    <button class="btn btn-primary btn-success mt-3" @click="goToWavePage">continuar</button>
  </div>

</template>

<script>
import store from '@/store/store';
import { ethers } from 'ethers';
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
    getEthereumObject: async function() {
      try {
        const { ethereum } = window;

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
          const accounts = await this.ethereumObject.request({ method: "eth_accounts" });

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
    connectWallet:async function() {
      try {
        const { ethereum } = window;

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

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
    wave: async function() {
      try {
        const { ethereum } = window;

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
      this.$router.push({ name: "wave-page" });
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