<template>
  <n-layout-header bordered>
    <n-menu
      :value="currentTabNameRef"
      :options="menuOptions"
      :render-label="renderMenuLabel"
      :render-icon="renderMenuIcon"
      mode="horizontal"
    />
  </n-layout-header>
</template>

<script lang="ts">
import { MenuOption, NIcon } from 'naive-ui';
import { h } from 'vue';
import router from '../router';
import { RouterLink } from 'vue-router';
import {
  Comment24Regular,
  Settings24Regular,
} from '@vicons/fluent';
import { currentTabNameRef } from '../store';

function renderMenuLabel(option: MenuOption) {
  return h(
    RouterLink,
    { to: option.path as string },
    { default: () => option.label }
  );
}

function renderMenuIcon(option: MenuOption) {
  const icon = {
    chat: Comment24Regular,
    settings: Settings24Regular,
  }[option.key];

  if (icon) return h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: 'Chat',
    key: 'chat',
    path: router.resolve({ name: 'chat' }).path,
  },
  {
    label: 'Settings',
    key: 'settings',
    path: router.resolve({ name: 'settings' }).path,
  },
];

export default {
  name: 'NavBar',
  setup() {
    return {
      currentTabNameRef,
      menuOptions,
      renderMenuIcon,
      renderMenuLabel,
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