import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import Terms from '../components/misc/Terms';
import PrivacyPolicy from '../components/misc/PrivacyPolicy';
import About from '../components/misc/About';

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
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/:parentId',
      name: 'Comments',
      component: Dashboard,
      props: true,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});

export default router;
