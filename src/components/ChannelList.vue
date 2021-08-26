<template>
  <ChannelRow
    v-for="channel in channels"
    :key="channel.id"
    :channel="channel"
  />
</template>

<script lang="ts" setup>
import ChannelRow from '@/components/ChannelRow.vue';
import { computed } from 'vue';
import { channelsRef } from '../store';

const channels = computed(() => {
  return [...channelsRef.values()].filter((channel) => !channel.hidden);
});
</script>

<style lang="scss" scoped></style>
