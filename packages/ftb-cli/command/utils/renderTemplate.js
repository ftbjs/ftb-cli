const fs = require('fs')
const handlebars = require('handlebars')

/**
 * render handlebars
 * @param {String} template 
 * @param {String} file 
 * @param {Optional} api 
 */
const renderTemplate = (template, file, api) => {
  if (fs.existsSync(template)) {
    const templateContent = fs.readFileSync(template).toString()
    const result = handlebars.compile(templateContent)(api)
    fs.writeFileSync(file, result)
  }
}

module.exports = renderTemplate