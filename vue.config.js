const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const Timestamp = new Date().getTime();
module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/" : "./",
  outputDir: "loan",
  assetsDir: "static",
  indexPath: "index.html",
  configureWebpack: {
    output: {
      filename: `static/js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
      chunkFilename: `static/js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
    },
  },
  css: {
    // loaderOptions: {
    //   less: {
    //     lessOptions: {
    //       modifyVars: {
    //         "menu-dark-bg": "#242836",
    //       },
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
  },
  lintOnSave: false,
  // 构建 map 文件
  productionSourceMap: true,
  devServer: {
    open: false,
    compress: false,
    proxy: {
      "/api": {
        target: "http://192.168.31.2:9006/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "api",
        },
        // logLevel: 'debug'
      },
    },
    overlay: {
      warning: false,
      errors: false,
    },
  },
  chainWebpack: (config) => {
    config.entry("main").add("babel-polyfill");
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        bypassOnDebug: true,
      });
    if (process.env.NODE_ENV === "production") {
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/,
          threshold: 10240,
          deleteOriginalAssets: false,
        })
      );
    }
  },
};
