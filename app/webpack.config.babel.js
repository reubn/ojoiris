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
        loader: "babel-loader"
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
      host: '0.0.0.0',
      disableHostCheck: true,
      port: 1616,
      inline: false,
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
  }
}
