<template>
  <div>
    <p
      v-for="p in posts"
      :key="p.id"
      class="relative bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 px-6 pt-10 pb-8 mb-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
    >
      {{ p.message }} {{ date(p.date) }}
    </p>
    <div class="grid flex-wrap place-items-center">
      <button
        v-if="renderLoadMoreButton"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
        @click="fetchPosts"
      >
        Load more
      </button>
      <button
        v-if="renderBackToTopButton"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
        @click="reset"
      >
        Back to top
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  computed: {
    ...mapGetters({
      posts: 'getPosts',
      renderBackToTopButton: 'getRenderBackToTopButton',
      renderLoadMoreButton: 'getRenderLoadMoreButton',
    }),
  },
  methods: {
    date(seconds) {
      return moment.unix(seconds).fromNow();
    },
    fetchPosts() {
      this.$store.dispatch('fetchPosts', this.$store.state);
    },
    reset() {
      this.$store.dispatch('resetPostsPagination');
      this.fetchPosts();
    },
  },
};
</script>
