import { MentionOption } from 'naive-ui';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { Channel, Collection, Message, Tab, Topic } from 'studo.js';
import { nextTick } from 'vue';
import router from '../router';
import { useClientStore } from './client';

function firstQueryParam(name: string): string | null {
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

    channel(): Channel | undefined {
      return this.channelId ? this.channels.get(this.channelId) : undefined;
    },
    tab(): Tab | undefined {
      return this.tabId ? this.tabs.get(this.tabId) : undefined;
    },
    topic(): Topic | undefined {
      return this.topicId ? this.topics.get(this.topicId) : undefined;
    },
    visibleChannels(): Collection<string, Channel> {
      return this.channels.filter((channel) => !channel.hidden);
    },
    visibleTopics(): Collection<string, Topic> {
      return this.topics.filter(
        (topic) => !topic.hidden && topic.tabId === this.tabId
      );
    },
    visibleMessages(): Collection<string, Message> {
      return this.messages.filter(
        (msg) => !msg.hidden && msg.topicId === this.topicId
      );
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
      client.chat.on('UpdateChannels', () =>
        nextTick(() => this.sortChannels())
      );
      client.chat.on('UpdateMessages', () =>
        nextTick(() => this.sortMessages())
      );
    },
    async subscribeChannel(id: string) {
      const client = useClientStore().client;
      await client.channels.subscribe(id);
      const tab = await client.once('tabUpdate');
      return tab;
    },
    async subscribeTab(id: string) {
      const client = useClientStore().client;
      // const oldTopics = client.tabs.get(tabId)?.topics;
      // if (oldTopics) this.topics = oldTopics;
      await client.tabs.subscribe(id);
    },
    async subscribeTopic(id: string) {
      const client = useClientStore().client;
      await client.topics.subscribe(id);
    },

    udpateChannel(channel: Channel) {
      this.channels.set(channel.id, channel);
    },
    updateTab(tab: Tab) {
      this.tabs.set(tab.id, tab);
    },
    udpateTopic(topic: Topic) {
      this.topics.set(topic.id, topic);
    },
    udpateMessage(message: Message) {
      this.messages.set(message.id, message);
    },

    sortChannels() {
      // clone workaround due to proxy instance errors
      this.channels = this.channels.clone().sort((a, b) => {
        if (a.id.startsWith('course') && b.id.startsWith('course')) {
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
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot));
}
