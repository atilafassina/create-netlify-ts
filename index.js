#!/usr/bin/env node

const prompts = require('prompts')
const questions = require('./lib/questions')
const { shell, write, command } = require('./lib/utils')
const pkgJsonTemplate = require('./templates/packageJson')
const netlifyTomlTemplate = require('./templates/netlify/netlifyToml')
const babelrcTemplate = require('./templates/netlify/babelrc')
const netlifyHandlerTemplate = require('./templates/netlify/handler')
const {
  NETLIFY_DEPENDENCIES,
  VERCEL_DEPENDENCIES,
} = require('./lib/dependencies')

;(async () => {
  const CWD = process.cwd()

  const {
    packageName,
    isPrivate,
    withPrettier,
    platform,
    netlifyDev,
    packageManager,
    shouldRewrite,
    functionName,
  } = await prompts(questions({ cwd: CWD }))
  console.log('function name', functionName)
  await shell(`mkdir ${packageName}`)
  const projectDir = `${CWD}/${packageName}`
  const gitName = await shell(`git config --global user.name`)
  const gitEmail = await shell(`git config --global user.email`)
  const devInstall = command(packageManager, 'DEV_INSTALL')

  await write(
    projectDir + '/package.json',
    pkgJsonTemplate({
      platform,
      packageName,
      gitName,
      gitEmail,
      isPrivate,
      withPrettier,
    })
  )

  if (platform === 'netlify' && netlifyDev) {
    const globalInstall = command(packageManager, 'GLOBAL_INSTALL')
    await shell(`${packageManager} ${globalInstall} netlify-cli`)
  }

  if (platform === 'netlify') {
    await write(
      projectDir + '/netlify.toml',
      netlifyTomlTemplate({ packageManager, shouldRewrite, functionName })
    )

    await write(projectDir + '/.babelrc', babelrcTemplate)

    await shell('mkdir src', projectDir)
    await write(`${projectDir}/src/${functionName}.ts`, netlifyHandlerTemplate)
  }

  switch (platform) {
    case 'netlify':
      if (withPrettier) NETLIFY_DEPENDENCIES.push('prettier')

      await shell(
        `${packageManager} ${devInstall} ${NETLIFY_DEPENDENCIES.join(' ')}`,
        projectDir
      )

      break
    case 'vercel':
      if (withPrettier) VERCEL_DEPENDENCIES.push('prettier')
      await shell(
        `${packageManager} ${devInstall} ${VERCEL_DEPENDENCIES.join(' ')}`,
        projectDir
      )
      break
    default:
      break
  }
})()
