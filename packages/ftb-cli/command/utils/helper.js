const packageCommand = ['vue', 'react', 'js']

const npmPackageNameRule = /^[^_\.-].+$/

const upperCamelCase = w => w.replace(/-\w/g, t => t.substr(1).toUpperCase())

module.exports = {
  packageCommand,
  npmPackageNameRule,
  upperCamelCase
}