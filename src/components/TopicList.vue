<template>
  <el-scrollbar>
    <el-empty v-if="!hasTopics" description="No Topics" />
    <h1 v-for="topic in filteredTopics" :key="topic.id">
      {{ topic.text }}
    </h1>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Topic } from 'studo.js';
import { client } from '../client';

export default {
  name: 'TopicList',
  props: {
    tabId: String,
  },
  setup(props) {
    const topics = ref(new Map<string, Topic>());
    watch(props, () => topics.value.clear());

    client.on('topicUpdate', (topic) => {
      if (topic.tabId === props.tabId && !topic.hidden)
        topics.value.set(topic.id, topic);
    });

    const filteredTopics = computed(() => {
      return [...topics.value.values()].filter((topic) => !topic.hidden);
    });

    const hasTopics = computed(() => topics.value.size > 0);
    return { filteredTopics, hasTopics };
  },
};
</script>

<style lang="scss" scoped>
</style>