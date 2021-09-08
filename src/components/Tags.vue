<template>
  <div v-if="ids.length" class="tags">
    <n-tag v-for="id in ids" :key="id" :type="type(id)" size="small">
      {{ t('tags.' + id) }}
    </n-tag>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

withDefaults(defineProps<{ ids: string[] }>(), {
  ids: () => [],
});
const { t } = useI18n();

function type(id: string) {
  return ['ACCEPTEDANSWER', 'DONE'].includes(id) ? 'success' : 'info';
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  column-gap: 5px;
}
</style>
