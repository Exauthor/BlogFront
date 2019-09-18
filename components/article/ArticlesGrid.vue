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
      let gridObject = {}

      gridObject = this.putBlockInGrid(gridObject, articles[0])

      console.log(gridObject)
    },
    putBlockInGrid(grid, article) {
      let isInGrid = false
      const size = article.size
      const rows = Object.keys(grid).filter((key) => {
        return key.includes('row')
      })

      const getPlaceForBlockInRow = (size) => {
        let hasEmpty = false
        rows.forEach((row, i) => {
          let space = 0
          let maxSpace = 0

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

          if (maxSpace > parseInt(size[0])) {
            hasEmpty = true
          }
        })

        return hasEmpty
      }

      const putInEmpty = () => {
        rows.forEach((row) => {
          grid[row].forEach((item, i, row) => {
            if (!isInGrid && !row.slice(i, i + size[0]).some(Boolean)) {
              const x = parseInt(size[0])
              isInGrid = true
              Array.from(Array(x)).forEach((v, j) => {
                grid[`row_${i + 1}`][j] = article
              })
            }
          })
        })
      }

      if (!getPlaceForBlockInRow(size)) {
        const rowValues = Array.from(Array(this.amountColumns)).map((d) => null)
        rows.push('row_' + (rows.length + 1))
        grid['row_' + rows.length] = rowValues
        putInEmpty()
      }

      return grid
    }
  }
}
</script>

<style lang="stylus">
.articles
  margin 10px auto
</style>
