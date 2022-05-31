<template>
  <div
    class="h-screen row justify-content-center bg-white border-gray-200 dark:bg-gray-600"
  >
    <NavBar v-if="showNavBar" />
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import NavBar from './components/NavBar';
export default {
  components: {
    NavBar,
  },
  computed: {
    showNavBar() {
      return this.$route.name !== 'Login' && this.$route.name !== 'Register';
    },
  },
};
</script>
