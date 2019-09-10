<template lang="pug">
  .edit-body
    div(v-if='state === "login"').center
      form(@submit.prevent='insertPass(password)')
        input(v-model='password' placeholder='pass' required)
        button(type='submit') Log In
    div(v-else-if='state === "choice"')
      h2 CHOISE
      .body-choise
        .body-choise_create.gradient-link
          h4(@click='createArticle') Create
        .body-choise_edit
          h4 Edit
          .body-choise_edit-blocks
            nuxt-link.edit-block(
              v-for='(article, i) in articles'
              :key='i'
              :to="{ name: 'edit-id', params: { id: article.id } }")
              .edit-block_title {{article.title}}
              .edit-block_theme-icons
                .edit-block_theme-icon(
                  v-for='theme in article.themes'
                  :style="`background-image: url('/img/article-icons/${theme}.svg')`"
                  :title='theme')
</template>

<script>
import { mapState } from 'vuex'
import VueMarkdown from 'vue-markdown'
import ArticleBlock from '~/components/ArticleBlock.vue'

export default {
  name: 'Editor',
  layout: 'none',
  components: {
    ArticleBlock,
    VueMarkdown
  },
  data() {
    return {
      password: '',
      state: 'choice' // or login
    }
  },
  computed: {
    ...mapState({
      articles: 'allArticles'
    })
  },
  methods: {
    createArticle() {
      this.$router.push('/edit/create')
    },
    viewInMarkdown() {
      this.$prism()
    },
    insertPass(pass) {
      if (pass === 'New') {
        this.state = 'choice'
      }
    }
  }
}
</script>

<style lang="stylus">
.edit-body
  input
    &:focus
      outline none

.edit-title
  font-size 2rem
  text-align center

.body-choise_create
  border-radius 1.5vmin
  padding 2vmin
  margin 20px auto

.gradient-link
  text-align center
  color white
  background linear-gradient(to left, var(--color-second), #6004de)
  cursor pointer

.parse-text-area, .view-in-markdown
  border-radius 1.5vmin
  padding 1.5vmin
  margin 10px 0
  width calc(50% - 5px)

.additional-button
  display flex
  justify-content space-between

.body-choise
  width 100vmin
  margin 30px auto

.edit-block
  display flex
  padding 5px
  cursor pointer

.edit-block_theme-icons
  display flex

.edit-block_theme-icons div
  width calc(var(--size-article-block) / 17)
  height calc(var(--size-article-block) / 17)
  background-size contain
  background-repeat no-repeat
  background-position center
  margin-left 1vmin

form
  display flex
  width 80vmin
  margin 20px auto
  flex-direction column
  padding 5px
  color var(--color-second)
  & input
    display block
    background none
    border none
    border-bottom 2px solid var(--color-second)
    color var(--color-second)
    padding 5px 10px
    margin-bottom 15px
    &[type="number"]
      display inline-block
      margin-right 20px
  & button
    border-radius 1.5vmin
    padding 1.5vmin
    margin 10px auto
    border none
    width 80%
  & textarea
    background none
    color var(--color-second)
    border 2px var(--color-second) solid
    border-radius 20px
    inent-text 30px
    resize none
    padding 15px
    font-size 1rem
    margin-bottom 15px
  & fieldset
    border-radius 15px
    border 2px var(--color-second) solid

.markdown-block
  height 40vh
  overflow-y scroll
</style>
