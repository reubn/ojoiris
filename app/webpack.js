const http = require('http')
const {resolve} = require('path')
const {readFileSync} = require('fs')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const Critters = require('critters-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devMode = process.env.NODE_ENV !== 'production'

const config = {
  mode: devMode ? 'development' : 'production',
  entry: ['@babel/polyfill', './src'],
  output: {
    path: resolve('./build'),
    filename: '[chunkhash].js',
    libraryTarget: 'umd'
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
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: 'Ojoiris',
      meta: {
        viewport: 'viewport-fit=cover',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent'
      }
    }),
    new FaviconsWebpackPlugin({
      logo: './src/components/App/logo.png',
      persistentCache: true,
      inject: true,
      background: '#090a10',
      title: 'Ojoiris',
      icons: {
        android: false,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new Critters(),
  ],
  devServer: devMode ? {
    publicPath: '/',
    contentBase: './build',
    compress: true,
    host: 'reumac.local',
    disableHostCheck: true,
    port: 443,
    inline: true,
    https: ({
      key: devMode && readFileSync('/Users/reuben/reumac.local+4-key.pem'),
      cert: devMode && readFileSync('/Users/reuben/reumac.local+4.pem'),
      ca: devMode && readFileSync('/Users/reuben/Library/Application Support/mkcert/reubenRootCA.pem'),
    })
  } : undefined,
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.css', '.json']
  }
}

if(devMode) {
  const wds = new WebpackDevServer(webpack(config), config.devServer)

  wds.listen(443)
  http.createServer(wds.app).listen(80)
} else {
  webpack(config).run(() => null)
}
