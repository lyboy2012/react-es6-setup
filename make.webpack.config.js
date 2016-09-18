var path = require('path');
var fs = require('fs');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin'); //打包时候连同html一起打包

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

function makeConf(options) {
  options = options || {};

  var dev = options.dev || false;


  var proDir = process.cwd(); //当前项目目录
  var srcDir = path.resolve(proDir, 'src');
  var buidDir = path.resolve(proDir, 'build'); //项目编译后的保存目录
  var webpackBuidPath = path.resolve(proDir, '__build'); //webpack 编译的虚拟目录
  //console.log('srcDir:' + srcDir);
  var entries = genEntries(srcDir, dev);
  var chunks = Object.keys(entries);
  var config = {
      srcDir: srcDir,
      buidDir: buidDir,
      entry: entries,
      output: {
        path: dev ? webpackBuidPath : buidDir, //必须是绝对路径
        devtoolModuleFilenameTemplate: '[resource-path]',
        sourceMapFilename: "[file].map",
        filename: dev ? '[name].js' : 'scripts/[name].js',
        chunkFilename: dev ? '[id].common.js' : 'scripts/[id].common.min.js',
        publicPath: dev ? '' : 'http://localhost:8888/' //页面中引入的url路径前缀（css，js） 相对路径 ，如果是绝对路径可以替换成cdn 路径
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          //注意后面的name=xx，这里很重要否则打包后会出现找不到资源的
          loader: 'url-loader?limit=2&minetype=images/jpg&name=images/[name]_[hash].[ext]'
        }, {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?/i,
          loader: 'url-loader?limit=8124&name=fonts/[name].[ext]'
        }]
      },

      resolve: {
        root: [
          proDir + '/node_modules/',
          srcDir
        ],
        extensions: ['', '.js', '.jsx', '.css', '.scss', '.png', '.jpg'] //开启后缀名的自动补全
      },
      externals: {
        "react": 'React',
        "react-dom": "ReactDOM",
        'redux': 'Redux',
        'react-redux': 'ReactRedux'
      },
      plugins: [

      ],
      sassLoader: {
        includePaths: [proDir + "/node_modules/compass-mixins/lib"]
      }
    }
    /**
     * 自动生成入口文件放到页面引入，入口js名必须和入口文件名相同
     * 如果html文件名称和入口js 文件不同命，会把所有js css 都打包到html里面
     */
  var pages = fs.readdirSync(srcDir);

  pages.forEach(function(filename) {
    var m = filename.match(/(.+)\.html$/);

    if (m) {
      // @see https://github.com/kangax/html-minifier
      var conf = {
        template: path.resolve(srcDir, filename),
        // @see https://github.com/kangax/html-minifier
        // minify: {
        //     collapseWhitespace: true,
        //     removeComments: true
        // },
        /*
                  title: 用来生成页面的 title 元素
                  filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
                  template: 模板文件路径，支持加载器，比如 html!./index.html
                  inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
                  favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
                  minify: {} | false , 传递 html-minifier 选项给 minify 输出
                  hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
                  cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
                  showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
                  chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
                  chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
                  excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块) 
                  */
        filename: filename
      };

      if (m[1] in config.entry) {
        conf.inject = 'body';
        conf.chunks = ['common', m[1]];
      }

      config.plugins.push(new HtmlWebpackPlugin(conf)); //打包时候连同html一起打包
    }
  });

  if (dev) {
    // css直接内嵌
    console.log(proDir + "/node_modules/compass-mixins/lib")

    var cssLoader = {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    };
    var sassLoader = {
      test: /\.scss$/,
      loader: "style!css!resolve-url!sass?sourceMap"
        //loader: 'style!css!sass'//scss 引用 url 会相对于入口文件 所有需要用到resolve-url
    };
    var lessLoader = {
      test: /\.less/,
      loader: 'style!css!less'
    };
    var htmlLoader = {
      test: /\.html$/,
      loader: 'html-loader'
    }

    //config.module.loaders.push(reactLoader);
    config.module.loaders.push(cssLoader);
    config.module.loaders.push(sassLoader);
    config.module.loaders.push(lessLoader);
    config.module.loaders.push(htmlLoader);
    //config.module.loaders.push(htmlLoader);
    config.devtool = "#cheap-module-source-map";

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {

    // css分离出来单独文件引入
    var cssLoader = {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?minimize') // enable minimize
    };
    var lessLoader = {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?-convertValues!less')
    };
    var sassLoader = {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?-convertValues!resolve-url!sass?sourceMap')
    };

    var htmlLoader = {
      test: /\.html$/,
      loader: "html-loader"
    };

    config.module.loaders.push(cssLoader);
    config.module.loaders.push(lessLoader);
    config.module.loaders.push(sassLoader);
    config.module.loaders.push(htmlLoader);

    config.plugins.push(
      new ExtractTextPlugin('css/[name].css', {
        // 当allChunks指定为false时，css loader必须指定怎么处理
        // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
        // 第一个参数`notExtractLoader`，一般是使用style-loader
        // @see https://github.com/webpack/extract-text-webpack-plugin
        allChunks: false
      })
    );


    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ //提取公用的代码打包到独立文件
      name: 'common',
      chunks: chunks,
      // Modules must be shared between all entries
      minChunks: chunks.length // 提取所有chunks共同依赖的模块
    }));
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }));
    config.plugins.push(new UglifyJsPlugin());
  }




  return config;
}

function genEntries(srcDir, isDev) {



  var jsDir = path.resolve(srcDir, 'scripts');
  var entryDir = path.resolve(jsDir, 'entry');
  //console.log(entryDir);
  var names = fs.readdirSync(entryDir);

  var map = {};

  names.forEach(function(name) {
    var m = name.match(/(.+)\.js$/);
    var entry = m ? m[1] : '';
    var entryPath = entry ? path.resolve(entryDir, name) : '';
    //var entryPath = entry ? './' + basePath + '/js/source/entry/' + entry : '';
    var paths = [];
    if (isDev) {
      paths.push('webpack/hot/dev-server');
    }
    paths.push(entryPath);
    if (entry) map[entry] = paths;
  });
  console.log(map)
  return map;
}
module.exports = makeConf;
