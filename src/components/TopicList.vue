<template>
  <el-scrollbar>
    <el-empty v-if="!hasTopics" description="No Topics" />
    <h4
      v-for="topic in filteredTopics"
      :key="topic.id"
      style="word-break: break-word"
    >
      <div>{{ topic.header }}</div>
      <div>{{ topic.text }}</div>
      <div>{{ topic.footer }}</div>
      <div>{{ topic.votes }}</div>
    </h4>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { client, store } from '../store';

export default {
  name: 'TopicList',
  props: {
    tabId: String,
  },
  setup(props) {
    const hasTopics = computed(() => store.topics.size > 0);
    const filteredTopics = computed(() => {
      return [...store.topics.values()].filter((topic) => !topic.hidden);
    });

    return { filteredTopics, hasTopics };
  },
};
</script>

<style lang="scss" scoped>
</style>