<template>
  <el-scrollbar>
    <el-empty v-if="!hasTopics" description="No Topics" />
    <h3
      v-for="topic in filteredTopics"
      :key="topic.id"
      style="word-break: break-word"
    >
      {{ topic.text }}
    </h3>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Topic } from 'studo.js';
import { client, store } from '../store';

export default {
  name: 'TopicList',
  props: {
    tabId: String,
  },
  setup(props) {
    // const topics = ref(new Map<string, Topic>());
    const hasTopics = computed(() => store.topics.size > 0);
    const filteredTopics = computed(() => {
      return [...store.topics.values()].filter((topic) => !topic.hidden);
    });

    // watch(props, () => topics.value.clear());

    // client.on('topicUpdate', (topic) => {
    //   if (topic.tabId === props.tabId && !topic.hidden)
    //     topics.value.set(topic.id, topic);
    // });

    return { filteredTopics, hasTopics };
  },
};
</script>

<style lang="scss" scoped>
</style>