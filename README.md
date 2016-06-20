# yelp-tutorial
React 项目示例。一步一步学习搭建React项目环境。
## 快速启动项目
创建一个Node 项目。打开命令行终端，输入以下命令开始创建项目结构：
```sh
$ mkdir yelp && cd $_
$ mkdir -p src/{components,containers,styles,utils,views}\
  && touch webpack.config.js
```
初始化`package.json`，创建项目的依赖管理：
```sh
$ npm init # 需要回答一系列问题

# 如果不想回答问题, 直接使用默认
$ npm init -y
```
## 安装一些依赖包 [Babel](https://babeljs.io/)
```sh
$ npm install --save-dev babel-core babel-preset-{es2015,react,react-hmre,stage-0}
```
创建 Babel 配置文件， `.babelrc`
```sh
$ vim .babelrc
```
内容如下：
```javascript
{
  "presets": ["es2015", "stage-0", "react"],
  "env": {
    "development": {
      "presets": ["react-hmre"]
    }
  }
}
```
## Webpack 和 [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack "webpack 启动器")
```sh
$ npm install --save-dev hjs-webpack webpack

# loader 模块加载器
$ npm install --save-dev {babel,css,style,postcss,url,file}-loader
```
webpack and hjs-webpack 配置
```javascript
const getConfig = require('hjs-webpack'); // 获取 hjs 默认配置

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

var config = getConfig({ // 在默认配置上修改
  isDev: isDev, // 是否为开发环境
  in: join(src, 'app.js'), // 输入
  out: dest, // 输出
  clearBeforeBuild: true,
  html: function (context) { // html 模版选项
    return {
      'index.html': context.defaultTemplate({
        title: 'yelp-clone from fullstackreact.com',
        publicPath: isDev ? 'http://localhost:3000/' : '',
        meta: {
          'name': 'fullstackreact yelp clone',
          'description': 'A minimal yelp clone from the team behind the fullstackreact.com book'
        }
      })
    }
  }
});
```
## React
```sh
$ npm i -S react react-dom react-router
```
## postcss
之前已经安装了 postcss-loader 自动安装了依赖 `postcss`, 现在我们再安装其它插件：
```sh
$ npm i -D precss cssnano autoprefixer
```
postcss 配置
```javascript

// CSS modules
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l && l.loader && l.loader.match(match))
  return found ? found[0] : null;
}
// existing css loader
const cssloader =
  findLoader(config.module.loaders, matchCssLoaders);

const newloader = Object.assign({}, cssloader, {
  test: /\.module\.css$/,
  include: [src],
  loader: cssloader.loader.replace(matchCssLoaders, `$1$2?modules&localIdentName=${cssModulesNames}$3`)
})
config.module.loaders.push(newloader);
cssloader.test = new RegExp(`[^module]${cssloader.test.source}`)
cssloader.loader = newloader.loader

config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  loader: 'style!css'
})
// CSS modules

// postcss
config.postcss = [].concat([
  require('precss')({}),
  require('autoprefixer')({}),
  require('cssnano')({})
])
// END postcss
```
## 配置多个环境
安装 dotenv
```sh
$ npm i -D dotenv && touch .env
```
```javascript
// ENV variables
const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
  path: join(root, 'config', `${NODE_ENV}.config.js`),
  silent: true,
});
const envVariables =
    Object.assign({}, dotEnvVars, environmentEnv);

const defines =
  Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  }, {
    __NODE_ENV__: JSON.stringify(NODE_ENV)
  });

config.plugins = [
  new webpack.DefinePlugin(defines)
].concat(config.plugins);
// END ENV variables
```
## Font Awesome
安装
```sh
$ npm i -S font-awesome
```
## webpack `require` 解析路径
```javascript
// Roots
config.resolve.root = [src, modules]
config.resolve.alias = {
  'css': join(src, 'styles'),
  'containers': join(src, 'containers'),
  'components': join(src, 'components'),
  'utils': join(src, 'utils'),

  'styles': join(src, 'styles')
}
// end Roots
```
