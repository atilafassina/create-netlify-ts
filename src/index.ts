#!/usr/bin/env node
import prompts from 'prompts'
import ora from 'ora'
import questions from './lib/questions'
import { shell, write, command } from './lib/utils'
import pkgJsonTemplate from './templates/packageJson'
import netlifyTomlTemplate from './templates/netlifyToml'
import babelrcTemplate from './templates/babelrc'
import handlerTemplate from './templates/handler'
import gitignoreTemplate from './templates/gitignore'
import { DEV_DEPENDENCIES } from './lib/dependencies'
;(async () => {
  const CWD = process.cwd()

  const {
    packageName,
    isPrivate,
    withPrettier,
    netlifyDev,
    packageManager,
    shouldRewrite,
    functionName,
  } = await prompts(questions({ cwd: CWD }), {
    onCancel: () => {
      process.exit(0)
    },
  })

  const spinner = ora('Setting up...')
  spinner.color = 'green'
  spinner.start()

  await shell(`mkdir ${packageName}`)
  const projectDir = `${CWD}/${packageName}`

  await write(projectDir + '/.gitignore', gitignoreTemplate)

  const gitName = await shell(`git config --global user.name`)
  const gitEmail = await shell(`git config --global user.email`)
  const devInstall = command(packageManager, 'DEV_INSTALL')

  await write(
    projectDir + '/package.json',
    pkgJsonTemplate({
      packageName,
      gitName,
      gitEmail,
      isPrivate,
      withPrettier,
    })
  )

  if (netlifyDev) {
    const globalInstall = command(packageManager, 'GLOBAL_INSTALL')
    await shell(`${packageManager} ${globalInstall} netlify-cli`)
  }

  await write(
    projectDir + '/netlify.toml',
    netlifyTomlTemplate({ packageManager, shouldRewrite, functionName })
  )

  await write(projectDir + '/.babelrc', babelrcTemplate)

  await shell('mkdir src', projectDir)
  await write(`${projectDir}/src/${functionName}.ts`, handlerTemplate)

  if (withPrettier) DEV_DEPENDENCIES.push('prettier')

  await shell(
    `${packageManager} ${devInstall} ${DEV_DEPENDENCIES.join(' ')}`,
    projectDir
  )
  spinner.stop()
})()
