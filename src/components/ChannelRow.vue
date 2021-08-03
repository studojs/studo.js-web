<template>
  <el-button class="btn" @click="subscribe">
    <div class="text-holder">
      {{ channel.iconChar }}
      <div class="p-ml-2 p-text-bold">{{ channel.name }}</div>
      <div class="p-ml-2">{{ channel.footer }}</div>
    </div>
  </el-button>
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
  setup(props) {
    function subscribe() {
      props.channel.subscribe();
    }

    return { subscribe };
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  margin-left: unset;
}

.text-holder {
  width: 100%;
  text-align: left;
}
/* .pinned {
  color: hsl(0, 75%, 50%);
} */
</style>