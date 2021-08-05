import { Channel, Client, RestManager, Topic } from 'studo.js';
import { reactive } from 'vue';

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

export const store = reactive({
  channels: new Map<string, Channel>(),
  topics: new Map<string, Topic>(),
  channelId: '',
  tabId: '',
  sortChannels() {
    this.channels = new Map(
      [...client.channels.entries()].sort(
        ([, a], [, b]) =>
          b.sortScore - a.sortScore || a.name.localeCompare(b.name)
      )
    );
  },
  async loadTopics() {
    this.topics.clear();
    if (!this.channelId) return;
    await client.channels.subscribe(this.channelId);
    const tab = await client.once('tabUpdate');
    await tab.subscribe();
  },
});

Object.assign(window, { store });
Object.assign(window, { client });
