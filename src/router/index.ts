import Chat from '@/views/Chat.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useChatStore } from '../store';
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
    // query params: channel, tab, topic, message
    path: '/chat',
    name: 'chat',
    component: Chat,
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

router.afterEach(async (to, from) => {
  if (to.name !== 'chat') return;

  const chat = useChatStore();
  const { client } = useClientStore();
  if (!client.connected) await client.once('ready');
  console.log(to.query);

  // Channel changed -> subscribe
  if (
    from.query.channel !== to.query.channel &&
    typeof to.query.channel === 'string'
  ) {
    const firstTab = await chat.subscribeChannel(to.query.channel);
    to.query.tab = firstTab.id;
  }

  document.title = `${
    chat.channel ? `${chat.channel.toolbarTitle} - ` : ''
  }studo.js`;

  // Tab changed -> subscribe
  if (from.query.tab !== to.query.tab && typeof to.query.tab === 'string') {
    await chat.subscribeTab(to.query.tab);
  }

  // Topic changed -> subscribe
  if (
    from.query.topic !== to.query.topic &&
    typeof to.query.topic === 'string'
  ) {
    await chat.subscribeTopic(to.query.topic);
  }
});

export default router;
