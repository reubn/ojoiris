module.exports = ({env}) => ({
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    env === 'production' ? require('cssnano') : false,
  ]
})
