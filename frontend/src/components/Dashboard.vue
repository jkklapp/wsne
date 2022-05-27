<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="isLoggedIn" class="card">
          <div class="card-header">Dashboard</div>
          <form>
            <input v-model="message" />
            <button @click="sendMessage">Submit</button>
          </form>
          <li v-for="p in posts" :key="p.id">
            {{ p.message }}
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '../store';
import firebase from 'firebase/compat/app';

export default {
  computed: {
    ...mapGetters({
      user: 'user',
      isLoggedIn: 'isLoggedIn',
      message: 'message',
      posts: 'getPosts',
    }),
    message: {
      get() {
        return this.message;
      },
      set(value) {
        store.dispatch('setMessage', value);
      },
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch('fetchUser', user);
        store.dispatch('fetchPosts');
      }
    });
  },
  methods: {
    submitMessage() {
      store.dispatch('postMessage', this.message);
    },
  },
};
</script>
