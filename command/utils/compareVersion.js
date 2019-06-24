const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')

/**
 * 目前仅考虑react project
 * vue后面会跟随
 * @param {*} version
 */
const versionCompare = (options, version) => {
  const versionFile = path.resolve(__dirname, `../../${options.frameName}.version.json`)
  const versionDir = path.resolve(__dirname, `../../cache/templates/${options.frameName}/package.json`)
  if (fs.existsSync(versionFile) && fs.existsSync(versionDir)) {
    const oldVersion = require(versionFile).version
    return oldVersion === version
  } else {
    return false
  }
}

const versionLog = (options, version) => {
  const versionFile = path.resolve(__dirname, `../../${options.frameName}.version.json`)
  fs.writeFileSync(versionFile, JSON.stringify({ version: version }))
}

const deleteVersionLog = (options) => {
  const versionFile = `${options.frameName}.version.json`
  return new Promise((resolve, reject) => {
    const task = spawn(`rm -rf ./cache && rm -rf ./${versionFile}`, [], { cwd: path.resolve(__dirname, '../..'), shell: true })
    task.on('close', (code) => { resolve(true) })
  })
}

module.exports = {
  versionCompare,
  versionLog,
  deleteVersionLog
}
