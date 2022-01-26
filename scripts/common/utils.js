const prefix = 'ha'

const convertFirstUpper = str => {
  return `${str.substr(0, 1).toUpperCase()}${str.substring(1)}`
}

const convertCamel = componentName => {
  let ret = convertFirstUpper(prefix)
  const list = componentName.split('-')
  list.forEach(item => {
    ret += convertFirstUpper(item)
  })
  return ret
}

module.exports = {
  convertCamel
}
