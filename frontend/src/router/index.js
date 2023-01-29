import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import Terms from '../components/misc/Terms';
import PrivacyPolicy from '../components/misc/PrivacyPolicy';
import About from '../components/misc/About';
import ResetPassword from '../components/ResetPassword';
import Profile from '../components/misc/Profile';

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
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
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
];

export default createRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  history: createWebHashHistory(),
  routes,
});
