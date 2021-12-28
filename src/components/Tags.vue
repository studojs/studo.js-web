<template>
  <div v-if="ids.length" class="tags">
    <n-tag v-for="id in ids" :key="id" :type="type(id)" size="small">
      {{ label(id) }}
    </n-tag>
  </div>
</template>

<script lang="ts" setup>
import { useClientStore } from '../store';

interface Props {
  ids: string[];
}
withDefaults(defineProps<Props>(), {
  ids: () => [],
});

const store = useClientStore();

function label(id: string) {
  return store.client.cache.chatTags.get(id)?.text || id;
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
