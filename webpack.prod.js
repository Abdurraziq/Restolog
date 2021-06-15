/* eslint-disable max-len */
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: '/node_modules/',
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: ['@babel/preset-env'],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({filename: 'assets/css/[hash].css'}),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.css$/,
          attributes: {as: 'style', type: 'text/css'},
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
          CssMinimizerPlugin.cssoMinify,
          CssMinimizerPlugin.cleanCssMinify,
        ],
        minimizerOptions: {
          preset: [
            'advanced',
          ],
        },
      }),
    ],
  },
});
