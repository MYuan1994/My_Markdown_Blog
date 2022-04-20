const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');
const ssrConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
};

module.exports = merge(baseConfig, ssrConfig);