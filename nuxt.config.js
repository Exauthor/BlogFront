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
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:8080/'
  },

  manifest: {
    name: 'Sisyphus Blog',
    display: 'standalone',
    background_color: '#19102e',
    theme_color: '#150d28'
  },

  build: {
    extend(config, ctx) {}
  }
}
