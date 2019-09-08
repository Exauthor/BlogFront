<template>
  <div class="bg-contacts">
    <div class="stars"></div>
    <div class="clouds">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="clouds-reflex">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="sun"></div>
    <div class="sea">
      <div class="rocks">
        <div class="rocks_left">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="rocks_right">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

    <div class="contacts">
      <h3>Мои контакты</h3>
      <div class="contacts_blocks">
        <!--<a @click.prevent="mailFunc" target="_black" ></a>-->
        <a href="https://t.me/Warinyourself" target="_black"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OsmosLandscape',
  metaInfo() {
    return {
      title: 'Контакты'
    }
  }
}
</script>
<style lang="stylus">

:root {
  --height-sea: 30vh;
  --animation-time: 15s;
}

.bg-contacts
  height 100vh
  overflow hidden
  position relative
  //background radial-gradient(ellipse 250% 105% at bottom, #e10850 calc(var(--height-sea) * 2), #521350 45%, #1a0533 50%, #1a0533 80%,rgba(247,36,148,0.4) 86.5%, transparent 86.5%, transparent 87%, rgba(247,36,148,0.8) 87%, transparent 93%)
  background radial-gradient(ellipse 250% 105% at bottom,#1a0533 50%, #1a0533 80%,rgba(247,36,148,0.4) 86.5%, transparent 86.5%, transparent 87%, rgba(247,36,148,0.8) 87%, transparent 93%)
  &:before
    content ""
    display block
    bottom 0
    left 0
    width 100%
    height 100%
    background linear-gradient(to top, #e10850 calc(var(--height-sea) + 5vh), #521350 calc(var(--height-sea) + 10vh), transparent 55%)
  &:after
    content ""
    display block
    position absolute
    background radial-gradient(ellipse 250% 105% at bottom, rgba(0,0,0,.25) 93%, transparent 0%)
    animation opacity 10s infinite alternate
    bottom 0
    left 0
    width 100%
    height 100%
    z-index 2

  @keyframes opacity {
    to {
      opacity 0
    }
  }

.contacts
  background rgba(0, 0, 0, .8)
  border-radius 2.5vmin
  width 50vmin
  position absolute
  bottom 50vh
  left 50%
  transform translate(-50%, 45%)
  text-align center
  z-index 10
  padding-bottom 10px
  color rgba(247, 36, 148, 1)
  & h3
    margin 10px 0 0
    font-size 4.5vmin
  & .contacts_blocks
    width 100%
    display flex
    justify-content space-around
    & *
      width 20vmin
      height 20vmin
    & a
      cursor pointer
      filter saturate(20%)
      transition .5s
      transform scale(.8)
      background url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' style='isolation:isolate' width='512' height='450'%3E%3Cpath d='M211 270l-40.918 43.676L181 390l120-90-90-30z' fill='%2315B7AF'/%3E%3Cpath d='M0 180l121 60 90 30 210 180L512 0 0 180z' fill='%2349E6DE'/%3E%3Cpath d='M121 240l60 150 30-120L421 90 121 240z' fill='%2304DED4'/%3E%3C/svg%3E") 50%/contain no-repeat
      &:nth-child(2)
        background url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' style='isolation:isolate' viewBox='0 0 327.4 249.409'%3E%3Cpath d='M17.458.004h292.484c9.635 0 17.458 7.823 17.458 17.458v214.484c0 9.636-7.823 17.458-17.458 17.458H17.458C7.823 249.404 0 241.582 0 231.946V17.462C0 7.827 7.823.004 17.458.004z' fill='%23ffebf5'/%3E%3Cpath d='M289.217 60.435v188.974h22.739c8.53 0 15.444-6.914 15.444-15.436V15.436C327.4 6.913 320.486 0 311.956 0h-8.928L163.7 101.551 24.372 0h-8.936C6.914 0 0 6.914 0 15.436v218.536c0 8.523 6.914 15.436 15.436 15.436h22.747V60.435L163.7 151.92l125.517-91.485z' fill='%23E5125C'/%3E%3C/svg%3E") 50%/contain no-repeat
      &:hover
        filter saturate(100%)
        transform scale(1)


.clouds-reflex
  bottom calc(var(--height-sea) /2 - 10vh)
  opacity .3

.clouds
  bottom calc(var(--height-sea) * 1.5)
  opacity .8

.clouds, .clouds-reflex
  position absolute
  height 19vh
  width 100%
  z-index 1
  & > *
    animation-name cloud
    animation-iteration-count infinite
    position absolute
    &:first-child
      background url("data:image/svg+xml;charset=utf-8,%3Csvg style='isolation:isolate' viewBox='153 714 741 238' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m415 834v-2c0-21-17-38-38-38h-11c-21 0-38-17-38-38v-4c0-21 17-38 38-38h490c21 0 38 17 38 38v4c0 21-17 38-38 38h-99c-21 0-38 17-38 38v2c0 21 17 38 38 38h6c21 0 38 17 38 38v4c0 21-17 38-38 38h-572c-21 0-38-17-38-38v-4c0-21 17-38 38-38h186c21 0 38-17 38-38z' fill='%23ee81c8'/%3E%3C/svg%3E") no-repeat
      height 15vmin
      width 30vmin
      top 5vh
      animation-duration 100s
      animation-delay -60s
      z-index 3
    &:nth-child(2)
      background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' style='isolation:isolate' viewBox='1291 889 402 192' width='402' height='192'%3E%3Cpath d='M1498 889h130c12 0 22 9 22 19 0 11-10 19-22 19h-130c-12 0-22-9-22-19 0-11 10-19 22-19zm90 135v-.964c0-10 8-18 18-18h5c10 0 18-8 18-18v-2c0-10-8-18-18-18h-303c-10 0-18 8-18 18v2c0 10 8 18 18 18h93c10 0 18 8 18 18v.964c0 10-8 18-18 18h-19c-10 0-18 8-18 18v2c0 10 8 18 18 18h292c10 0 18-8 18-18v-2c0-10-8-18-18-18h-68c-10 0-18-8-18-18z' fill-rule='evenodd' fill='%23db67b2'/%3E%3C/svg%3E") 50%/contain no-repeat;
      height 12vmin
      width 20vmin
      top 2vh
      animation-duration 200s
      animation-delay -40s
      z-index 2
    &:last-child
      background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' style='isolation:isolate' viewBox='1050.315 722.398 212.578 62.843' width='212.578' height='62.843'%3E%3Cpath d='M1068.721 753.26c-10.158 0-18.406 7.166-18.406 15.991s8.962 15.99 20 15.99h172.578c11.039 0 20-7.165 20-15.99s-8.961-15.991-20-15.991h-37.892c-11.038 0-20-6.914-20-15.431 0-8.516-8.962-15.431-20-15.431h-57.874c-11.038 0-20 6.915-20 15.431 0 8.517-8.247 15.431-18.406 15.431z' fill='%23C35EA0'/%3E%3C/svg%3E") 50%/contain no-repeat;
      height 7vmin
      width 12vmin
      animation-delay -140s
      animation-duration 300s
      z-index 1


@keyframes cloud {
  from {
    transform translateX(100vw)
  } to {
    transform translateX(-100%)
  }
}

.stars, .stars:before
  height 60vh
  width 100vw
  position absolute
  background url(/img/svg/contacts/stars.svg) 0% top
  background-size calc(25vmin * 5.3) 25vmin

.stars
  bottom var(--height-sea)

.stars:before
  content ""
  display block
  z-index 1
  -webkit-mask-image: -webkit-gradient(linear, left 90%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))
  filter blur(.7px)
  transform translateY(100%)

.sun, .sun:after
  height calc(var(--height-sea) * 1.5)
  width calc(var(--height-sea) * 1.5)
  position absolute
  background url(/img/svg/contacts/sun.svg) 50%/contain no-repeat

.sun
  bottom calc(var(--height-sea) - var(--height-sea) * 1.5 / 3)
  left calc(45vw - var(--height-sea) * .75)

.sun:after
  content ""
  display block
  z-index 1
  transform-origin 50% calc(var(--height-sea) * .5)
  transform translateY(calc(100% - var(--height-sea))) scaleY(.7)
  opacity .5
  filter blur(4px)
  clip-path: polygon(0% calc(var(--height-sea) * .5), 100% calc(var(--height-sea) * .5), 100% 100%, 0% 100%)


.sea
  height var(--height-sea)
  width 100%
  position absolute
  bottom 0
  background linear-gradient(to bottom, #890F50 ,#320567 30%,#240366 99%)


.rocks
  position absolute
  bottom var(--height-sea)
  width 100vw

  & .rocks_left, .rocks_right
    position absolute
    top calc(1px - var(--height-sea))
    height var(--height-sea)
    & *
      position absolute
      bottom 0
    & *, *:before
      width 100%
      height 100%
      z-index 2
    & *:before
      content ""
      display block
      transform translateY(100%) scaleY(-1)
    & *:first-child:before
      opacity .25
      filter blur(4px)
    & *:nth-child(2):before
      opacity .4
      filter blur(3px)
    & *:last-child:before
      width 100%
      opacity .8
      filter blur(1.5px)


  & .rocks_left
    width 40vw

    & *:first-child, *:first-child:before
      background url(/img/svg/contacts/MountainBack_Left.svg) 50% bottom/ contain no-repeat

    & *:nth-child(2), *:nth-child(2):before
      background url(/img/svg/contacts/MountainSecond_Left.svg) 50% bottom/ contain no-repeat

    & *:last-child
      width 95%
    & *:last-child, *:last-child:before
      background url(/img/svg/contacts/MountainFront_Left.svg) 50% bottom/ contain no-repeat

  & .rocks_right
    width 50vw
    right 0

    & *:first-child
      width 95%
      right 0

    & *:first-child, *:first-child:before
      background url(/img/svg/contacts/MountainBack_Right.svg) 50% bottom/ contain no-repeat

    & *:nth-child(2), *:nth-child(2):before
      background url(/img/svg/contacts/MountainSecond_Right.svg) 50% bottom/ contain no-repeat

    & *:last-child, *:last-child:before
      background url(/img/svg/contacts/MountainFront_Right.svg) 50% bottom/ contain no-repeat
    & *:last-child
      width 93%
      right 0

@media screen and (max-width 700px)
  :root
    --height-sea 25vh
</style>
