process.env.NODE_ENV = 'development';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const openBrowser = require('react-dev-utils/openBrowser');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const paths = require('./paths');

const PORT = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const { appHtml, appBuild } = paths;

const devConfig = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    devMiddleware: {
      stats: {
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        publicPath: false,
      },
    },
    host,
    hot: true,
    port: PORT,
    historyApiFallback: true,
    onAfterSetupMiddleware: () => {
      openBrowser && openBrowser(`http://127.0.0.1:${PORT}/`);
    },
    onListening: function () {
      console.log('Listening on port:', PORT);
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml,
    }),
    new Dotenv({
      path: `${paths.dotenv}.local`,
      expand: false,
      systemvars: true,
    }),
  ],
  output: {
    path: appBuild,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
});

module.exports = devConfig;
