<template>
  <div class="home">
    <i
      class="fa-solid fa-hand fa-rotate-by"
      style="--fa-rotate-angle: 30deg"
    ></i>
    <h1 class="title">Waves</h1>
    <h3 class="subtitle">
      a solidity demo project using <img src="./../assets/logo.png" />
    </h3>

    <button class="btn btn-warning mt-3" @click="startDemo">start demo</button>
  </div>
</template>

<script>
export default {
  name: "theHome",
  components: {},
  methods: {
    startDemo() {
      console.log("ok");
      this.$router.push({ name: "status" });
    },
  },
};
</script>

<style lang="scss">
.home {
  text-align: center;
  padding-top: 30vh;
  .fa-hand {
    font-size: 4em;
  }
  .title,
  .subtitle {
    margin: 5px 0 0 0;
    img {
      vertical-align: middle;
      height: 15px;
    }
  }
  .subtitle {
    font-size: 0.9rem;
  }
}
</style>
