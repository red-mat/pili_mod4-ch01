const MAX_LENGTH = 5
const colors = {
    red: (str) => `\x1b[31m${str}\x1b[0m`,
    yellow: (str) => `\x1b[33m${str}\x1b[0m`,
    green: (str) => `\x1b[32m${str}\x1b[0m`,
    blue: (str) => `\x1b[36m${str}\x1b[0m`,
};

const SEPARATOR = '-'

class Logger {
    static success(title, message) {
        const logTitle = title.padEnd(MAX_LENGTH, ' ')

        console.log(colors.green(logTitle), SEPARATOR, message)
    }
    static log(title, message) {
        const logTitle = title.padEnd(MAX_LENGTH, ' ')
        console.log(colors.blue(logTitle), SEPARATOR, message)
    }
    static warn(message) {
        const logTitle = 'WARN'.padEnd(MAX_LENGTH, ' ')
        console.log(colors.yellow(logTitle), SEPARATOR, message)
    }
    static error(message) {
        const logTitle = 'ERROR'.padEnd(MAX_LENGTH, ' ')
        console.log(colors.red(logTitle), SEPARATOR, message)
    }
}

module.exports = Logger