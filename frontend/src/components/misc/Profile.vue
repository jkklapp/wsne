<template>
  <div>
    <div
      class="bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 px-4 pt-2 pb-2 mb-2 shadow-xl ring-1 ring-gray-900/5 max-w-sm mx-2 md:max-w-lg sm:mx-auto sm:rounded-lg"
    >
      <div class="flex flex-wrap">
        <div class="mr-auto">
          <div class="text-gray-500 dark:text-gray-400">
            Name: {{ user.displayName || '?' }}
          </div>
          <div class="text-gray-500 dark:text-gray-400">
            Email: {{ user.email || '?' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getAuth } from '../../auth';

export default {
  computed: mapGetters({
    user: 'user',
  }),
  mounted() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('setUser', user);
      } else {
        if (this.$router.currentRoute._value.name === 'Dashboard') {
          this.$router.replace({ name: 'Login' });
        }
      }
    });
  },
};
</script>
