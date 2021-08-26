import { darkTheme, useOsTheme } from 'naive-ui';
import {
  Channel,
  Client,
  Collection,
  Message,
  RestManager,
  Topic,
} from 'studo.js';
import { computed, nextTick, reactive, ref } from 'vue';
import enUS from '../locale/enUS';
import router from '../router/index';

RestManager.proxyURL = `${location.origin}/api/proxy`;

const savedTokenRef = ref(localStorage.getItem('sessionToken'));
export const sessionTokenRef = computed({
  get() {
    return savedTokenRef.value;
  },
  set(value: string | null) {
    savedTokenRef.value = value;
    if (value) localStorage.setItem('sessionToken', value);
    else localStorage.removeItem('sessionToken');
  },
});

export const pointsRef = ref(0);

let _client: Client | null = null;
export const clientRef = computed({
  get() {
    return _client;
  },
  async set(client: Client | null) {
    _client?.disconnect();
    _client = client;
    if (!client) return;

    client.on('ready', () => console.log('connected'));
    client.on('disconnect', () => console.log('disconnect'));

    client.on('pointsUpdate', () => {
      pointsRef.value = client.points;
    });
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

    await client.connect();
  },
});
if (savedTokenRef.value) clientRef.value = new Client(savedTokenRef.value);

export const channelIdRef = computed(() => {
  const route = router.currentRoute.value;
  return (route.params.channelId ?? '') as string;
});

export const topicIdRef = computed(() => {
  const route = router.currentRoute.value;
  return (route.params.topicId ?? '') as string;
});

export const channelRef = computed(() => channelsRef.get(channelIdRef.value));
export const topicRef = computed(() => topicsRef.get(topicIdRef.value));
export const tabRef = computed(() => channelRef.value?.tabs.first());

export const channelsRef = reactive(new Collection<string, Channel>());
export const topicsRef = reactive(new Collection<string, Topic>());
export const messagesRef = reactive(new Collection<string, Message>());
export const isPrivateChannel = computed(() =>
  channelIdRef.value.startsWith('private')
);

const collator = new Intl.Collator();

export function sortChannels() {
  // Sort clone workaround due to proxy/ref errors
  const clone = channelsRef
    .clone()
    .sort(
      (a, b) => b.sortScore - a.sortScore || collator.compare(a.name, b.name)
    );
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
  if (!channelId || !_client) return;
  if (!_client.connected) await _client.once('ready');

  _client.topics.clear();
  _client.tabs.clear();
  topicsRef.clear();

  await _client.channels.subscribe(channelId);
  const tab = await _client.once('tabUpdate');
  await tab.subscribe();

  if (isPrivateChannel.value) {
    const topic = await _client.once('topicUpdate');
    router.replace({ params: { topicId: topic.id } });
  }
}

export async function loadMessages(topicId = topicIdRef.value) {
  if (!topicId || !_client) return;
  if (!_client.connected) await _client.once('ready');

  messagesRef.clear();
  _client.messages.clear();
  await _client.topics.subscribe(topicId);
}

export type Theme = 'light' | 'dark' | 'system';
const savedThemeRef = ref((localStorage.getItem('theme') ?? 'system') as Theme);
export const themeNameRef = computed({
  get() {
    return savedThemeRef.value;
  },
  set(value: Theme) {
    savedThemeRef.value = value;
    localStorage.setItem('theme', value);
  },
});
export const themeRef = computed(() => {
  const theme = themeNameRef.value === 'system' ? useOsTheme() : themeNameRef;
  return theme.value === 'dark' ? darkTheme : null;
});

export const currentTabNameRef = computed(() => {
  const route = router.resolve({
    path: '/' + router.currentRoute.value.path.split('/')[1],
  });

  return (route.name as string) || 'chat';
});

export const localeRef = ref(enUS);
