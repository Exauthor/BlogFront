<template lang="pug">
  .articles.wrapper(ref='grid')
    transition-group(tag='div' name='list')
      ArticleBlock(
        v-for='(article, i) in positionedArticles'
        :style='`transform: translate(${article.x}, ${article.y})`'
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
      amountColumns: 0,
      grid: {}
    }
  },
  computed: {
    ...mapGetters(['getCSSVariable']),
    ...mapGetters('articles', {
      articles: 'getArticles'
    }),
    positionedArticles() {
      const articles = Object.values(this.grid)
        .flat()
        .filter(Boolean)
        .map((value) => JSON.stringify(value))

      const enique = [...new Set(articles)].map(JSON.parse)
      return enique
    }
  },
  updated() {
    console.log('updated')
    // this.generateGrid()
    // this.determinaHeight()
  },
  watch: {
    articles() {
      this.clearPosition()
      this.generateGrid()
      this.determinaHeight()
    }
  },
  mounted() {
    this.minBlockSize = this.getPositionValueFromString(
      this.getCSSVariable('--size-article-block'),
      0.5
    )

    this.amountColumns =
      parseFloat(this.getCSSVariable('--amount-article-blocks')) * 2

    this.generateGrid()
    this.determinaHeight()
  },
  methods: {
    getPositionValueFromString(size, multiplier) {
      const number = parseFloat(size)
      const measure = size.trim().slice(('' + number).length)

      return number * multiplier + measure
    },
    clearPosition() {
      this.articles.map((article) => {
        article.x = undefined
        article.y = undefined

        return article
      })
    },
    determinaHeight() {
      this.$refs.grid.style.height = this.getPositionValueFromString(
        this.minBlockSize,
        Object.keys(this.grid).length
      )
    },
    generateGrid() {
      const articles = this.articles
      let gridObject = {}

      articles.forEach((article, index) => {
        gridObject = this.putBlockInGrid(gridObject, article)
      })

      gridObject = this.generatePosition(gridObject)

      this.grid = gridObject
    },
    generatePosition(grid) {
      const rows = Object.keys(grid).filter((key) => {
        return key.includes('row')
      })
      rows.forEach((rowTitle, y) => {
        grid[rowTitle].forEach((article, x) => {
          if (
            article !== null &&
            article.x === undefined &&
            article.y === undefined
          ) {
            article.x = this.getPositionValueFromString(this.minBlockSize, x)
            article.y = this.getPositionValueFromString(this.minBlockSize, y)
          }
        })
      })
      return grid
    },
    putBlockInGrid(grid, article) {
      let isInGrid = false
      const size = article.size.map(Number)
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
              space = 0
            }
            maxSpace = space > maxSpace ? space : maxSpace
          })

          if (maxSpace >= size[0]) {
            hasEmpty = true
          }
        })

        return hasEmpty
      }

      const putInEmpty = () => {
        rows.forEach((rowKey) => {
          grid[rowKey].forEach((item, i, row) => {
            const array = row.slice(i, i + size[0])
            if (!isInGrid && array.length >= size[0] && !array.some(Boolean)) {
              isInGrid = true
              Array.from(Array(size[0])).forEach((v, j) => {
                grid[rowKey][i + j] = article
              })
            }
          })
        })
      }

      if (!getPlaceForBlockInRow(size)) {
        const rowValues = Array.from(Array(this.amountColumns)).map((d) => null)
        rows.push('row_' + (rows.length + 1))
        grid['row_' + rows.length] = rowValues
      }
      putInEmpty()

      return grid
    }
  }
}
</script>

<style lang="stylus">
.articles
  margin 10px auto
</style>
