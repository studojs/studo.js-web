import Calendar from '@/views/Calendar.vue';
import Chat from '@/views/Chat.vue';
import Login from '@/views/Login.vue';
import Settings from '@/views/Settings.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'Chat' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    children: [
      {
        path: ':channelId',
        name: 'Channel',
        component: Chat,
      },
    ],
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
