<template>
  <n-form :model="model">
    <n-button @click="logOut">
      Log Out
      <template #icon>
        <n-icon>
          <LogoutIcon />
        </n-icon>
      </template>
    </n-button>
    <n-form-item label="Session Token">
      <n-input v-model:value="token" :disabled="true" />
    </n-form-item>
    <n-form-item path="theme" label="Theme">
      <n-radio-group v-model:value="model.theme" name="theme">
        <n-radio-button value="dark">Dark</n-radio-button>
        <n-radio-button value="light">Light</n-radio-button>
        <n-radio-button value="system">System</n-radio-button>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-button @click="save" type="primary">Save</n-button>
  <pre>{{ model }}</pre>
</template>

<script lang="ts">
import { client, sessionTokenRef, themeNameRef } from '../store';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import router from '../router';
import { Logout as LogoutIcon } from '@vicons/carbon';
import { RestManager } from 'studo.js';

export default {
  name: 'Settings',
  components: {
    LogoutIcon,
  },
  setup() {
    const message = useMessage();
    const modelRef = ref({
      theme: themeNameRef.value
    })
    function save() {
      themeNameRef.value = modelRef.value.theme;
      message.success('Saved');
    }
    async function logOut() {
      if (!sessionTokenRef.value) return;

      await RestManager.signOut(sessionTokenRef.value);
      sessionTokenRef.value = null;
      client.disconnect();
      message.info('Logged out');
      router.push('/');
    }

    return { logOut, model: modelRef.value, save, token: sessionTokenRef.value };
  },
};
</script>

<style lang="scss" scoped>
</style>