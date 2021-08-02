import '@fullcalendar/core/vdom';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import ScrollPanel from 'primevue/scrollpanel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import TabMenu from 'primevue/tabmenu';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });

app.component('Avatar', Avatar);
app.component('Button', Button);
app.component('Panel', Panel);
app.component('InputText', InputText);
app.component('ScrollPanel', ScrollPanel);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('TabMenu', TabMenu);

app.mount('#app');
