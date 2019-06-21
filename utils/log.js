const chalk = require('chalk')

const log = (type, ...log) => console.log(chalk[type](log))

module.exports = log