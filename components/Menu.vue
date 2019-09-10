<template lang="pug">
  #nav.wrapper(v-if="type=='search'")
    NuxtLink(:to='{ name: "index" }') Мой блог
    input.article-search(type="text" placeholder="Поиск" @input='inputSearch')
    .theme-choice
      .theme-choice_icon(
        v-for='theme in themes'
        :data-name='theme'
        :data-index='checkedThemes.indexOf(theme) !== -1'
        :class='{"checked": (checkedThemes.indexOf(theme) !== -1) ? true : false}'
        @click="clickTheme(theme, $event)")
        .article-block-text_theme-icon(
          :style="`background-image: url('/img/article-icons/${theme}.svg')`"
          :title='theme' :alt='theme' )
      .theme-choice_icon.checked {{ amountArticles }}
      .theme-choice_icon.checked(@click="clickAll")  Выделить все
  #nav.wrapper(v-else)
    nuxt-link(:to='{name: "about_me"}') Обо мне
    nuxt-link(:to='{name: "contacts"}') Контакты
    nuxt-link(:to='{name: "index"}') Мой блог
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Menu',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      search: '',
      checkedThemes: []
    }
  },
  computed: {
    ...mapGetters('articles', {
      themes: 'getThemes',
      amountArticles: 'getAmountArticles'
    })
  },
  watch: {
    search() {
      this.$emit('searchArticle', this.search)
    }
  },
  mounted() {
    if (this.type === 'search') {
      this.checkedThemes = this.themes.slice(0)
    }
  },
  methods: {
    inputSearch(e) {
      this.search = e.target.value
    },
    clickTheme(addTheme) {
      const index = this.checkedThemes.indexOf(addTheme)

      if (index === -1) {
        const arr = this.checkedThemes.slice(0)
        arr.push(addTheme)
        this.checkedThemes = arr
      } else {
        const arr = this.checkedThemes
        arr.splice(index, 1)
        this.checkedThemes = arr
      }

      this.$emit('changeTheme', this.checkedThemes)
    },
    clickAll() {
      this.checkedThemes = this.themes.slice(0)
      this.$emit('changeTheme', this.themes)
    }
  }
}
</script>

<style lang="stylus">
#nav
  position relative
  z-index 2
  & > a
    padding 5px 10px
    order 2
    &.router-link-exact-active.router-link-active,
    &.nuxt-link-exact-active.nuxt-link-active
      order 1
      flex 1
      font-size 4vmin
      text-transform uppercase
      padding-left 0
      filter drop-shadow(0 0 3px var(--color-active))

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
    filter brightness(0.3)
    &.checked
      filter brightness(1)
      &:hover
        filter brightness(.6) contrast(140%)
    & div.article-block-text_theme-icon
      margin-right 0px
    &:hover
      filter brightness(.8)

.article-search
  border-radius 20px
  border none
  border 1px solid var(--color-active)
  background none
  &:focus
    color var(--color-active)
    outline none
</style>
