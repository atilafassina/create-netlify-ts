const { promisify } = require('util')
const writeFile = promisify(require('fs').writeFile)

export async function write(path: string, data: {}) {
  return writeFile(path, data, 'utf8')
}
