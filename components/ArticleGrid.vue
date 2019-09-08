<template lang="pug">
  //transition-group(name="list-complete" tag="div")
  div
    //add position block
      //:style=`left: ${article.left}; right: ${article.right}`
    article-block(
      v-for="article in updatedList"
      :key="article.title"
      :article="article"
    )
</template>

<script>
import ArticleBlock from '~/components/ArticleBlock.vue'

export default {
  name: 'Grid',
  components: {
    ArticleBlock
  },
  props: ['list'],
  data() {
    return {
      gridObj: [],
      nodeList: []
    }
  },
  // watch: {
  // list() {
  // if (this.list.length) {
  // this.createGrid();
  // }
  // },
  // },
  computed: {
    wrapperSize() {
      return getComputedStyle(document.documentElement).getPropertyValue(
        '--count-article-block'
      )
    },
    articleSize() {
      return getComputedStyle(document.documentElement).getPropertyValue(
        '--size-article-block'
      )
    },
    updatedList() {
      if (this.gridObj.length) {
        return this.gridObj.flatMap((i) => i.items.map((i) => i.article))
      }
      return this.list.slice()
    }
  },
  methods: {
    createGrid() {
      // console.log("Grid create");
      // console.log(this.list, "- list from props");

      const that = this

      this.list.forEach((item, i) => {
        const objInCube = {}
        const obj = {}

        objInCube.size = item.size
        objInCube.position = item.size
        // objInCube["size"] = item.dataset.size.splite(",");
        // objInCube["DOMitem"] = item;
        // objInCube["article"] = that.list[i];
        objInCube.article = item
        obj.position = [i % that.wrapperSize, i]
        obj.items = [objInCube]

        that.gridObj.push(obj)
      })

      console.log(this.gridObj)

      this.setPosition()
    },
    setPosition() {
      const that = this
      this.gridObj.forEach((cube) => {
        const xCube = cube.position[0] * that.articleSize.slice(0, 3) + 'vmin'
        const yCube = cube.position[1] * that.articleSize.slice(0, 3) + 'vmin'
        console.log(that.articleSize.slice(0, 3))
        cube.items.forEach((item) => {
          item.article.left = xCube
          item.article.top = yCube
        })
      })

      console.log(this.gridObj)
      console.log(this.articleSize)
    },
    parseCube() {}
  }
}
</script>

<style lang="stylus">
.article-block
  transition all 1s

/* .list-complete-leave-active below version 2.1.8 */
.list-complete-enter, .list-complete-leave-to
  opacity 0
  transform translateY(30px)

.list-complete-leave-active
  position absolute
</style>
