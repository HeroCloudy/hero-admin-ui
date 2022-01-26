const path = require('path')
const fs = require('fs')
const logger = require('./logger')
const utils = require('../common/utils')

const resolvePath = (...file) => path.resolve(__dirname, '../', ...file)

const encoding = 'utf8'

// 递归创建目录
const mkdirs = (directory, callback) => {
  const exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), () => {
      fs.mkdirSync(directory)
      callback()
    })
  }
}

const createDir = (directory) => {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

const generateFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, encoding, err => {
      if (err) {
        logger.error(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const appendText = (filePath, text) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, text, err => {
      if (err) {
        logger.error(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const updateIndexTs = async (filePath, componentName) => {
  const camelName = utils.convertCamel(componentName)

  const target1 = `import ${camelName} from './${componentName}'
`
  const target2 = `,
  ${camelName}`

  const content = fs.readFileSync(filePath, encoding)
  const point1 = content.indexOf('import \'../scss/index.scss\'')
  const point2 = content.indexOf(`
] // end`)

  const result = content.substring(0, point1) +
    target1 +
    content.substring(point1, point2) +
    target2 +
    content.substring(point2)

  // console.log(result)
  fs.writeFileSync(filePath, result, encoding)
}

const updateDocMenu = async (filePath, componentName) => {
  const target = `,
  '/components/${componentName}.md'
`
  const content = fs.readFileSync(filePath, encoding)
  const length = content.length
  const result = content.substring(0, length - 3) +
    target +
    content.substring(length - 2)
  fs.writeFileSync(filePath, result, encoding)
}

module.exports = {
  resolvePath,
  createDir,
  generateFile,
  appendText,
  updateIndexTs,
  updateDocMenu
}
