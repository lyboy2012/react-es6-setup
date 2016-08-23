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
  var entries = genEntries(srcDir,dev);
  var chunks = Object.keys(entries);
  var config = {
      srcDir:srcDir,
      entry: entries,
      output: {
        path: dev ? webpackBuidPath : buidDir, //必须是绝对路径
        devtoolModuleFilenameTemplate: '[resource-path]',
        sourceMapFilename: "[file].map",
        filename: dev ? '[name].js' : 'scripts/[name].js',
        chunkFilename: dev ? '[id].common.js' : 'scripts/[id].common.min.js',
        //publicPath: dev ? '/__build/' : './' //页面中引入的url路径前缀（css，js） 相对路径 ，如果是绝对路径可以替换成cdn 路径
      },
      devServer: {
        contentBase: webpackBuidPath,
        //publicPath: '/__build/',

        historyApiFallback: true,
        //historyApiFallback: {
          /**
           * if you have modified output.publicPath in your Webpack configuration, 
           * you need to specify the URL to redirect to. 
           * This is done using the historyApiFallback.index
           */
          
         // index:'/__build/'
        //},
      /*  historyApiFallback: {
          rewrites: [
              
              { from: /^\//, to: '/__build/' },
          ],*/
     // },
        port:8888,
        progress: true,
        hot: true,
        // stats: webpackDevConf.devServer.stats
        stats: {
          cached: false,
          colors: true
        }
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['react-hot','babel?presets[]=react,presets[]=es2015']
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

      ]
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
    
    var cssLoader = {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    };
    var sassLoader = {
      test: /\.scss$/,
      loader: 'style!css!sass'
    };
    var lessLoader = {
      test: /\.less/,
      loader: 'style!css!less'
    };
    var rawLoader = {
      test: /\.html$/,
      loader: "raw-loader" // loaders: ['raw-loader']，這個方式也是可以被接受的。
    }
    var htmlLoader = {
      test: /\.html$/,
      loader: "html-loader"//与raw-loader不同的是，它默认处理html中的<img src="image.png">为require("./image.png")，你同时需要在你的配置中指定image文件的加载器
    }
    //config.module.loaders.push(reactLoader);
    config.module.loaders.push(cssLoader);
    config.module.loaders.push(sassLoader);
    config.module.loaders.push(lessLoader);
    config.module.loaders.push(rawLoader);
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
      loader: ExtractTextPlugin.extract('style', 'css?-convertValues!sass')
    };


    config.module.loaders.push(cssLoader);
    config.module.loaders.push(lessLoader);
    config.module.loaders.push(sassLoader);

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
    if(isDev){
      paths.push('webpack/hot/dev-server');
    }
    paths.push(entryPath);
    if (entry) map[entry] = paths;
  });
  console.log(map)
  return map;
}
module.exports = makeConf;
