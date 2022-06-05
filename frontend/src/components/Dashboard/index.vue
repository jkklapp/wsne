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
import { getAuth } from '../../auth';

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
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('setUser', user);
        this.$store.dispatch('fetchPosts', this.$store.state);
      } else {
        if (this.$router.currentRoute._value.name === 'Dashboard') {
          this.$router.replace({ name: 'Login' });
        }
      }
    });
  },
};
</script>
