<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <ChannelRow v-for="channel in channels" :key="channel.id" :channel="channel">
  </ChannelRow>
</template>

<script lang="ts">
import { Channel, Client, RestManager } from 'studo.js';
import HelloWorld from './components/HelloWorld.vue';
import ChannelRow from './components/ChannelRow.vue';

RestManager.proxyURL = `${location.origin}/api/proxy`;

const sessionToken = localStorage.sessionToken;
const client = new Client(sessionToken);
Object.assign(window, { client });

client.api.getLatest().then(console.log);

export default {
  name: 'App',
  components: {
    HelloWorld,
    ChannelRow,
  },
  mounted() {
    client.connect();
    client.chat.on('updateChannels', (rawChannels) => {
      console.log(rawChannels);
      this.channels = Array.from(client.channels.cache.values()).sort(
        (a, b) => b.sortScore - a.sortScore || a.name.localeCompare(b.name)
      );
    });
  },
  data() {
    const channels: Channel[] = [];
    return { channels };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
