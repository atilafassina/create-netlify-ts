#!/usr/bin/env node

const prompts = require('prompts')
const questions = require('./lib/questions')
const { shell, write, command } = require('./lib/utils')
const pkgJsonTemplate = require('./templates/packageJson')
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
  } = await prompts(questions({ cwd: CWD }))
  await shell(`mkdir ${packageName}`)
  const projectDir = `${CWD}/${packageName}`
  const gitName = await shell(`git config --global user.name`)
  const gitEmail = await shell(`git config --global user.email`)
  const devInstall = command(packageManager, 'DEV_INSTALL')

  await write(
    projectDir,
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
