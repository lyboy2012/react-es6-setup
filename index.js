#!/usr/bin/env node
var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
//var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackConfig = require('./make.webpack.config.js');
var program = require('commander');
program
  .version('0.0.1')
  .option('-d, --dev', '开发环境')
  .option('-b, --build', '编译环境')
  //.option('-b, --build [type]','编译环境[test]','test')
  .parse(process.argv);
console.log('react es6 开发脚手架');

if (program.dev) {
  dev();
}

if (program.build) {
  build(program.build);
}

function dev(argument){
  var devConfig = webpackConfig({ dev: true });
  
  for (var key in devConfig.entry) {
    devConfig.entry[key].unshift('webpack-hot-middleware/client?reload=true')
  }
  var bundler = webpack(devConfig);
  browserSync({
    server: {
      baseDir: devConfig.srcDir,
      //proxy: 'localhost:3000',
      //port: 8080,
      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: devConfig.output.publicPath,
          
          // pretty colored output
          stats: { colors: true }
          
          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
      ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      devConfig.srcDir+'/*.html'
    ]
});
}


function build(argument) {


  var config = webpackConfig({ dev: false });

  var compiler = webpack(config, function(err, stats) {
    if (err) {
      console.log('编译出错了！');
    } else {
      console.log('编译完成!');
    }
  });


}
