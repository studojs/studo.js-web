import { computed } from '@vue/runtime-core';
import { Channel, Client, Message, RestManager, Topic } from 'studo.js';
import { reactive } from 'vue';
import router from '../router/index';

RestManager.proxyURL = `${location.origin}/api/proxy`;
const sessionToken = localStorage.sessionToken;
export const client = new Client(sessionToken);

client.on('channelUpdate', (channel) => {
  store.channels.set(channel.id, channel);
});
client.chat.on('updateChannels', () => {
  store.sortChannels();
});
client.on('topicUpdate', (topic) => {
  store.topics.set(topic.id, topic);
});
client.on('messageUpdate', (message) => {
  store.messages.set(message.id, message);
});

export const channelIdRef = computed(() => {
  const route = router.currentRoute.value;
  return route.params.channelId as string;
});

export const topicIdRef = computed(() => {
  const route = router.currentRoute.value;
  return route.params.topicId as string;
});

export const store = reactive({
  channels: new Map<string, Channel>(),
  topics: new Map<string, Topic>(),
  messages: new Map<string, Message>(),
  sortChannels() {
    this.channels = new Map(
      [...client.channels.entries()].sort(
        ([, a], [, b]) =>
          b.sortScore - a.sortScore || a.name.localeCompare(b.name)
      )
    );
  },
  async loadTopics(channelId = channelIdRef.value) {
    if (!channelId) return;
    await client.channels.subscribe(channelId);
    const tab = await client.once('tabUpdate');
    await tab.subscribe();
    this.topics.clear();
  },
});

Object.assign(window, { store, client });
