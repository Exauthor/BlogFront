<template lang="pug">
  div(
   v-if='article'
   :class='`article-block article-block-width-${article.size[0]} article-block-height-${article.size[1]}`'
   :data-size='`${article.size}`'
   @click.stop='popUpArticle')
    .article-block_image.center(:style="`background-image: url('${article.img_src}')`")
    .article-block-text
      nuxt-link.article-block-text_link(:to='{ name: "index", params: { id: article.id } }')
        | {{article.title}} {{article.id}}
      .article-block-text_theme-icons
        .article-block-text_theme-icon(
          v-for='theme in article.themes'
          :style="`background-image: url('/img/article-icons/${theme}.svg')`"
          :title='theme')
      .article-block-text_description(v-if='article.description')
        | {{article.description}}
      .article-block-text_description(v-else)
</template>

<script>
export default {
  name: 'ArticleBlock',
  props: ['article'],
  methods: {
    popUpArticle(e) {
      const classList = e.target.classList.value
      const activeImg = document.querySelector('.article-block-active')

      if (classList.indexOf('article-block_image') === 0) {
        e.target.classList.add('article-block-active')
        if (activeImg != null) {
          activeImg.classList.remove('article-block-active')
        }
      } else if (classList.indexOf('article-block-text') === 0) {
        if (activeImg != null) {
          activeImg.classList.remove('article-block-active')
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.article-block-width-1
  width calc(var(--size-article-block) / 2 - 10px)

.article-block-width-2
  width calc(var(--size-article-block) - 10px)

.article-block-height-1
  height calc(var(--size-article-block) / 2 - 10px)

.article-block-height-2
  height calc(var(--size-article-block) - 10px)

.article-block
  border-radius 10px
  position relative
  color var(--color-active)
  overflow hidden
  background-color #241939
  & .article-block-text_theme-icons
    transition .5s opacity, .5s margin
  &[data-size^='1'] //1x?
    & .article-block-text
      transform translateY(83%)
    & .article-block-text_link
      transition .5s
      width calc(var(--size-article-block) / 2 - 4vmin)
      font-size calc(var(--size-article-block) / 20)
      line-height calc(var(--size-article-block) / 14)
    & .article-block-active.article-block_image.center
      & ~ .article-block-text .article-block-text_theme-icons
          margin-top 0vmin
  &[data-size$='1'] //?x1
    & .article-block-text
      padding .5vmin 1vmin
      transition ease all .5s
    & .article-block-text_theme-icons
      margin-top 1.5vmin
      & div
        margin-right 1vmin
    & .article-block-active.article-block_image.center
      & ~ .article-block-text
        & .article-block-text_theme-icons
          margin-top 0vmin
  &[data-size^='2'][data-size$='1'] //2x1
    & .article-block-text
      transform translateY(77%)
  &[data-size^='2'][data-size$='2'] //2x2
    & .article-block-text_theme-icons
      margin-bottom 2vmin
    & .article-block-active.article-block_image.center
      & ~ .article-block-text
        & .article-block-text_theme-icons
          margin-bottom .5vmin
  & .article-block-active.article-block_image.center
    filter blur(3px)
    & ~ .article-block-text
      transform translateY(0%)
      & a
        padding-bottom 0
      & .article-block-text_theme-icons
        opacity 1


.article-block_image
  height 90%; width 90%
  background-size contain
  background-position center
  background-repeat no-repeat
  transition .3s

.article-block-text
  width: 100%
  height 100%
  transform translateY(81%)
  position absolute
  bottom 0; left 0
  background rgba(0,0,0,0.7)
  overflow hidden
  transition all .5s ease
  box-sizing border-box
  padding 0 1vmin

.article-block-text_link
  text-decoration none
  display block
  text-overflow ellipsis
  overflow hidden
  width calc(var(--size-article-block) - 4vmin)
  font-size calc(var(--size-article-block) / 17)
  line-height calc(var(--size-article-block) / 10)
  white-space nowrap
  z-index 2
  position relative
  margin-top -.3vmin

.article-block-text_theme-icons
  display flex
  transition 1s

.article-block-text_theme-icon
  width calc(var(--size-article-block) / 17)
  height calc(var(--size-article-block) / 17)
  background-size contain
  background-repeat no-repeat
  background-position center
  margin-right 2vmin
  cursor pointer

.article-block-text_description
  font-size calc(var(--size-article-block) / 22)
  line-height calc(var(--size-article-block) / 18)
  overflow hidden
</style>
