const createTask = require('./createTask')
const rewriteCss = require('./utils/rewriteCss')

module.exports = async (api) => {
  const createTaskInstance = new createTask(api)
  await createTaskInstance.createReact()

  if (api.less) {
    rewriteCss(api)
  }
}