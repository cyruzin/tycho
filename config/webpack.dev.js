const path = require('path')

let common_config = {
  node: {
    __dirname: true
  },
  mode: process.env.ENV || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'src/ui')
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
}

module.exports = [
  Object.assign({}, common_config, {
    target: 'electron-main',
    entry: {
      renderer: './src/main/index.ts',
    },
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, '../dist/main')
    },
  }),
  Object.assign({}, common_config, {
    target: 'electron-renderer',
    entry: {
      ui: './src/renderer/index.ts',
    },
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, '../dist/renderer')
    },
  })
]