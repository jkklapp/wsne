<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="isLoggedIn" class="card">
          <div class="card-header">Dashboard</div>
          <input v-model="message" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '../store';

export default {
  computed: {
    ...mapGetters({
      user: 'user',
      isLoggedIn: 'isLoggedIn',
      message: 'message',
    }),
    message: {
      get() {
        return this.message;
      },
      set(value) {
        store.dispatch('setMessage', value);
      },
    },
  },
  updated() {
    if (this.isLoggedIn) {
      store.dispatch('fetchPosts');
    }
  },
};
</script>
