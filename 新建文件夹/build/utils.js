var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
exports.getEntries = function (str) {
  //  let includePage = ['user_login_index','user_regist_index','index','devpage_index'];
  let includePage = [];
  // let includePage = ['manage_index','yzly_lsyg_index','yzly_rwls_rwlsdetail_index','user_login_index','index','yzly_index','yzly_rwls_rwlslb_index'];
  let home = 'InternetPlus';
  var entries, tmp, pathname;
  entries = glob.sync(str).reduce((result, entry) => {
    // var basename = path.basename(entry, path.extname(entry));
    // tmp=entry.split('/').splice(-3);
    //  console.log(entry);
    tmp = entry.replace(/.+\/([^\/]+)\/$/, '$1');
    pathname = tmp;
    result[pathname] = path.resolve(entry);
    return result;
  }, {})
  //  console.log(entries);
  for (var name in entries) {
    let temp_name = name;
    temp_name = temp_name.replace("./src/pages/", "").replace(/\//g, "_").replace(".js", "").replace("" + home + "_", "").replace("index_index", "index");
    entries[temp_name] = entries[name];
    delete entries[name];
  }
  var entryres = {};
  if (includePage.length > 0) {
    for (var name in entries) {
      for (let i = 0; i < includePage.length; i++) {
        if (name === includePage[i]) {
          entryres[name] = entries[name];
          break;
        }
      }
    }
  } else {
    entryres = entries;
  }
  //console.log(entryres);
  return entryres;
}