import naive from 'naive-ui';
import 'vfonts/Inter.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as store from './store';

Object.assign(window, { client: store.client, store: { ...store } });

const app = createApp(App);
app.use(router);
app.use(naive);
app.mount('#app');
