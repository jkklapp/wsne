<template>
  <div
    class="row justify-content-center bg-white border-gray-200 dark:bg-gray-600"
  >
    <navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import navbar from './components/Navbar';
export default {
  components: {
    navbar,
  },
};
</script>
