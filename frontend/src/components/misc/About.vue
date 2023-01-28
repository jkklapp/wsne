<template>
  <div class="grid md:place-items-center">
    <div>
      <h1 class="text-6xl text-center mt-12 md:mt-32 mb-4 md:mb-2">
        <span class="text-gray-700 dark:text-gray-100">
          <span class="font-bold">About</span>
        </span>
      </h1>
      <div
        class="dark:text-white bg-gray-200 dark:bg-gray-500 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 md:rounded-lg md:w-1/2 mx-auto"
      >
        <p>
          What if you could only
          <strong
            >share {{ maxMessagesPerDay }} idea{% if maxMessagesPerDay > 1 %}s{%
            endif %} a day</strong
          >? Would you start typing or rather
          <strong>take a pause and think?</strong>
        </p>
        <br />
        <p>
          {{ appName }} is a micro-blogging site with a focus on
          <strong>self-awareness</strong> and <strong>reflection</strong>.
        </p>
        <br />
        <p>
          Therefore, in {{ appName }}
          <strong
            >only {{ maxMessagesPerDay }} messages can be created a day.</strong
          >
        </p>
        <br />
        <p>
          I created {{ appName }} as a side project to learn
          <strong>Firebase</strong> and <strong>NestJS</strong> in the backend,
          and <strong>VueJS</strong> and <strong>VueX</strong> in the frontend.
          I also use <strong>TailwindCSS</strong> for styling.
        </p>
        <br />
        <p>
          The source code that powers this site is available on
          <a
            target="_blank"
            class="text-blue-600 dark:text-blue-400"
            href="https://github.com/jkklapp/wsne"
            >github</a
          >.
        </p>
        <br />
        <p>
          The
          <router-link class="text-blue-600 dark:text-blue-400" to="terms"
            >terms and conditions</router-link
          >
          and
          <router-link
            class="text-blue-600 dark:text-blue-400"
            to="privacy-policy"
            >privacy policy</router-link
          >
          have been adapted from Twitter's. Please send me an email to
          <a
            class="text-blue-600 dark:text-blue-400"
            href="mailto:{{ supportEmail }}"
            >{{ supportEmail }}</a
          >
          if you have any questions or concerns. I will do my best to address
          them.
        </p>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    appName: () => process.env.VUE_APP_NAME,
    supportEmail: () => process.env.VUE_APP_SUPPORT_EMAIL,
    maxMessagesPerDay: () => process.env.VUE_APP_MAX_MESSAGES_PER_DAY,
  },
};
</script>
