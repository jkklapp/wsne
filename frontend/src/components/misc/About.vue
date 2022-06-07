<template>
  <div class="grid md:place-items-center">
    <div>
      <h1 class="text-6xl text-center mt-12 mb-4 md:my-2">
        <span class="text-gray-700 dark:text-gray-100">
          <span class="font-bold">About</span>
        </span>
      </h1>
      <div
        class="dark:text-white bg-gray-200 dark:bg-gray-500 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 md:rounded-lg"
      >
        <br />
        <br />
        <p>
          What if you could only <strong>share 10 ideas a day</strong>? Would
          you start typing or rather
          <strong>take a pause and think?</strong>
        </p>
        <br />
        <p>
          {{ appName }} is a micro-blogging site with a focus on
          <strong>self-awareness</strong> and <strong>reflection</strong>.
        </p>
        <br />
        <p>
          I created {{ appName }} as a side project to learn Firebase and NestJS
          in the backend, and VueJS and VueX in the frontend. I also use
          TailwindCSS for styling.
        </p>
        <br />
        <p>
          The terms and conditions and privacy policy have been adapted from
          Twitter's. Please contact send me an email to
          <a href="mailto:{{ supportEmail }}">{{ supportEmail }}</a> if you have
          any questions or concerns. I will do my best to address them.
        </p>
        <br />
        <p>
          The source code that powers this site is on
          <a href="https://github.com/jkklapp/wsne">my github</a> page.
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
  },
};
</script>
