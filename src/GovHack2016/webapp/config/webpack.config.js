'use strict';
const webpack = require('webpack');
const webpackValidator = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const helpers = require('./helpers');

const ifThenElse = (condition) => 
  (truthy, falsey = undefined) => condition ? truthy : falsey

module.exports = ({dev, prod, test, serve}) => {
  const ifDev = ifThenElse(dev === true);
  const ifServe = ifThenElse(serve === true);
  const ifProd = ifThenElse(prod === true);
  const ifProdOrDev = ifThenElse(dev === true || prod === true);
  const ifTest = ifThenElse(test === true);
  const removeUndefined = (arr) => arr.filter(x => x !== undefined);

  console.log(`webpack options:
dev: ${ifDev(true, false)}
prod: ${ifProd(true, false)}
test: ${ifTest(true, false)}
serve: ${ifServe(true, false)}

`);

  const webpackConfig = webpackValidator({
    entry: {
      'app': './apps/app/main.jsx',
    },
    output: {
      path: ifProdOrDev(helpers.root('../WebSite/Scripts/bundles'), helpers.root('dist')),
      publicPath: ifServe('http://localhost:8080/', ''),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      pathinfo: !prod,
    },
    context: helpers.root('src'),
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],      
    },
    devtool: ifProd(undefined, 'eval'),
    bail: ifProd(true, false),
    cache: ifDev(true, false),
    module: {
      preLoaders: removeUndefined([
        { test: /\.js$/, loader: 'source-map-loader' },
      ]),
      loaders: removeUndefined([
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.js(x?)$/,
          loader: 'babel-loader',
          exclude: [
            /node_modules/,
          ],
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },

      ])
    },
    plugins: removeUndefined([

      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        }
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        sourceMap: true,
      })),      
      dev === true || serve === true
        ? new HtmlWebpackPlugin({
            template: './index.html',
          })
        : undefined,      
    ]),
    // used by HtmlWebpackPlugin
    metadata: {
    },

    /*
    * Include polyfills or mocks for various node stuff
    * Description: Node configuration
    *
    * See: https://webpack.github.io/docs/configuration.html#node
    */
    node: {
      global: 'window',
      process: true,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false,
    },  
  });

  console.log(`webpack.config:

${JSON.stringify(webpackConfig, null, 2)}

`)

  return webpackConfig;
};