<template>

  <!-- connect wallet button -->

  <div class="text-center mt-3">This is a Solidity demo built with Vue3 using: Vue 3, Vuex 4, Vue Router 4, Scss and Bootstrap 5</div>

  <div class="text-end">
    <button v-if="this.$store.walletInstalled" class="btn btn-primary mx-3 mt-3" @click="connectWallet">connect wallet</button>
  </div>

  <!-- status table -->
  <div class="row m-3 justify-content-center">
    <div class="col-12 col-md-auto border border-1 rounded-3 p-3">
      <h1 class="text-center title">Steps to get connected</h1>
      <table class="table table-responsive table-borderless">
        <tbody>
        <tr>
          <td>#1</td>
          <td>wallet installed</td>
          <td>
            <span >
              <i v-if="this.$store.state.walletInstalled" class="fa-solid fa-circle-check fa-lg text-success"></i>
              <i v-else class="fa-solid fa-circle-xmark fa-lg text-danger"></i>
            </span>
            <span v-if="!this.$store.state.walletInstalled" class='text-muted mx-3'><i class="fa-solid fa-download"></i> try installing <a href="https://metamask.io/" target="_blank" class="text-black">Metamask!</a></span>
          </td>
        </tr>
        <tr>
          <td>#2</td>
          <td>wallet connected</td>
          <td>
            <span >
              <i v-if="this.$store.state.walletConnected" class="fa-solid fa-circle-check fa-lg text-success"></i>
              <i v-else class="fa-solid fa-circle-xmark fa-lg text-danger"></i>
            </span>
          </td>
        </tr>
        <tr>
          <td>#3</td>
          <td>wallet account</td>
          <td>
            <span v-if="this.$store.state.walletConnected" class='text-muted' >{{ this.$store.state.account }}</span>
            <i v-else class="fa-solid fa-circle-xmark fa-lg text-danger"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-if="this.$store.state.walletConnected" class="text-center mt-3">Great! You got connected!</div>

</template>

<script>
import store from '@/store/store';

export default {
  name: "theStatus",

  props: {},

  data: () => ({
    ethereumObject: null,
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
    }

  },
};
</script>

<style lang="scss" scoped>
  .title {
    font-size: 1.3rem;
    font-weight: bold;
  }
</style>