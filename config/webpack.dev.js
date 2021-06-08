const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',  // 开发模式
  devtool: 'inline-source-map', // 可以追踪源码中 error 的位置
  entry: {
    app: path.join(__dirname, '../example/app.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../example/') // 开发模式下不会实际生成 bundle.js 文件，会存放到内存中的。
  },
  devServer: {
    contentBase: path.join(__dirname, '../example/'), // 本地服务加载页面所在目录
    host: 'localhost', // 指定启动 ip，localhost 表示本地
    port: 3000, // 端口号 3000
    open: true, // 自动打开浏览器
  },
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              localIdentName: 'wiiMp-[local]',
            },
          },
        },
        'sass-loader',
      ],
    }],
  }
})
