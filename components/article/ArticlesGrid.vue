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
      minBlockSize: '0',
      amountColumns: 0
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

    this.amountColumns =
      parseInt(this.getCSSVariable('--amount-article-blocks')) * 2

    this.generateGrid()
  },
  methods: {
    getPositionValueFromString(size, multiplier) {
      const number = parseInt(size)
      const measure = size.trim().slice(('' + number).length)

      return number * multiplier + measure
    },
    generateGrid() {
      const articles = this.articles
      const gridObject = {}

      Array.from(Array(this.amountColumns)).forEach((item, index) => {
        gridObject['column_' + (index + 1)] = []
      })

      articles.forEach((article, index) => {
        this.putBlockInGrid(gridObject, article)
      })

      console.log(gridObject)
      // console.log(this.articles, 'FROM GENERATE')
    },
    putBlockInGrid(grid, article) {
      const size = article.size
      const rows = Object.keys(grid).filter((key) => {
        return key.includes('row')
      })
      const getPlaceForBlockInRow = (size) => {
        const findingBlocks = rows
          .map((row) => {
            let space = 0
            let maxSpace = row.length
            console.log(row)

            grid[row].forEach((item) => {
              if (item === null) {
                space++
              } else {
                maxSpace = space > maxSpace ? space : maxSpace
                space = 0
              }
            })

            const answerObj = {
              maxSpace,
              row
            }

            console.log(answerObj)

            return maxSpace > parseInt(size[0]) ? answerObj : false
          })
          .filter(Boolean)

        console.log(findingBlocks)
        return false
      }

      if (!getPlaceForBlockInRow(size)) {
        const rowValues = Array.from(Array(this.amountColumns)).map((d) => null)
        rows.push = rowValues
        grid['row_' + rows.length] = rowValues
      }

      // console.log(grid, rows, size)
    }
  }
}
</script>

<style lang="stylus">
.articles
  margin 10px auto
</style>
