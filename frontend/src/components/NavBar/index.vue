<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
    <div class="flex flex-wrap items-stretch">
      <router-link
        to="/"
        class="align-center block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
      >
        {{ appName }}
      </router-link>
      <div class="mx-auto w-100"></div>
      <div class="flex items-end md:order-2">
        <UserMenu />
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
      user: 'user',
      isLoggedIn: 'isLoggedIn',
      userInitial: 'userInitial',
    }),
  },
};
</script>
