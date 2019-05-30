const exec = require('child_process').exec

// 命令行操作
module.exports.doExec = (cmd) => {
  return new Promise(resolve => {
    exec(cmd, function (error, stdout, stderr) {
      if (error) {
        return resolve({
          flag: false,
          message: stderr
        })
      }
      resolve({
        flag: true,
        message: stdout
      })
    })
  })
}
