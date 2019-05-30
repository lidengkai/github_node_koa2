/**
 * @module file
 */
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const { rootPath, random } = require('./index')
const staticPath = rootPath('/public/static/upload/')

function saveToStatic(path, name, file) {
  try {
    const rs = fs.createReadStream(file.path)
    const ws = fs.createWriteStream(path + name)
    rs.pipe(ws)
    return name
  } catch (e) {
    console.error('文件上传失败：', e)
    return false
  }
}

function saveToOss(path, name, file) {
  try {
    const rs = fs.createReadStream(file.path)
    const ws = fs.createWriteStream(path + name)
    rs.pipe(ws)
    return name
  } catch (e) {
    console.error('文件上传失败：', e)
    return false
  }
}

module.exports.saveFile = function (file) {
  const filename = `${Date.now()}-${random(5)}` + path.extname(file.name)
  const name = saveToStatic(staticPath, filename, file)
  if (name) {
    return {
      name
    }
  }
  return false
}

module.exports.readReqFile = function (req) {
  return new Promise(resolve => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) {
        return resolve({})
      }
      resolve({ fields, files })
    })
  })
}

function readPathType(path) {
  return new Promise(resolve => {
    fs.stat(path, function (err, stats) {
      if (!err) {
        if (stats.isFile()) {
          return resolve('file')
        }
        if (stats.isDirectory()) {
          return resolve('directory')
        }
      }
      resolve('')
    })
  })
}

function readDir(path) {
  return new Promise(resolve => {
    fs.readdir(path, (err, data) => {
      if (err) {
        resolve([])
      } else {
        resolve(data)
      }
    })
  })
}

async function getFiles(path, info = []) {
  const type = await readPathType(path)
  if (type === 'file') {
    info.push(path)
  } else if (type === 'directory') {
    const paths = await readDir(path)
    for (let i = 0, l = paths.length; i < l; i++) {
      await getFiles(path + '/' + paths[i], info)
    }
  }
  return info
}

module.exports.getFiles = getFiles

module.exports.writeFile = function (pathname = '', str = '') {
  return new Promise(resolve => {
    fs.writeFile(pathname, str, { encoding: 'utf-8', flag: 'w' }, (err) => {
      resolve(!err)
    })
  })
}