const path = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 引入清理插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 分离样式文件
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production', // 生产模式
  entry: {
    index: path.join(__dirname, '../src/index'),
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist/'),
    libraryTarget: 'umd'
  },
  module: {
      rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local', // 以对象方式引入，
                localIdentName: 'wiiMp-[local]', // 类名前缀，创建类名时会加上前缀：myCompontent-A 、myCompontent-B ...
              },
            },
          },
          'sass-loader',
        ],
      }],
    },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  externals: {
    // 定义外部依赖，将不会将 react、react-dom 打包进去
    react: 'react',
    'react-dom': 'react-dom',
  }
})
