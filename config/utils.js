const getBabelLoaderOptions = (frame = 'react') => {
  return frame === 'react'
  ? ['@babel/preset-env', '@babel/preset-react']
  : ['@babel/preset-env']
}

const getOutputParams = (env) => {
  return env ? {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[id].[chunkhash].js'
  } : {
    filename: 'js/[name].js',
  }
}

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  getBabelLoaderOptions,
  getOutputParams,
  isProd
}