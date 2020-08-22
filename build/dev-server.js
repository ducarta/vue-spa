const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')
const MFS = require('memory-fs')
const path = require('path')

module.exports = function setupDevServer (app, onUpdate) {
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  // clientConfig.mode = 'development'
  clientConfig.entry.main = [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/client-entry.js'
  ]

  const clientCompiler = webpack(clientConfig)
  app.use(
    require('webpack-dev-middleware')(clientCompiler, {
      stats: {
        colors: true
      },
      log: false,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    })
  )
  app.use(require('webpack-hot-middleware')(clientCompiler))

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, 'server/main.js')
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, () => {
    onUpdate(mfs.readFileSync(outputPath, 'utf-8'))
  })
}
