<template>
  <n-config-provider :theme="settings.theme" abstract>
    <n-global-style />
    <NavBar />
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { useThemeVars } from 'naive-ui';
import { RestManager } from 'studo.js';
import { useRouter } from 'vue-router';
import { useChatStore, useClientStore, useSettingsStore } from './store';

const settings = useSettingsStore();
const router = useRouter();
const theme = useThemeVars();

Object.assign(window, {
  chat: useChatStore(),
  store: useClientStore(),
  settings,
  api: RestManager,
  router,
});
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
