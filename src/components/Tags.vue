<template>
  <div v-if="ids.length" class="tags">
    <n-tag v-for="id in ids" :key="id" :type="type(id)" size="small">{{
      text(id)
    }}</n-tag>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ ids: string[] }>(), {
  ids: () => [],
});

function text(id: string) {
  return id; // TODO: locale
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
