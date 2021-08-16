<template>
  <router-link :to="topicRoute" :class="['row', { selected: isSelected }]">
    <div class="content">
      <div>
        <el-tag v-for="tag in topic.tagIds" :key="tag" size="mini">{{
          tag
        }}</el-tag>
      </div>
      <div class="text">{{ topic.text }}</div>
      <div class="header">{{ topic.header }}</div>
      <div class="footer">{{ topic.footer }}</div>
    </div>
    <div class="votes">
      <el-button
        v-if="topic.votingType.includes('UP')"
        :class="{ voted: topic.voteState === 'UP' }"
        @click.prevent="toggleVote('UP')"
        icon="el-icon-arrow-up"
        circle
        size="mini"
        type="text"
      ></el-button>
      <div>{{ topic.votes }}</div>
      <el-button
        v-if="topic.votingType.includes('DOWN')"
        :class="{ voted: topic.voteState === 'DOWN' }"
        @click.prevent="toggleVote('DOWN')"
        icon="el-icon-arrow-down"
        circle
        size="mini"
        type="text"
      ></el-button>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Topic } from 'studo.js';
import { computed } from 'vue';
import { topicIdRef } from '../store';
export default {
  name: 'TopicRow',
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
    function toggleVote(state: 'UP' | 'DOWN') {
      if (props.topic.voteState === state) props.topic.vote('NONE');
      else props.topic.vote(state);
    }

    return { isSelected, toggleVote, topicRoute };
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.row {
  display: flex;
  width: 100%;
  margin-top: 4px;
  padding: 4px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  color: $--color-text-primary;

  &:hover {
    background: $--color-highlight;
  }

  &.selected {
    background: $--color-primary-dark;
  }
}

.el-tag + .el-tag {
  margin-left: 5px;
}

.content {
  width: 100%;
}

.text {
  margin-bottom: 5px;
}

.header,
.text,
.footer {
  white-space: normal;
}

.header,
.footer {
  font-size: 12px;
  color: $--color-text-secondary;
}

.votes {
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;

  & > * {
    display: block;
  }

  & > button {
    color: $--color-text-secondary;
  }
}

button.voted {
  color: $--color-primary;
}
</style>