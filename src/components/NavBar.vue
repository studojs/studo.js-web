<template>
  <n-layout-header bordered>
    <n-menu :value="currentTabNameRef" :options="menuOptions" mode="horizontal" />
    <p>{{ points }}</p>
  </n-layout-header>
</template>

<script lang="ts">
import { MenuOption, NIcon } from 'naive-ui';
import { Component, h } from 'vue';
import router from '../router';
import { RouterLink } from 'vue-router';
import {
  Comment24Regular,
  Settings24Regular,
} from '@vicons/fluent';
import { LogoGithub } from '@vicons/carbon';
import { currentTabNameRef, pointsRef } from '../store';

function renderRoute(label: string, route: string) {
  return () => h(
    RouterLink,
    { to: router.resolve({ name: route }).path },
    { default: () => label }
  );
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: renderRoute('Chat', 'chat'),
    key: 'chat',
    icon: renderIcon(Comment24Regular)
  },
  {
    label: renderRoute('Settings', 'settings'),
    key: 'settings',
    icon: renderIcon(Settings24Regular)
  },
  {
    label: () => h('a', {
      href: __REPOSITORY__, target: '_blank', rel: 'noopenner noreferrer'
    }, 'GitHub'),
    key: 'github',
    icon: renderIcon(LogoGithub)
  }
];

export default {
  name: 'NavBar',
  setup() {
    return {
      currentTabNameRef,
      menuOptions,
      points: pointsRef
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/vars.scss";

.n-layout-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $header-height;
}
</style>