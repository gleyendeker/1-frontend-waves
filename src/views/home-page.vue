<template>
  <div class="home text-center">
    <i class="fa-solid fa-hand fa-rotate-by" style="--fa-rotate-angle: 30deg" ></i>
    <h1 class="title">Waves</h1>
    <h3 class="subtitle mt-1">
      a solidity demo project using <img class="align-middle" src="./../assets/logo.png" />
    </h3>

    <div>
      <p class="col-8 offset-2 intro">This demo was built using Vue 3, Vuex 4, Vue Router 4, Scss and Bootstrap 5</p>
    </div>

    <button class="btn btn-primary btn-warning mt-3" @click="startDemo">start demo</button>
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
  padding-top: 20vh;
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

  .intro{
    margin-top: 20vh;
  }
}
</style>
