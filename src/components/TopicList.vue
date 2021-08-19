<template>
  <TopicRow v-for="topic in topics" :key="topic.id" :topic="topic" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { channelIdRef, topicsRef } from '../store';
import TopicRow from "@/components/TopicRow.vue";

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

    return { topics: filteredTopics };
  }
});

</script>

<style lang="scss" scoped>
</style>