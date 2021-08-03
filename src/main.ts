import ElementPlus, {
  ElButton,
  ElCalendar,
  ElDivider,
  ElEmpty,
  ElScrollbar,
  ElSelect,
} from 'element-plus';
import { createApp } from 'vue';
import App from './App.vue';
import './element-plus.scss';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

const components = [
  ElButton,
  ElCalendar,
  ElDivider,
  ElEmpty,
  ElScrollbar,
  ElSelect,
];

for (const component of components) {
  app.component(component.name, component);
}

app.mount('#app');
