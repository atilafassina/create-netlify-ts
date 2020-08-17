const { exec } = require('child_process')

function shell(cmd, cb = console.log) {
  exec(cmd, (error, data) => {
    if (error) {
      console.error(error.message)
      return
    }
    cb(data)
    return
  })
}

module.exports = {
  shell,
}
