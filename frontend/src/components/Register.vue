<template>
  <div>
    <div class="grid md:place-items-center">
      <div>
        <h1 class="text-6xl text-center mt-12 mb-4 md:my-2">
          <span class="text-gray-700 dark:text-gray-100">
            <span class="font-bold">{{ appName }}</span>
          </span>
        </h1>
        <div
          class="bg-gray-200 dark:bg-gray-500 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg"
        >
          <form action="#">
            <div class="mb-6">
              <label
                for="website-admin"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Username</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <span
                    class="text-gray-900 text-sm dark:placeholder-gray-400 dark:text-gray-400"
                    >@</span
                  >
                </div>
                <input
                  id="website-admin"
                  v-model="form.name"
                  type="text"
                  value
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Bonnie Green"
                  @blur.prevent="validate('name')"
                />
              </div>
              <span
                v-if="userNameExists"
                class="text-red-700 dark:text-red-300 text-xs"
                >This username already exists</span
              >
            </div>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Your Email</label
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
                  @blur.prevent="validate('email')"
                />
              </div>
              <span
                v-if="userEmailExists"
                class="text-red-700 dark:text-red-300 text-xs"
                >This email already exists</span
              >
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
                  type="password"
                  value
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div class="mb-6">
              <label
                for="repeat-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Repeat password</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <Password />
                </div>
                <input
                  id="repeat-password"
                  v-model="form.confirmPassword"
                  type="password"
                  value
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  v-model="form.acceptTermsAndConditions"
                  type="checkbox"
                  value
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                for="terms"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >I agree with the
                <router-link
                  to="terms"
                  class="text-blue-600 hover:underline dark:text-blue-500"
                  >terms and conditions</router-link
                >
                and our
                <router-link
                  to="privacy-policy"
                  class="text-blue-600 hover:underline dark:text-blue-500"
                  >privacy policy</router-link
                >.</label
              >
            </div>
            <div class="grid place-items-center">
              <button
                type="submit"
                :disabled="formIsDisabled()"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                @click.prevent="submit"
              >
                Register new account
              </button>
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
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import Email from './misc/icons/Email.vue';
import Password from './misc/icons/Password.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Email,
    Password,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTermsAndConditions: false,
      },
      error: null,
      formIsDisabled: () => {
        return (
          this.form.name.length === 0 ||
          this.form.email.length === 0 ||
          this.form.password.length === 0 ||
          this.form.confirmPassword.length === 0 ||
          this.form.acceptTermsAndConditions === false ||
          this.userEmailExists ||
          this.userNameExists
        );
      },
    };
  },
  computed: {
    appName: () => process.env.VUE_APP_NAME,
    ...mapGetters({
      userEmailExists: 'getUserEmailExists',
      userNameExists: 'getUserNameExists',
    }),
  },
  methods: {
    async submit() {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        this.form.email,
        this.form.password,
      );
      await updateProfile(user, {
        displayName: this.form.name,
      });
      this.$router.replace({ name: 'Dashboard' });
      await sendEmailVerification(user);
    },
    async validate(field) {
      if (this.form[field]) {
        this.$store.dispatch('checkExists', { [field]: this.form[field] });
      }
    },
  },
};
</script>
