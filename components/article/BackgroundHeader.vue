<template lang="pug">
  .article-header.article-header-raspberry(v-if='component === "raspberry"')
  .article-header.article-header-default(v-else)
</template>

<script>
export default {
  name: 'ArticleHeaderBackground',
  props: {
    component: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
.article-header
  width 100%
  height 15vmax
  background-size cover
  background-repeat no-repeat
  background-position center
  margin 5px auto 0px

.article-header-raspberry
  height 35vmax
  margin-top 0
  background-image url("/img/article-headers/raspberry_background.svg")

.article-header-default
  background-image url("/img/article-headers/workflow.svg")
</style>
