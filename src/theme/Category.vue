<template>
  <div class="columns">
    <div class="column is-one-third"
    v-for="post in posts"
    v-bind:key="post.id">
      <app-post :link="post.link">
        <h3 slot="title" v-html="post.title.rendered">"</h3>
        <span slot="content" v-html="post.excerpt.rendered"></span>
      </app-post>
    </div>
  </div>
</template>

<script>
import Post from './Post.vue'
import { mapGetters } from 'vuex'
const fetchInitialData = (store, route) => {
  let categoryId = 20
  if (route.params.id === 'mobile') {
    categoryId = 21
  }
  return store.dispatch('postsModule/updateCategory', categoryId)
}

export default {
  asyncData (store, route) {
    return fetchInitialData(store, route)
  },
  components: {
    'app-post': Post
  },
  computed: {
    ...mapGetters('postsModule', ['posts'])
  },
  watch: {
    '$route' (to, from) {
      this.loadposts()
    }
  },
  created () {
    this.loadposts()
  },
  methods: {
    loadposts () {
      fetchInitialData(this.$store, this.$route)
    }
  }
}
</script>
