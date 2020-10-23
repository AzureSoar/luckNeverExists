<template>
  <div id="app">
    <luckdraw msg="Luck Never Exists"/>
  </div>
</template>

<script>
import luckdraw from './components/luckdraw.vue'

export default {
  name: 'App',
  components: {
    luckdraw
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
