<template lang="pug">
  section.section-article
    Menu(type='search')
    ArticleGrid
</template>

<script>
import ArticleGrid from '~/components/article/ArticlesGrid'
import Menu from '~/components/Menu.vue'

export default {
  name: 'ArticlesPage',
  components: {
    Menu,
    ArticleGrid
  },
  layout: 'articles',
  metaInfo() {
    return {
      title: 'Мой Блог'
    }
  },
  async fetch({ store }) {
    await store.dispatch('articles/getArticles')
  }
}
</script>

<style lang="stylus">
.section-article
  flex 1 0 auto
</style>
