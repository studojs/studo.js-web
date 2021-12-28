<template>
  <n-form
    :model="formValue"
    :rules="rules"
    :show-require-mark="false"
    :style="{ maxWidth: '640px' }"
    ref="formRef"
    @submit.prevent="validateForm"
  >
    <n-form-item label="Verifizierungscode" path="otp">
      <n-input
        v-model:value="formValue.otp"
        placeholder="1234"
        maxlength="4"
        :input-props="{
          inputmode: 'numeric',
          autocomplete: 'one-time-code',
        }"
      />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" attr-type="submit">Verify</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormInst, FormRules, NButton, NForm } from 'naive-ui';
import { reactive, ref } from 'vue';

interface Emits {
  (event: 'submit', otp: string): void;
}
const emit = defineEmits<Emits>();

const formRef = ref<FormInst>();
const formValue = reactive({
  otp: '',
});

const rules: FormRules = {
  otp: {
    required: true,
    pattern: /^\d{4}$/,
    len: 4,
  },
};

function validateForm() {
  formRef.value?.validate((errors) => {
    console.log(errors);
    if (!errors) setTimeout(() => emit('submit', formValue.otp), 0);
  });
}
</script>

<style lang="scss" scoped>
.n-button {
  width: 100%;
}
</style>
