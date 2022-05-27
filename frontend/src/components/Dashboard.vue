<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="isLoggedIn" class="card">
          <div class="card-header">Dashboard</div>
          <div>
            <input v-model="message" />
            <button class="btn btn-primary" @click="submit">Submit</button>
          </div>
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
import { getAuth } from '../auth';

export default {
  data() {
    return {
      message: '',
      posts: [],
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      posts: 'getPosts',
    }),
  },
  mounted() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch('setUser', user);
        store.dispatch('fetchPosts');
      }
    });
  },
  methods: {
    async submit() {
      store.dispatch('postMessage', this.message);
    },
  },
};
</script>
