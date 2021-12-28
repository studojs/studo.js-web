<template>
  <ContextMenu :options="actions" @update:value="sendAction">
    <router-link :to="route" :class="['row', { selected: isSelected }]">
      <div class="content">
        <Tags :ids="topic.tagIds" />
        <div class="header">{{ topic.header }}</div>
        <div class="text">{{ topic.text.replace(/☺️/g, ':)') }}</div>
        <n-text depth="2" class="footer">{{ topic.footer }}</n-text>
      </div>
      <Vote
        :votes="topic.votes"
        :type="topic.votingType"
        :state="topic.voteState"
        @vote="vote"
      />
    </router-link>
  </ContextMenu>
</template>

<script lang="ts" setup>
import { Topic, VoteType } from 'studo.js';
import { computed, toRef } from 'vue';
import { RouteLocation } from 'vue-router';
import { useAction } from '../composables/chatAction';
import { useChatStore } from '../store';
import { useClientStore } from '../store/client';

interface Props {
  topic: Topic;
}
const props = defineProps<Props>();

const store = useClientStore();
const chat = useChatStore();
const sendAction = useAction(toRef(props, 'topic'));

const isSelected = computed(() => chat.topicId === props.topic.id);
const route = computed(
  (): Partial<RouteLocation> => ({
    name: 'chat',
    query: {
      channel: props.topic.channelId,
      tab: props.topic.tabId,
      topic: props.topic.id,
    },
  })
);
const actions = computed(() =>
  props.topic.actionIds.map((id) => ({
    label: store.client.cache.chatActions.get(id)?.text || id,
    value: id,
  }))
);
async function vote(state: VoteType) {
  await props.topic.vote(state);
}
</script>

<style lang="scss" scoped>
.row {
  --bezier: var(--cubic-bezier-ease-in-out);
  display: flex;
  align-items: center;
  column-gap: 8px;
  justify-content: space-between;
  border-radius: 8px;
  margin: 8px 14px 0px 8px;
  padding: 4px 8px;
  color: inherit;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s var(--bezier), opacity 0.3s var(--bezier),
    background 0.3s var(--bezier);

  &:hover {
    background: var(--hover-color);
    .text {
      color: var(--primary-color-hover);
    }
  }

  &.selected {
    background: rgba(99, 226, 183, 0.2);
    .text {
      color: var(--primary-color);
    }
  }
}

.content {
  overflow-wrap: anywhere;
  white-space: pre-line;
}

.header,
.footer {
  display: block;
  font-size: 0.8em;
}
</style>
