<template>
  <router-link :to="channelRoute">
    <el-radio :label="channel.id">
      <el-avatar>{{ channel.iconChar }}</el-avatar>
      <div>
        <div class="name">{{ channel.name }}</div>
        <div class="footer">{{ channel.footer }}</div>
      </div>
    </el-radio>
  </router-link>
</template>

<script type="ts">
import { Channel } from 'studo.js';
import { computed } from 'vue';

export default {
  name: 'ChannelRow',
  props: {
    channel: {
      type: Channel,
      required: true,
    },
  },
  setup(props) {
    const channelRoute = computed(() => ({
      name: 'channel',
      params: {
        channelId: props.channel.id,
      },
    }));
    return { channelRoute };
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

a {
  color: initial;
  text-decoration: none;
}

.el-radio {
  display: flex;
  align-items: center;
  margin: 4px 0 0 0 !important;
  padding: 4px;
  border-radius: 8px;

  &:hover:not(.is-checked) {
    background: #161b22;
  }
}

.is-checked {
  background: $--color-primary-dark;

  .name {
    color: $--color-text-primary;
  }

  footer {
    color: $--color-text-regular;
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

.el-divider {
  margin: 5px 0;
}

.el-avatar {
  flex-shrink: 0;
  color: white;
  background: #30363d;
  margin-right: 8px;
}

.name {
  white-space: normal;
}

.footer {
  font-size: 12px;
  color: $--color-text-secondary;
}
</style>