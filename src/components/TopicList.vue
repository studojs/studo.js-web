<template>
  <n-scrollbar ref="scrollbarRef" @scroll="handleScroll">
    <TopicRow v-for="topic in topics" :key="topic.id" :topic="topic" />
  </n-scrollbar>
</template>

<script lang="ts" setup>
import TopicRow from '@/components/TopicRow.vue';
import type { ScrollbarInst } from 'naive-ui';
import { computed, ref } from 'vue';
import { channelIdRef, tabRef, topicsRef } from '../store';
const topics = computed(() => {
  return [...topicsRef.values()].filter(
    (topic) => !topic.hidden && topic.channelId === channelIdRef.value
  );
});

let scrollLoading = false;
const scrollbarRef = ref<ScrollbarInst | null>(null);
async function handleScroll(e: Event) {
  if (scrollLoading) return;
  const container = e.target as HTMLElement;
  const content = container.firstElementChild as HTMLElement;

  const containerHeight = container.offsetHeight;
  const containerScrollTop = container.scrollTop;
  const contentHeight = content.offsetHeight;
  const scrollBottom = contentHeight - containerScrollTop - containerHeight;

  if (scrollBottom <= 300) {
    scrollLoading = true;
    await tabRef.value?.scroll();
    setTimeout(() => (scrollLoading = false), 300);
  }
}
</script>

<style lang="scss" scoped></style>
