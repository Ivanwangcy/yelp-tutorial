const getConfig = require('hjs-webpack');

const NODE_ENV = process.env.NODE_ENV;
// const dotenv = require('dotenv');

const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

const isDev  = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

const root    = resolve(__dirname);
const src     = join(root, 'src');
const modules = join(root, 'node_modules');
const dest    = join(root, 'dist');

var config = getConfig({
  isDev: isDev,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true,
  // html: function (context) {
  //   return {
  //     'index.html': context.defaultTemplate({
  //       title: 'yelp-clone from fullstackreact.com',
  //       publicPath: isDev ? 'http://localhost:3000/' : '',
  //       meta: {
  //         'name': 'fullstackreact yelp clone',
  //         'description': 'A minimal yelp clone from the team behind the fullstackreact.com book'
  //       }
  //     })
  //   }
  // }
});

module.exports = config;
