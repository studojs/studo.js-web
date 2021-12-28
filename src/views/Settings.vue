<template>
  <div class="container">
    <n-space vertical>
      <n-button @click="logOut">
        Abmelden
        <template #icon>
          <n-icon><LogoutIcon /></n-icon>
        </template>
      </n-button>
      <n-form :style="{ maxWidth: '640px' }">
        <n-form-item label="Darstellung">
          <n-radio-group v-model:value="theme" name="theme">
            <n-radio-button value="dark">Dunkel</n-radio-button>
            <n-radio-button value="system">System</n-radio-button>
            <n-radio-button value="light">Hell</n-radio-button>
          </n-radio-group>
        </n-form-item>
      </n-form>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { Logout as LogoutIcon } from '@vicons/carbon';
import { useMessage } from 'naive-ui';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useClientStore, useSettingsStore } from '../store';

const router = useRouter();
const message = useMessage();
const settings = useSettingsStore();
const store = useClientStore();

const theme = computed({
  get: () => settings.themeName,
  set: settings.setTheme,
});

async function logOut() {
  await store.logout();
  message.info('Abgemeldet');
  router.push('/');
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 30px;
}
</style>
