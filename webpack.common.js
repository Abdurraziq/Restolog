const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest} = require('workbox-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/script.js',
    assetModuleFilename: 'assets/[hash][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext]',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'src/public/images/icons/favicon.ico'),
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
};
