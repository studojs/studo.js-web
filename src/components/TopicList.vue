<template>
  <n-scrollbar ref="scrollbarRef" @scroll="handleScroll">
    <TopicRow v-for="topic in topics" :key="topic.id" :topic="topic" />
  </n-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { channelIdRef, clientRef, tabRef, topicsRef } from '../store';
import TopicRow from "@/components/TopicRow.vue";
import { ScrollbarInst } from 'naive-ui';

export default defineComponent({
  name: 'TopicList',
  components: {
    TopicRow
  },
  setup() {
    const filteredTopics = computed(() => {
      return [...topicsRef.values()].filter(
        (topic) => !topic.hidden && topic.channelId === channelIdRef.value
      );
    });

    let loading = false;

    const scrollbarRef = ref<ScrollbarInst | null>(null)
    async function handleScroll(e: Event) {
      if (loading) return;
      const container = e.target as HTMLElement
      const content = container.firstElementChild as HTMLElement

      const containerHeight = container.offsetHeight
      const containerScrollTop = container.scrollTop
      const contentHeight = content.offsetHeight
      const scrollBottom = contentHeight - containerScrollTop - containerHeight

      if (scrollBottom <= 300) {
        loading = true;
        await tabRef.value?.scroll();
        setTimeout(() => (loading = false), 1000);
      }
    }

    return { handleScroll, topics: filteredTopics, scrollbarRef };
  }
});
</script>

<style lang="scss" scoped>
</style>