<template>
  <div class="h-screen grid place-items-center">
    <div
      class="w-1/3 relative bg-gray-200 dark:bg-gray-500 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
    >
      <form action="#" @submit.prevent="submit">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your email</label
          >
          <input
            id="email"
            v-model="form.email"
            type="email"
            value
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="me@email.com"
            required
            autofocus
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your password</label
          >
          <input
            id="password"
            v-model="form.password"
            value
            type="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="flex">
          <button
            type="submit"
            :disabled="!form.email || !form.password"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <router-link
            to="register"
            class="ml-auto block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Register
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth } from '../auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
    };
  },
  methods: {
    submit() {
      signInWithEmailAndPassword(getAuth(), this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: 'Dashboard' });
        })
        .catch((err) => {
          this.error = err.message;
          console.log(err);
        });
    },
  },
};
</script>
