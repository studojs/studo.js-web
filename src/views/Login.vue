<template>
  <div class="container">
    <div v-show="step === 0">
      <n-h1 class="header">Willkommen! 👋</n-h1>
      <n-text class="header"
        >Bestätige deine Ländervorwahl und gib deine Handynummer ein:</n-text
      >
      <hr />
      <PhoneForm @submit="sendSMS" />
    </div>
    <div v-show="step === 1">
      <n-text class="header">
        An OTP was sent to
        <n-text type="info">{{ fullNumber }}</n-text>
      </n-text>
      <hr />
      <OTPForm @submit="verifySMS" />
      <n-button @click="step--">Back</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { SmsVerification } from 'studo.js';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useClientStore } from '../store';
import { useSettingsStore } from '../store/settings';

const router = useRouter();
const message = useMessage();
const store = useClientStore();
const settings = useSettingsStore();
const auth = ref<SmsVerification>();

const step = ref(0);
const fullNumber = computed(
  () => `${auth.value?.countryPrefix} ${auth.value?.phoneNumber}`
);

async function sendSMS(prefix: string, number: string) {
  auth.value = new SmsVerification(prefix, number);
  try {
    await auth.value.send();
    step.value++;
  } catch (error: any) {
    message.error(error.message);
  }
}

async function verifySMS(otp: string) {
  if (!auth.value) return;

  try {
    const response = await auth.value.signIn(otp);
    settings.setSessionToken(response.studoSessionToken);
    await store.connect();
    router.push({ name: 'chat' });
  } catch (error: any) {
    message.error(error.message);
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 30px;
  display: flex;
  justify-content: center;
  & > div {
    width: 400px;
  }
}

hr {
  width: 40%;
  margin: 30px auto 50px auto;
}

.header {
  display: block;
  text-align: center;
}
</style>
