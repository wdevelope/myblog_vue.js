import { createApp } from 'vue';
import App from './App.vue';

// Vue Router import
import router from './router';

// element plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// global css
import '@/styles/main.css';

const app = createApp(App);

app.use(ElementPlus);
app.use(router);

app.mount('#app');
