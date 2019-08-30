const createTask = require('./createTask')

module.exports = async (api) => {
  const { frameName } = api
  const createTaskInstance = new createTask(api)
  switch (frameName) {
    case 'js':
      await createTaskInstance.createJs()
      break
    case 'react':
      await createTaskInstance.createReact()
      break
    default:
      break
  }
}