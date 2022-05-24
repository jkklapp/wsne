<template>
  <div>
    <navbar />
    <main class="py-4">
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
