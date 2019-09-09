export const state = () => ({
  articles: [],
  allArticles: [],
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
    return ['return', 'all', 'articles', 'by', 'state', 'filter', 'value']
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
  async getArticles({ state, commit }) {
    console.log('UPDATE STATE')
    if (!state.articles.length) {
      const answer = await this.$axios.get('/articles')
      const allArticles = answer.data
      const articles = allArticles.filter((article) => {
        return article.archive !== true
      })

      commit('SET_ARTICLES', { key: 'articles', value: articles })
      commit('SET_ARTICLES', { key: 'allArticles', value: allArticles })

      // col = await db.collection('articles').get();
      // col.forEach(item => {
      //     var article = item.data();
      //     article['body'] = item.data().body.split("\\n").join("\n");
      //     article['id'] = item.id;
      //     if (article.archive !== true) {
      //     articles.push(article);
      //     }
      //     all.push(article);
      // })
    }
  }
}
