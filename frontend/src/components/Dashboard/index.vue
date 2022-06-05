<template>
  <div
    class="row justify-content-center bg-white border-gray-200 dark:bg-gray-600"
  >
    <div v-if="isLoggedIn" class="col-md-8">
      <Input />
      <Posts />
    </div>
  </div>
</template>
<script>
import Input from './Input';
import Posts from './Posts';
import { mapGetters } from 'vuex';

export default {
  components: {
    Input,
    Posts,
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login');
    }
  },
};
</script>
