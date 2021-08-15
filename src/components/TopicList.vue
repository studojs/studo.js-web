<template>
  <el-scrollbar>
    <el-empty v-if="!hasTopics" description="No Topics" />
    <el-radio-group v-model="topicIdRef">
      <TopicRow v-for="topic in filteredTopics" :key="topic.id" :topic="topic">
      </TopicRow>
    </el-radio-group>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed } from 'vue';
import { store, topicIdRef } from '../store';
import TopicRow from './TopicRow.vue';

export default {
  name: 'TopicList',
  components: {
    TopicRow,
  },
  setup() {
    const hasTopics = computed(() => store.topics.size > 0);
    const filteredTopics = computed(() => {
      return [...store.topics.values()].filter((topic) => !topic.hidden);
    });

    return { filteredTopics, hasTopics, topicIdRef };
  },
};
</script>

<style lang="scss" scoped>
</style>