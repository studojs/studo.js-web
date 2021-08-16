<template>
  <el-scrollbar
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <TopicRow v-for="topic in filteredTopics" :key="topic.id" :topic="topic">
    </TopicRow>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed } from 'vue';
import { channelIdRef, topicIdRef, topicsRef } from '../store';
import TopicRow from './TopicRow.vue';

export default {
  name: 'TopicList',
  components: {
    TopicRow,
  },
  setup() {
    const filteredTopics = computed(() => {
      return [...topicsRef.values()].filter(
        (topic) => !topic.hidden && topic.channelId === channelIdRef.value
      );
    });
    const loading = computed(
      () => channelIdRef.value.length > 0 && filteredTopics.value.length === 0
    );

    return { filteredTopics, loading, topicIdRef };
  },
};
</script>

<style lang="scss" scoped>
</style>