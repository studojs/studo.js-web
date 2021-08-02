<template>
  <Button type="button" class="p-button-outlined">
    <Avatar :label="channel.iconChar" shape="circle"></Avatar>
    <div class="text-holder">
      <div class="p-ml-2 p-text-bold">{{ channel.name }}</div>
      <div class="p-ml-2">{{ channel.footer }}</div>
    </div>
  </Button>
  <!-- <Panel :header="channel.name" :toggleable="false">
    {{ channel.footer }} -->

  <!-- <h3 @click="subscribe" :class="{ pinned: channel.pinned }">
      {{ channel.iconChar }} {{ channel.name }}
    </h3>
    <p>
      {{ channel.footer }}
    </p> -->
  <!-- </Panel> -->
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
  methods: {
    subscribe() {
      this.channel.subscribe();
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  column-gap: 1rem;
}

.text-holder {
  width: 100%;
  text-align: left;
}
/* .pinned {
  color: hsl(0, 75%, 50%);
} */
</style>