import Chat from '@/views/Chat.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { loadMessages, loadTopics, sessionTokenRef } from '../store/index';

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
    path: '/chat',
    name: 'chat',
    component: Chat,
    children: [
      {
        path: ':channelId',
        name: 'channel',
        component: Chat,
        children: [
          {
            path: ':topicId',
            name: 'topic',
            component: Chat,
          },
        ],
      },
    ],
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

router.beforeEach(async (to, from, next) => {
  if (to.name !== 'login' && !sessionTokenRef.value)
    return next({ name: 'login' });

  next();

  if (from.params.channelId !== to.params.channelId) {
    await loadTopics(to.params.channelId as string);
  }
  if (from.params.topicId !== to.params.topicId) {
    await loadMessages(to.params.topicId as string);
  }
});

export default router;
