<template>
  <div>
    <div v-if="!isLoading">
      <div
        v-for="p in posts"
        :key="p.id"
        class="bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 px-4 pt-2 pb-2 mb-2 shadow-xl ring-1 ring-gray-900/5 max-w-sm mx-2 md:max-w-lg sm:mx-auto sm:rounded-lg"
      >
        <Post
          :id="p.id"
          :user-name="p.userName"
          :date="p.date"
          :message="p.message"
          :likes="p.likes"
          :comments="p.comments"
          :liked-by-me="p.likedByMe"
          :parent-id="p.parentId"
        />
      </div>
      <div
        v-if="
          posts.length == 0 || (posts.length == 1 && !!$route.params.parentId)
        "
        class="mt-4 text-center text-gray-600 dark:text-gray-400"
      >
        No {{ $route.params.parentId ? 'comments' : 'posts' }} yet.
      </div>
      <div class="grid flex-wrap place-items-center">
        <button
          v-if="shouldRenderLoadMoreButton()"
          class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
          @click="() => fetchPosts($route.params.parentId)"
        >
          Load more
        </button>
        <button
          v-if="shouldRenderBackToTopButton()"
          class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
          @click="reset"
        >
          Back to top
        </button>
      </div>
    </div>
    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Post from './Post';

export default {
  components: {
    Post,
  },
  computed: {
    ...mapGetters({
      posts: 'getPosts',
      isLoading: 'isLoadingPosts',
    }),
  },
  created() {
    this.$watch(
      () => this.$route.params,
      ({ parentId }, { parentId: oldParentId }) => {
        if (
          this.$route.name === 'Dashboard' ||
          this.$route.name === 'Comments'
        ) {
          if (parentId !== oldParentId) {
            this.$store.dispatch('resetPostsPagination');
            this.$store.dispatch('resetParentId');
          }
          this.fetchPosts(parentId);
        }
      },
    );
  },
  mounted() {
    const parentId = this.$route.params.parentId;
    this.fetchPosts(parentId);
  },
  methods: {
    shouldRenderLoadMoreButton() {
      const { parentId, startAfter } = this.$store.state;
      if (parentId) {
        const post = this.posts.find((p) => p.id === parentId);
        return post && post.comments > this.posts.length + 1 && startAfter > 0;
      } else {
        return this.posts.length > 0 && startAfter > 0;
      }
    },
    shouldRenderBackToTopButton() {
      const { parentId, startAfter } = this.$store.state;
      if (parentId) {
        const post = this.posts.find((p) => p.id === parentId);
        return post && post.comments > 0 && startAfter === -1;
      } else {
        return startAfter == -1;
      }
    },
    fetchPosts(parentId) {
      this.$store.dispatch('setParentId', parentId);
      this.$store.dispatch('fetchPosts', this.$store.state);
    },
    reset() {
      const { parentId } = this.$store.state;
      this.$store.dispatch('resetPostsPagination');
      if (parentId) {
        this.$store.dispatch('fetchPosts', this.$store.state);
      } else {
        this.fetchPosts();
      }
    },
  },
};
</script>
