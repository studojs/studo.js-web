<template>
  <n-layout-header bordered>
    <n-tooltip>
      <template #trigger>
        <router-link to="/">
          <n-icon :size="24"><HomeIcon /></n-icon>
        </router-link>
      </template>
      Startseite
    </n-tooltip>
    <n-space size="large" align="center">
      <n-tooltip>
        <template #trigger>
          <n-a :href="githubURL" target="blank" rel="noopenner noreferrer">
            <n-icon :size="24"><GithubIcon /></n-icon>
          </n-a>
        </template>
        GitHub
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button text @click="settings.toggleTheme">
            <template #icon>
              <n-icon :size="24"
                ><MoonIcon v-if="settings.theme" /> <SunIcon v-else
              /></n-icon>
            </template>
          </n-button>
        </template>
        Dunklen Modus umschalten
      </n-tooltip>
      <n-dropdown
        placement="bottom-end"
        show-arrow
        trigger="click"
        :options="options"
        @select="handleOptionsSelect"
      >
        <n-button circle>
          <n-icon :size="24">
            <UserIcon />
          </n-icon>
        </n-button>
      </n-dropdown>
    </n-space>
  </n-layout-header>
</template>

<script lang="ts" setup>
import {
  Home as HomeIcon,
  LogoGithub as GithubIcon,
  Logout as LogoutIcon,
  Moon as MoonIcon,
  Sun as SunIcon,
  User as UserIcon,
} from '@vicons/carbon';
import { DropdownOption, NIcon, useMessage } from 'naive-ui';
import { Component, h } from 'vue';
import { useRouter } from 'vue-router';
import { useClientStore, useSettingsStore } from '../store';

const router = useRouter();
const message = useMessage();
const store = useClientStore();
const settings = useSettingsStore();
const githubURL = __REPOSITORY__;

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const options: DropdownOption[] = [
  {
    label: () => store.username,
    key: 'name',
    disabled: true,
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: 'Abmelden',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  },
];

async function handleOptionsSelect(key: string) {
  if (key === 'logout') {
    await store.logout();
    message.info('Abgemeldet');
    router.push('/');
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.n-layout-header {
  display: flex;
  padding: 10px 20px;
  height: $header-height;
}

.n-space {
  margin-left: auto;
  line-height: 1;
}
</style>
