<template>
  <div class="row">
    <div class="content">
      <div>
        <n-tag v-for="tag in message.tagIds" :key="tag" :type="tagType(tag)" size="small">{{ tag }}</n-tag>
      </div>
      <div class="header">{{ message.header }}</div>
      <div class="text">{{ message.text }}</div>
      <n-image
        v-if="message.downloadUrl"
        :src="message.inlineImageUrl"
        :alt="message.fileName"
        :img-props="{ loading: 'lazy' }"
      />
      <div class="footer">{{ message.footer }}</div>
    </div>
    <div class="votes">
      <n-icon
        v-if="message.topic?.votingType.includes('UP')"
        :class="{ voted: message.voteState === 'UP' }"
        @click.prevent="toggleVote('UP')"
      >
        <UpIcon />
      </n-icon>
      <div v-show="message.topic?.votingType !== 'NONE'">{{ message.votes }}</div>
      <n-icon
        v-if="message.topic?.votingType.includes('DOWN')"
        :class="{ voted: message.voteState === 'DOWN' }"
        @click.prevent="toggleVote('DOWN')"
      >
        <DownIcon />
      </n-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from 'studo.js';
import { defineComponent } from 'vue';
import { tagType } from '../store';
import { ChevronDown as DownIcon, ChevronUp as UpIcon } from '@vicons/carbon';

export default defineComponent({
  name: 'MessageRow',
  props: {
    message: {
      type: Message,
      required: true,
    },
  },
  components: {
    DownIcon,
    UpIcon
  },
  setup(props) {
    function toggleVote(state: 'UP' | 'DOWN') {
      if (props.message.voteState === state) props.message.vote('NONE');
      else props.message.vote(state);
    }

    return { tagType, toggleVote };
  }
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
  }
}

.n-image {
  border-radius: 3px;

  > :deep(img) {
    max-height: 40vh;
  }
}

.header,
.footer {
  font-size: 0.8em;
  color: #b1b1b1;
}

.votes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;

  > .n-icon {
    cursor: pointer;
    &.voted {
      color: #63e2b7;
    }
  }
}
</style>