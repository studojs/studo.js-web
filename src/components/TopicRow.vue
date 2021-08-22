<template>
  <ContextMenu :options="actions" @update:value="handleAction">
    <router-link :to="topicRoute" :class="['row', { selected: isSelected }]">
      <div class="content">
        <Tags :ids="topic.tagIds" />
        <div class="header">{{ topic.header }}</div>
        <div class="text">{{ topic.text }}</div>
        <div class="footer">{{ topic.footer }}</div>
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

<script lang="ts">
import { ActionId, Topic, VoteType } from 'studo.js';
import { computed, defineComponent } from 'vue';
import { localeRef, topicIdRef } from '../store';
import Vote from '@/components/Vote.vue';
import Tags from '@/components/Tags.vue';
import ContextMenu from '@/components/ContextMenu.vue';

export default defineComponent({
  name: 'TopicRow',
  components: {
    ContextMenu,
    Tags,
    Vote,
  },
  props: {
    topic: {
      type: Topic,
      required: true,
    },
  },
  setup(props) {
    const isSelected = computed(() => topicIdRef.value === props.topic.id);
    const topicRoute = computed(() => ({
      name: 'topic',
      params: {
        topicId: props.topic.id,
      },
    }));
    const actions = computed(() =>
      props.topic.actionIds.map((id) => ({
        label: localeRef.value.Action[id] ?? id,
        value: id,
      }))
    );
    async function handleAction(action: ActionId) {
      await props.topic.sendActions(action);
    }
    async function vote(state: VoteType) {
      await props.topic.vote(state);
    }

    return { actions, isSelected, handleAction, topicRoute, vote };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.row {
  --bezier: cubic-bezier(0.4, 0, 0.2, 1);
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
    background: #18181c;
    .text {
      color: #63e2b7;
    }
  }

  &.selected {
    background: rgba(99, 226, 183, 0.2);
    .text {
      color: #63e2b7;
    }
  }
}

.content {
  overflow-wrap: anywhere;
  white-space: pre-line;
}

.header,
.footer {
  font-size: 0.8em;
  color: #b1b1b1;
}
</style>
