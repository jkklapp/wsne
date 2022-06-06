<template>
  <div
    class="mx-auto px-12 md:px-24 pt-10 pb-8 h-screen row justify-content-center bg-white border-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100"
  >
    <h1 class="text-6xl text-center mt-6 mb-7 md:mt-12 md:mb-14 md:my-2">
      About
    </h1>
    <br />
    <br />
    <p>
      What if you could only <strong>share 10 ideas a day</strong>? Would you
      start typing or rather
      <strong>take a pause and think?</strong>
    </p>
    <br />
    <p>
      {{ appName }} is a micro-blogging site with a focus on
      <strong>self-awareness</strong> and <strong>reflection</strong>.
    </p>
    <br />
    <p>
      I created {{ appName }} as a side project to learn Firebase and NestJS in
      the backend, and VueJS and VueX in the frontend. I also use TailwindCSS
      for styling.
    </p>
    <br />
    <p>
      The terms and conditions and privacy policy have been adapted from
      Twitter's. Please contact send me an email to
      <a href="mailto:{{ supportEmail }}">{{ supportEmail }}</a> if you have any
      questions or concerns. I will do my best to address them.
    </p>
    <br />
    <p>
      The source code that powers this site is on
      <a href="https://github.com/jkklapp/wsne">my github</a> page.
    </p>
    <br />
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
