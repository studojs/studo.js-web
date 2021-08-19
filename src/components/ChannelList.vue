<template>
  <n-list>
    <ChannelRow v-for="channel in channels" :key="channel.id" :channel="channel" />
  </n-list>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { channelsRef } from '../store';
import ChannelRow from "@/components/ChannelRow.vue";
import { Channel } from 'studo.js';

export default defineComponent({
  name: 'ChannelList',
  components: {
    ChannelRow
  },
  setup() {
    const filteredChannels = computed(() => {
      return [...channelsRef.values()].filter(
        (channel) => !channel.hidden
      );
    });

    return { channels: filteredChannels };
  }
});

</script>

<style lang="scss" scoped>
</style>