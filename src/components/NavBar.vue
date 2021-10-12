<template>
  <n-layout-header bordered>
    <n-menu :value="tabName" :options="menuOptions" mode="horizontal" />
  </n-layout-header>
</template>

<script lang="tsx" setup>
import {
  Chat as ChatIcon,
  Growth as GrowthIcon,
  LogoGithub as GithubIcon,
  Settings as SettingsIcon,
} from '@vicons/carbon';
import { MenuOption } from 'naive-ui';
import { Component, computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useClientStore } from '../store';

const { t, n } = useI18n();
const store = useClientStore();
const router = useRouter();
const route = useRoute();

const tabName = computed(() =>
  typeof route.name === 'string' ? route.name : ''
);

function renderRoute(label: string, name: string) {
  const path = router.resolve({ name }).path;
  return () => <router-link to={path}>{t(label)}</router-link>;
}
function renderIcon(icon: Component) {
  return () => <n-icon>{h(icon)}</n-icon>;
}
const menuOptions: MenuOption[] = [
  {
    label: renderRoute('chat', 'chat'),
    key: 'chat',
    icon: renderIcon(ChatIcon),
  },
  {
    label: renderRoute('settings', 'settings'),
    key: 'settings',
    icon: renderIcon(SettingsIcon),
  },
  {
    label: () => <p>{n(store.points)}</p>,
    key: 'points',
    icon: renderIcon(GrowthIcon),
  },
  {
    label: () => (
      <a href={__REPOSITORY__} target="blank" rel="noopenner noreferrer" />
    ),
    key: 'github',
    icon: renderIcon(GithubIcon),
  },
];
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.n-layout-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $header-height;
}
</style>
