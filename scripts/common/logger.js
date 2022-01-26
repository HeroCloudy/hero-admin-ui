const chalk = require('chalk')

const info = message => console.log(message)
const success = message => console.log(chalk.green(message))
const error = message => console.log(chalk.red(message))

module.exports = {
  info,
  success,
  error
}
