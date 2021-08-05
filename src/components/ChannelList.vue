<template>
  <el-scrollbar>
    <el-input
      v-model="channelSearch"
      placeholder="Search"
      prefix-icon="el-icon-search"
      :clearable="true"
    />
    <el-empty v-if="!hasChannels" description="No Channels" />
    <el-radio-group v-model="selectedId">
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
import { computed, onMounted, ref, watch } from 'vue';
import { client, store } from '../store';
import ChannelRow from '@/components/ChannelRow.vue';
import { onBeforeRouteUpdate } from 'vue-router';

export default {
  name: 'ChannelList',
  components: {
    ChannelRow,
  },
  emits: ['click'],
  props: {
    selectedId: String,
  },
  setup(props, ctx) {
    const channelSearch = ref('');
    const hasChannels = computed(() => store.channels.size > 0);
    watch(props, () => ctx.emit('click', props.selectedId));

    const filteredChannels = computed(() => {
      return [...store.channels.values()].filter(
        (channel) =>
          !channel.hidden &&
          channel.name.toLowerCase().includes(channelSearch.value.toLowerCase())
      );
    });

    return {
      filteredChannels,
      channelSearch,
      hasChannels,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-divider {
  margin: 8px 0;
}
</style>