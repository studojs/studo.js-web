<template>
  <n-layout-header bordered>
    <n-button text @click="active = !active">
      <template #icon>
        <n-icon class="menu-icon"><MenuIcon /></n-icon>
      </template>
    </n-button>
    <!-- <n-menu :value="tabName" :options="menuOptions" mode="horizontal" /> -->
  </n-layout-header>
  <n-drawer v-model:show="active" :width="300" placement="left">
    <n-drawer-content title="Stoner">
      Stoner is a 1965 novel by the American writer John Williams.
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="tsx" setup>
import {
  Chat as ChatIcon,
  Growth as GrowthIcon,
  LogoGithub as GithubIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from '@vicons/carbon';
import { MenuOption } from 'naive-ui';
import { Component, computed, h, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useClientStore } from '../store';

const { t, n } = useI18n();
const store = useClientStore();
const router = useRouter();
const route = useRoute();

const active = ref(false);
const tabName = computed(() => route.name as string);

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
  padding: 0 16px;
  height: $header-height;
}
</style>
