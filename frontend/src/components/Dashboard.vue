<template>
  <div
    class="row justify-content-center bg-white border-gray-200 dark:bg-gray-600"
  >
    <div class="col-md-8">
      <div v-if="isLoggedIn">
        <div
          class="relative bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 px-6 pt-10 pb-8 mb-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
        >
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >{{ inputLabel }}</label
            >
            <div class="relative">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                >
                  <path
                    d="M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z"
                  />
                  <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
              </div>
              <input
                v-model="message"
                class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                @keyup.enter="submit"
              />
              <button
                class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click.prevent="submit"
              >
                {{ inputCtaLabel }}
              </button>
            </div>
          </form>
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
    inputLabel: () => process.env.VUE_APP_INPUT_LABEL,
    inputCtaLabel: () => process.env.VUE_APP_INPUT_CTA_LABEL,
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      posts: 'getPosts',
    }),
  },
  mounted() {
    
  },
  methods: {
    date(seconds) {
      return moment.unix(seconds).fromNow();
    },
    async submit() {
      if (this.message) {
        store.dispatch('postMessage', this.message);
      }
      this.message = null;
    },
  },
};
</script>
