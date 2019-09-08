<template lang="pug">
  section.section-article(@click='updateActiveArticles')
    Menu(
      :themes='themes'
      type='search'
      @changeTheme='updateFilter'
      @searchArticle='filterArticle'
    )
    .articles.wrapper
      article-block(
        v-for='article in articles'
        :key='article.title'
        :article='article'
      )
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ArticleBlock from '~/components/ArticleBlock.vue'
import Menu from '~/components/Menu.vue'

let Isotope = null
let Isotopepackery = null
let packery = null

if (process.browser) {
  Isotope = require('isotope-layout')
  Isotopepackery = require('isotope-packery')
  packery = require('packery')
}

export default {
  name: 'Articles',
  components: {
    Menu,
    ArticleBlock
  },
  computed: {
    ...mapState('articles', ['articles', 'allArticles']),
    ...mapGetters('articles', {
      themes: 'getThemes'
    }),
    grid() {
      return new Isotope('.articles', {
        itemSelector: '.article-block',
        layoutMode: 'packery',
        percentPosition: true,
        packery: {
          gutter: 10
        }
      })
    }
  },
  layout: 'articles',
  metaInfo() {
    return {
      title: 'Мой Блог'
    }
  },
  async mounted() {
    this.grid.layout()

    console.log(this.$store)
    await this.getArticles()

    console.log('MOUNTED ARTICLES')
  },
  updated() {
    const that = this
    document.querySelectorAll('.article-block').forEach((item) => {
      that.grid.appended(item)
      that.grid.layout()
    })
  },
  methods: {
    ...mapActions('articles', ['getArticles']),
    updateActiveArticles() {
      const active = document.documentElement.querySelector(
        '.article-block-active'
      )

      if (active) {
        active.classList.remove('article-block-active')
      }
    },
    updateFilter(theme) {
      this.filterGrid(theme)
    },
    filterArticle(text) {
      this.grid.arrange({
        filter(item) {
          let show
          item.querySelectorAll('.article-block-text_link').forEach((i) => {
            show = i.textContent.includes(text)
          })
          return show
        }
      })
    },
    filterGrid(array) {
      this.grid.arrange({
        filter(item) {
          const masTitle = []
          item
            .querySelectorAll('.article-block-text_theme-icons > *')
            .forEach((i) => {
              masTitle.push(array.includes(i.getAttribute('title')))
            })

          return masTitle.some((i) => i)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.section-article
  flex 1 0 auto

.main-artciles
  display flex
  flex-direction column
  min-height 100vh

.articles
  margin 10px auto
</style>
