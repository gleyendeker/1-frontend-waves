<template>
  <div>
    <div>ethereum object detected:</div>
  </div>
</template>

<script>
export default {
  name: "theStatus",

  props: {},

  data: () => ({
    currentAccount: null,
  }),

  mounted() {
    this.checkConnectedWalletExist();
  },

  methods: {
    checkConnectedWalletExist: async function () {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
        } else {
          console.log("We have the ethereum object", ethereum);
        }

        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          this.setCurrentAccount(account);
          // store.dispatch("setCurrentAccount", account);
        } else {
          console.log("No authorized account found");
        }
      } catch (error) {
        console.log(error);
      }
    },

    setCurrentAccount: function (account) {
      this.currentAccount = account;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>