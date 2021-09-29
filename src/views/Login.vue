<template>
  <div class="container">
    <n-space vertical>
      <pre>{{ model }}</pre>
      <n-form
        :model="model"
        :rules="rules"
        :show-require-mark="true"
        :style="{ maxWidth: '640px' }"
        ref="formRef"
      >
        <n-form-item path="phone" :label="t('phone')">
          <n-input-group>
            <n-select
              v-model:value="model.phone.prefix"
              :options="countryCodes"
              :render-label="renderCountry"
              filterable
              tag
            />
            <n-input
              v-model:value="model.phone.number"
              maxlength="20"
              :input-props="{ inputmode: 'tel' }"
              placeholder="678 123456789"
            />
          </n-input-group>
        </n-form-item>
        <n-button @click.prevent="sendSMS" :disabled="!canSend" type="primary">
          {{ t('next') }}
        </n-button>
      </n-form>

      <n-form :style="{ maxWidth: '640px' }">
        <n-form-item :label="t('verificationCode')">
          <n-input
            v-model:value="model.smsToken"
            placeholder="1234"
            maxlength="4"
            :input-props="{ inputmode: 'numeric' }"
          />
        </n-form-item>
        <n-button @click="login" type="primary">
          {{ t('login') }}
        </n-button>
      </n-form>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { FormInst, FormRules, SelectOption, useMessage } from 'naive-ui';
import { RestManager, SmsVerification } from 'studo.js';
import { computed, h, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useClientStore } from '../store';
import { useSettingsStore } from '../store/settings';

const router = useRouter();
const message = useMessage();
const { t } = useI18n();
const store = useClientStore();
const settings = useSettingsStore();
let sms: SmsVerification | undefined;

const formRef = ref<FormInst>(null as any);

function renderCountry(option: SelectOption, selected: boolean) {
  if (!option.label) return h(() => ''); // nothing selected
  if (!option.emoticon) return h(() => option.label); // custom input
  return h(() => `${option.emoticon}${option.value} ${option.label}`);
}
onMounted(async () => {
  const countries = await RestManager.fetchCountries();

  countryCodes.value = countries.map((country) => ({
    label: country.name,
    value: country.prefix,
    emoticon: country.emoticon,
  }));
});
let countryCodes = ref<SelectOption[]>([]);

const model = reactive({
  phone: {
    prefix: '',
    number: '',
  },
  smsToken: '',
});

const rules: FormRules = {
  phone: {
    type: 'object',
    validator(rule, { prefix, number }: typeof model['phone']) {
      // TODO: i18n
      if (!/^\+\d{1,5}$/.test(prefix)) return new Error('invalid prefix');
      if (!/^[\d\s]{5,20}$/.test(number)) return new Error('invalid number');
    },
  },
};

const canSend = computed(
  () => model.phone.prefix.length > 0 && model.phone.number.length > 0
);

async function sendSMS() {
  formRef.value.validate((errors) => {
    if (!errors) {
      message.success('Valid');
    } else {
      console.log(errors);
      message.error('Invalid');
    }
  });
  // sms = new SmsVerification(model.prefix, model.number);
  // const response = await sms.send();
  // if (response === 'SUCCESS') message.success(t('smsSent'));
  // else message.error(response);
}

async function login() {
  if (!sms) return;
  try {
    const response = await sms.signIn(model.smsToken);
    settings.setSessionToken(response.studoSessionToken);
    await store.connect();

    message.success(t('loggedIn'));
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
