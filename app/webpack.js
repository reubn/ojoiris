const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const http = require('http')
const {resolve} = require('path')
const {readFileSync} = require('fs')
const CopyPlugin = require('copy-webpack-plugin')

const devMode = process.env !== 'production'
const config = {
  mode: devMode ? 'development' : 'production',
  entry: ['@babel/polyfill', './src'],
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devtool: devMode ? 'source-map' : undefined,
  module: {
  rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader',
        {
          loader: 'css-loader',
          query: {
            localIdentName: devMode ? '[local]-[emoji:1]' : '[emoji:2]',
            modules: true,
            importLoaders: 1
          }
        },
          'postcss-loader'
      ]
    },
    {
      test: /\.png$/,
      use: 'file-loader'
    }
  ]
},
  plugins: [
    new CopyPlugin([
      {from: './src/index.html', to: 'index.html'}
    ]),
  ],
  devServer: {
    publicPath: '/',
    contentBase: './build',
    compress: true,
    host: 'reumac.local',
    disableHostCheck: true,
    port: 443,
    inline: true,
    https: ({
      key: readFileSync('/Users/reuben/reumac.local+4-key.pem'),
      cert: readFileSync('/Users/reuben/reumac.local+4.pem'),
      ca: readFileSync('/Users/reuben/Library/Application Support/mkcert/reubenRootCA.pem'),
    })
    // historyApiFallback: {
    //   rewrites: [{
    //     from: /^.*\/(.+)\/?$/,
    //     to: context => `/${context.match[0]}.html`
    //   }]
    // }
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.css', '.json']
  }
}

const wds = new WebpackDevServer(webpack(config), config.devServer)

wds.listen(443)
http.createServer(wds.app).listen(80)
