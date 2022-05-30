<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="isLoggedIn" class="card">
          <div class="card-header">Dashboard</div>
          <form
            action="#"
            class="relative bg-white px-6 pt-10 pb-8 mb-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
            @submit.prevent="submit"
          >
            <input v-model="message" />
            <input type="submit" />
          </form>
          <p
            v-for="p in posts"
            :key="p.id"
            class="relative bg-white px-6 pt-10 pb-8 mb-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
          >
            {{ p.message }} {{ date(p.date._seconds) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '../store';
import { getAuth } from '../auth';
import moment from 'moment';

export default {
  data() {
    return {
      message: '',
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
    date(seconds) {
      return moment.unix(seconds).fromNow();
    },
    async submit(e) {
      console.log(e);
      if (e.keyCode == 13) {
        store.dispatch('postMessage', this.message);
        this.message = null;
      }
    },
  },
};
</script>
