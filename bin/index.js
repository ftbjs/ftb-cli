#! /usr/bin/env node

const path = require('path')
const serve = require('../command/serve')
const build = require('../command/build')
const fileExist = require('../utils/fileExist')

const command = process.argv[2]
const entry = process.argv[3] ? process.argv[3] : 'src/index.js'
const matchEntryFile = /.*\.js$/

if (!matchEntryFile.test(entry)) {
  console.log('Please input a valid entry file as webpack entry!')
  return
}

if (!fileExist(entry)) {
  console.log(process.cwd() + entry + ' is not exist')
  return
}

const commandArg = {
  entry: path.resolve(`${process.cwd()}`, entry),
  output: path.resolve(`${process.cwd()}`, 'dist'),
  publicPath: '/',
  frame: 'react'
}

if (command === 'dev') {
  console.log('dev...')
  serve(commandArg)
} else if (command === 'build') {
  console.log('building...')
  build(commandArg)
}