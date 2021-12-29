<template>
  <n-layout-header bordered>
    <n-button text @click="active = !active">
      <template #icon>
        <n-icon size="20" class="menu-icon"><MenuIcon /></n-icon>
      </template>
    </n-button>
    <n-button text @click="toggleTheme">
      <template #icon>
        <n-icon size="20" class="menu-icon"
          ><MoonIcon v-if="settings.theme" /> <SunIcon v-else
        /></n-icon>
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
  Moon as MoonIcon,
  Settings as SettingsIcon,
  Sun as SunIcon,
} from '@vicons/carbon';
import { MenuOption } from 'naive-ui';
import { Component, computed, h, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useClientStore, useSettingsStore } from '../store';

const settings = useSettingsStore();
const store = useClientStore();
const router = useRouter();
const route = useRoute();

const active = ref(false);
function toggleTheme() {
  settings.setTheme(settings.theme ? 'light' : 'dark');
}
const tabName = computed(() => route.name as string);

function renderRoute(label: string, name: string) {
  const path = router.resolve({ name }).path;
  return () => <router-link to={path}>{label}</router-link>;
}
function renderIcon(icon: Component) {
  return () => <n-icon>{h(icon)}</n-icon>;
}
const menuOptions: MenuOption[] = [
  {
    label: renderRoute('Chat', 'chat'),
    key: 'chat',
    icon: renderIcon(ChatIcon),
  },
  {
    label: renderRoute('Einstellungen', 'settings'),
    key: 'settings',
    icon: renderIcon(SettingsIcon),
  },
  {
    label: () => <p>{store.points.toLocaleString('de')}</p>,
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
  justify-content: space-between;
  padding: 0 16px;
  height: $header-height;
}
</style>
