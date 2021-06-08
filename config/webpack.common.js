const path=require('path')
module.exports = {
  resolve: {
    // 定义 import 引用时可省略的文件后缀名
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      // 设置路径别名，用 @ 代示部分路径。例如：import X from '@/X.js'
      '@': path.join(__dirname, '../src'),
    }
  },
  module: {
    rules: [{
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'url-loader'
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: 'url-loader'
      // loader: 'file-loader',
      // options: {
      //   outputPath: 'assets', // 打包后资源存放的目录
      // },
    }, {
      test: /(\.js(x?))|(\.ts(x?))$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }],
  },
}
