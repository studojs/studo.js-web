<template>
  <div class="container">
    <n-space vertical>
      <n-button @click="logOut">
        {{ t('logout') }}
        <template #icon>
          <n-icon><LogoutIcon /></n-icon>
        </template>
      </n-button>
      <n-form :style="{ maxWidth: '640px' }">
        <n-form-item :label="t('theme')">
          <n-radio-group v-model:value="theme" name="theme">
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
  </div>
</template>

<script lang="ts" setup>
import { Logout as LogoutIcon } from '@vicons/carbon';
import { useMessage } from 'naive-ui';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useClientStore, useSettingsStore } from '../store';

const router = useRouter();
const { t, locale, availableLocales } = useI18n();
const message = useMessage();
const settings = useSettingsStore();
const store = useClientStore();

const theme = computed({
  get: () => settings.themeName,
  set: settings.setTheme,
});
watch(locale, () => settings.setLocale(locale.value));

async function logOut() {
  await store.logout();
  message.info(t('loggedOut'));
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
