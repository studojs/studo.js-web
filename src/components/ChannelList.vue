<template>
  <ChannelRow
    v-for="[id, channel] in chat.channels"
    :key="id"
    :channel="channel"
  />
</template>

<script lang="ts" setup>
import { useChatStore } from '../store';

const chat = useChatStore();
</script>

<style lang="scss" scoped></style>
