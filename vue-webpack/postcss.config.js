module.exports = {
    plugins: [
      // require('postcss-import')(),
      // require('stylelint')(),
      require('autoprefixer')({'browsers': ['> 1%', 'last 2 versions']}),
    ]
  }