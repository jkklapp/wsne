<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
            <div v-if="isLoggedIn" class="alert alert-success" role="alert">
              You are logged in!
            </div>
          </div>
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
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user',
      isLoggedIn: 'isLoggedIn',
    }),
  },
  updated() {
    if (this.isLoggedIn) {
      store.dispatch('fetchPosts');
    }
  },
};
</script>
