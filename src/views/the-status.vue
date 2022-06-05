<template>

  <div class="row mt-5 justify-content-center">
    <div class="col-auto border border-1 rounded-3 p-5">
      <table class="table table-responsive table-borderless">
        <tbody>
        <tr>
          <td>web3 wallet installed</td>
          <td>
            <span v-if="this.$store.state.walletInstalled" class='badge bg-success' >yes</span>
            <span v-else class='badge bg-danger'>no</span>
          </td>
        </tr>
        <tr>
          <td>web3 wallet connected</td>
          <td>
            <span v-if="this.$store.state.walletConnected" class='badge bg-success' >yes</span>
            <span v-else class='badge bg-danger'>no</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>


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
            return account;
          } else {
            console.log("No authorized account found");
            store.dispatch("setWalletConnected", false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>