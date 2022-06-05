<template>
  <div>
    <button
      id="user-menu-button"
      type="button"
      class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-0.5"
      aria-expanded="false"
      data-dropdown-toggle="dropdown"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="w-5 h-5"
        version="1.1"
        viewBox="0 -256 1792 1792"
        fill="currentColor"
      >
        <g transform="matrix(1,0,0,-1,197.42373,1300.6102)">
          <path
            d="M 1408,131 Q 1408,11 1335,-58.5 1262,-128 1141,-128 H 267 Q 146,-128 73,-58.5 0,11 0,131 0,184 3.5,234.5 7,285 17.5,343.5 28,402 44,452 q 16,50 43,97.5 27,47.5 62,81 35,33.5 85.5,53.5 50.5,20 111.5,20 9,0 42,-21.5 33,-21.5 74.5,-48 41.5,-26.5 108,-48 Q 637,565 704,565 q 67,0 133.5,21.5 66.5,21.5 108,48 41.5,26.5 74.5,48 33,21.5 42,21.5 61,0 111.5,-20 50.5,-20 85.5,-53.5 35,-33.5 62,-81 27,-47.5 43,-97.5 16,-50 26.5,-108.5 10.5,-58.5 14,-109 Q 1408,184 1408,131 z m -320,893 Q 1088,865 975.5,752.5 863,640 704,640 545,640 432.5,752.5 320,865 320,1024 320,1183 432.5,1295.5 545,1408 704,1408 863,1408 975.5,1295.5 1088,1183 1088,1024 z"
          />
        </g>
      </svg>
    </button>
    <div
      id="dropdown"
      class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
    >
      <div class="py-3 px-4">
        <span class="block text-sm text-gray-900 dark:text-white">{{
          user.displayName
        }}</span>
        <span
          class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"
          >{{ user.email }}</span
        >
      </div>
      <ul aria-labelledby="dropdown" class="py-1">
        <li
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          @click.prevent="signOut"
        >
          <a
            href="#"
            class="block py-2 pr-4 pl-3 text-white md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAuth } from '../../auth';

export default {
  computed: {
    ...mapGetters({
      user: 'user',
    }),
    appName: () => process.env.VUE_APP_NAME,
  },
  methods: {
    signOut() {
      getAuth()
        .signOut()
        .then(() => {
          this.$store.dispatch('setUser', { displayName: '', email: '' });
          this.$router.replace({
            name: 'Login',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
