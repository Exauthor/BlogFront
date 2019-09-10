<template lang="pug">
  #app
    section.about-me
      .center-position.main-planet
      .ufo
      .meteor
      .another-planet
      .hole
      h2.welcome.center-position Добро Пожаловать
    section.diagram
      h2 Диаграмма знаний
    section.about-me
      .fire
      h2 Приветик, я космический огонек.
</template>

<script>
import * as d3 from 'd3'

import { mapState } from 'vuex'
import Diagram from '../components/About/Diagram.vue'
import Fire from '../components/About/Fire.vue'
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
      ...mapState('structure', ['diagram']),
      mainSlidesCount() {
        return this.$el.childNodes.length
      },
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
      initBubble() {
        const data = this.diagram

        let drag = (simulation) => {
          function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          }

          function dragged(d) {
            d.fx = d3.event.x
            d.fy = d3.event.y
          }

          function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0)
            drag = false
            d.fx = null
            d.fy = null
          }

          return d3
            .drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
        }
        const height = document.documentElement.clientHeight - 100
        const width = document.documentElement.clientWidth
        const min = height > width ? width : height
        const svg = d3
          .select('.diagram')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`)

        const maxSize = (min / 100) * 20
        const radiusScale = d3
          .scaleSqrt()
          .domain([10, 100])
          .range([maxSize / 6, maxSize])

        const simulations = d3
          .forceSimulation()
          .force('x', d3.forceX(0).strength(0.05))
          .force('y', d3.forceY(0).strength(0.05))
          .force('collide', d3.forceCollide((d) => radiusScale(d.value) + 3))

        const groups = svg
          .selectAll('g.circle')
          .data(data)
          .enter()
          .append('g')
          .call(drag(simulations))
          .attr('class', 'circle-30')
        // .on('click', (d,i) => {
        // console.log('CLICK', d, i);

        // d.vx = Math.random() * 300 + 50;
        // d.vy = Math.random() * 300 + 50;

        /// /data[14].fx = Math.random() * 300 + 50;
        /// /data[14].fy = Math.random() * 300 + 50;

        // simulations.alphaTarget(0.3).restart()
        // });

        const circles = groups
          .append('circle')
          .attr('r', (d) => radiusScale(d.value))
          .attr('data-title', (d) => d.title)
          .attr('fill', (d) => `rgba(0,0,0,.4)`)

        const images = groups
          .append('image')
          .attr('x', (d) => -radiusScale(d.value) * 0.7)
          .attr('y', (d) => -radiusScale(d.value) * 0.7)
          .attr('width', (d) => radiusScale(d.value) * 2 * 0.7)
          .attr('height', (d) => radiusScale(d.value) * 2 * 0.7)
          .attr('xlink:href', (d) =>
            d.img ? d.img.url : '/img/article-photo/docker.svg'
          )

        // setInterval(() => {
        // data[14].fx = Math.random() * 300 + 50;
        // data[14].fy = Math.random() * 300 + 50;

        // simulations.alphaTarget(0.3).restart()
        // }, 1000)

        // let text = groups.selectAll('text')
        // .data(d => [d])
        // .enter()
        // .append('text')
        // .attr('class', 'circle-30')
        // .attr('x', '-20')
        // .attr('y', d => -d.value * .5)
        // .text(d => d.title);

        simulations.nodes(data).on('tick', ticked)

        function ticked() {
          groups.attr('style', (d, i) => {
            return `transform: translate(${d.x}px, ${d.y}px)`
          })
        }
      },
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

        if (
          textArr.includes(originalElement.nodeName) ||
          e.path.filter((node) => node.nodeName === 'svg').length
        ) {
          return
        }

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
        document.querySelectorAll('#app > *').forEach((item) => {
          item.style.height = document.documentElement.clientHeight + 'px'
        })
      }
    },
    mounted() {
      this.initSizeBlocks()
      this.initBubble()
      this.resizeWindow()
    },
    created() {
      // PHONE
      window.addEventListener('touchstart', this.catchTouchstart, {
        passive: false
      })
      window.addEventListener('touchmove', this.catchTouchmove, {
        passive: false
      })
      window.addEventListener('touchend', this.catchTouchend, {
        passive: false
      })

      // DESKTOP
      window.addEventListener('wheel', this.catchWheel, { passive: false })
      window.addEventListener('keydown', this.catchKeydown, { passive: false })

      // DRUG&DROP
      window.addEventListener('mousedown', this.catchClickstart, {
        passive: false
      })
      window.addEventListener('mousemove', this.catchClickmove, {
        passive: false
      })
      window.addEventListener('mouseup', this.catchClickend, { passive: false })

      window.addEventListener('resize', this.initSizeBlocks, { passive: false })
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
        meta: [
          {
            vmid: 'description',
            name: 'description',
            content:
              'Я программист и в этом блоге пишу о том, что знаю и делюсь тем, что выучил.'
          }
        ]
      }
    }
  }
}

export default {
  ...exp,
  components: {
    Diagram,
    Fire
  }
}
</script>
