const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const writeFile = promisify(require('fs').writeFile)

function command(pkgManager: string, cmd: string) {
  switch (cmd) {
    case 'GLOBAL_INSTALL':
      return pkgManager === 'yarn' ? 'global add --silent' : 'i -g'
    case 'LOCAL_INSTALL':
      return pkgManager === 'yarn' ? 'add --silent' : 'i'
    case 'DEV_INSTALL':
      return pkgManager === 'yarn' ? 'add -D --silent' : 'i -D'
    default:
      return '--help'
  }
}

async function shell(cmd: string, cwd?: string) {
  const { stdout, stderr } = await exec(cmd, { cwd })

  if (stderr) {
    // throw new Error(stderr)
  }

  return stdout
}

async function write(path: string, data: {}) {
  return writeFile(path, data, 'utf8')
}

export { shell, write, command }
