<template>
  <div class="vote">
    <n-icon
      v-if="type.includes('UP')"
      :class="{ voted: state === 'UP' }"
      @click.prevent="toggleVote('UP')"
    >
      <UpIcon />
    </n-icon>
    <div v-show="type !== 'NONE'">{{ votes }}</div>
    <n-icon
      v-if="type.includes('DOWN')"
      :class="{ voted: state === 'DOWN' }"
      @click.prevent="toggleVote('DOWN')"
    >
      <DownIcon />
    </n-icon>
  </div>
</template>

<script lang="ts">
import { VoteType, VotingType } from 'studo.js';
import { defineComponent, PropType } from 'vue';
import { ChevronDown as DownIcon, ChevronUp as UpIcon } from '@vicons/carbon';

export default defineComponent({
  name: 'Vote',
  components: {
    DownIcon,
    UpIcon
  },
  props: {
    type: {
      type: String as PropType<VotingType>,
      default: 'UP_AND_DOWN',
    },
    state: {
      type: String as PropType<VoteType>,
      default: 'NONE',
    },
    votes: {
      type: Number,
      default: 0
    }
  },
  emits: {
    vote(state: VoteType) {
      return true;
    }
  },
  setup(props, ctx) {
    function toggleVote(state: 'UP' | 'DOWN') {
      if (props.state === state) ctx.emit('vote', 'NONE');
      else ctx.emit('vote', state);
    }

    return { toggleVote };
  }
});
</script>

<style lang="scss" scoped>
.vote {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 16px;

  > .n-icon {
    cursor: pointer;
    &.voted {
      color: #63e2b7;
    }
  }
}
</style>