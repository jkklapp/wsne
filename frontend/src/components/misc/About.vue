<template>
  <div
    class="h-screen row justify-content-center bg-white border-gray-200 dark:bg-gray-600"
  >
    <h1>About</h1>
    <p>
      {{ appName }} is a micro-blogging site with a focus on simplicity and
      clean design.
    </p>
    <p>
      I created {{ appName }} as a side project to learn Firebase, NestJS and
      VueJS.
    </p>
    <p>
      The terms and conditions and privacy policy have been adapted from
      Twitter's. Please contact send me an email to
      <a href="mailto:{{ supportEmail }}">{{ supportEmail }}</a> if you have any
      questions or concerns. I will do my best to address them.
    </p>
    <p>
      The source code that powers this site is on
      <a href="https://github.com/jkklapp/wsne">my github</a> page.
    </p>
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
