import Chat from '@/views/Chat.vue';
import Login from '@/views/Login.vue';
import Settings from '@/views/Settings.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

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

export default router;
