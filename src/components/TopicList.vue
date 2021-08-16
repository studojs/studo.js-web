<template>
  <el-scrollbar>
    <TopicRow v-for="topic in filteredTopics" :key="topic.id" :topic="topic">
    </TopicRow>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed } from 'vue';
import { topicIdRef, topicsRef } from '../store';
import TopicRow from './TopicRow.vue';

export default {
  name: 'TopicList',
  components: {
    TopicRow,
  },
  setup() {
    const filteredTopics = computed(() => {
      return [...topicsRef.values()].filter((topic) => !topic.hidden);
    });

    return { filteredTopics, topicIdRef };
  },
};
</script>

<style lang="scss" scoped>
</style>