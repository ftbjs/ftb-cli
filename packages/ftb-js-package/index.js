const createTask = require('./createTask')

module.exports = async (api) => {
  const createTaskInstance = new createTask(api)
  await createTaskInstance.createJs()
}