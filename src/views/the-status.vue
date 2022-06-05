<template>
  <div>
    <div>ethereum object detected: {{ this.$store.state.acount }} </div>
  </div>
</template>

<script>
import store from '@/store/store';

export default {
  name: "theStatus",

  props: {},

  data: () => ({}),

  mounted() {
    // get web3 account and save it to the store
    this.getWeb3Account();
  },

  computed: {},

  methods: {

    getEthereumObject: async function() {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          console.log("Looks you don't have a Web3 wallet installed. Try installing Metamask!");
          return false;
        } else {
          console.log("Web3 wallet installed, we have the ethereum object :)");
          return ethereum;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getWeb3Account: async function () {

      let ethereumObject = await this.getEthereumObject();

      if (ethereumObject !== false) {
        try {
          const accounts = await ethereumObject.request({ method: "eth_accounts" });

          if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            store.state.dispatch("setCurrentAccount", account);
            return account;
          } else {
            console.log("No authorized account found");
            return false;
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