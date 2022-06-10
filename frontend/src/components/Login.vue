<template>
  <div>
    <div class="grid md:place-items-center">
      <div>
        <h1 class="text-6xl text-center mt-12 md:mt-32 mb-4 md:mb-2">
          <span class="text-gray-700 dark:text-gray-100">
            <span class="font-bold">{{ appName }}</span>
          </span>
        </h1>
        <div
          class="bg-gray-200 dark:bg-gray-500 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 md:rounded-lg"
        >
          <form>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Your email</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <Email />
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  value
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="me@email.com"
                  required
                  autofocus
                />
              </div>
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Your password</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <Password />
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  value
                  type="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div
              class="flex flex-wrap place-items-center sm:place-items-stretch"
            >
              <button
                type="submit"
                :disabled="!form.email || !form.password"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                @click.prevent="submit"
              >
                Login
              </button>
              <div class="mb-2 sm:mx-auto md:mx-16"></div>
              <div class="mt-2 mx-auto sm:mx-0">
                <a
                  class="text-gray-700 dark:text-gray-300 align-bottom"
                  href="#"
                  @click.prevent="forgotPassword"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from '../auth';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import Email from './misc/icons/Email.vue';
import Password from './misc/icons/Password.vue';

export default {
  components: {
    Email,
    Password,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
    };
  },
  computed: {
    appName: () => process.env.VUE_APP_NAME,
  },
  methods: {
    submit() {
      signInWithEmailAndPassword(getAuth(), this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: 'Dashboard' });
        })
        .catch((err) => {
          this.$root.$toast.error(err.message);
          console.log(err);
        });
    },
    async forgotPassword() {
      try {
        await sendPasswordResetEmail(getAuth(), this.form.email);
      } catch {
        // empty
      } finally {
        this.$root.$toast.success(
          'An email has been sent to your email address with instructions to reset your password.',
        );
      }
    },
  },
};
</script>
