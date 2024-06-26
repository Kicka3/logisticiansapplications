const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      changeOrigin: true,
      target: 'http://localhost:3000',
    })
  )
}
