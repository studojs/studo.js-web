<template>
  <div class="container">
    <n-card>
      <n-space vertical>
        <n-button @click="logOut">
          {{ t('logout') }}
          <template #icon>
            <n-icon><LogoutIcon /></n-icon>
          </template>
        </n-button>
        <n-form :style="{ maxWidth: '640px' }">
          <n-form-item :label="t('theme')">
            <n-radio-group v-model:value="themeName" name="theme">
              <n-radio-button value="dark"
                >{{ t('themes.dark') }}
              </n-radio-button>
              <n-radio-button value="system"
                >{{ t('themes.system') }}
              </n-radio-button>
              <n-radio-button value="light"
                >{{ t('themes.light') }}
              </n-radio-button>
            </n-radio-group>
          </n-form-item>
          <n-form-item :label="t('language')">
            <n-radio-group v-model:value="locale" name="language">
              <n-radio-button
                v-for="lang in availableLocales"
                :key="lang"
                :value="lang"
                >{{ t('languages.' + lang) }}</n-radio-button
              >
            </n-radio-group>
          </n-form-item>
        </n-form>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { Logout as LogoutIcon } from '@vicons/carbon';
import { watch } from '@vue/runtime-core';
import { useMessage } from 'naive-ui';
import { RestManager } from 'studo.js';
import { useI18n } from 'vue-i18n';
import router from '../router';
import {
  clientRef,
  sessionTokenRef,
  themeNameRef as themeName,
} from '../store';

const { t, locale, availableLocales } = useI18n();
const message = useMessage();

async function logOut() {
  if (!sessionTokenRef.value) return;

  await RestManager.signOut(sessionTokenRef.value);
  sessionTokenRef.value = clientRef.value = null;
  message.info(t('loggedOut'));
  router.push('/');
}

watch(locale, () => {
  localStorage.setItem('locale', locale.value);
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 30px;
}

.n-card {
  width: 50%;
}
</style>
