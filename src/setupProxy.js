const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(proxy('/api', { target: 'http://114.112.164.36:53080', changeOrigin: true }))
}