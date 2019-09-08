<template lang="pug">
  sectio.about-me
    h2.section_title Обо мне
    .about-me
      .about-me_fire
        .fire
      .about-me_text-block
        .about-me_text {{currentText}}
        .about-me_buttons
          .about-me_button(v-for="button in currentButtons" @click="dialogFunc(button.option)") {{button.text}} 
</template>

<script>
export default {
  name: 'AboutMe',
  props: {
    colors: {},
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentText: '',
      currentIndex: 0,
      currentHistory: [],
      currentButtons: [],
      dialog: {
        text: 'Привет, спутник. Вижу, ты заинтересовался мной?',
        buttons: [
          {
            text: 'Нет',
            option: 'no'
          },
          {
            text: 'Да',
            option: 'yes'
          }
        ],
        yes: {
          textMass: [
            'Я Огонек, мой создатель поручил наблюдать за сайтом и приветствовать новых пользователей. Думаю, ты захочешь немного узнать о нём.',
            'Он начал свой путь программиста с 2016 года. Постепенно изучая основы и первобытные алгоритмы, шагая от бита к байту, создатель погружался в логику моего компьютерного мира.',
            'С детства он дружил с карандашом и паяльником, сейчас заменил их компьютерным кодом и Linux.',
            'Философия, искусство, инженерия... Всё это стало зачатком его пути развития.',
            'Сложности заколяют и разжигают огонь в глазах, который дал мне право на жизнь. Новый день - новые вершины, на один навык больше в его арсенале возможностей.'
          ],
          buttons: [
            {
              text: 'Назад',
              option: 'back'
            },
            {
              text: 'Далее',
              option: 'next'
            }
          ]
        },
        no: {
          text: 'Жаль... Всего доброго.',
          buttons: [
            {
              text: 'Назад',
              option: 'back'
            }
          ]
        }
      },
      workDialog: {}
    }
  },
  mounted() {
    this.workDialog = this.dialog
    this.currentButtons = this.dialog.buttons

    this.texting(this.dialog.text)
    this.resize()
  },
  methods: {
    dialogFunc(option) {
      this.resize()

      if (option === 'next') {
        this.currentIndex++
        if (this.workDialog.textMass[this.currentIndex + 1] === null) {
          // this.currentText = this.workDialog.textMass[this.currentIndex]
          this.texting(this.workDialog.textMass[this.currentIndex])
          this.currentButtons = [{ text: 'Назад', option: 'back' }]
          return
        } else {
          // this.currentText = this.workDialog.textMass[this.currentIndex]
          this.texting(this.workDialog.textMass[this.currentIndex])
          return
        }
      } else if (option === 'back') {
        if (this.currentIndex === 0) {
          this.currentHistory.pop()
        } else {
          this.currentIndex--
          // this.currentText = this.workDialog.textMass[this.currentIndex]
          this.texting(this.workDialog.textMass[this.currentIndex])
          this.currentButtons = this.workDialog.buttons
          this.resize()
          return
        }
      }

      this.workDialog = this.dialog

      if (option !== 'back') {
        this.currentHistory.push(option)
      }

      for (let i = 0; i !== this.currentHistory.length; i++) {
        this.workDialog = this.workDialog[this.currentHistory[i]]
      }

      if ('text' in this.workDialog) {
        // this.currentText = this.workDialog.text
        this.texting(this.workDialog.text)
      } else {
        this.texting(this.workDialog.textMass[this.currentIndex])
        // this.currentText = this.workDialog.textMass[this.currentIndex]
      }

      this.currentButtons = this.workDialog.buttons
    },
    texting(text) {
      const textObject = document.querySelector('.about-me_text')

      textObject.style.transition = '.3s'
      textObject.style.opacity = '0'

      const funcResize = this.resize

      setTimeout(function() {
        textObject.innerHTML = text
        textObject.style.transition = '.7s'
        funcResize()
        textObject.style.opacity = '1'
      }, 300)

      // setTimeout(function(){
      // }, 5000)

      // var f = (function(chars) {
      // var char = chars.shift();

      // update();
      // textObject.innerHTML += char;
      /// /console.log(this.currentText);
      // if (chars.length) {
      // setTimeout(f, Math.random() * 60 + 30, chars);
      // }
      // });

      // f(text.split(""));
    },
    resize() {
      setTimeout(function() {
        const textBlock = document.querySelector('.about-me_text-block')
        const text = document.querySelector('.about-me_text')

        textBlock.style.height = `${text.clientHeight}px`
      }, 50)
    }
  }
}
</script>

<style lang="stylus">

:root
  --fire-size: 50vmin

.about-me
  height calc(100vh - 10vmin)
  width 100%
  padding 2vmin 5vmin 5vmin
  box-sizing border-box

.about-me_fire
  width 100%
  height calc(var(--fire-size) * 1.1)
  position relative
  margin-bottom 20px

.about-me-fire-main
  background-size contain
  width calc(var(--fire-size) / 1.31)
  height var(--fire-size)
  position absolute
  bottom 0
  left 50%
  transform translateX(-50%)
  &:before
    content ""
    display block
    width calc(var(--fire-size) * 1 * 1.5)
    height calc(var(--fire-size) * 0.64781746031746 * 1.5)
    position absolute
    top 38%
    left 50%
    transform translate(-50%, -50%)

.about-me_text-block
  width 35vmax
  height 25vh
  background rgba(0,0,0,.4)
  margin 0 auto
  color var(--color-blue-light)
  font 1.1rem forText
  transition 1s height
  position relative

.about-me_text
  box-sizing border-box
  padding 10px
  transition 1s

.about-me_buttons
  height 30px
  width 100%
  display flex
  justify-content space-around
  position absolute
  left 0
  bottom 0
  transform translateY(100%)

.about-me_button
  cursor pointer
  width 100%
  height 100%
  text-align center
  transition .6s
  line-height 30px
  background rgba(0,0,0,.5)
  &:hover
    transition .3s
    background rgba(0,0,0,.6)
    text-shadow 0 0 5px var(--color-blue-light)
</style>
