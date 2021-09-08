<template>
  <div class="container">
    <n-space vertical>
      <n-checkbox v-model:checked="tos">
        <i18n-t keypath="term" tag="label" for="tos">
          <a
            @click.stop
            href="https://studo.com/tos"
            target="_blank"
            rel="noopenner noreferrer"
          >
            {{ $t('tos') }}
          </a>
        </i18n-t>
      </n-checkbox>
      <n-form
        :model="model"
        :disabled="!tos || step !== 1"
        :style="{ maxWidth: '640px' }"
      >
        <n-form-item :label="t('phone')">
          <n-input-group>
            <n-input
              v-model:value="model.prefix"
              placeholder="+123"
              maxlength="5"
              :style="{ width: '30%' }"
            />
            <n-input
              v-model:value="model.number"
              placeholder="678 123456789"
              maxlength="20"
              :style="{ width: '70%' }"
            />
          </n-input-group>
        </n-form-item>
        <n-button
          @click="sendSMS"
          :disabled="!tos || step !== 1"
          type="primary"
        >
          {{ t('send') }}
        </n-button>
      </n-form>

      <n-form :disabled="!tos || step !== 2" :style="{ maxWidth: '640px' }">
        <n-form-item :label="t('verificationCode')">
          <n-input v-model:value="smsToken" placeholder="1234" maxlength="4" />
        </n-form-item>
        <n-button @click="login" :disabled="!tos || step !== 2" type="primary">
          {{ t('login') }}
        </n-button>
      </n-form>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { Client, SmsVerification } from 'studo.js';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import router from '../router';
import { clientRef, sessionTokenRef } from '../store';

const message = useMessage();
const { t } = useI18n();

const tos = ref(false);
const smsToken = ref('');
const step = ref(1);
const model = ref({
  prefix: '',
  number: '',
});
let sms: SmsVerification | undefined;

async function sendSMS() {
  step.value = 2;
  const { prefix, number } = model.value;
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
    const client = new Client(response.studoSessionToken);
    clientRef.value = client;
    router.push('/');
  } catch (error: any) {
    message.error(error.message);
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 30px;
}
</style>
