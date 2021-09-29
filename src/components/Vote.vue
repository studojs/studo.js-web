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

<script lang="ts" setup>
import { ChevronDown as DownIcon, ChevronUp as UpIcon } from '@vicons/carbon';
import { VoteType, VotingType } from 'studo.js';

interface Props {
  type: VotingType;
  state: VoteType;
  votes: number;
}
interface Emits {
  (event: 'vote', state: VoteType): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'NONE',
  state: 'NONE',
  votes: 0,
});
const emit = defineEmits<Emits>();

function toggleVote(state: 'UP' | 'DOWN') {
  if (props.state === state) emit('vote', 'NONE');
  else emit('vote', state);
}
</script>

<style lang="scss" scoped>
.vote {
  display: flex;
  flex-direction: column;
  align-items: center;

  > .n-icon {
    cursor: pointer;
    &.voted {
      color: var(--primary-color);
    }
  }
}
</style>
