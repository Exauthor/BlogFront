<template lang="pug">
  footer
    .wrapper.footer-links
      nuxt-link(to="/") Обо мне
      nuxt-link(to="/contacts") Контакты
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="stylus">
footer
  padding 20px 0
  background rgba(0,0,0,.65)
  flex 0 0 auto
  input
    display none
    &:checked ~ label
      &:before
        transform translateX(100%)
  label
    width 40px
    height 20px
    background var(--color-bg)
    border-radius 20px
    &:before
      content ''
      display block
      transition .3s
      width 20px
      height 20px
      background var(--color-active)
      border-radius 50%

.footer-links
  display flex
  justify-content space-around
  a
    font-size 1.1rem
    text-shadow 0 0 3px var(--color-active)
</style>
