<template lang="pug">
  #nav.wrapper(v-if="type=='search'")
    NuxtLink(:to='{ name: "index" }') Мой блог
    input.article-search(type="text" placeholder="Поиск")
    ThemesSelector
  #nav.wrapper(v-else)
    nuxt-link(:to='{name: "about_me"}') Обо мне
    nuxt-link(:to='{name: "contacts"}') Контакты
    nuxt-link(:to='{name: "index"}') Мой блог
</template>

<script>
import ThemesSelector from '@/components/common/header/ThemesSelector'

export default {
  name: 'Menu',
  components: {
    ThemesSelector
  },
  props: {
    type: {
      type: String,
      default: 'default'
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

.article-search
  border-radius 20px
  border none
  border 1px solid var(--color-active)
  background none
  &:focus
    color var(--color-active)
    outline none
</style>
