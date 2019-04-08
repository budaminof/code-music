<template>
  <div id="app">
    <h1>Code () => Music</h1>
    <Code/>
  </div>
</template>

<script>
import Code from './components/Code.vue';

export default {
  name: 'app',
  components: {
    Code,
  },
};
</script>

<style lang="scss">
body {
  background-color: #fafafa;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 1rem;
}
</style>
