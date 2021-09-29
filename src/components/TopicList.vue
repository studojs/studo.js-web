<template>
  <n-scrollbar @scroll="handleScroll">
    <TopicRow
      v-for="[id, topic] in chat.visibleTopics"
      :key="id"
      :topic="topic"
    />
    <n-button v-show="chat.allowNewTopics" type="primary" circle>
      <template #icon>
        <n-icon><AddIcon /></n-icon>
      </template>
    </n-button>
  </n-scrollbar>
</template>

<script lang="ts" setup>
import { Add as AddIcon } from '@vicons/carbon';
import { debounce } from 'debounce';
import { useChatStore } from '../store';

const chat = useChatStore();

const loadTopicsDebounced = debounce(() => chat.tab?.scroll(), 200, true);

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
  position: absolute;
  bottom: 30px;
  padding: 0;
  right: 40px;
  width: 40px;
  height: 40px;
}
</style>
