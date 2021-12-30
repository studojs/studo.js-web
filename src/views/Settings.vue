<template>
  <div class="container">
    <n-space vertical>
      <n-form :style="{ maxWidth: '640px' }">
        <n-form-item label="Darstellung">
          <n-radio-group v-model:value="theme" name="theme">
            <n-radio-button value="dark">Dunkel</n-radio-button>
            <n-radio-button value="system">System</n-radio-button>
            <n-radio-button value="light">Hell</n-radio-button>
          </n-radio-group>
        </n-form-item>
      </n-form>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingsStore } from '../store';

const settings = useSettingsStore();

const theme = computed({
  get: () => settings.themeName,
  set: settings.setTheme,
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 30px;
}
</style>
