<template>
  <n-config-provider :theme="theme" :locale="locale" abstract>
    <n-global-style />
    <NavBar />
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue';
import { localeRef as locale, themeRef as theme } from './store';
</script>

<style lang="scss">
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

a,
a:visited {
  color: #00aff4;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
