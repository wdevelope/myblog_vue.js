import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '../components/views/PageHome.vue';
import PageLogin from '../components/views/PageLogin.vue';
import PageRegister from '../components/views/PageRegister.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: PageHome,
  },
  {
    path: '/login',
    name: 'Login',
    component: PageLogin,
  },
  {
    path: '/register',
    name: 'Register',
    component: PageRegister,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
