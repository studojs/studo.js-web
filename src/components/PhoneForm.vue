<template>
  <n-form
    :model="model"
    :rules="rules"
    :show-require-mark="false"
    :style="{ maxWidth: '640px' }"
    ref="formRef"
    @submit.prevent="validateForm"
  >
    <n-form-item :label="t('phone')" path="phone">
      <n-input-group>
        <n-input
          class="prefix"
          v-model:value="model.phone.prefix"
          :input-props="{ inputmode: 'tel', autocomplete: 'tel-country-code' }"
          maxlength="5"
          placeholder="00"
        >
          <template #prefix>+</template>
        </n-input>
        <n-input
          v-model:value="model.phone.number"
          :input-props="{ inputmode: 'tel', autocomplete: 'tel-national' }"
          maxlength="20"
          placeholder="678 123456789"
        />
      </n-input-group>
    </n-form-item>
    <n-form-item>
      <n-button type="primary" attr-type="submit">Senden</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormInst, FormRules, NButton, NForm } from 'naive-ui';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

interface Emits {
  (event: 'submit', prefix: string, number: string): void;
}
const emit = defineEmits<Emits>();

const { t } = useI18n();

const formRef = ref<FormInst>();
const model = reactive({
  phone: {
    prefix: '',
    number: '',
  },
});
const rules: FormRules = {
  phone: {
    type: 'object',
    fields: {
      prefix: {
        required: true,
        pattern: /^\d+$/,
      },
      number: {
        required: true,
        pattern: /^\d+$/,
      },
    },
  },
};

function validateForm() {
  formRef.value?.validate((errors) => {
    console.log(errors);
    if (!errors) emit('submit', `+${model.phone.prefix}`, model.phone.number);
  });
}
</script>

<style lang="scss" scoped>
.n-button {
  width: 100%;
}
.prefix {
  min-width: 60px;
  width: 30%;
}
</style>
