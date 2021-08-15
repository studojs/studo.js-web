<template>
  <router-link :to="topicRoute">
    <el-radio :label="topic.id" @click="topic.subscribe()">
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
          @click.stop="toggleVote('UP')"
          icon="el-icon-arrow-up"
          circle
          size="small"
          type="text"
        ></el-button>
        <div>{{ topic.votes }}</div>
        <el-button
          v-if="topic.votingType.includes('DOWN')"
          :class="{ voted: topic.voteState === 'DOWN' }"
          @click.stop="toggleVote('DOWN')"
          icon="el-icon-arrow-down"
          circle
          size="small"
          type="text"
        ></el-button>
      </div>
    </el-radio>
  </router-link>
</template>

<script lang="ts">
import { Topic } from 'studo.js';
import { computed } from 'vue';
export default {
  name: 'TopicRow',
  props: {
    topic: {
      type: Topic,
      required: true,
    },
  },
  setup(props) {
    function toggleVote(state: 'UP' | 'DOWN') {
      if (props.topic.voteState === state) props.topic.vote('NONE');
      else props.topic.vote(state);
    }

    const topicRoute = computed(() => ({
      name: 'topic',
      params: {
        topicId: props.topic.id,
      },
    }));
    return { toggleVote, topicRoute };
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.el-radio {
  width: 100%;
  margin: 4px 0 0 0 !important;
  padding: 4px;
  border-radius: 8px;

  &:hover:not(.is-checked) {
    background: #161b22;
  }
}

::v-deep(.el-radio__input) {
  display: none;
}

::v-deep(.el-radio__label) {
  display: flex;
  align-items: center;
  padding: 0px;
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