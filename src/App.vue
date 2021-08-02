<template>
  <TabMenu :model="tabs"></TabMenu>
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'App',
  setup() {
    const tabs = [
      { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
      {
        label: 'Calendar',
        icon: 'pi pi-fw pi-calendar',
        to: '/calendar',
      },
      {
        label: 'Chat',
        icon: 'pi pi-fw pi-comments',
        to: '/chat',
      },
      { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings' },
      {
        label: 'GitHub',
        icon: 'pi pi-fw pi-github',
        url: 'https://github.com/j4k0xb/studo.js-web',
      },
    ];
    return { tabs };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
