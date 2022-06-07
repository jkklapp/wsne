<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
    <div class="flex items-start">
      <router-link
        to="/"
        class="text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
      >
        {{ appName }}
      </router-link>
      <router-link
        to="/about"
        class="text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
      >
        About
      </router-link>
      <div class="mx-auto w-100"></div>
      <div class="flex items-end md:order-2">
        <router-link
          v-show="!isLoggedIn && $route.path !== '/login'"
          to="login"
          class="text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center mr-2"
        >
          Login</router-link
        >
        <router-link
          v-show="!isLoggedIn && $route.path === '/login'"
          to="register"
          class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center mr-2"
        >
          Register</router-link
        >
        <UserMenu v-show="isLoggedIn" />
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';

export default {
  components: {
    UserMenu,
    ThemeToggle,
  },
  computed: {
    appName: () => process.env.VUE_APP_NAME,
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
};
</script>
