<template>
  <div class="app">
    <div class="header"><Header /></div>
    <div class="body col-12 col-md-4 offset-md-4 text-center">
      <router-view></router-view>
    </div>
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
