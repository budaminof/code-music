<template>
  <div id="app">
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
