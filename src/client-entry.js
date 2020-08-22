import { app, router } from './app'

router.onReady(() => {
  app.$mount('#app')
})

// if (module.hot) {
//   module.hot.accept()
// }
