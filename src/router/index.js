import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import firebase from 'firebase/app';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/Register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main', auth: true },
    component: Home,
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/DetailRecord.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/Planning',
    name: 'planning',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/Profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/Record',
    name: 'record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Record.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currrentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);
  if (requireAuth && !currrentUser) {
    next('/login?message=login');
  } else {
    next();
  }
});

export default router;
