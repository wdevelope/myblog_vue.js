import { createApp } from 'vue';
import App from './App.vue';

// Vue Router import
import router from './router';

// element plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// global css
import '@/styles/main.css';

// vues store import
import store from './store';

// Element Plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(store);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
