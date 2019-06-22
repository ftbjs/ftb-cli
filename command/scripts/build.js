const webpack = require('webpack')
const webpackBuildConfig = require('../../config/prod')

module.exports = (api) => {
  const  { entry, output, publicPath, frame } = api
  
  const ftbDevConfig = webpackBuildConfig({
    entry,
    output,
    publicPath,
    frame
  })

  webpack(ftbDevConfig, (err, stats) => {
    if (err) {
      throw err
    }

    if (stats.hasErrors()) {
      console.log('[F-Side]', stats.toString());
    }
    
    process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')
  })
}