<template>
  <n-config-provider :theme="theme" abstract>
    <n-global-style />
    <NavBar />
    <router-view />
  </n-config-provider>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';
import { darkTheme } from 'naive-ui';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  setup() {
    return { theme: darkTheme };
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: v-sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
