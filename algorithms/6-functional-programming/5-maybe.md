# The Maybe Monad

* [Slides](https://slides.com/fullstack/maybe)
* [REPL](https://repl.it/GnkV/latest)

## Prompt

Implement a `maybe` factory or constructor. This function should return values implementing the "Maybe" API. For the purpose of this REACTO, that means Maybes need `value` and `map` methods.

A Maybe's `value` returns the value held by the Maybe.

```js
const maybe5 = maybe(5)
console.log(maybe5.value()) // 5
```

The `map` method takes a mapping function `f` and can be chained. The result can still report its `value`:

```js
maybe('yo')
.map(s => s.length)
.map(n => n + '!')
.value() // '2!'
```

Critically, Maybes protect against `null`/`undefined` values, preventing them from being used in calculations:

```js
maybe({name: 'Hermione'})
.map(person => person.sister) // undefined
.map(sibling => sibling.age) // uh oh!
.map(num => num % 2)
.value() // undefined - no thrown errors! :-)
```

As a bonus, you can also add `flatMap`, which prevents nested Maybes. If so, remember that `flatMap` should also guard against null/undefined.

```js
maybe(true)
.map(b => !b)
.flatMap(() => maybe('hi'))
.map(s => s + '.')
.value() // 'hi.'
```

## Teaching tips:

* Provide one written chaining example to start
* Try to avoid saying "map returns a new maybe" or anything like that
* Suggest implementing `value`, then `map`, then dealing with `undefined/null`
* If they suggest using `try-catch`, tell them it can be done without it
* Feel free to guide / give hints
* At the end, draw comparison to array map (Functor) and Promise then (Monad)

## Solution

A simple solution using a "factory function" (no constructor / class):

```js
const maybe = val => ({
  value: () => val,
  map: fn => (val === undefined || val === null)
    ? maybe(null)
    : maybe(fn(val)),
  flatMap: fn => (val === undefined || val === null)
    ? maybe(null)
    : fn(val)
})
```

Class-based solution:

```js
class Maybe {
  constructor (val) {
    this.val = val
  }
  value () {
    return this.val
  }
  map (fn) {
    if (Maybe.isVal(this.val)) return new Maybe(fn(this.val))
    return this
  }
  flatMap (fn) {
    if (Maybe.isVal(this.val)) return fn(this.val)
    return this
  }
  static isVal (val) {
    return !(val === undefined || val === null)
  }
}
```

Other solutions involve a `maybe` factory which returns `just` or `nothing` values with identical method names (`map`, `value` etc.) that do different things. See below.

## Further Reading

* https://gist.github.com/michaelficarra/ecdee4b556bcb5c6969a
* http://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/
* https://cwmyers.github.io/monet.js/#maybe
* http://sean.voisen.org/blog/2013/10/intro-monads-maybe/
* https://github.com/ramda/ramda-fantasy/blob/master/docs/Maybe.md
* https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript
