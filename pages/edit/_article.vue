<template lang="pug">
    div
      transition(name='fade')
        ul.menu-left-click(ref='leftClickMenu' v-if='activeLeftMenu')
          li(@click.prevent='addMenuLink') Добавить элемент меню
          li(@click.prevent='addTitle') Добавить заголовок
      h3.edit-title Editor mode
      form(@submit.prevent='addArticle(article.title, article.id, article.description, article.size, article.body, article.themes, article.img_src, article.archive, article.settings)')
        input(v-model='article.title' placeholder='Title' required)
        input(v-model='article.description' placeholder='Description' required)
        input(v-model='article.img_src' placeholder='Image Path' required)
        input(ref='inputTheme' @input='putTheme' placeholder='Themes' required)
        .double-block
          fieldset
            legend Something text
            input(type='number' min='1' max='2' v-model='article.size[0]' required)
            input(type='number' min='1' max='2' v-model='article.size[1]' required)
          ArticleBlock.relative(:article='article')
        input#additional-settings(type='checkbox')
        .additional-settings-block
          input(v-model='article.settings.background_header_component' placeholder='Article header component')
        input(v-model='article.id' placeholder='Article URL' required)
        label(for='archive') Archive
        input#archive(v-model='article.archive' type='checkbox')
        textarea(
          @input='updateMarkdown' 
          @click.prevent.left='closeLeftMenu' 
          @click.prevent.right='clickTextarea' 
          v-model='article.body'
          ref='textarea'
          rows='10' placeholder='Article text' required='')
        vue-markdown(:source='article.body').markdown-block
        .additional-button
          button.parse-text-area.gradient-link(@click.prevent="parseBody(article.body)") Parse Body
        button.gradient-link(type='submit') Update
        .gradient-link(@click='deleteArticle(id)') Delete
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VueMarkdown from 'vue-markdown'
import ArticleBlock from '~/components/ArticleBlock.vue'

export default {
  name: 'EditArticle',
  layout: 'none',
  components: {
    VueMarkdown,
    ArticleBlock
  },
  data() {
    return {
      activeLeftMenu: false,
      article: {
        title: 'TITLE',
        description: '',
        img_src: '',
        size: [1, 1],
        themes: [],
        id: '',
        archive: false,
        settings: {
          background_header_component: ''
        },
        password: '',
        body: ''
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.article
    },
    ...mapState({
      articles: 'allArticles'
    })
  },
  async asyncData({ params, store }) {
    const articleFind = await store.dispatch(
      'articles/getArticle',
      params.article
    )
    return { articleFind }
  },
  mounted() {
    this.article = Object.assign(
      {},
      this.article,
      JSON.parse(JSON.stringify(this.articleFind))
    )
    this.$refs.inputTheme.value = this.article.themes.join(' ')

    this.$prism()
  },
  methods: {
    ...mapActions('articles', ['deleteArticle', 'createArticle']),
    putTheme(event) {
      const input = event.target.value.trim()

      this.article.themes = input.split(' ').filter(Boolean)
    },
    addMenuLink() {
      this.addString('[theme](#theme)')
    },
    addTitle() {
      this.addString('\n<h2><a name="">  </a></h2>\n')
    },
    addString(str) {
      const textarea = this.$refs.textarea
      this.article.body =
        this.article.body.slice(0, textarea.selectionStart) +
        str +
        this.article.body.slice(textarea.selectionStart)
    },
    closeLeftMenu() {
      this.activeLeftMenu = false
    },
    clickTextarea(e) {
      this.activeLeftMenu = true

      this.$nextTick(() => {
        const menu = this.$refs.leftClickMenu

        // const textarea = this.$refs.textarea
        // console.log(textarea.selectionStart)

        menu.style.left = e.pageX + 'px'
        menu.style.top = e.pageY + 'px'
      })
    },
    updateMarkdown() {
      const repeat = this.article.body.split('```').length - 1

      if (!(repeat % 2) && repeat !== 0) {
        this.$prism()
      }
    },
    async addArticle(
      title,
      id,
      description,
      size,
      body,
      themes,
      img_src,
      archive,
      settings
    ) {
      body = this.parseBody(body)
      id = id.replace(/ /gi, '_').toLowerCase()

      delete this.article._id

      if (this.id !== this.article.id) {
        await this.deleteArticle(this.id)
      }

      await this.createArticle(this.article)
    },
    parseBody(body) {
      let text = ''
      body.split('').forEach((item, i) => {
        if (item.charCodeAt(0) === 10) {
          text += '\\n'
        } else {
          text += item
        }
      })
      return text
    }
  }
}
</script>

<style lang="stylus">

.menu-left-click
  position absolute
  border-radius 5px
  overflow hidden
  & > *
    padding 5px 10px
    font-size .9rem
    background #0f091d
    transition .2s
    &:hover
      background #241939

.markdown-block
  height 30vh
  margin 2vh 0
  overflow-y scroll

.double-block
  display flex
  justify-content space-between
  align-items center

.edit-title
  font-size 2rem
  text-align center

.gradient-link
  text-align center
  color white
  background linear-gradient(to left, var(--color-second), #6004de)
  cursor pointer

.additional-button
  display flex
  justify-content space-between

form
  display flex
  width 90vmin
  margin 20px auto
  flex-direction column
  padding 5px
  color var(--color-second)
  input
    display block
    background none
    border none
    border-bottom 2px solid var(--color-second)
    color var(--color-second)
    padding 5px 10px
    margin-bottom 15px
    &:focus
      outline none
    &[type="number"]
      display inline-block
      margin-right 20px
  button, .parse-text-area
    border-radius 1.5vmin
    font-family var(--text-font)
    font-size 1.2rem
    padding 2vmin
    margin 0 auto 10px
    border none
    width 80%
    &:focus
      outline none
      filter drop-shadow(0 0 5px white)
  textarea
    background none
    color var(--color-second)
    border 2px var(--color-second) solid
    border-radius 20px
    inent-text 30px
    resize none
    padding 15px
    font-size 1rem
    margin-bottom 15px
    &:focus
      outline none
  fieldset
    border-radius 15px
    border 2px var(--color-second) solid

.markdown-block
  height 40vh
  overflow-y scroll

.fade-enter-active, .fade-leave-active
  transition opacity .4s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0
</style>
