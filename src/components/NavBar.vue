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
    </n-space>
  </n-layout-header>
</template>

<script lang="ts" setup>
import {
  Home as HomeIcon,
  LogoGithub as GithubIcon,
  Moon as MoonIcon,
  Sun as SunIcon,
} from '@vicons/carbon';
import { useSettingsStore } from '../store';

const settings = useSettingsStore();
const githubURL = __REPOSITORY__;
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
