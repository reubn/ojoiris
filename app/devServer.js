const http = require('http')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config.js')

const wds = new WebpackDevServer(webpack(config), config.devServer)

wds.listen(443)
http.createServer(wds.app).listen(80)
