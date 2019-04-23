import {resolve} from 'path'
import {readFileSync} from 'fs'

import CopyPlugin from 'copy-webpack-plugin'

export default env => {
  const devMode = env !== 'production'

  return {
    mode: devMode ? 'development' : 'production',
    entry: './src',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
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
              modules: true
            }
        }
      ]
      }]
    },
    plugins: [
      new CopyPlugin([
        {from: './src/index.html', to: 'index.html'}
      ]),
    ],
    devServer: {
      publicPath: '/',
      contentBase: './dist',
      compress: true,
      host: 'reumac.local',
      disableHostCheck: true,
      port: 1616,
      inline: true,
      https: {
        key: readFileSync('/Users/reuben/reumac.local+4-key.pem'),
        cert: readFileSync('/Users/reuben/reumac.local+4.pem'),
        ca: readFileSync('/Users/reuben/Library/Application Support/mkcert/rootCA.pem'),
      }
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
}
