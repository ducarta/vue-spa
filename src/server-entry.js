import { app, router, store } from './app.js'
// import { component } from 'vue'

export default context => {
  router.push(context.url)
  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.asyncData) {
      return component.asyncData(store, router.currentRoute)
    }
  })).then(() => {
    context.initialState = store.state
    return app
  })
}
