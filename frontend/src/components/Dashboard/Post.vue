<template>
  <div>
    <div class="flex flex-wrap">
      <div class="mr-auto">
        <small class="text-gray-500 dark:text-gray-400"
          >{{ userName }} · {{ formatDate(date) }}
          <span v-show="likes > 0"
            >· {{ likes }} like<span v-show="likes > 1">s</span></span
          ></small
        >
      </div>
      <div v-if="!id && isPosting" class="xs:w-90 w-100 place-items-center">
        <div class="lds-ring-small align-text-top">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div>
      <span class="message">{{ message }}</span>
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
        class="mb-[5px]"
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
      <div
        v-show="likingPost == id"
        class="mb-[5px] lds-ring-small align-text-bottom"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import LightBulb from '../misc/icons/LightBulb';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  components: {
    LightBulb,
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
