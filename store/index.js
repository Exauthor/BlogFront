export const state = () => ({
  error: false,
  loaging: false
})

export const getters = {
  getCSSVariable: (state, getters) => (CSSVariable) => {
    return getComputedStyle(document.documentElement).getPropertyValue(
      CSSVariable
    )
  }
}
