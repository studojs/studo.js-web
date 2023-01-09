<template>
  <Row :target="topic" :route="route">
    <template #header>{{ topic.header }}</template>
    <template #text>{{ topic.text.replace(/☺️/g, ':)') }}</template>
    <template #right>
      <Vote
        v-if="topic"
        :votes="topic.votes"
        :type="topic.votingType"
        :state="topic.voteState"
        @vote="(state) => topic.vote(state)"
      />
    </template>
  </Row>
</template>

<script lang="ts" setup>
import { Topic } from 'studo.js';
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';

interface Props {
  topic: Topic;
}
const props = defineProps<Props>();

const route = computed(
  (): RouteLocationRaw => ({
    name: 'chat',
    params: {
      channel: props.topic.channelId,
      tab: props.topic.tabId,
      topic: props.topic.id,
    },
  })
);
</script>

<style lang="scss" scoped>
.text {
  white-space: pre-wrap;
}
</style>
