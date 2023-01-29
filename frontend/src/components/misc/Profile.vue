<template>
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
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    user: 'user',
  }),
};
</script>
