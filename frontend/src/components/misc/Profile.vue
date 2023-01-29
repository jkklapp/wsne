<template>
  <div>Name: {{ user.displayName || '?' }}</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    user: 'user',
  }),
};
</script>
