<template>
  <n-layout-header bordered>
    <n-menu :value="tabNameRef" :options="menuOptions" mode="horizontal" />
  </n-layout-header>
</template>

<script lang="ts" setup>
import {
  Chat as ChatIcon,
  Growth as GrowthIcon,
  LogoGithub as GithubIcon,
  Settings as SettingsIcon,
} from '@vicons/carbon';
import { MenuOption, NIcon } from 'naive-ui';
import { Component, computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import router from '../router';
import { useClientStore } from '../store';

const { t, n } = useI18n();
const store = useClientStore();

const tabNameRef = computed(() => {
  const route = router.resolve({
    path: '/' + router.currentRoute.value.path.split('/')[1],
  });

  return (route.name as string) || 'chat';
});

function renderRoute(label: string, route: string) {
  return () =>
    h(
      RouterLink,
      { to: router.resolve({ name: route }).path },
      { default: () => t(label) }
    );
}
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
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
    label: () => h('p', null, { default: () => n(store.points) }),
    key: 'points',
    icon: renderIcon(GrowthIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: __REPOSITORY__,
          target: '_blank',
          rel: 'noopenner noreferrer',
        },
        'GitHub'
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
