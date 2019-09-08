<template lang="pug">
  .articles-container
    nuxt
    Footer
</template>

<script>
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>

<style lang="stylus">
.articles-container
  margin 0 auto
  display flex
  min-height 100vh
  flex-direction column
</style>
