import axios from 'axios'
import parseJwt from './helpers/parseJwt.js'

axios.defaults.baseURL = 'https://manycrowns.co.uk'

axios.interceptors.request.use(function (config) {
  if (typeof window === 'undefined') {
    return config
  }
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
    console.log(`Inside the config setting :  ${config.headers['Authorization']}`)
  }
  return config
}, error => {
  Promise.reject(error)
})

const appService = {
  getPosts (categoryId) {
    return new Promise((resolve) => {
      axios.get(`/index.php/wp-json/wp/v2/posts?per_page=6&categories=${categoryId}`)
        .then(response => {
          resolve(response.data)
        })
    })
  },
  getProfile () {
    return new Promise((resolve) => {
      console.log(`********************************************************`)
      console.log(`trying :Bearer ${window.localStorage.getItem('token')}`)
      axios.get('https://manycrowns.co.uk/wp-json/wp/v2/users/1')
        .then(response => {
          resolve(response.data)
          console.log(`Data from the server : ${JSON.stringify(response.data)}`)
          console.log(`-------------------------------------------------------`)
        })
    })
  },
  login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post(`/?rest_route=/simple-jwt-login/v1/auth&username=${credentials.username}&password=${credentials.password}`)
        .then(response => {
          resolve(response.data)
          console.log(`Data from the server : ${JSON.stringify(response.data)}`)
          console.log(`-------------------------------------------------------`)
          const jwtObject = parseJwt(response.data['data']['jwt'])
          console.log(`Decoded version  : ${JSON.stringify(jwtObject)}`)
        }).catch(response => {
          reject(response.data)
        })
    })
  }
}

export default appService
