<template>
  <el-container>
    <el-header>
      <NavBar />
    </el-header>
    <el-main id="view">
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'App',
  components: { NavBar },
  setup() {},
};
</script>

<style>
html,
body {
  height: 100%;
  margin: unset;
}
#view {
  padding-bottom: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
