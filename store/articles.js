export const state = () => ({
  articles: [],
  allArticles: []
})

export const mutations = {
  SET_ARTICLES(state, { type, items }) {
    state[type] = items
  }
}

export const getters = {
  getArticle: (state, getters) => (id, option = false) => {
    const articles = option ? state.allArticles : state.articles

    return articles.map((item) => item.id).indexOf(id)
  },
  getThemes: (state) => {
    return Array.from(
      new Set(
        state.articles
          .map((item) => item.themes)
          .reduce((arr, val) => arr.concat(val), [])
      )
    )
  }
}

export const actions = {
  // async nuxtServerInit({ dispatch }) {
  //   await dispatch('search')
  // },
  async getArticles({ state, commit }) {
    console.log('UPDATE STATE')
    if (!state.articles.length) {
      const articles = await this.$axios.get('/articles')
      const all = []

      console.log(all, articles)

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

      // commit('set', {type: 'articles', items: articles});
      // commit('set', {type: 'allArticles', items: all});
    }
  }
}
