const {
  webpackEsLintConfig,
  resolve,
  isProd
} = require('./utils')

module.exports = {
  entry: {
    main: isProd ? resolve('../src/index.js') : resolve('../src/index.dev.js')
  },
  module: {
    rules: [
      webpackEsLintConfig(),
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
