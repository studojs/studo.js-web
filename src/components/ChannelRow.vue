<template>
  <Row :target="channel" :route="route" :icon="channel.iconChar">
    <template #header>{{ channel.name }}</template>
    <template #right>
      <n-icon class="pin-icon" v-if="channel.pinned">
        <PinIcon />
      </n-icon>
    </template>
  </Row>
</template>

<script lang="ts" setup>
import { Pin as PinIcon } from '@vicons/carbon';
import { Channel } from 'studo.js';
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';

interface Props {
  channel: Channel;
}
const props = defineProps<Props>();

const route = computed(
  (): RouteLocationRaw => ({
    name: 'chat',
    params: {
      channel: props.channel.id,
      tab: props.channel.tabs.first()?.id || '',
    },
  })
);
</script>

<style lang="scss" scoped>
.pin-icon {
  flex-shrink: 0;
  margin-left: auto;
}
</style>
