import { createApp } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'flowbite';
import App from './App.vue';
import store from './store';
import router from './router/index';
import './index.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

const firebaseConfig = {
  apiKey: 'AIzaSyDzBNz_bMRHUTxdrhc4LCf4UMzTIyyRB5s',
  authDomain: 'wsne-28b5b.firebaseapp.com',
  projectId: 'wsne-28b5b',
  storageBucket: 'wsne-28b5b.appspot.com',
  messagingSenderId: '612021884642',
  appId: '1:612021884642:web:e1a932d5b80c56b46770bb',
  measurementId: 'G-J8576H162E',
};

firebase.initializeApp(firebaseConfig);

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueToast);
app.mount('#app');
