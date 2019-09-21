<template lang="pug">
  .articles.wrapper(ref='grid' style='position: relative;')
    transition-group(tag='div' name='list')
      div(
        class='transition-block'
        v-for='(article, i) in positionedArticles'
        :style='`top: ${article.y || "0px"}; left: ${article.x || "0px"};`'
        :key='article.title'
      )
        ArticleBlock(
          :article='article'
        )
        // :style='`top: ${article.y || "0px"}; left: ${article.x || "0px"};`'
        // :style='`transform: translate(${article.x || "0px"}, ${article.y || "0px"});`'
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
        .map(JSON.stringify)

      const enique = [...new Set(articles)].map(JSON.parse)
      return enique
    }
  },
  watch: {
    articles() {
      this.updateAll()
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
    updateAll() {
      this.clearPosition()
      this.generateGrid()
      this.determinaHeight()
    },
    getPositionValueFromString(size, multiplier) {
      const number = parseFloat(size)
      const measure = size.trim().slice(('' + number).length)

      return number * multiplier + measure
    },
    clearPosition() {
      this.articles.map((article) => {
        article.x = 0
        article.y = 0

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
      const rows = Object.keys(grid)

      rows.forEach((rowTitle, y) => {
        grid[rowTitle].forEach((article, x) => {
          if (article !== null && !article.x && !article.y) {
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
      const rows = Object.keys(grid)

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

      const addRow = () => {
        const rowValues = Array.from(Array(this.amountColumns)).map((d) => null)
        rows.push('row_' + (rows.length + 1))
        grid['row_' + rows.length] = rowValues
      }

      const putInEmpty = () => {
        rows.forEach((rowKey, rowIndex) => {
          grid[rowKey].forEach((item, i, row) => {
            const array = row.slice(i, i + size[0])
            if (!isInGrid && array.length >= size[0] && !array.some(Boolean)) {
              isInGrid = true
              Array.from(Array(size[0])).forEach((v, j) => {
                grid[rowKey][i + j] = article
                if (size[1] > 1) {
                  if (grid[`row_${rowIndex + 2}`] === undefined) {
                    addRow()
                  }
                  grid[`row_${rowIndex + 2}`][i + j] = article
                }
              })
            }
          })
        })
      }

      if (!getPlaceForBlockInRow(size)) {
        addRow()
      }
      putInEmpty()

      return grid
    }
  }
}
</script>

<style lang="stylus">
.transition-block
  transition .6s
  position absolute

.articles
  margin 10px auto
</style>
