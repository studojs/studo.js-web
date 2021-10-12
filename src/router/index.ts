import Chat from '@/views/Chat.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useChatStore, useClientStore } from '../store';

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
  const chat = useChatStore();
  const client = useClientStore().client;
  if (to.name !== 'chat') return;

  const channel = chat.channel;
  document.title = (channel ? channel.name + ' - ' : '') + 'studo.js';

  // FIXME: login route
  // if (to.name === 'chat' && !sessionTokenRef.value)
  //   return next({ name: 'login' });
  console.log(to.query);
  if (!client.connected) await client.once('ready');

  if (from.query.tab !== to.query.tab && typeof to.query.tab === 'string') {
    console.log('sub tab', to.query.tab);

    await chat.subscribeTab(to.query.tab);
  }

  if (
    from.query.channel !== to.query.channel &&
    typeof to.query.channel === 'string'
  ) {
    console.log('sub channel', to.query.channel);
    const tab = await chat.subscribeChannel(to.query.channel);
    if (!to.query.tab) router.replace({ query: { ...to.query, tab: tab.id } });
  }

  if (
    from.query.topic !== to.query.topic &&
    typeof to.query.topic === 'string'
  ) {
    console.log('sub topic', to.query.topic);
    await chat.subscribeTopic(to.query.topic);
  }
});

export default router;
