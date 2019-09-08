<template lang="pug">
  input.article-search(type="text" placeholder="search" v-model="search")
</template>

<script>
export default {
  name: 'ArticleSearch',
  data() {
    return {
      search: ''
    }
  },
  watch: {
    search() {
      console.log(this.search)
    }
  }
}
</script>

<style lang="stylus">
.article-search
  border-radius 20px
  border none
  border 1px solid var(--color-active)
  background none
  &:focus
    color var(--color-active)
    outline none
</style>
