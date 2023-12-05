import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '../components/views/PageHome.vue';
import PageLogin from '../components/views/PageLogin.vue';
import PageRegister from '../components/views/PageRegister.vue';
import PageVisitor from '../components/views/PageVisitor.vue';
import PageVisitorDeatil from '../components/views/PageVisitorDeatil.vue';
import PageVisitorWrite from '../components/views/PageVisitorWrite.vue';
import PageAccount from '../components/views/PageAccount.vue';
import PageAdmin from '../components/views/PageAdmin.vue';

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
  {
    path: '/visitor',
    name: 'visitor',
    component: PageVisitor,
  },
  {
    path: '/visitor/:visitorId',
    name: 'PageVisitorDeatil',
    component: PageVisitorDeatil,
  },
  {
    path: '/visitor/write',
    name: 'PageVisitorWrite',
    component: PageVisitorWrite,
  },
  {
    path: '/account',
    name: 'PageAccount',
    component: PageAccount,
  },
  {
    path: '/admin',
    name: 'PageAdmin',
    component: PageAdmin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
