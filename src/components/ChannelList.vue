<template>
  <el-scrollbar>
    <el-input
      v-model="channelSearch"
      placeholder="Search"
      prefix-icon="el-icon-search"
      :clearable="true"
    />
    <el-empty v-if="!hasChannels" description="No Channels" />
    <el-radio-group v-model="channelIdRef">
      <ChannelRow
        v-for="channel in filteredChannels"
        :key="channel.id"
        :channel="channel"
      >
      </ChannelRow>
    </el-radio-group>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { channelIdRef, store } from '../store';
import ChannelRow from '@/components/ChannelRow.vue';

export default {
  name: 'ChannelList',
  components: {
    ChannelRow,
  },
  setup() {
    const channelSearch = ref('');
    const hasChannels = computed(() => store.channels.size > 0);

    const filteredChannels = computed(() => {
      return [...store.channels.values()].filter(
        (channel) =>
          !channel.hidden &&
          channel.name.toLowerCase().includes(channelSearch.value.toLowerCase())
      );
    });

    return {
      filteredChannels,
      channelIdRef,
      channelSearch,
      hasChannels,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  margin-bottom: 4px;
}

.el-radio-group {
  width: 100%;
}

.el-divider {
  margin: 8px 0;
}
</style>