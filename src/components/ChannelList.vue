<template>
  <ChannelRow v-for="channel in channels" :key="channel.id" :channel="channel" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { channelIdRef, channelsRef } from '../store';
import ChannelRow from "@/components/ChannelRow.vue";

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