#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
//var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackConfig = require('./make.webpack.config.js');
var program = require('commander');
var historyApiFallback = require('connect-history-api-fallback');

program
    .version('0.0.1')
    .option('-d, --dev', '开发环境')
    .option('-b, --build', '编译环境')
    .option('-r, --run', '编译后运行环境')
    //.option('-b, --build [type]','编译环境[test]','test')
    .parse(process.argv);
console.log('react es6 开发脚手架');

if (program.dev) {
    dev();
}

if (program.build) {
    build(program.build);
}
if (program.run) {
    run();
}

function run(argument) {
    var runConfig = webpackConfig({dev: false});


    var bundler = webpack(runConfig);
    browserSync({
        port: 8888,
        server: {
            baseDir: runConfig.buidDir,
            server: true,
            middleware: [historyApiFallback()]
        },

        // no need to watch '*.js' here, webpack will take care of it for us,
        // including full page reloads if HMR won't work
        files: [
            runConfig.buidDir + '/*.html'
        ]
    });
}
function dev(argument) {
    var devConfig = webpackConfig({dev: true});

    for (var key in devConfig.entry) {
        devConfig.entry[key].unshift('webpack-hot-middleware/client?reload=true')
    }
    var bundler = webpack(devConfig);


    var devMiddleware = webpackDevMiddleware(bundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: devConfig.output.publicPath,
        noInfo: true,
        // pretty colored output
        stats: {colors: true}
        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
    });
    browserSync({
        port: 3333,
        server: {
            baseDir: devConfig.srcDir,
            //proxy: 'localhost:3000',
            //port: 8080,
            index: "index.html",
            middleware: [
                historyApiFallback(),
                devMiddleware,
                // bundler should be the same as above
                webpackHotMiddleware(bundler)
            ]
        },

        // no need to watch '*.js' here, webpack will take care of it for us,
        // including full page reloads if HMR won't work
        files: [
            devConfig.srcDir + '/*.html'
        ]
    });
}


function build(argument) {


    var config = webpackConfig({dev: false});

    var compiler = webpack(config, function (err, stats) {
        if (err) {
            console.log('编译出错了！');
        } else {
            console.log(stats.toString({colors: true}));
        }
    });

    compiler.apply(new webpack.ProgressPlugin(function handler(percentage, msg) {

        console.log((percentage * 100) + '%', msg);
    }));


}
