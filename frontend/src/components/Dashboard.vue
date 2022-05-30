<template>
  <div
    class="row justify-content-center bg-white border-gray-200 dark:bg-gray-600"
  >
    <div class="col-md-8">
      <div v-if="isLoggedIn">
        <div
          class="relative bg-gray-200 dark:bg-gray-500 px-6 pt-10 pb-8 m-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
        >
          <input v-model="message" @keyup.enter="submit" />
          <button @click.prevent="submit">Submit</button>
        </div>
        <p
          v-for="p in posts"
          :key="p.id"
          class="relative bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 px-6 pt-10 pb-8 mb-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
        >
          {{ p.message }} {{ date(p.date._seconds) }}
        </p>
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
    async submit() {
      store.dispatch('postMessage', this.message);
      this.message = null;
    },
  },
};
</script>
