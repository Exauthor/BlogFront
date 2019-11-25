export const state = () => ({
  articles: [],
  filterObject: {
    search: '',
    excludedThemes: []
  }
})

export const mutations = {
  SET_ARTICLES(state, { key, value }) {
    state[key] = value
  },
  SET_SEARCH(state, value) {
    state.filterObject.search = value
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
    let articles = state.articles.filter((article) => !article.archive)
    const excludedThemes = state.filterObject.excludedThemes

    articles = articles.filter((article) => {
      const sumLength = excludedThemes.length + article.themes.length
      const set = new Set(article.themes.concat(excludedThemes))
      const matchSearch = state.filterObject.search
        ? article.title
            .toLowerCase()
            .includes(state.filterObject.search.toLowerCase())
        : true

      return set.size === sumLength && matchSearch
    })

    return articles
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
      const { data } = await this.$axios.get('/articles/' + id)
      return data[0]
    }
  },
  async getArticles({ state, commit }) {
    if (!state.articles.length) {
      const { data } = await this.$axios.get('/articles')

      commit('SET_ARTICLES', { key: 'articles', value: data })
    }
  },
  async createArticle({ state }, article) {
    await this.$axios.post('http://localhost:8080/articles/', article)
  },
  async deleteArticle({ state }, id) {
    await this.$axios.delete('http://localhost:8080/articles/', {
      data: { id }
    })
  }
}
