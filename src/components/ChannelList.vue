<template>
  <el-scrollbar>
    <el-input
      v-model="channelSearch"
      placeholder="Search Channel"
      prefix-icon="el-icon-search"
      :clearable="true"
    />
    <el-divider />
    <el-empty v-if="!hasChannels" description="No Channels" />
    <ChannelRow
      v-for="channel in filteredChannels"
      :key="channel.id"
      :channel="channel"
      @click="selectChannel(channel)"
    >
    </ChannelRow>
  </el-scrollbar>
</template>

<script lang="ts">
import { Channel } from 'studo.js';
import { computed, onMounted, ref } from 'vue';
import { client } from '../client';
import ChannelRow from '@/components/ChannelRow.vue';
import { ElMessage } from 'element-plus';

export default {
  name: 'ChannelList',
  components: {
    ChannelRow,
  },
  emits: ['update:selected'],
  props: {
    selected: String,
  },
  setup(props, ctx) {
    const selectedChannel = ref<Channel | undefined>();
    const channelSearch = ref('');
    const channels = ref(new Map<string, Channel>());
    const hasChannels = computed(() => channels.value.size > 0);

    onMounted(() => {
      channels.value = client.channels.cache;
      sortChannels();
    });

    const filteredChannels = computed(() => {
      return [...channels.value.values()].filter(
        (channel) =>
          !channel.hidden &&
          channel.name.toLowerCase().includes(channelSearch.value.toLowerCase())
      );
    });

    function sortChannels() {
      channels.value = new Map(
        [...client.channels.cache.entries()].sort(
          ([, a], [, b]) =>
            b.sortScore - a.sortScore || a.name.localeCompare(b.name)
        )
      );
    }

    function selectChannel(channel: Channel) {
      selectedChannel.value = channel;
      ctx.emit('update:selected', channel.id);
    }

    client.chat.on('updateChannels', () => sortChannels());
    client.on('channelUpdate', (channel) => {
      channels.value.set(channel.id, channel);
    });

    client.connect().catch((error) => {
      ElMessage({
        message: error.message,
        type: 'error',
        showClose: true,
      });
    });

    return { filteredChannels, channelSearch, selectChannel, hasChannels };
  },
};
</script>

<style lang="scss" scoped>
.el-divider {
  margin: 8px 0;
}
</style>