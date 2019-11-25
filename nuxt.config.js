import axios from 'axios'

export default {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#ff1c76' },

  css: ['@/assets/style/index.styl'],

  plugins: ['~/plugins/vue-meta', '~/plugins/own-prism'],

  buildModules: ['@nuxtjs/eslint-module'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  axios: {
    baseURL: 'http://back:8080/',
    browserBaseURL: 'http://localhost:8080/'
  },

  manifest: {
    name: 'Sisyphus Blog',
    display: 'standalone',
    background_color: '#19102e',
    theme_color: '#150d28'
  },

  generate: {
    routes: function (callback) {
      axios.get('http://back:8080/articles/')
        .then((result) => {
          const articles = result.data.map((value) => value.id)
          console.log(articles, 'FROM GENERATE')
          return callback(null, articles);

          return ['linux_with_tor'] || result.map((value) => value.id)
        })

      // return ['linux_with_tor']
      //   const {data} = axios.get('http://localhost:8080/articles/')
      //   data.map((value) => value.id
      //   db.collection('articles').get().then((qs) => {
      //     var articles = [];
      //     qs.forEach((item) => {
      //       if (item.data().archive !== true) {
      //         articles.push(`/articles/${item.id}`);
      //       }
      //     });

      //     return callback(null, articles);
      //   })
      // }
    }
  },

  build: {
    extend(config, ctx) {}
  }
}
