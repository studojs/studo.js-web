import Chat from '@/views/Chat.vue';
import { watch } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useChatStore, useSettingsStore } from '../store';
import { useClientStore } from '../store/client';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'chat' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/chat/:channel?/:tab?/:topic?',
    name: 'chat',
    component: Chat,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (!to.matched.some(({ meta }) => meta.requiresAuth)) {
    return;
  }

  const store = useClientStore();
  const settings = useSettingsStore();

  if (!settings.sessionToken) {
    console.log('requiresAuth: no token');
    return { name: 'login' };
  }

  if (!store.client.connected) {
    console.log('requiresAuth: wait for connect');
    await store.connect();
    console.log('requiresAuth: connected');
  }
});

// Subscribe to changed channel
watch(
  () => router.currentRoute.value.params.channel,
  async (channelId) => {
    if (typeof channelId !== 'string' || !channelId) return;

    const chat = useChatStore();
    const { client } = useClientStore();

    await chat.subscribeChannel(channelId);
    if (router.currentRoute.value.params.tabId) return;

    // Update route to first tab
    const firstTab = await client.once('tabUpdate');
    router.replace({
      params: {
        channel: channelId,
        tab: firstTab.id,
      },
    });
  }
);

// Subscribe to changed tab
watch(
  () => router.currentRoute.value.params.tab,
  async (tabId) => {
    if (!(typeof tabId === 'string' && tabId)) return;
    const { client } = useClientStore();
    useChatStore().subscribeTab(tabId);

    // Update route to first topic
    if (!tabId.startsWith('private')) return;
    const firstTopic = await client.once('topicUpdate');
    router.replace({
      params: {
        ...router.currentRoute.value.params,
        topic: firstTopic.id,
      },
    });
  }
);

// Subscribe to changed topic
watch(
  () => router.currentRoute.value.params.topic,
  (topicId) => {
    if (typeof topicId === 'string' && topicId) {
      useChatStore().subscribeTopic(topicId);
    }
  }
);

router.afterEach((to, from) => {
  if (to.name === 'chat') {
    console.log(from.params, to.params);
  }
  const chat = useChatStore();
  document.title = `${
    chat.channel ? `${chat.channel.toolbarTitle} - ` : ''
  }studo.js`;
});

export default router;
