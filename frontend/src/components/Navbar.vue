<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        {{ appName }}
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto" />
        <ul class="navbar-nav ml-auto">
          <template v-if="isLoggedIn">
            <div class="nav-item">
              {{ user.displayName }} - {{ user.email }}
            </div>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="signOut">Sign out</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link"> Login </router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">
                Register
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';
import { getAuth } from '../auth';
export default {
  computed: {
    appName: () => process.env.VUE_APP_NAME,
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: 'user',
      isLoggedIn: 'isLoggedIn',
    }),
  },
  methods: {
    signOut() {
      getAuth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: 'Login',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
