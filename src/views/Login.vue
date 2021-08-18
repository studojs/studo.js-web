<template>
  {{ step }}
  <n-form :model="model" :disabled="step !== 1">
    <n-form-item label="Phone">
      <n-input-group>
        <n-input
          v-model:value="model.prefix"
          placeholder="+123"
          maxlength="5"
          show-count
          :style="{ width: '30%' }"
        />
        <n-input
          v-model:value="model.number"
          placeholder="678 123456789"
          maxlength="20"
          show-count
          :style="{ width: '70%' }"
        />
      </n-input-group>
    </n-form-item>
    <n-button @click="sendSMS" type="primary">Send</n-button>
  </n-form>

  <n-form>
    <n-form-item label="Verification Code">
      <n-input v-model:value="smsToken" placeholder="1234" maxlength="4" show-count />
    </n-form-item>
    <n-button @click="login" type="primary">Login</n-button>
  </n-form>
</template>

<script lang="ts">
import { useMessage } from 'naive-ui';
import { SmsVerification } from 'studo.js';
import { ref } from 'vue';
import router from '../router';
import { sessionTokenRef } from '../store';

export default {
  name: 'Login',
  setup() {
    const message = useMessage();
    const smsToken = ref('');
    const step = ref(1);
    const modelRef = ref({
      prefix: '',
      number: '',
    });
    let sms: SmsVerification | undefined;

    async function sendSMS() {
      step.value = 2;
      const { prefix, number } = modelRef.value;
      sms = new SmsVerification(prefix, number);
      const response = await sms.send();
      if (response === 'SUCCESS') message.success('SMS sent');
      else message.error(response);
    }

    async function login() {
      if (!sms) return;
      try {
        const response = await sms.signIn(smsToken.value);
        console.log(response);
        message.success('Signed in');
        sessionTokenRef.value = response.studoSessionToken;
        router.push('/');
      } catch (error) {
        message.error(error.message);
      }
    }

    return { login, model: modelRef.value, sendSMS, smsToken, step };
  },
};
</script>

<style lang="scss" scoped>
</style>
