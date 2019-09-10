export const state = () => ({
  articles: [],
  filterObject: {
    title: '',
    excludedThemes: []
  }
})

export const mutations = {
  SET_ARTICLES(state, { key, value }) {
    state[key] = value
  },
  EXCLUDE_THEME(state, theme) {
    state.filterObject.excludedThemes.push(theme)
  },
  INCLUDE_ALL_THEMES(state) {
    state.filterObject.excludedThemes = []
  },
  INCLUDE_THEME(state, theme) {
    state.filterObject.excludedThemes = state.filterObject.excludedThemes.filter(
      (t) => t !== theme
    )
  }
}

export const getters = {
  isExcludeTheme: (state, getters) => (theme) => {
    return state.filterObject.excludedThemes.includes(theme)
  },
  getArticle: (state, getters) => (id, option = false) => {
    const articles = option ? state.allArticles : state.articles

    return articles.find((item) => item.id === id)
  },
  getArticles: (state, getters) => {
    return state.articles.filter((article) => !article.archive)
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
  getAmountArticles: (state, getters) => {
    return getters.getArticles.length
  }
}

export const actions = {
  async getArticle({ state, getters, dispatch }, id, option = false) {
    const article = getters.getArticle(id, option)

    if (article) {
      return article
    } else {
      await dispatch('getArticles')
      return getters.getArticle(id, option)
    }
  },
  async getArticles({ state, commit }) {
    if (!state.articles.length) {
      const { data } = await this.$axios.get('/articles')

      commit('SET_ARTICLES', { key: 'articles', value: data })
    }
  }
}
