<template>
  <n-scrollbar ref="scrollbarRef" @scroll="handleScroll">
    <TopicRow v-for="topic in topics" :key="topic.id" :topic="topic" />
    <n-button v-show="topics.length" type="primary" round>
      <template #icon>
        <n-icon>
          <AddIcon />
        </n-icon>
      </template>
    </n-button>
  </n-scrollbar>
</template>

<script lang="ts" setup>
import TopicRow from '@/components/TopicRow.vue';
import { Add as AddIcon } from '@vicons/carbon';
import { debounce } from 'debounce';
import { ScrollbarInst } from 'naive-ui';
import { computed, ref } from 'vue';
import { channelIdRef, tabRef, topicsRef } from '../store';

const topics = computed(() => {
  return [...topicsRef.values()].filter(
    (topic) => !topic.hidden && topic.channelId === channelIdRef.value
  );
});

const scrollbarRef = ref<ScrollbarInst | null>(null);
const loadTopicsDebounced = debounce(() => tabRef.value?.scroll(), 500, true);

function handleScroll(e: Event) {
  const container = e.target as HTMLElement;
  const content = container.firstElementChild as HTMLElement;

  const containerHeight = container.offsetHeight;
  const containerScrollTop = container.scrollTop;
  const contentHeight = content.offsetHeight;
  const scrollBottom = contentHeight - containerScrollTop - containerHeight;

  if (scrollBottom <= 300) loadTopicsDebounced();
}
</script>

<style lang="scss" scoped>
.n-button {
  --size: 40px;
  position: absolute;
  bottom: 30px;
  padding: 0;
  right: 40px;
  width: var(--size);
  height: var(--size);
}
</style>
