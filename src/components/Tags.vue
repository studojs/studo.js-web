<template>
  <div v-if="ids.length" class="tags">
    <n-tag v-for="id in ids" :key="id" :type="type(id)" size="small">{{
      text(id)
    }}</n-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { localeRef } from '../store';

export default defineComponent({
  name: 'Tags',
  props: {
    ids: {
      type: Array as PropType<string[]>,
      default: [],
    },
  },
  setup() {
    function text(id: string) {
      return localeRef.value.Tag[id as keyof typeof localeRef.value.Tag] ?? id;
    }

    function type(id: string) {
      return ['ACCEPTEDANSWER', 'DONE'].includes(id) ? 'success' : 'info';
    }

    return { text, type };
  },
});
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  column-gap: 5px;
}
</style>
