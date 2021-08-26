<template>
  <div v-if="ids.length" class="tags">
    <n-tag v-for="id in ids" :key="id" :type="type(id)" size="small">{{
      text(id)
    }}</n-tag>
  </div>
</template>

<script lang="ts" setup>
import { localeRef } from '../store';

withDefaults(defineProps<{ ids: string[] }>(), {
  ids: () => [],
});

function text(id: string) {
  return localeRef.value.Tag[id as keyof typeof localeRef.value.Tag] ?? id;
}

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
