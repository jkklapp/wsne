<template>
  <div
    class="relative bg-white border-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-6 pt-10 pb-8 mb-2 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
  >
    <form>
      <label
        for="default-search"
        class="shadow-xl mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >{{ inputLabel }}</label
      >
      <div class="relative">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="currentColor"
          >
            <path d="M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z" />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        </div>
        <input
          v-model="message"
          :placeholder="[[placeholder]]"
          class="block p-4 pl-10 pr-20 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          maxlength="120"
          @keyup.enter="submit"
        />
        <button
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isInputDisabled"
          @click.prevent="submit"
        >
          {{ inputCtaLabel }}
        </button>
      </div>
      <p>
        <span
          v-if="showWarning"
          class="warning text-xs text-gray-500 dark:text-gray-400"
        >
          {{ message.length }} / 120
        </span>
      </p>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '../../store';

export default {
  data() {
    return {
      message: '',
    };
  },
  computed: {
    inputLabel: () => process.env.VUE_APP_INPUT_LABEL,
    inputCtaLabel: () => process.env.VUE_APP_INPUT_CTA_LABEL,
    placeholder() {
      return `You have ${this.remainingMessages} ${process.env.VUE_APP_MESSAGE_NAME}s left today`;
    },
    isInputDisabled() {
      return (
        this.isPosting ||
        this.remainingMessages === 0 ||
        this.message.length === 0 ||
        this.message.length > 120
      );
    },
    showWarning() {
      return this.message.length > 100;
    },
    ...mapGetters({
      posts: 'getPosts',
      isPosting: 'isCreatingPost',
      remainingMessages: 'getRemainingMessages',
    }),
  },
  methods: {
    async submit() {
      if (this.message && !this.isPosting) {
        try {
          await store.dispatch('postMessage', this.message);
          this.message = '';
        } catch (err) {
          this.$root.$toast.error(err.message);
        }
      }
    },
  },
};
</script>
