const path = require('path');

const {merge} = require('webpack-merge');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const baseConfig = require('./webpack.base');

const projectRoot=process.cwd()
const prodConfig = {
  mode: 'production',
  output: {
    path:path.join(projectRoot,'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  plugins: [
    new CssMinimizerPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups:{
        commons:{
          //匹配分离出来的库
          test:/(react|react-dom)/,
          //命名为‘vendors’
          name:'vendors',
          chunks:'all'
        }
      },
      // // 设置包的大小
      // minSize: 0,
      // cacheGroups: {
      //   commons: {
      //     // 命名为‘commons’
      //     name: 'commons',
      //     chunks: 'all',
      //     // 设置最小引用次数为2
      //     minChunks: 2,
      //   },
      // },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);

