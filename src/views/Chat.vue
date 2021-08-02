<template>
  <Splitter>
    <SplitterPanel :size="25">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText placeholder="Search" />
      </span>
      <ul class="channel-list">
        <li v-for="channel in channels" :key="channel.id">
          <ChannelRow :channel="channel"> </ChannelRow>
        </li>
      </ul>
    </SplitterPanel>

    <SplitterPanel :size="75">.</SplitterPanel>
  </Splitter>
</template>

<script lang="ts">
import { Channel } from 'studo.js';
import { reactive } from 'vue';
import { client } from '../client';
import ChannelRow from '@/components/ChannelRow.vue';

export default {
  name: 'Chat',
  components: {
    ChannelRow,
  },
  setup() {
    const channels: Channel[] = reactive([]);
    client.connect();
    client.on('channelCreate', (channel) => {
      if (channel.hidden) return;
      console.log(channel);
      channels.push(channel);
      sortChannels(channels);
    });
    client.on('channelUpdate', (channel) => {
      channels[channels.findIndex((c) => c.id === channel.id)] = channel;
      sortChannels(channels);
    });

    return { channels };
  },
};

function sortChannels(channels: Channel[]) {
  channels.sort(
    (a, b) => b.sortScore - a.sortScore || a.name.localeCompare(b.name)
  );
}
</script>

<style lang="scss" scoped>
.p-input-icon-left {
  width: 100%;
}

.channel-list {
  padding-left: 0px;
  list-style-type: none;
}

::v-deep(.p-inputtext) {
  width: 100%;
}
</style>