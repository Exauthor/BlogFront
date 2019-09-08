<template lang="pug">
  #app
    section.about-me
      .meteor.meteor__not-found-page
      .welcome-block.center-position 
        h2 File not found
        h3(@click='goBack') Go Back
</template>

<script>
export default {
  name: 'NotFound',
  layout: 'none',
  props: {
    error: {
      type: Object,
      default: () => Object.create(null)
    }
  },
  data() {
    return {
      transformAnimate: false,
      transformTime: 0.5,
      currentPositionBlock: 0,
      currentPositionBlockIndex: 0
    }
  },
  methods: {
    goBack() {
      if (window.history.length > 2) {
        this.$router.go(-1)
      } else {
        this.$router.push({ name: 'articles' })
      }
    }
  },
  metaInfo() {
    return {
      title: 'Не найдено',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Мариал не найден.'
        }
      ]
    }
  }
}
</script>
