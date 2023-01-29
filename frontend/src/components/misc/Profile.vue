<template>
  <div>
    <div>Name: {{ user.displayName || '?' }}</div>
    <div>Email: {{ user.email || '?' }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    user: 'user',
  }),
};
</script>
