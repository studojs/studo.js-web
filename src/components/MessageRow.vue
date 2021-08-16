<template>
  <div class="row">
    <div class="content">
      <div>
        <el-tag v-for="tag in message.tagIds" :key="tag" size="mini">{{
          tag
        }}</el-tag>
      </div>
      <div class="header">{{ message.header }}</div>
      <div class="text">{{ message.text }}</div>
      <el-image
        v-if="message.downloadUrl"
        :src="message.inlineImageUrl"
        :alt="message.fileName"
        :preview-src-list="[message.downloadUrl]"
        :hide-on-click-modal="true"
        lazy
      />
      <div class="footer">{{ message.footer }}</div>
    </div>
    <div class="votes">
      <el-button
        v-if="message.topic?.votingType.includes('UP')"
        :class="{ voted: message.voteState === 'UP' }"
        @click.prevent="toggleVote('UP')"
        icon="el-icon-arrow-up"
        circle
        size="mini"
        type="text"
      ></el-button>
      <div v-show="message.topic?.votingType !== 'NONE'">
        {{ message.votes }}
      </div>
      <el-button
        v-if="message.topic?.votingType.includes('DOWN')"
        :class="{ voted: message.voteState === 'DOWN' }"
        @click.prevent="toggleVote('DOWN')"
        icon="el-icon-arrow-down"
        circle
        size="mini"
        type="text"
      ></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from 'studo.js';

export default {
  name: 'MessageRow',
  props: {
    message: {
      type: Message,
      required: true,
    },
  },
  setup(props) {
    function toggleVote(state: 'UP' | 'DOWN') {
      if (props.message.voteState === state) props.message.vote('NONE');
      else props.message.vote(state);
    }

    return { toggleVote };
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

:deep(.el-image__preview) {
  max-height: 50vh;
  border-radius: 3px;
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