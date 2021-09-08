import naive from 'naive-ui';
import { RestManager } from 'studo.js';
import 'vfonts/Inter.css';
import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';
import router from './router';
import * as store from './store';

Object.assign(window, {
  client: store.clientRef.value,
  store: { ...store },
  api: RestManager,
  router,
});

const app = createApp(App);
app.use(router);
app.use(naive);
app.use(i18n);
app.mount('#app');
