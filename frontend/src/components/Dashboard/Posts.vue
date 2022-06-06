<template>
  <div>
    <div v-if="!isLoading">
      <div
        v-for="p in posts"
        :key="p.id"
        class="bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 px-4 pt-2 pb-2 mb-2 shadow-xl ring-1 ring-gray-900/5 max-w-sm mx-2 md:max-w-lg sm:mx-auto sm:rounded-lg"
      >
        <div class="flex flex-wrap">
          <div>
            <small
              >{{ p.userName }} · {{ date(p.date) }} ·
              {{ p.likes }} likes</small
            >
          </div>
          <div
            v-if="!p.id && isPosting"
            class="w-90 md:w-100 place-items-center"
          >
            <div class="lds-ring-small align-text-top">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div>
          <span>{{ p.message }}</span>
        </div>
        <div class="flex flex-wrap place-items-end">
          <div class="w-100 mr-auto"></div>
          <a
            v-show="likingPost != p.id"
            href="#"
            @click.prevent="() => toggleLike(!p.likedByMe, p)"
            ><LightBulb
              :on="p.likedByMe"
              :class-names="
                p.likedByMe
                  ? 'fill-blue-700 dark:fill-gray-200 w-3 h-3'
                  : 'fill-gray-300 dark:fill-gray-400 w-3 h-3'
              "
          /></a>
          <div
            v-show="likingPost == p.id"
            class="lds-ring-small align-text-bottom"
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="grid flex-wrap place-items-center">
        <button
          v-if="renderLoadMoreButton"
          class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
          @click="fetchPosts"
        >
          Load more
        </button>
        <button
          v-if="renderBackToTopButton"
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
import moment from 'moment';
import LightBulb from '../misc/icons/LightBulb';

export default {
  components: {
    LightBulb,
  },
  computed: {
    ...mapGetters({
      posts: 'getPosts',
      renderBackToTopButton: 'shouldRenderBackToTopButton',
      renderLoadMoreButton: 'shouldRenderLoadMoreButton',
      isLoading: 'isLoadingPosts',
      isPosting: 'isCreatingPost',
      likingPost: 'getLikingPost',
    }),
  },
  methods: {
    date(date) {
      return moment(date).fromNow();
    },
    fetchPosts() {
      this.$store.dispatch('fetchPosts', this.$store.state);
    },
    reset() {
      this.$store.dispatch('resetPostsPagination');
      this.fetchPosts();
    },
    toggleLike(like, post) {
      this.$store.dispatch('toggleLike', { post, like });
    },
  },
};
</script>
