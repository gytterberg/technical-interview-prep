/**
 * Functional Programming
 * 
 *   - Functions that don't change other things
 *     "pure" functions
 *   - Lots of small, simple functions
 *     - and then composition
 *   - Immutability
 */

/**
 * First class functions / higher order functions / pure functions
 */

// First class function example: you can just assign
// functions to variables
let twoer = function() {
  return 2
}

// And pass them around...
let caller = function(func) {
  return func()
}
caller(twoer)

// Higher order function
let andOneMore = function(func) {
  return function(...args) {
    return func(...args) + 1
  }
}

console.log(andOneMore(x => x)(2))

let arrowOneMore = func => (...args) => func(...args) + 1

// class MyComponent {
//   onChange = name => evt => this.setState(name, evt.target.value)

//   render() {
//     return /* <input onChange={this.onChange('password')} /> */
//   }
// }

/**
 * Side effects? MONADS
 * 
 */

class Optional {
  static make(value) {
    if (value)
      return new Some(value)
    return new None(value)
  }

  ok(onOk) {}
}

class Some extends Optional {
  ok(onOk) {
    return Optional.make(onOk(this.value))
  }
}

class None extends Optional {
  ok(onOk) {
    return Optional.make(onOk(this.value))
  }
}


/**
 * Immutability
 */
const {List, Map} = require('immutable')

const emptyList = List()
console.log(emptyList)

console.log(emptyList.push(3))
console.log(emptyList)

const map = Map()
  .set('hello', 'world')  
  .setIn(['a', 'b', 'c'], 'd')
  .setIn(['a', 'z'], List())
  .setIn(['a', 'z', 2], 'hello')

console.log(map)
console.log(map.toJS().a.b.c)