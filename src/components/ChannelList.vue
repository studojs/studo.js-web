<template>
  <el-scrollbar>
    <el-input
      v-model="channelSearch"
      placeholder="Search"
      prefix-icon="el-icon-search"
      :clearable="true"
    />
    <ChannelRow
      v-for="channel in filteredChannels"
      :key="channel.id"
      :channel="channel"
    >
    </ChannelRow>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { channelsRef } from '../store';
import ChannelRow from '@/components/ChannelRow.vue';

export default {
  name: 'ChannelList',
  components: {
    ChannelRow,
  },
  setup() {
    const channelSearch = ref('');
    const filteredChannels = computed(() => {
      return [...channelsRef.values()].filter(
        (channel) =>
          !channel.hidden &&
          channel.name.toLowerCase().includes(channelSearch.value.toLowerCase())
      );
    });

    return {
      filteredChannels,
      channelSearch,
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