import { createApp } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import App from './App.vue';
import store from './store';
import router from './routes/index';

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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('fetchUser', user);
  }
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
