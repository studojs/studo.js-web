<template>
  <h2 :class="{ pinned: channel.pinned }">
    {{ channel.name }}
  </h2>
</template>

<script type="ts">
import { Channel } from 'studo.js';

export default {
  name: 'ChannelRow',
  props: {
    channel: {
      type: Channel,
      required: true,
    },
  },
};
</script>

<style scoped>
.pinned {
  color: hsl(0, 75%, 50%);
}
</style>