/* eslint-disable max-len */
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest} = require('workbox-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
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
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({filename: 'assets/css/[hash].css'}),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.css$/,
          attributes: {as: 'style', type: 'text/css'},
        },
      ],
    }),
    new WebpackPwaManifest({
      name: 'Restolog',
      short_name: 'Restolog',
      description: 'A restaurant catalog application',
      start_url: './index.html',
      background_color: '#FFFFFF',
      theme_color: '#252A34',
      display: 'standalone',
      orientation: 'any',
      publicPath: './',
      filename: 'site.webmanifest',
      ios: true,
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/icons/logo.png'),
          size: 180,
          destination: 'assets/icons',
          ios: true,
        },
        {
          src: path.resolve(__dirname, 'src/public/images/icons/logo.png'),
          sizes: [72, 96, 128, 192, 256, 384, 512],
          destination: 'assets/icons',
          purpose: 'any maskable',
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src/scripts/sw.js',
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
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
