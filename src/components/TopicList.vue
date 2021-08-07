<template>
  <el-scrollbar>
    <el-empty v-if="!hasTopics" description="No Topics" />
    <TopicRow v-for="topic in filteredTopics" :key="topic.id" :topic="topic">
    </TopicRow>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed } from 'vue';
import { store } from '../store';
import TopicRow from './TopicRow.vue';

export default {
  name: 'TopicList',
  components: {
    TopicRow,
  },
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