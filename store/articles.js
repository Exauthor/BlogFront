export const state = () => ({
  articles: [],
  filterObject: {
    title: '',
    themes: []
  }
})

export const mutations = {
  SET_ARTICLES(state, { key, value }) {
    state[key] = value
  }
}

export const getters = {
  getArticle: (state, getters) => (id, option = false) => {
    const articles = option ? state.allArticles : state.articles

    return articles.map((item) => item.id).indexOf(id)
  },
  getArticles: (state, getters) => {
    // return ['return', 'all', 'articles', 'by', 'state', 'filter', 'value']
    return 'return all articles by state filter value'
  },
  getThemes: (state) => {
    return Array.from(
      new Set(
        state.articles
          .map((item) => item.themes)
          .reduce((arr, val) => arr.concat(val), [])
      )
    )
  },
  getAmountArticles: (state) => {
    return state.articles.length
  }
}

export const actions = {
  // async nuxtServerInit({ dispatch }) {
  //   await dispatch('search')
  // },
  async getArticle({ state, dispatch }, id, option = false) {
    const articles = option ? state.allArticles : state.articles
    const article = articles.find((article) => article.id === id)
    console.log(`articles: ${articles}, article: ${article}`)

    if (article) {
      return article
    } else {
      await dispatch('getArticles')
      console.log(articles, article)
      return ['return', 'filter', 'value']
    }
  },
  async getArticles({ state, commit }) {
    console.log('UPDATE STATE')
    if (!state.articles.length) {
      const { data } = await this.$axios.get('/articles')
      console.log(data, 'GET FROM BACK')

      commit('SET_ARTICLES', { key: 'articles', value: data })
      //     article['body'] = item.data().body.split("\\n").join("\n");
    }
  }
}
