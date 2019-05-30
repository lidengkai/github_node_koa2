const axios = require('axios')

const instance = axios.create({
  baseURL: '',
  // timeout: 2500,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

module.exports = (obj = {}) => {
  return new Promise((resolve, reject) => {
    instance.request(obj).then(res => {
      resolve(res.data)
    }).catch(err => {
      resolve(false)
    })
  })
}