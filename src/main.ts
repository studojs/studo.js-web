import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as store from './store';
import './styles/element-plus.scss';

Object.assign(window, { client: store.client, store: { ...store } });
const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
