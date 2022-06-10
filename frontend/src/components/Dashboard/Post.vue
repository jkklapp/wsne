<template>
  <div
    class="bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-100 px-4 pt-2 pb-2 mb-2 shadow-xl ring-1 ring-gray-900/5 max-w-sm mx-2 md:max-w-lg sm:mx-auto sm:rounded-lg"
  >
    <div class="flex flex-wrap">
      <div class="mr-auto">
        <small class="text-gray-500 dark:text-gray-400"
          >{{ userName }} · {{ formatDate(date) }}
          <span v-show="likes > 0"
            >· {{ likes }} like<span v-show="likes > 1">s</span></span
          ></small
        >
      </div>
      <Loading v-if="!id && isPosting" small class-names="mb-[5px]" />
    </div>
    <div>
      <span
        class="message"
        :class="$store.state.parentId && !parentId ? 'text-3xl' : 'text-md'"
        >{{ message }}</span
      >
    </div>
    <div class="flex flex-wrap place-items-end">
      <div class="w-100 mr-auto"></div>
      <router-link
        v-if="!parentId"
        href="#"
        class="text-gray-500 dark:text-gray-400"
        :to="id"
      >
        <small
          >{{ comments }} comment<span v-show="comments != 1">s</span></small
        >
      </router-link>
      <div class="mr-1"></div>
      <a
        v-show="likingPost != id"
        class="mb-[5px] like"
        href="#"
        @click.prevent="toggleLike"
        ><LightBulb
          :on="likedByMe"
          :class-names="
            likedByMe
              ? 'fill-blue-700 dark:fill-gray-200 w-5 h-5'
              : 'fill-gray-300 dark:fill-gray-400 w-5 h-5'
          "
      /></a>
      <Loading v-show="likingPost == id" small class-names="mb-[5px]" />
    </div>
  </div>
</template>
<script>
import LightBulb from '../misc/icons/LightBulb';
import Loading from '../misc/Loading';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  components: {
    LightBulb,
    Loading,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
    date: {
      type: Number,
      default: null,
    },
    message: {
      type: String,
      default: '',
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      default: '',
    },
    parentId: {
      type: String,
      default: '',
    },
    likedByMe: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      isPosting: 'isCreatingPost',
      likingPost: 'getLikingPost',
    }),
  },
  methods: {
    formatDate(date) {
      return moment(date).fromNow();
    },
    toggleLike() {
      const post = {
        id: this.id,
        parentId: this.parentId,
        date: this.date,
        message: this.message,
        likes: this.likes,
        comments: this.comments,
        likedByMe: this.likedByMe,
        userName: this.userName,
      };
      this.$store.dispatch('toggleLike', { post, like: !this.likedByMe });
    },
  },
};
</script>
