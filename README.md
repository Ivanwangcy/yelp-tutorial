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
