import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import Terms from '../components/misc/Terms';

const router = createRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});

export default router;
