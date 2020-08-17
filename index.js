#!/usr/bin/env node

const prompts = require('prompts')
const questions = require('./lib/questions')
const { shell } = require('./lib/utils')

;(async () => {
  const CWD = process.cwd()

  const response = await prompts(questions({ cwd: CWD }))

  shell(`yarn --help`)
})()
