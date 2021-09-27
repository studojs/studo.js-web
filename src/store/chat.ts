import { MentionOption } from 'naive-ui';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { Channel, Collection, Message, Tab, Topic } from 'studo.js';
import { markRaw } from 'vue';
import { LocationQueryValue } from 'vue-router';
import router from '../router/index';
import { useClientStore } from './client';

function firstQueryParam(name: string): LocationQueryValue {
  const query = router.currentRoute.value.query[name];
  return Array.isArray(query) ? query[0] : query;
}

const collator = new Intl.Collator();

export const useChatStore = defineStore('chat', {
  state: () => ({
    channels: new Collection<string, Channel>(),
    tabs: new Collection<string, Tab>(),
    topics: new Collection<string, Topic>(),
    messages: new Collection<string, Message>(),
  }),
  getters: {
    channelId: () => firstQueryParam('channel'),
    tabId: () => firstQueryParam('tab'),
    topicId: () => firstQueryParam('topic'),
    messageId: () => firstQueryParam('message'),
    channel(state): Channel | undefined {
      return this.channelId ? state.channels.get(this.channelId) : undefined;
    },
    tab(state): Tab | undefined {
      return this.tabId ? state.tabs.get(this.tabId) : undefined;
    },
    topic(state): Topic | undefined {
      return this.topicId ? state.topics.get(this.topicId) : undefined;
    },
    mentionOptions(): MentionOption[] {
      return Object.keys(this.topic?.users || {}).map((user) => ({
        label: user,
        value: user,
      }));
    },
    isPrivateChannel(): boolean {
      return !!this.channelId?.startsWith('private');
    },
    allowNewTopics(): boolean {
      return !!this.tab?.enableNewTopics;
    },
    allowNewMessages(): boolean {
      return !!this.topic?.allowNewMessages;
    },
    allowFiles(): boolean {
      return !!this.topic?.enableFileUpload;
    },
  },
  actions: {
    registerEvents() {
      const client = useClientStore().client;
      client.on('channelUpdate', (channel) => this.udpateChannel(channel));
      client.on('tabUpdate', (tab) => this.updateTab(tab));
      client.on('topicUpdate', (topic) => this.udpateTopic(topic));
      client.on('messageUpdate', (message) => this.udpateMessage(message));
      client.chat.on('UpdateChannels', () => this.sortChannels());
      client.chat.on('UpdateMessages', () => this.sortMessages());
    },
    async subscribeChannel(channelId: string) {
      const client = useClientStore().client;
      await client.channels.subscribe(channelId);
      const tab = await client.once('tabUpdate');
      return tab;
    },
    async subscribeTab(tabId: string) {
      const client = useClientStore().client;
      const oldTopics = client.tabs.get(tabId)?.topics;
      if (oldTopics) this.topics = oldTopics;
      await client.tabs.subscribe(tabId);
    },
    udpateChannel(channel: Channel) {
      channel.client = markRaw(channel.client);
      if (channel.hidden) this.channels.delete(channel.id);
      else this.channels.set(channel.id, channel);
    },
    updateTab(tab: Tab) {
      tab.client = markRaw(tab.client);
      if (tab.hidden) this.tabs.delete(tab.id);
      else this.tabs.set(tab.id, tab);
    },
    udpateTopic(topic: Topic) {
      topic.client = markRaw(topic.client);
      if (topic.hidden) this.topics.delete(topic.id);
      else this.topics.set(topic.id, topic);
    },
    udpateMessage(message: Message) {
      message.client = markRaw(message.client);
      if (message.hidden) this.messages.delete(message.id);
      this.messages.set(message.id, message);
    },
    sortChannels() {
      // clone workaround due to proxy instance errors
      this.channels = this.channels.clone().sort((a, b) => {
        if ([a, b].every(({ id }) => id.startsWith('course'))) {
          return collator.compare(
            a.name.replace(/^(VO|VU|KU|UE) /, ''),
            b.name.replace(/^(VO|VU|KU|UE) /, '')
          );
        }
        return b.sortScore - a.sortScore || collator.compare(a.name, b.name);
      });
    },
    sortMessages() {
      // clone workaround due to proxy instance errors
      this.messages = this.messages
        .clone()
        .sort((a, b) => b.sortScore - a.sortScore);
    },
  },
});

// HMR (https://pinia.esm.dev/cookbook/hot-module-replacement.html)
import.meta.hot?.accept(acceptHMRUpdate(useChatStore, import.meta.hot));
