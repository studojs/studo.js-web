<template>
  <router-link :to="channelRoute" :class="['row', { selected: isSelected }]">
    <el-avatar>{{ channel.iconChar }}</el-avatar>
    <div>
      <div class="name">{{ channel.name }}</div>
      <div class="footer">{{ channel.footer }}</div>
    </div>
  </router-link>
</template>

<script type="ts">
import { Channel } from 'studo.js';
import { computed } from 'vue';
import { channelIdRef } from '../store';

export default {
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

    return { channelRoute, isSelected };
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.row {
  display: flex;
  align-items: center;
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

.name {
  white-space: normal;
}

.footer {
  font-size: 12px;
  color: $--color-text-secondary;
}

.el-divider {
  margin: 5px 0;
}

.el-avatar {
  flex-shrink: 0;
  color: white;
  background: #30363d;
  margin-right: 8px;
}
</style>