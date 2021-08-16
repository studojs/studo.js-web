import { computed } from '@vue/runtime-core';
import {
  Channel,
  Client,
  Collection,
  Message,
  RestManager,
  Topic,
} from 'studo.js';
import { nextTick, reactive } from 'vue';
import router from '../router/index';

RestManager.proxyURL = `${location.origin}/api/proxy`;
const sessionToken = localStorage.sessionToken;
export const client = new Client(sessionToken);

client.on('channelUpdate', (channel) => {
  channelsRef.set(channel.id, channel);
});
client.on('topicUpdate', (topic) => {
  topicsRef.set(topic.id, topic);
});
client.on('messageUpdate', (message) => {
  messagesRef.set(message.id, message);
});

client.chat.on('updateChannels', () => {
  nextTick(() => sortChannels());
});
client.chat.on('updateMessages', () => {
  nextTick(() => sortMessages());
});

export const channelIdRef = computed(() => {
  const route = router.currentRoute.value;
  return route.params.channelId as string;
});

export const topicIdRef = computed(() => {
  const route = router.currentRoute.value;
  return route.params.topicId as string;
});

export const channelsRef = reactive(new Collection<string, Channel>());
export const topicsRef = reactive(new Collection<string, Topic>());
export const messagesRef = reactive(new Collection<string, Message>());
export const isPrivateChannel = computed(() =>
  channelIdRef.value.startsWith('private')
);

export function sortChannels() {
  const clone = channelsRef
    .clone()
    .sort((a, b) => b.sortScore - a.sortScore || a.name.localeCompare(b.name));
  channelsRef.clear();
  for (const [id, channel] of clone.entries()) {
    channelsRef.set(id, channel);
  }
}

export function sortMessages() {
  const clone = messagesRef.clone().sort((a, b) => b.sortScore - a.sortScore);
  messagesRef.clear();
  for (const [id, message] of clone.entries()) {
    messagesRef.set(id, message);
  }
}

export async function loadTopics(channelId = channelIdRef.value) {
  if (!channelId) return;
  await client.channels.subscribe(channelId);
  const tab = await client.once('tabUpdate');
  await tab.subscribe();
  topicsRef.clear();
  messagesRef.clear();

  if (isPrivateChannel.value) {
    const topic = await client.once('topicUpdate');
    router.replace({ params: { topicId: topic.id } });
  }
}

export async function loadMessages(topicId = topicIdRef.value) {
  if (!topicId) return;
  messagesRef.clear();
  await client.topics.subscribe(topicId);
}
