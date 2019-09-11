<template lang="pug">
  .articles.wrapper
    transition-group(tag='div' name='list')
      ArticleBlock(
        v-for='(article, i) in articles'
        :style='`transform: translateY(${getPositionValueFromString(minBlockSize, i)});`'
        :key='article.title'
        :article='article'
      )
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleBlock from '~/components/ArticleBlock.vue'

export default {
  name: 'ArticlesGrid',
  components: {
    ArticleBlock
  },
  data() {
    return {
      minBlockSize: '0'
    }
  },
  computed: {
    ...mapGetters(['getCSSVariable']),
    ...mapGetters('articles', {
      articles: 'getArticles'
    })
  },
  mounted() {
    this.minBlockSize = this.getPositionValueFromString(
      this.getCSSVariable('--size-article-block'),
      0.5
    )
    this.generateGrid()
  },
  methods: {
    getPositionValueFromString(size, multiplier) {
      const number = parseInt(size)
      const measure = size.trim().slice(('' + number).length)
      console.log('UPDATED', '' + number, size, measure, ('' + number).length)

      return number * multiplier + measure
    },
    generateGrid() {
      // console.log(this.articles, 'FROM GENERATE')
    }
  }
}
</script>

<style lang="stylus">
.articles
  margin 10px auto
</style>
