<template>
  <n-form :model="model">
    <n-form-item path="token" label="Session Token">
      <n-input v-model:value="model.token" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="theme" label="Theme">
      <n-radio-group v-model:value="model.theme" name="theme">
        <n-radio-button value="dark">Dark</n-radio-button>
        <n-radio-button value="light">Light</n-radio-button>
        <n-radio-button value="system">System</n-radio-button>
      </n-radio-group>
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end;">
          <n-button @click="save" round type="primary">Save</n-button>
        </div>
      </n-col>
    </n-row>
  </n-form>
  {{ model }}
</template>

<script lang="ts">
import { sessionTokenRef, themeNameRef } from '../store';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';

export default {
  name: 'Settings',
  setup() {
    const message = useMessage();
    const modelRef = ref({
      token: sessionTokenRef.value,
      theme: themeNameRef.value
    })
    function save() {
      sessionTokenRef.value = modelRef.value.token;
      themeNameRef.value = modelRef.value.theme;
      message.success('Saved');
    }
    return { model: modelRef.value, save };
  },
};
</script>

<style lang="scss" scoped>
</style>