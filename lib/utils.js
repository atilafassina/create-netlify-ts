const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const writeFile = promisify(require('fs').writeFile)

function command(pkgManager, cmd) {
  switch (cmd) {
    case 'GLOBAL_INSTALL':
      return pkgManager === 'yarn' ? 'global add' : 'i -g'
    case 'LOCAL_INSTALL':
      return pkgManager === 'yarn' ? 'add' : 'i'
    case 'DEV_INSTALL':
      return pkgManager === 'yarn' ? 'add -D' : 'i -D'
    default:
      return '--help'
  }
}

async function shell(cmd, cwd) {
  const { stdout, stderr } = await exec(cmd, { cwd })

  if (stderr) {
    throw new Error(stderr)
  }

  return stdout
}

async function write(path, data) {
  return writeFile(`${path}/package.json`, data, 'utf8')
}

module.exports = {
  shell,
  write,
  command,
}
