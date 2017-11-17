const debug = require('debug')('memo')

module.exports = class Memo {
  constructor() {
    this.map = new Map()
  }

  has(key) {
    const result = this.map.has(key)
    debug(`has(%s) = %s`, key, result)
    return result
  }

  get(key) {
    const value = this.map.get(key)
    debug(`get(%s) -> %s`, key, JSON.stringify(value))
    return value
  }

  set(key, value) {
    debug(`set(%s) <- %s`, key, JSON.stringify(value))
    this.map.set(key, value)
    return value
  }
}