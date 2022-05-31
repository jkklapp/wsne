<template>
  <div>
    <p
      v-for="p in posts"
      :key="p.id"
      class="relative bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 px-6 pt-10 pb-8 mb-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
    >
      {{ p.message }} {{ date(p.date._seconds) }}
    </p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  computed: {
    ...mapGetters({
      posts: 'getPosts',
    }),
  },
  methods: {
    date(seconds) {
      return moment.unix(seconds).fromNow();
    },
  },
};
</script>
