import Chat from '@/views/Chat.vue';
import Login from '@/views/Login.vue';
import Settings from '@/views/Settings.vue';
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
    component: Login,
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
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !sessionTokenRef.value)
    return next({ name: 'login' });
  if (from.params.channelId !== to.params.channelId) {
    loadTopics(to.params.channelId as string);
  }
  if (from.params.topicId !== to.params.topicId) {
    loadMessages(to.params.topicId as string);
  }
  next();
});

export default router;
