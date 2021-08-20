<template>
  <router-link :to="channelRoute" :class="['row', { selected: isSelected }]">
    <n-avatar round>{{ channel.iconChar }}</n-avatar>
    <div>
      <div class="text">{{ channel.name }}</div>
      <div class="footer">{{ channel.footer }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Channel } from 'studo.js';
import { computed, defineComponent } from 'vue';
import { channelIdRef } from '../store';

export default defineComponent({
  name: 'ChannelRow',
  props: {
    channel: {
      type: Channel,
      required: true,
    },
  },
  setup(props) {
    const isSelected = computed(() => channelIdRef.value === props.channel.id);
    const channelRoute = computed(() => ({
      name: 'channel',
      params: {
        channelId: props.channel.id,
      },
    }));

    return { isSelected, channelRoute };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/vars.scss";

.row {
  --bezier: cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin: 8px 14px 0px 8px;
  padding: 4px 4px 4px 0px;
  color: inherit;
  font-size: 14px;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 0.3s var(--bezier), opacity 0.3s var(--bezier),
    background 0.3s var(--bezier);

  &:hover {
    background: #101014;

    .text {
      color: #63e2b7;
    }
  }
  &.selected {
    background: rgba(99, 226, 183, 0.2);
    color: #63e2b7;
  }
}

.footer {
  font-size: 0.8em;
  color: #b1b1b1;
}

.n-avatar {
  flex-shrink: 0;
  margin: 0px 8px;
}
</style>