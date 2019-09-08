<template lang="pug">
  section.article-wrapper
    nuxt
    Footer
</template>

<script>
import Footer from '~/components/Footer.vue'

export default {
  name: 'ArticleLayout',
  components: {
    Footer
  }
}
</script>

<style lang="stylus">
.article-wrapper
  margin 0 auto
  display flex
  min-height 100vh
  flex-direction column
  .article
    flex 1 0 auto
</style>
