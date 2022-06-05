<template>
  <div class="home text-center">
    <i
      class="fa-solid fa-hand fa-rotate-by"
      style="--fa-rotate-angle: 30deg"
    ></i>
    <h1 class="title">Waves</h1>
    <h3 class="subtitle mt-1">
      a solidity demo project using <img class="align-middle" src="./../assets/logo.png" />
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
      this.$router.push({ name: "status" });
    },
  },
};
</script>

<style lang="scss">
.home {
  padding-top: 30vh;
  .fa-hand {
    font-size: 4em;
  }
  .title,
  .subtitle {
    img {
      height: 15px;
    }
  }
  .subtitle {
    font-size: 0.9rem;
  }
}
</style>
