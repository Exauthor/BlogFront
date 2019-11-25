<template>
  <section class="date-learning">
    <h2>Даты изучения</h2>
    <div class="date-learning_road">
      <svg
        id="roadMapSVG"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="isolation:isolate"
        :viewBox="roadMapViewBox"
      >
        <path
          class="path-roadmap"
          :d="mainPath"
          fill="none"
          :stroke-width="pathWidth"
          :stroke="mainColor"
          stroke-linejoin="miter"
          stroke-linecap="round"
          stroke-miterlimit="3"
        />
        <svg
          v-for="(obj, index) in this.timeObjects"
          :id="obj.id"
          :key="index"
          viewBox="-20 -20 240 240"
          :x="`${index * 200}`"
          y="0"
          height="200"
          width="200"
          @click="changeActive(obj.id)"
        >
          <rect width="200" height="200" fill="transparent"></rect>
        </svg>
      </svg>
    </div>
    <div class="date-learning_info">
      <div
        v-for="(obj, index) in timeObjects"
        :id="`${obj.id + '-text'}`"
        :key="index"
        class="date-learning_block"
      >
        <div class="date-learning-block_img">
          <svg
            :id="`${obj.id + '-svg-bg'}`"
            viewBox="-20 -20 240 240"
            height="100%"
            width="100%"
          >
            <rect width="200" height="200" fill="transparent"></rect>
          </svg>
        </div>
        <div class="date-learning-block_text">
          <h4>{{ obj.title }}</h4>
          <p v-for="(ch, index) in obj.desription" :key="index">{{ ch }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DateLearning',
  props: {
    dur: {
      type: String,
      default: '15s'
    },
    animate: {
      type: Boolean,
      default: true
    },
    colors: {
      type: Object,
      default: () => {
        return {
          mainColor: 'hsl(335, 100%, 55%)'
        }
      }
    },
    splines: {
      type: String,
      default: '0.4 0 0.2 1; 0.4 0 0.2 1'
    }
  },
  data() {
    return {
      pathWidth: 8,
      roadMapTranslate: 0,
      svgSlideNumber: 0,
      responsive: [
        {
          breakpoints: 1024,
          settings: {
            objectToShow: 7
          }
        },
        {
          breakpoints: 800,
          settings: {
            objectToShow: 6
          }
        },
        {
          breakpoints: 600,
          settings: {
            objectToShow: 5
          }
        }
      ]
    }
  },
  computed: {
    roadMapNode() {
      return document.querySelector('#roadMapSVG')
    },
    roadMapWidth() {
      return (
        (this.roadMapNode.parentElement.clientWidth / this.currentShow) *
        this.objectsCount
      )
    },
    roadMapItemWidth() {
      return this.roadMapWidth / this.objectsCount
    },
    objectsCount() {
      return this.timeObjects.length
    },
    currentShow() {
      const widthWindow = document.documentElement.clientWidth
      let current = 10
      for (let i = 0; i <= this.responsive.length - 1; i++) {
        if (widthWindow < this.responsive[i].breakpoints) {
          current = this.responsive[i].settings.objectToShow
        }
      }
      return current
    },
    roadMapViewBox() {
      return `-${this.pathWidth / 2} -20 ${200 * this.timeObjects.length +
        this.pathWidth * 2} 240`
    },
    mainPath() {
      const angle = 140 - this.pathWidth / 2
      const dPathTop = ` s 200,-${angle} 200,0`
      const dPathBottom = ` s 200,${angle} 200,0`
      let d = `M 0,100 c 0,${angle} 200,${angle} 200,0`
      // var dPathBottom = "M 0,100 c 0,150 200,150 200,0";

      for (let i = 1; i <= this.timeObjects.length - 1; i++) {
        if (i % 2) {
          d += dPathTop
        } else {
          d += dPathBottom
        }
      }

      return d
    },

    // COLORS
    main: () => window.theme,
    mainColor() {
      // if (this.colors.mainColor) {
      //   if (this.colors.mainColor.slice(0, 3) !== 'hsl') {
      //     return this.main.convertToHsl(this.colors.mainColor)
      //   }
      //   return this.colors.mainColor
      // }
      return 'hsl(335, 100%, 55%)'
    },
    mainColorDark() {
      // if (this.colors.mainColorDark) {
      //   return this.colors.mainColorDark
      // }
      // return this.main.changeHsl(this.mainColor, 0, -7, -5)
      return 'hsl(335, 93%, 50%)'
    },
    timeObjects() {
      const objectTime = [
        {
          title: 'HTML&CSS',
          desription: [
            'Мой 2017 год начался с острой необходимости в самореализации. В поисках деятельности, удовлетворяющих нужду, сформулировал два основных критерия: обязательность интеллектуальных ресурсов и актуальность профессии. Выбирая между нейробиологией и программированием, предпочёл последнее, начав с изучения сайтостроения.',
            'Исследуя новый мир, перебирая информацию, освоил комплекс базовых  понятий. Непрерывное чтение статей, настройка текстового редактора, изучение HTML&CSS,  так началась моя дорогая Web-программиста.'
          ],
          elapsedTime: '31 days',
          svgPath: `<path d=" M 0 42.372 L 97.853 42.372 L 86.346 143.804 L 48.931 157.628 L 9.214 143.804 L 0 42.372 Z " fill="${this.mainColorDark}"/><path d=" M 48.823 52.69 L 89.093 52.69 L 79.646 135.961 L 48.93 147.31 L 48.823 147.273 L 48.823 52.69 Z " fill="${this.mainColor}"/><path d=" M 78.463 77.77 L 79.366 65.719 L 18.487 65.59 L 21.521 103.078 L 65.508 103.379 L 64.314 118.342 L 50.444 122.66 L 34.778 118.744 L 33.763 109.176 L 22.124 108.802 L 23.783 128.526 L 48.937 134.41 L 74.702 126.285 L 77.146 91.864 L 31.726 92.068 L 31.463 77.77 L 78.463 77.77 Z " fill="white"/><path d=" M 101.151 42.372 L 199.005 42.372 L 187.497 143.804 L 150.083 157.628 L 110.366 143.804 L 101.151 42.372 Z " fill="rgb(4,195,200)"/><path d=" M 149.975 52.69 L 190.245 52.69 L 180.798 135.961 L 150.082 147.31 L 149.975 147.273 L 149.975 52.69 Z " fill="rgb(35,245,215)"/><path d=" M 120.395 77.501 L 119.897 64.759 L 181.658 64.966 L 179.919 77.719 L 151.269 89.13 L 178.76 89.428 L 174.818 125.484 L 150.067 135.241 L 124.405 124.816 L 124.405 108.777 L 135.608 108.86 L 135.632 114.792 L 150.067 122.009 L 162.497 117.999 L 164.1 101.159 L 121.826 102.245 L 121.275 88.739 L 150.067 77.501 L 120.395 77.501 Z " fill="white"/>`
        },
        {
          title: 'Верстка и литература',
          desription: [
            'После изучения базы, пришло время реализации. Это оказалось сложнее, чем я ожидал, но тем не менее это подтвердило устоявшееся выражение - 80% практики и 20% теории.',
            'Преодолев стену неуверенности в практике прохождением уроков на HTMLacademy, я сильно повысил свой навык в вёрстке.',
            'Продолжая изучать новые технологии: gulp, препроцессоры stylus и pug, адаптивность, я значительно ускорил и улучшил качество своей работы.',
            'Изучив вдоль и поперек всевозможные и новейшие атрибуты, свойства и значения HTML&CSS, сверстав более двадцати макетов, дал себе понять, что пора идти на изучение JavaScript.'
          ],
          elapsedTime: '3 mounth',
          svgPath: `<path d=" M 124 27 L 117 25 C 116 25 115 25 114 25 C 113 26 113 26 113 27 L 72 168 C 72 169 72 170 72 170 C 73 171 73 172 74 172 L 81 174 C 82 174 83 174 84 174 C 85 173 85 173 85 172 L 126 31 C 126 30 126 29 126 29 C 125 28 125 27 124 27 Z " fill="${this.mainColor}"/><path d=" M 63 54 C 63 53 62 52 62 52 L 56 46 C 56 46 55 45 54 45 C 53 45 52 46 51 46 L 1 97 C 0 98 0 99 0 99 C 0 100 0 101 1 102 L 51 153 C 52 153 53 154 54 154 C 55 154 56 153 56 153 L 62 147 C 62 147 63 146 63 145 C 63 144 62 143 62 142 L 19 99 L 62 57 C 62 56 63 55 63 54 Z  M 197 97 L 147 46 C 146 46 145 45 144 45 C 143 45 142 46 142 46 L 136 52 C 136 52 135 53 135 54 C 135 55 136 56 136 57 L 179 99 L 136 142 C 136 143 135 144 135 145 C 135 146 136 147 136 147 L 142 153 C 142 153 143 154 144 154 C 145 154 146 153 147 153 L 197 102 C 198 101 199 100 199 99 C 199 99 198 98 197 97 Z " fill-rule="evenodd" fill="${this.mainColorDark}"/>`
        },
        {
          title: 'JS',
          desription: [
            'Вдумчивое изучение первого языка программирования. Со всей ответственностью подошел к чтению тонны литератур и статей, с энтузиазмом вычитывал любую строчку, любую переменную, любую функцию, которая могла мне когда-либо понадобиться.',
            'Познавая иную вселенную, через месяц технических изучений, голова, набитая терминами, правилами и ошибками, перегорела. Любая статья веля себя, как застрявший в горле ком информации, отказывающийся перевариваться.',
            'Мозг превратился в кашу и перестал реагировать даже на первобытные инстинкты, пора отдохнуть.'
          ],
          elapsedTime: '1 mounth',
          svgPath:
            '<path d="M15 .5h169L164 175.6l-64.6 23.9L31 175.6 15 .5z" fill="#E00873"/><path d="M99.3 18.3H169l-16.4 143.8-53 19.6h-.2V18.2z" fill="#FF1C76"/><path d="M73.8 43.7H90V156l-48.6-14 .3-18.3 32 7.6V43.7zM154.9 61l1.9-18-52 1.1-.5 73.8 33-6.4-1.5 17.3-31.6 8.5-.6 18.9 44.8-12.3 5.5-54.2-33.2 4.5.5-31 33.7-2.2z" fill-rule="evenodd" fill="#FFF"/>'
        },
        {
          title: 'PS',
          desription: [
            'Оставил бесформенную массу формулировок в голове, пока мой мозг не отсеял нужное от ненужного.',
            'Решил занять это время тем, что у меня хорошо получается - изобразительным искусством. Много рисуя и экспериментируя, я дошёл до Photoshop, освоив выше среднего следующие навыки: сочетания клавиш, автоматизация, фильтры, чувствительность к нужным оттенкам цветов, всё это было на уровне моторики. Проходил "сложные" уроки на "Фотошоп-мастер", но уже через месяц они перестали казаться мне такими сложными.',
            'Проходил курсы: маскирование, ретуширование и автоматизация процессов, и вскоре почувствовал, что у меня достаточно опыта, чтобы начать зарабатывать на обработке фотографий, но дело не казалось мне достаточно творческим, отчего я отбросил данную идею заработка, оставив этот навык в сундуке познаний до лучших времён.'
          ],
          elapsedTime: '2 mounth',
          svgPath:
            '<circle cx="100" cy="100" r="104" fill="transparent" stroke-width="9" stroke="#14D7F9" stroke-linecap="square" stroke-miterlimit="3"/><circle cx="100" cy="100" r="100" fill="#18163F"/><path d="M76 58q7 0 13 4t9 10q4 6 4 14 0 7-4 14-3 6-9 10t-13 4H52v28l-1 4q-2 2-5 2l-4-2-1-4V65l1-5q2-2 5-2h29zm0 44q4 0 7-2l5-6 1-8q0-7-3-11-4-5-10-5H52v32h24zm36 36l-1-4q0-2 3-4l3-1 4 2 8 6q5 2 11 2 5 0 8-2 4-2 4-7 0-4-4-6-4-3-11-5-7-1-12-4-5-2-8-6t-3-10q0-6 3-10 3-5 9-7 5-3 12-3 6 0 12 3 6 2 10 7l1 3-2 4q-1 2-3 2l-4-2q-2-3-6-5l-9-1q-5 0-8 2t-3 6q0 5 3 7l12 4 11 4q5 2 8 6t3 11q0 6-3 10-4 5-10 7-5 2-11 2-8 0-15-2-7-3-12-9z" fill-rule="evenodd" fill="#21D5FA"/>'
        },
        {
          title: 'Python',
          desription: [
            'Спустя 2 месяца, моё желание к вёрстке так и не пробудилось, поэтому я решил занять себя чем-то новым. Я решил изучить Python и вскоре понял, что именно с него мне стоило начать изучение программирования, так как это простой и ясный язык. Несмотря на его лёгкость, я потратил 2 месяца на освоение всех стандартных библиотек, которых оказалось больше 15, а в каждой из них содержалось примерно по 10 функций с различными аргументами и выводами.',
            'Параллельно изучению я узнавал много нового об алгоритмах и решал задачи высокой сложности на CodeWars, что сильно помогло развить во мне навык логики и алгоритмов. Чтобы не растерять всё изученное со временем, я воспользовался мнематехникой - природным способом запоминания, основанным на визуализации объектов и их взаимодействия. Но, к сожалению, такой большой объём знаний оказался бесполезным в будущем, поэтому я вывел этому заболеванию название - "Болезнь новичка", когда ты хочешь выучить как можно больше, надеясь на то, что это тебе когда-нибудь понадобится. Распознав в себе подобную болезнь, я понял причину отказа продолжать работу с JS, но стоило как-то выразить навык Python во что-то целостное. Хорошо, что незадолго до изучения Python, я узнал о Data Science.'
          ],
          elapsedTime: '2 mounth',
          svgPath:
            '<path d="M151.2 48.6v26.2c0 15.5-13.6 30-29.7 30H79.7a24 24 0 0 0-24 23.9v44.9c0 12.7 11 22.3 24 24.4 8.1 1.3 8.5 2 16.7 2 8 0 16-.8 22.9-2 20-3.5 23.6-10.9 23.6-24.4v-21H95.1v-8.5h70.5a30 30 0 0 0 30-23.9c4.3-17.9 4.5-29 0-47.6-3.5-14-11.7-24-25.5-24h-19zm-28 114.7a9 9 0 0 1 0 18 9 9 0 0 1-9-9c0-5 4.2-9 9-9z" fill="#17CCC3"/><path d="M102.7 0c-8.2 0-16.1.8-23 2-20 3.5-23.6 10.9-23.6 24.4v21h47.8v8.5H33.4A30 30 0 0 0 3.5 79.8a86.6 86.6 0 0 0 0 47.6c3.4 14 11.6 24 25.4 24h19v-26.2c0-15.5 13.5-30 29.6-30h41.8a24 24 0 0 0 24-23.9V26.4c0-12.7-11-22.3-24-24.4-8.1-1.3-8.5-2-16.6-2zm-27 18.7c5 0 9 4 9 9s-4 9-9 9a9 9 0 0 1 0-18z" fill="#FF1C76"/>'
        },
        {
          title: 'Data Science',
          desription: [
            'Наука о данных.',
            'Очень актуальная профессия будущего, ведь количество фотографий в Instagram, кулинарных статей и детских видео на YouTube неумолимо растёт и кому-то нужно их обрабатывать. В анализ идут терабайты данных различного качества.',
            'Профессия заключается в поиске закономерностей между «Выводы агитации либеральной партии» и «Политический выбор граждан штата Орегона», что является самым простым и наглядным примером. Конечный продукт данной профессии - уменьшение издержек, увеличение продуктивности и поиск закономерностей.',
            'Моя выгода в изучении DS в большей степени стало значительное улучшение английского языка, чем знания библиотек по обработке данных (numpy, pandas, matplotlib).',
            'Не пошёл в Data Science программисты, так как посчитал эту профессию не самостоятельной, но выбрал данную дисциплину по собственному не коммерческому интересу и в пути обрёл большое количество опыта.'
          ],
          elapsedTime: '3 mounth',
          svgPath:
            '<g fill="#E00873"><circle cx="178.3" cy="129.6" r="20.7"/><circle  cx="18.1" cy="58.9" r="18.1"/><circle cx="88.6" cy="183.2" r="8.6"/><circle cx="32" cy="134.9" r="11.2"/><circle cx="114" cy="22" r="14.3"/><circle cx="97.1" cy="108.5" r="12.9"/></g><g stroke-width="8.6" stroke="#FF1C76" stroke-linecap="round" stroke-miterlimit="3"><path d="M41.4 71.3l34.8 24.3M102.8 85.1l9.1-40M149 123.2l-30.9-9.5M89.5 168.4l4.8-36.6M50.5 129.9L77.6 118M24.3 117.5L21.4 87M39.5 44.2l51-17.6M45.7 145.1l29 29.1M104.7 181.8l52.9-33.8M165.2 103.2l-35.7-67.6"/></g>'
        },
        {
          title: 'Arch&Linux',
          desription: [
            'Никогда не задумывался о том, что есть альтернатива Windows (MacOS не в счёт, так как она проприетарна). Случайно нашёл рассуждение «Windows vs Ununtu», и мне стало интересно узнать отличия  между ними. Так как Windows при загрузке выдавал неизвестную ошибку, а избавиться от неё не получалось - мне не составило сложности заменить Windows на Ubuntu (не получилось установить совместно). Познание новой системы начались с её настройки. Невиданные возможности кастомизации по сравнению с Windows, удивили меня. Настроив окружающую среду и установив все необходимые программы, моё ознакомление с Ubuntu закончилось.',
            'Дальнейшим резким рывком в изучении Linux стало техническая поломка с основным компьютером. Пришлось использовать ноутбук значительно слабее предыдущего. Двенадцать гб оперативной памяти сменились двумя, частоты процессора... о них и говорить не хочется. В условиях дефицита пришлось контролировать каждый мегабайт ОЗУ, каждый такт процессора. Начал менять ОС в пользу оптимизации. Методом проб и ошибок, дошёл до Arch Linux. Чтобы покорить его, мне потребовались хорошие знания функционирования компьютера и ОС, но изучив всё, я добился сверхрезультатов. И починив свой основной компьютер, установил на него Arch Linux.',
            'Arch Linux дал мне возможность всё настроить именно так, как мне бы хотелось. Условия нехватки мощностей повлияли и на мой выбор приложений, большинство из них сменились на терминальные. Заменил тяжелый Atom на лёгкий и быстрый Nvim, благодаря которому я получил совершенно иной опыт в написании кода. Теперь моя ОС загружается за 20-25 секунд вместо положенных 100 секунд на Windows.'
          ],
          elapsedTime: '3 mounth',
          svgPath:
            '<linearGradient id="a" x1=".5" x2=".5" y2=".9" gradientTransform="translate(0 .5) scale(199.005)" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#f6135e"/><stop offset="23.9%" stop-color="#a11258"/><stop offset="100%" stop-color="#280123"/></linearGradient><path d="M99.5.5c-8.9 21.7-14.2 36-24.1 57 6 6.4 13.5 13.9 25.5 22.3C88 74.5 79.1 69 72.5 63.6A2710.6 2710.6 0 0 1 0 199.5c31.5-18.2 56-29.4 78.8-33.7a58 58 0 0 1-1.5-13.5v-1c.5-20.2 11-35.8 23.5-34.7 12.4 1 22.1 18.3 21.6 38.5 0 3.8-.5 7.5-1.3 10.9 22.6 4.4 46.8 15.5 78 33.5l-17-31.2c-8.2-6.4-16.8-14.7-34.3-23.7 12 3.2 20.7 6.8 27.4 10.8C122 56.4 117.7 43.3 99.5.5z" fill="url(#a)"/>'
        },
        {
          title: 'Vue',
          desription: [
            'Прошло достаточно времени, чтобы воскресить интерес к сайтостроению + появились новые идеи. С новым опытом обновился взгляд на старые вещи. Выучил библиотеку jQuery и начал верстать. Продолжая работать, столкнулся с новыми технологиями: PWA (Progressive Web App), Vue, SMIL анимация. Больше всего внимания акцентировал на Vue. Его доступность и хорошая документация дали мне возможность уже применить эту технологию на практике через пару дней. Дальше я расширял знания: VueX, Vue-resource, axios. Теперь у меня хватало знаний создать визуал SPA (Single Page Applications), но не доставало логики приложения.'
          ],
          elapsedTime: '1 mounth',
          svgPath:
            '<path d="M59.2.5H7L53.3 100l46.2 99.5 46.2-99.5L192 .5h-52L99.4 87.3 59.2.5z" fill="#FF1C76"/><path d="M32 .5H7L53.4 100l46.2 99.5 46.2-99.5L192 .5h-25l-21.2 45.7-46.2 99.5-46.2-99.5L32 .5z" fill="#E00873"/>'
        },
        {
          title: 'Golang',
          desription: [
            'Чтобы создать самостоятельное функционирующее PWA приложение, необходимо знать back-end (логику сайта). Выбор резко остановился на NodeJS. Изучая его, я параллельно узнавал новые альтернативы. И уже через месяц начал изучать Golang. Его преимущества состояли в простоте и читаемости кода, компилируемости и в лучшей многопоточности, чем в NodeJS. Пройдя столь долгий путь, я имею хорошие представления о технической стороне работы компьютера, ОС и интернете в целом, благодаря чему я могу создавать различные сайты, писать сервисы, рисовать картины.'
          ],
          elapsedTime: '1 mounth',
          svgPath:
            '<path d="M121.3 1.5c11 1.4 15.7 35.3 14.5 76.8-.2 4.8-.4 9.6-.8 14.2l-22.7-14.9 9-76.1z" fill="#B9015A"/><path d="M87.6.5l33.7 1-8.2 76.5-21.7-.6L87.6.5z" fill="#E00873"/><path d="M75 192.6L71.3 171c-33.6 12-39.8-20-35.5-41 5.4-27 42.2-42 60.8-3l6.2.1c14-30.3 49.5-24.6 59.9 2.6C173 156.8 152.9 192 126 175l-1.3 15.5c38.2 11.5 59.1 12.4 58.8-17.6-.2-18.9 11.4-98.2-83-99.4C6.1 72.4 14 160.5 16.4 177c2.4 16.5 27.2 31.8 58.6 15.6z" fill="#B9015A"/><path d="M64.3 173c-5.7 1.1-10.4.8-14.2-.7-21.7-.2-25.5-25.8-22-43.5 3.8-18.2 21.7-31 38.7-25.4 10.2.2 21 6.5 28.8 21.6 8.3-17.2 23.7-22.4 37.2-18.3 12.4.5 24.5 8.9 29.9 23 9.3 24.6-6.7 52.8-29.8 45.1-2.5-.6-7.2-1.5-7.3-1.7l-.9 17.4c7.7 2.3 14.7 4.2 21 5.5 19.9 2.7 30.4-3 30.2-24.4-.2-17 9.2-82.8-57.5-96.8-5.5-.7-11.5-1.2-17.9-1.3C6.1 72.4 14 160.5 16.4 177c1.3 9 9.3 17.7 21.4 21a55 55 0 0 0 29.6-6.7L64.3 173z" fill="#F50075"/>'
        }
      ]

      for (let i = 0; i < objectTime.length; i++) {
        if (objectTime[i].title === 'Верстка и литература') {
          objectTime[i].id = 'html-practice'
        } else {
          objectTime[i].id = objectTime[i].title
            .replace(' ', '_')
            .replace('&', '-')
            .toLowerCase()
        }
        objectTime[i].id = 'roadmap-time-object-' + objectTime[i].id
      }

      return objectTime
    }
  },
  mounted() {
    // Parsing from xml (make svg)
    for (let i = 0; i < this.timeObjects.length; i++) {
      const svg = document.getElementById(this.timeObjects[i].id)
      const parser = new DOMParser()
      const htmlDoc = parser.parseFromString(
        `<g xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate">${this.timeObjects[i].svgPath}</g>`,
        'text/xml'
      )
      // )
      // svgBG = document.getElementById(this.timeObjects[i].id + '-svg-bg'),

      if (i === 0) {
        svg.classList.add('active')
        document
          .getElementById(this.timeObjects[i].id + '-text')
          .classList.add('active')
      }

      // svgBG.appendChild(htmlDoc.documentElement.cloneNode(true));
      svg.appendChild(htmlDoc.documentElement)
    }

    // Start animation path and width
    this.animateSVGPath('start')
    this.roadMapNode.style.width = `${this.roadMapWidth}px`

    // Scroll touch Road Date
    this.roadMapNode.addEventListener('wheel', this.scrollSVG)
    // Drag&Drop (click)
    this.roadMapNode.addEventListener('touchstart', this.touchStartRoad)
    this.roadMapNode.addEventListener('touchmove', this.touchMoveRoad)
    this.roadMapNode.addEventListener('touchend', this.touchEndRoad)
    // Drag and Drop (touch)
    this.roadMapNode.addEventListener('mousedown', this.clickStartRoad)
    this.roadMapNode.addEventListener('mousemove', this.clickMoveRoad)
    this.roadMapNode.addEventListener('mouseup', this.clickEndRoad)

    this.changeActiveText()
    const textBlock = document.querySelector('.date-learning_info')

    textBlock.addEventListener('wheel', this.wheelText)
    textBlock.addEventListener('touchstart', this.touchStartText)
    textBlock.addEventListener('touchmove', this.touchMoveText)
    textBlock.addEventListener('touchend', this.touchEndText)
  },
  destroyed() {
    this.roadMapNode.removeEventListener('wheel', this.scrollSVG)
    // Drag&Drop (click)
    this.roadMapNode.removeEventListener('touchstart', this.touchStartRoad)
    this.roadMapNode.removeEventListener('touchmove', this.touchMoveRoad)
    this.roadMapNode.removeEventListener('touchend', this.touchEndRoad)
    // Drag and Drop (touch)
    this.roadMapNode.removeEventListener('touchstart', this.touchStartRoad)
    this.roadMapNode.removeEventListener('touchmove', this.touchMoveRoad)
    this.roadMapNode.removeEventListener('touchend', this.touchEndRoad)
  },
  methods: {
    scrollSVG(event) {
      event.stopPropagation()

      if (event.deltaY > 0) {
        this.roadMapScrollTo('right')
      } else {
        this.roadMapScrollTo('left')
      }
    },
    roadMapScrollTo(option) {
      if (option === 'right') {
        this.svgSlideNumber++
      } else if (option === 'left') {
        this.svgSlideNumber--
      }

      if (this.svgSlideNumber > this.objectsCount - this.currentShow) {
        this.svgSlideNumber = this.objectsCount - this.currentShow
      } else if (this.svgSlideNumber < 0) {
        this.svgSlideNumber = 0
      }

      this.animateSVGPath(option)
    },
    animateSVGPath(option) {
      const path = this.roadMapNode.firstChild
      const objectPathLength = path.getTotalLength() / this.objectsCount

      path.getBoundingClientRect()

      if (option === 'start') {
        const length = path.getTotalLength()

        path.style.transition = path.style.WebkitTransition = 'none'
        path.style.strokeDasharray = length + ' ' + length
        path.style.strokeDashoffset = length

        path.style.transition = path.style.WebkitTransition = `stroke-dashoffset ${this
          .currentShow * 0.4}s ease`
        path.style.strokeDashoffset = 0
      } else if (option === 'left') {
        path.style.transition = path.style.WebkitTransition = `stroke-dashoffset .8s ease`
      } else {
        path.style.transition = path.style.WebkitTransition = `stroke-dashoffset 2s ease`
      }

      if (this.objectsCount - this.currentShow < 0) {
        path.style.strokeDashoffset = 0
      } else {
        path.style.strokeDashoffset =
          (this.objectsCount - this.currentShow - this.svgSlideNumber) *
          objectPathLength
      }

      this.roadMapNode.style.transition = '1s'
      this.roadMapNode.style.transform = `translate3d(${this.svgSlideNumber *
        -this.roadMapItemWidth}px, 0px, 0px)`
    },
    clickStartRoad(e) {
      e.stopPropagation()
      this.clickObject = [e.clientX, e.clientY]
    },
    clickMoveRoad(e) {
      e.stopPropagation()
      if (!this.clickObject) {
        return
      }
      const shiftX = this.clickObject[0] - e.clientX

      this.roadMapNode.style.transition = 'none'
      this.roadMapNode.style.transform = `translate3d(${-this.svgSlideNumber *
        this.roadMapItemWidth -
        shiftX}px, 0px, 0px)`
    },
    clickEndRoad(e) {
      e.stopPropagation()
      const shiftX = this.clickObject[0] - e.clientX
      const step = Math.round(shiftX / 50)
      for (let i = 0; i < Math.abs(step); i++) {
        this.roadMapScrollTo(step > 0 ? 'right' : 'left')
      }
      this.clickObject = undefined
    },
    touchStartRoad(e) {
      e.stopPropagation()
      this.touchObject = [
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      ]
    },
    touchMoveRoad(e) {
      e.stopPropagation()

      const shiftX = this.touchObject[0] - e.changedTouches[0].clientX

      this.roadMapNode.style.transition = 'none'
      this.roadMapNode.style.transform = `translate3d(${-this.svgSlideNumber *
        this.roadMapItemWidth -
        shiftX}px, 0px, 0px)`
    },
    touchEndRoad(e) {
      e.stopPropagation()
      const shiftX = this.touchObject[0] - e.changedTouches[0].clientX
      const step = Math.round(shiftX / 50)

      for (let i = 0; i < Math.abs(step); i++) {
        this.roadMapScrollTo(step > 0 ? 'right' : 'left')
      }
    },

    touchStartText(e) {
      if (
        (this.textBlockScrollSize < 0 && this.textBlockScrollPosition === 0) ||
        (this.textBlockScrollSize < 0 && e.deltaY > 0) ||
        (this.textBlockScrollPosition <= 0 && e.deltaY < 0)
      ) {
        return
      }

      this.touchTextObject = [
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      ]

      if (!(this.textBlockScrollDirection === undefined)) {
        console.log('Start Touch Text.')
        return
      }

      e.stopPropagation()
    },

    touchMoveText(e) {
      if (this.touchTextObject === undefined) {
        return
      }

      const shiftY = this.touchTextObject[1] - e.changedTouches[0].clientY

      if (
        (this.textBlockScrollDirection === 'bottom' && shiftY > 0) ||
        (this.textBlockScrollDirection === 'top' && shiftY < 0)
      ) {
        return
      }

      this.textBlock.style.transition = 'none'
      this.textBlock.style.transform = `translate3d(0px, ${-this
        .textBlockScrollPosition - shiftY}px, 0px)`

      e.stopPropagation()
    },

    touchEndText(e) {
      if (this.touchTextObject === undefined) {
        return
      }

      const shiftY = this.touchTextObject[1] - e.changedTouches[0].clientY

      if (
        (this.textBlockScrollDirection === 'top' && shiftY < 0) ||
        (this.textBlockScrollDirection === 'bottom' && shiftY > 0)
      ) {
        this.textBlockScrollDirection = undefined
        return
      }

      this.textBlockScrollPosition += shiftY
      if (this.textBlockScrollPosition < 0) {
        this.textBlockScrollPosition = 0
        this.textBlockScrollDirection = 'top'
        this.textBlock.style.transition = '.2s'
        this.textBlock.style.transform = `translate3d(0px, 0px, 0px)`
      } else if (this.textBlockScrollPosition > this.textBlockScrollSize) {
        this.textBlockScrollPosition = this.textBlockScrollSize
        this.textBlockScrollDirection = 'bottom'
        this.textBlock.style.transition = '.2s'
        this.textBlock.style.transform = `translate3d(0px, ${-this
          .textBlockScrollSize}px, 0px)`
      }

      e.stopPropagation()
    },

    wheelText(e) {
      if (
        (this.textBlockScrollSize < 0 && this.textBlockScrollPosition === 0) ||
        (this.textBlockScrollSize < 0 && e.deltaY > 0) ||
        (this.textBlockScrollPosition <= 0 && e.deltaY < 0)
      ) {
        return
      }
      let step

      if (e.deltaY < 0) {
        step = -20
      } else {
        step = 20
      }
      this.textBlockScrollSize -= step
      this.textBlockScrollPosition += step
      this.textBlock.style.transform = `translate3d(0px, -${this.textBlockScrollPosition}px, 0px)`
      e.stopPropagation()
    },

    changeActiveText() {
      this.textBlock = document.querySelector('.date-learning_block.active')
      this.textBlockScroll =
        this.textBlock.childNodes[1].clientHeight > this.textBlock.clientHeight
      this.textBlockScrollSize =
        this.textBlock.childNodes[1].clientHeight - this.textBlock.clientHeight
      this.textBlockScrollPosition = 0
      this.textBlockScrollDirection = undefined
    },

    changeActive(id) {
      const svg = document.getElementById(id)
      const svgDesc = document.getElementById(id + '-text')
      svg.classList.add('active')
      svgDesc.classList.add('active')
      for (let i = 0; i < this.timeObjects.length; i++) {
        if (this.timeObjects[i].id !== id) {
          document
            .getElementById(this.timeObjects[i].id)
            .classList.remove('active')
          document
            .getElementById(this.timeObjects[i].id + '-text')
            .classList.remove('active')
        }
      }
      this.changeActiveText()
    }
  }
}
</script>

<style lang="stylus">
// @import '../assets/stylus/mixins.styl'

.date-learning_road
  width 80%
  margin 20px auto
  display block
  overflow-x hidden
  & > svg
    transition 1s ease
    & > path
      z-index 10
    & > svg > g
      opacity .5
      transition .4s
      transform-origin center
      transform scale(.65)
      z-index -10
    & > svg.active > g, > svg:hover > g
      opacity 1
      transform scale(.9)

.date-learning_info
  display block
  width 80%
  height calc(100vh - 10vmin - 200px)
  margin 20px auto
  overflow hidden
  position relative

.date-learning_block
  width 100%
  height 100%
  opacity 0
  position absolute
  top 0
  left 0
  transition 1s
  transform scale(.8) translateY(20%)
  &.active
    opacity 1
    transform scale(1) translateY(0%)

.date-learning-block_img
  display none
  width 100%
  height 100%
  position absolute
  & > svg
    z-index 1
    filter blur(3px) saturate(50%) opacity(.45)

.date-learning-block_text
  z-index 5
  position absolute
  width 100%
  padding 10px
  box-sizing border-box
  font-family forText
  & > h4
    margin 5px 0px
    text-align center
  & > p
    margin 0px
</style>
