<template>
  <div class="app px-3">
    <div class="header container-md"><Header /></div>
      <router-view></router-view>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import Header from "@/components/the-header.vue";
import Footer from "@/components/the-footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
.app {
  .header {
  }
  .body {
    min-height: 90vh;
    font-family: sans-serif;
  }
  .footer {
    height: 10vh;
    min-height: 30px;
  }
}
</style>
