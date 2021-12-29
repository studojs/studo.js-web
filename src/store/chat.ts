import { MentionOption } from 'naive-ui';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { Channel, Collection, Message, Tab, Topic } from 'studo.js';
import router from '../router';
import { useClientStore } from './client';

function firstParam(name: string): string {
  const param = router.currentRoute.value.params[name];
  return Array.isArray(param) ? param[0] : param;
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    channelId: firstParam('channel'),
    tabId: firstParam('tab'),
    topicId: firstParam('topic'),
  }),
  getters: {
    cache: () => useClientStore().client.cache,

    channel(): Channel | undefined {
      return this.channelId
        ? this.cache.channels.get(this.channelId)
        : undefined;
    },
    tab(): Tab | undefined {
      return this.tabId ? this.cache.tabs.get(this.tabId) : undefined;
    },
    topic(): Topic | undefined {
      return this.topicId ? this.cache.topics.get(this.topicId) : undefined;
    },
    visibleChannels(): Collection<Channel> {
      return this.cache.channels.filter((channel) => !channel.hidden);
    },
    visibleTopics(): Collection<Topic> {
      return this.cache.topics.filter(
        (topic) => !topic.hidden && topic.tabId === this.tabId
      );
    },
    visibleMessages(): Collection<Message> {
      return this.cache.messages.filter(
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
    async subscribeChannel(id: string) {
      console.log('subscribe channel', id);
      const { client } = useClientStore();
      // Get rid of old cache
      client.cache.tabs.clear();
      client.cache.topics.clear();
      client.cache.messages.clear();

      this.channelId = id;
      await client.chat.subscribeChannel(id);
    },
    async subscribeTab(id: string) {
      console.log('subscribe tab', id);
      const { client } = useClientStore();
      // Get rid of old cache
      client.cache.topics.clear();
      client.cache.messages.clear();

      this.tabId = id;
      await client.chat.subscribeTab(id);
    },
    async subscribeTopic(id: string) {
      console.log('subscribe topic', id);
      const { client } = useClientStore();
      // Get rid of old cache
      client.cache.messages.clear();

      this.topicId = id;
      await client.chat.subscribeTopic(id);
    },
  },
});

// HMR (https://pinia.esm.dev/cookbook/hot-module-replacement.html)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot));
}
