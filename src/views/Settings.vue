<template>
  <div class="container">
    <n-space vertical>
      <n-button @click="logOut">
        Log Out
        <template #icon>
          <n-icon><LogoutIcon /></n-icon>
        </template>
      </n-button>
      <n-card>
        <n-form :style="{ maxWidth: '640px' }">
          <n-form-item label="Theme">
            <n-radio-group v-model:value="themeName" name="theme">
              <n-radio-button value="dark">Dark</n-radio-button>
              <n-radio-button value="system">System</n-radio-button>
              <n-radio-button value="light">Light</n-radio-button>
            </n-radio-group>
          </n-form-item>
        </n-form>
      </n-card>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { Logout as LogoutIcon } from '@vicons/carbon';
import { useMessage } from 'naive-ui';
import router from '../router';
import {
  clientRef,
  sessionTokenRef,
  themeNameRef as themeName,
} from '../store';

const message = useMessage();
async function logOut() {
  if (!sessionTokenRef.value) return;

  // await RestManager.signOut(sessionTokenRef.value);
  sessionTokenRef.value = clientRef.value = null;
  message.info('Logged out');
  router.push('/');
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 30px;
}

.n-space {
  width: 100%;
}
</style>
