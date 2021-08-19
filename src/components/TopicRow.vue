<template>
  <router-link :to="topicRoute" :class="['row', { selected: isSelected }]">
    <div class="content">
      <div>
        <n-tag v-for="tag in topic.tagIds" :key="tag" :type="tagType(tag)" size="small">{{ tag }}</n-tag>
      </div>
      <div class="text">{{ topic.text }}</div>
      <div class="header">{{ topic.header }}</div>
      <div class="footer">{{ topic.footer }}</div>
    </div>
    <Vote :votes="topic.votes" :type="topic.votingType" :state="topic.voteState" @vote="vote" />
  </router-link>
</template>

<script lang="ts">
import { Topic, VoteType } from 'studo.js';
import { computed, defineComponent } from 'vue';
import { tagType, topicIdRef } from '../store';
import Vote from "@/components/Vote.vue";

export default defineComponent({
  name: 'TopicRow',
  components: {
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

    async function vote(state: VoteType) {
      await props.topic.vote(state);
    }

    return { isSelected, tagType, topicRoute, vote };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/vars.scss";

.row {
  --bezier: cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
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

.header,
.footer {
  font-size: 0.8em;
  color: #b1b1b1;
}
</style>