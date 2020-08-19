const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

export async function shell(cmd: string, cwd?: string) {
  const { stdout, stderr } = await exec(cmd, { cwd })

  if (stderr) {
    // throw new Error(stderr)
  }

  return stdout
}
