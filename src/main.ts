import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/element-plus.scss';

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
