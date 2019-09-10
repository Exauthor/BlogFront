<template lang="pug">
  .theme-choice
    .theme-choice_icon(
      v-for='theme in themes'
      :class='{"fade": isExcludeTheme(theme) ? true : false}'
      @click="clickTheme(theme)"
    )
      .article-block-text_theme-icon(
        :style="`background-image: url('/img/article-icons/${theme}.svg')`"
        :title='theme' :alt='theme' )
    .theme-choice_icon {{ amountArticles }}
    .theme-choice_icon(@click="selectAll")  Выделить все
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ThemesSelector',
  computed: {
    ...mapGetters('articles', {
      themes: 'getThemes',
      amountArticles: 'getAmountArticles',
      isExcludeTheme: 'isExcludeTheme'
    })
  },
  methods: {
    ...mapMutations('articles', [
      'EXCLUDE_THEME',
      'INCLUDE_THEME',
      'INCLUDE_ALL_THEMES'
    ]),
    clickTheme(theme) {
      const condition = this.isExcludeTheme(theme)

      if (condition) {
        this.INCLUDE_THEME(theme)
      } else {
        this.EXCLUDE_THEME(theme)
      }
    },
    selectAll() {
      this.INCLUDE_ALL_THEMES()
    }
  }
}
</script>

<style lang="stylus">
.theme-choice
  width 100%
  display flex
  flex-wrap wrap
  & .theme-choice_icon
    cursor pointer
    position relative
    border-radius 1vmin
    display flex
    align-items center
    background rgba(0,0,0,.3)
    margin 0 1.5vmin 1.5vmin 0
    padding 1vmin
    transition .4s
    filter brightness(1)
    &.fade
      filter brightness(0.3)
      &:hover
        filter brightness(.6) contrast(140%)
    & div.article-block-text_theme-icon
      margin-right 0px
    &:hover
      filter brightness(.8)
</style>
