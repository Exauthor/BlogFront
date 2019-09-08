<template lang="pug">
  #app
    section.about-me
      .center-position.main-planet
      .ufo
      .meteor
      .another-planet
      .hole
      h2.welcome.center-position Добро Пожаловать
    section.about-me
      .fire
      h2 Приветик, я космический огонек.
    //Diagram
</template>

<script>
import Diagram from '../components/About/Diagram.vue'

let exp

if (process.browser) {
  exp = {
    name: 'About',
    data() {
      return {
        transformAnimate: false,
        transformTime: 0.5,
        currentPositionBlock: 0,
        currentPositionBlockIndex: 0
      }
    },
    computed: {
      mainSlides() {
        const index = this.currentPositionBlockIndex
        return Array.from(
          { length: this.mainSlidesCount },
          (v, i) => i === index
        )
      },
      slideSize() {
        return document.documentElement.clientHeight / 10
      }
    },
    methods: {
      resizeWindow() {
        document.querySelector(
          'section.about-me .meteor'
        ).style.transform = `rotate(${-this.tangleWindow()}deg)`
      },

      tangleWindow() {
        return Math.round(
          (180 / Math.PI) *
            Math.atan2(
              document.documentElement.clientHeight,
              document.documentElement.clientWidth
            )
        )
      },

      updateScroll() {
        const indexTrue = this.mainSlides.indexOf(true)

        if (this.transformAnimate) {
          return
        }

        this.currentPositionBlock =
          -indexTrue * document.documentElement.clientHeight
        window.app.style.transition = this.transformTime + 's'
        window.app.style.transform = `translate3d(0px, ${this.currentPositionBlock}px, 0px)`

        this.transformAnimate = true

        const that = this

        setTimeout(function() {
          that.transformAnimate = false
        }, this.transformTime * 700)
      },

      scrollTo(option) {
        const indexTrue = this.mainSlides.indexOf(true)

        if (option === 'up') {
          if (indexTrue === 0) {
            this.updateScroll()
            return
          }

          --this.currentPositionBlockIndex
        } else if (option === 'down') {
          if (indexTrue === this.mainSlides.length - 1) {
            this.updateScroll()
            return
          }

          ++this.currentPositionBlockIndex
        }

        this.updateScroll()
      },

      catchKeydown(event) {
        if (this.transformAnimate) {
          return
        }

        if (event.keyCode === 38) {
          this.scrollTo('up')
        } else if (event.keyCode === 40) {
          this.scrollTo('down')
        }
      },

      catchWheel(event) {
        if (this.transformAnimate) {
          return
        }

        if (event.deltaY < 0) {
          this.scrollTo('up')
        } else if (event.deltaY > 0) {
          this.scrollTo('down')
        }
      },

      catchTouchstart(e) {
        this.touchObj = [
          e.changedTouches[0].clientX,
          e.changedTouches[0].clientY
        ]
      },

      catchTouchmove(e) {
        const shiftY = e.changedTouches[0].clientY - this.touchObj[1]

        if (
          (shiftY < 0 && this.mainSlides[this.mainSlides.length - 1]) ||
          this.touchObj === undefined
        ) {
          return
        }

        window.app.style.transition = 'none'
        window.app.style.transform = `translate3d(0px, ${this
          .currentPositionBlock + shiftY}px, 0px)`

        e.preventDefault()
      },

      catchTouchend(e) {
        this.transformAnimate = false

        const shiftY = e.changedTouches[0].clientY - this.touchObj[1]

        if (shiftY > this.slideSize) {
          this.scrollTo('up')
        } else if (shiftY < -this.slideSize) {
          this.scrollTo('down')
        } else {
          this.updateScroll()
        }
        this.touchObj = undefined
      },

      catchClickstart(e) {
        const originalElement = e.srcElement || e.originalTarget
        const textArr = [
          'P',
          'H1',
          'H2',
          'H3',
          'H4',
          'H5',
          'H6',
          'SPAN',
          '#text'
        ]

        if (textArr.includes(originalElement.nodeName)) {
          return
        }
        // if (e.explicitOriginalTarget || e.explicitOriginalTarget.nodeName === "#text") {return;}
        this.clickObj = [e.clientX, e.clientY]
        e.preventDefault()
      },

      catchClickmove(e) {
        if (this.clickObj === undefined) {
          return
        }

        const shiftY = e.clientY - this.clickObj[1]

        if (shiftY < 0 && this.mainSlides[this.mainSlides.length - 1]) {
          return
        }

        window.app.style.transition = 'none'
        window.app.style.transform = `translate3d(0px, ${this
          .currentPositionBlock + shiftY}px, 0px)`
        e.preventDefault()
      },

      catchClickend(e) {
        if (this.clickObj === undefined) {
          return
        }

        this.transformAnimate = false
        const shiftY = e.clientY - this.clickObj[1]

        if (shiftY > this.slideSize) {
          this.scrollTo('up')
        } else if (shiftY < -this.slideSize) {
          this.scrollTo('down')
        } else {
          this.updateScroll()
        }

        this.clickObj = undefined
        e.preventDefault()
      },

      initSizeBlocks() {
        window.app.childNodes.forEach(function(item) {
          item.style.height = document.documentElement.clientHeight + 'px'
        })
      }
    },
    mounted() {
      this.mainSlidesCount = 3
      // this.mainSlidesCount = window["app"].childElementCount
      // console.log(this)
      // this.initSizeBlocks();
      this.resizeWindow()
    },
    created() {
      // PHONE
      window.addEventListener('touchstart', this.catchTouchstart)
      window.addEventListener('touchmove', this.catchTouchmove)
      window.addEventListener('touchend', this.catchTouchend)

      // DESKTOP
      window.addEventListener('wheel', this.catchWheel)
      window.addEventListener('keydown', this.catchKeydown)

      // DRUG&DROP
      window.addEventListener('mousedown', this.catchClickstart)
      window.addEventListener('mousemove', this.catchClickmove)
      window.addEventListener('mouseup', this.catchClickend)

      window.addEventListener('resize', this.initSizeBlocks)
    },
    destroyed() {
      // PHONE
      window.removeEventListener('touchstart', this.catchTouchstart)
      window.removeEventListener('touchmove', this.catchTouchmove)
      window.removeEventListener('touchend', this.catchTouchend)

      // DESKTOP
      window.removeEventListener('wheel', this.catchWheel)
      window.removeEventListener('keydown', this.catchKeydown)

      // DRUG&DROP
      window.removeEventListener('mousedown', this.catchClickstart)
      window.removeEventListener('mousemove', this.catchClickmove)
      window.removeEventListener('mouseup', this.catchClickend)

      window.removeEventListener('resize', this.initSizeBlocks)
    },
    metaInfo() {
      return {
        title: 'Обо Мне',
        description:
          'Я программист самоучка, в этом блогу пишу о том, что знаю и делюсь тем, что выучил.'
      }
    }
  }
}

export default {
  ...exp,
  components: {
    Diagram
  }
}
</script>

<style lang="stylus">

#app
  height 100%
  width 100vw
  position fixed

section.about-me
  overflow hidden
  width 100vw;
  min-height 100vh

h2.welcome
  display flex
  justify-content center
  align-items center
  width 50vmin
  height 50vmin
  border-radius 50%
  background rgba(0,0,0,.6)
  box-shadow 0px 0px 50px inset var(--color-mainbg)
  text-align center
  margin 0px auto
  font-size 6vmin
  color var(--color-blue-light)
  filter drop-shadow( 0px 0px 5px var(--color-blue-light))
  &:before
    display none

.main-planet
  width 80vmin
  height 80vmin
  background url("/img/svg/MainPlanet.svg") center/contain no-repeat
  transform: translate(-45.5%, -47.5%);

.ufo
  width 25vmin
  height 25vmin
  position absolute
  top 5vh
  left 5vw
  background url("/img/svg/UFO.svg") center/contain no-repeat
  transform rotate(-25deg)

.meteor
  width 25vmin
  height 25vmin
  position absolute
  top 3vh
  right 3vw
  background url("/img/article-photo/meteor.svg") center/contain no-repeat


.another-planet
  width 50vmin
  height 50vmin
  position absolute
  bottom -2vh
  left -6vw
  background url("/img/svg/LeftBottomPlanet.svg") center/contain no-repeat

.hole
  width 23vmin
  height 23vmin
  position absolute
  bottom 6vw
  right 1vw
  transform rotate(25deg)
  filter drop-shadow(0 0 1vmin #ff1c76)
  background url("/img/svg/hole.svg") center/contain no-repeat

.fire
  width 60vmin
  height 60vmin
  margin 20px auto
  background url('/img/svg/fire.svg') no-repeat center/contain
</style>
