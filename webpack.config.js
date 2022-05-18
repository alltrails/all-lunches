const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const distFolder = process.env.DIST_FOLDER || 'dist';
const env = process.env.NODE_ENV || 'dev';
const configFilePath = `config/${env}.js`;
const config = require(path.resolve(__dirname, configFilePath));

const webpackConfig = {
  output: {
    path: path.resolve(__dirname, distFolder),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      googlePlacesAPIKey: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_API}&libraries=places`,
      isAnalyticsEnabled: config.isAnalyticsEnabled,
      segmentKey: config.segmentKey,
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: configFilePath, to: configFilePath },
        { from: './public/favicon/*', to: 'favicon/[name].[ext]' },
      ],
    }),
  ],
  resolve: {
    alias: {
      config$: path.resolve(__dirname, configFilePath),
    },
  },
  devtool: env === 'local' ? 'eval-source-map' : 'source-map',
  devServer: {
    historyApiFallback: true,
  },
};

if (process.env.ANALYSIS) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

if (config.isAnalyticsEnabled) {
  const SentryCliPlugin = require('@sentry/webpack-plugin');

  webpackConfig.plugins.push(
    new SentryCliPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'sauerapple',
      project: 'all-lunches',
      ignore: ['node_modules', 'webpack.config.js'],
      include: './build',
      options: { deploy: { env } },
    }),
  );
}

module.exports = webpackConfig;
