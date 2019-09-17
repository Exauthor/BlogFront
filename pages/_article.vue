<template lang="pug">
  .article(v-if='article')
    ArticleBackgroundHeader(
      :component='(article.settings) ? article.settings.background_header_component : undefined'
    )
    .article-body
      .article-title-block
        router-link(:to='{ name: "index"}' class='article-back')
        h1.article-title {{ article.title }}
        .article-block-text_theme-icons
          div(
            v-for='theme in article.themes'
            :style='`background-image: url("/img/article-icons/${theme}.svg")`'
            :title='theme'
            class='article-block-text_theme-icon'
          )
      .article-body
        .article-body_description {{article.description}}
        vue-markdown(:source='article.body')
</template>

<script>
import VueMarkdown from 'vue-markdown'
import ArticleBackgroundHeader from '~/components/article/BackgroundHeader.vue'

export default {
  name: 'Article',
  components: {
    VueMarkdown,
    ArticleBackgroundHeader
  },
  async asyncData({ params, store }) {
    const article = await store.dispatch('articles/getArticle', params.article)
    return { article }
  },
  layout: 'article',
  metaInfo() {
    return {
      title: this.article.title,
      titleTemplate: '%s | Sisuphys Blog',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  },
  mounted() {
    this.onLoad()
  },
  updated() {
    this.onLoad()
  },
  methods: {
    onLoad() {
      this.$prism()
      // Prism.highlightAll();
      // this.setNatifications();
      this.linkScroll()
    },
    setNatifications() {
      const that = this

      setTimeout(function() {
        document
          .querySelectorAll('.code-toolbar .toolbar a')
          .forEach((anchor) => {
            anchor.addEventListener('click', function() {
              that.$toast.success({
                title: 'Скопировано',
                message: 'Код скопирован в буфер обмена'
              })
            })
          })
      }, 2000)
    },
    linkScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault()

          document
            .querySelector(`a[name="${this.getAttribute('href').slice(1)}"]`)
            .scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
        })
      })
    }
  }
}
</script>

<style lang="stylus">

h1, h2, h3, h4, h5, h6
  margin 0
  margin-top 15px

.article-body
  width 90vw
  margin 0 auto 20px
  h2
    margin 10px 0
  a
    text-shadow 0 0 4px alpha(#04ded4, .5)
  mark
    background rgba(0,0,0,.5)
    border-radius 2px
    padding 0 5px
    color var(--color-active)
  hr
    margin 10px
    opacity 0

.article-title-block
  display flex
  padding 2vmin
  align-items center
  background rgba(0,0,0,.8)
  margin -30px 0 20px
  border-radius 1vmin
  & h1
    flex 1
    font-size 1.4rem
    text-align center

.article-title
  display block
  width 100%
  margin 0
  border-radius 5px
  box-sizing border-box

.article-back
  width 4vmin
  height 4vmin
  background url('/img/article-icons/back.svg') center/contain no-repeat

.article-block-text_theme-icons
  display flex
  & > div
    width 20px
    height 20px
    background-position center
    background-size contain
    background-repeat no-repeat

.article-body_description
  margin 0 0 20px
  padding-left 10px
  border-left 2px var(--active-color) solid

code[class*="language-"],
pre[class*="language-"] {
  color: #fbfbfb;
  background: none;
  /*text-shadow: 0 1px white;*/
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: #b3d4fc;
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
  text-shadow: none;
  background: #b3d4fc;
}

@media print {
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"]
  padding-top 30px
  background #241939
  border-radius 6px


/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: slategray;
}

.token.punctuation {
  color: #b192f9;
}

.namespace {
  opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #fbff4b;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: var(--color-green);
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #ff4cf0;
  /*background: hsla(0, 0%, 100%, .5);*/
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: var(--color-active);
}

.token.function,
.token.class-name {
  color: var(--color-second);
}

.token.regex,
.token.important,
.token.variable {
  color: #e90;
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.prism-previewer,
.prism-previewer:before,
.prism-previewer:after {
  position: absolute;
  pointer-events: none;
}
.prism-previewer,
.prism-previewer:after {
  left: 50%;
}
.prism-previewer {
  margin-top: -48px;
  width: 32px;
  height: 32px;
  margin-left: -16px;

  opacity: 0;
  -webkit-transition: opacity .25s;
  -o-transition: opacity .25s;
  transition: opacity .25s;
}
.prism-previewer.flipped {
  margin-top: 0;
  margin-bottom: -48px;
}
.prism-previewer:before,
.prism-previewer:after {
  content: '';
  position: absolute;
  pointer-events: none;
}
.prism-previewer:before {
  top: -5px;
  right: -5px;
  left: -5px;
  bottom: -5px;
  border-radius: 10px;
  border: 5px solid #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5) inset, 0 0 10px rgba(0, 0, 0, 0.75);
}
.prism-previewer:after {
  top: 100%;
  width: 0;
  height: 0;
  margin: 5px 0 0 -7px;
  border: 7px solid transparent;
  border-color: rgba(255, 0, 0, 0);
  border-top-color: #fff;
}
.prism-previewer.flipped:after {
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: 5px;
  border-top-color: rgba(255, 0, 0, 0);
  border-bottom-color: #fff;
}
.prism-previewer.active {
  opacity: 1;
}

.prism-previewer-angle:before {
  border-radius: 50%;
  background: #fff;
}
.prism-previewer-angle:after {
  margin-top: 4px;
}
.prism-previewer-angle svg {
  width: 32px;
  height: 32px;
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.prism-previewer-angle[data-negative] svg {
  -webkit-transform: scaleX(-1) rotate(-90deg);
  -moz-transform: scaleX(-1) rotate(-90deg);
  -ms-transform: scaleX(-1) rotate(-90deg);
  -o-transform: scaleX(-1) rotate(-90deg);
  transform: scaleX(-1) rotate(-90deg);
}
.prism-previewer-angle circle {
  fill: transparent;
  stroke: hsl(200, 10%, 20%);
  stroke-opacity: 0.9;
  stroke-width: 32;
  stroke-dasharray: 0, 500;
}

.prism-previewer-gradient {
  background-image: linear-gradient(45deg, #bbb 25%, transparent 25%, transparent 75%, #bbb 75%, #bbb), linear-gradient(45deg, #bbb 25%, #eee 25%, #eee 75%, #bbb 75%, #bbb);
  background-size: 10px 10px;
  background-position: 0 0, 5px 5px;

  width: 64px;
  margin-left: -32px;
}
.prism-previewer-gradient:before {
  content: none;
}
.prism-previewer-gradient div {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 10px;
  border: 5px solid #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5) inset, 0 0 10px rgba(0, 0, 0, 0.75);
}

.prism-previewer-color {
  background-image: linear-gradient(45deg, #bbb 25%, transparent 25%, transparent 75%, #bbb 75%, #bbb), linear-gradient(45deg, #bbb 25%, #eee 25%, #eee 75%, #bbb 75%, #bbb);
  background-size: 10px 10px;
  background-position: 0 0, 5px 5px;
}
.prism-previewer-color:before {
  background-color: inherit;
  background-clip: padding-box;
}

.prism-previewer-easing {
  margin-top: -76px;
  margin-left: -30px;
  width: 60px;
  height: 60px;
  background: #333;
}
.prism-previewer-easing.flipped {
  margin-bottom: -116px;
}
.prism-previewer-easing svg {
  width: 60px;
  height: 60px;
}
.prism-previewer-easing circle {
  fill: hsl(200, 10%, 20%);
  stroke: white;
}
.prism-previewer-easing path {
  fill: none;
  stroke: white;
  stroke-linecap: round;
  stroke-width: 4;
}
.prism-previewer-easing line {
  stroke: white;
  stroke-opacity: 0.5;
  stroke-width: 2;
}

@-webkit-keyframes prism-previewer-time {
  0% {
    stroke-dasharray: 0, 500;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 500;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 0, 500;
    stroke-dashoffset: -100;
  }
}

@-o-keyframes prism-previewer-time {
  0% {
    stroke-dasharray: 0, 500;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 500;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 0, 500;
    stroke-dashoffset: -100;
  }
}

@-moz-keyframes prism-previewer-time {
  0% {
    stroke-dasharray: 0, 500;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 500;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 0, 500;
    stroke-dashoffset: -100;
  }
}

@keyframes prism-previewer-time {
  0% {
    stroke-dasharray: 0, 500;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 500;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 0, 500;
    stroke-dashoffset: -100;
  }
}

.prism-previewer-time:before {
  border-radius: 50%;
  background: #fff;
}
.prism-previewer-time:after {
  margin-top: 4px;
}
.prism-previewer-time svg {
  width: 32px;
  height: 32px;
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.prism-previewer-time circle
  fill transparent
  stroke hsl(200, 10%, 20%);
  stroke-opacity 0.9
  stroke-width 32
  stroke-dasharray 0, 500
  stroke-dashoffset 0
  -webkit-animation prism-previewer-time linear infinite 3s
  -moz-animation prism-previewer-time linear infinite 3s
  -o-animation prism-previewer-time linear infinite 3s
  animation prism-previewer-time linear infinite 3s


.code-toolbar
  position relative

.toolbar
  position absolute
  top 0; right 5px;
  display flex
  margin 5px
  align-items top

.toolbar-item a
  cursor pointer
  //font-size 0px
  //&:before
    //content ""
    //display block
    //width: 20px
    //height 20px
    //background url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' style='isolation:isolate' viewBox='453.091 22 25.909 30' width='25.909' height='30'%3E%3Cpath d='M472.182 22h-16.364a2.735 2.735 0 0 0-2.727 2.727v19.091h2.727V24.727h16.364V22zm4.091 5.455h-15a2.736 2.736 0 0 0-2.728 2.727v19.091c0 1.5 1.228 2.727 2.728 2.727h15c1.5 0 2.727-1.227 2.727-2.727V30.182c0-1.5-1.227-2.727-2.727-2.727zm0 21.818h-15V30.182h15v19.091z' fill='%2317CCC3'/%3E%3C/svg%3E") no-repeat center/contain

.toolbar .toolbar-item span
  display block
  font-size 0
  margin-right 5px
  height 20px
  width 20px

.language-go ~ .toolbar .toolbar-item span
  background url('/img/article-icons/go.svg') center/contain no-repeat

.language-css ~ .toolbar .toolbar-item span
  display block
  font-size 0
  background url('/img/article-icons/css.svg') center/contain no-repeat
  margin-right 5px
  height 15px
  width 25px

.language-javascript ~ .toolbar .toolbar-item span
  display block
  font-size 0
  background url('/img/article-icons/js.svg') center/contain no-repeat
  margin-right 5px
  height 15px
  width 25px

.language-shell ~ .toolbar .toolbar-item span
  background url('/img/article-icons/shell.svg') center/contain no-repeat

.language-html ~ .toolbar .toolbar-item span
  background url('/img/article-icons/html.svg') center/contain no-repeat
</style>
