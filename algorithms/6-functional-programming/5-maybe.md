class: center middle
## The Maybe Monad

---

## Interviewer Prompt

Implement a `maybe` factory or constructor. This function should return values implementing the "Maybe" API. For the purpose of this REACTO, that means Maybes need `value` and `map` methods.

???

Maybe is an entity used in many pure functional programming languages to deal with values that may or may not exist. For example, the first element in a list, the row with id 5 in the database, or the property `.name` of an object – each might be nonexistent. Without Maybe, your code needs "null checks" everywhere – `if (whatever) doThing()`. With `Maybe`, you can write a sequence of computations and ignore whether or not the value(s) actually exist until the very last step.

---

## Example Output A: `value`

A Maybe's `value` returns the value held by the Maybe.

```js
const maybe5 = maybe(5)
console.log(maybe5.value()) // 5
// value :: Maybe a ~> () -> a
```

---

## Example Output B: `map`

The `map` method takes a mapping function `f` and can be chained. The result can still report its `value`:

```js
maybe('yo')
.map(s => s.length)
.map(n => n + '!')
.value() // '2!'
// map :: Maybe a ~> (a -> b) -> Maybe b
```

???

Being mappable makes Maybe a *functor*.

---

## Example Output C: `map`

Critically, Maybes protect against `null`/`undefined` values, preventing them from being used in calculations:

```js
maybe({name: 'Hermione'})
.map(person => person.sister) // undefined
.map(sibling => sibling.age) // uh oh!
.map(num => num % 2)
.value() // undefined - no thrown errors! :-)
```

---

class: center middle
## Interviewer Guide

---

### RE

* Provide at least one written chaining example to start (as opposed to the normal system of only describing the problem).
* Feel free providing a lot guidance up front – this is not a usual REACTO problem.

---

### AC

* Suggest following this sequence:
  1. implement `value`
  1. implement `map`
  1. deal with `undefined/null`
* Draw comparison to array `map` (Functor)
* If they suggest using `try-catch`, tell them it should be done without it
* Try to avoid saying "map returns a new maybe" at first; instead, say "map can be chained" and see if you can guide them gently towards understanding what that means

---

### TO

As a bonus, you can also add `flatMap`, which prevents nested Maybes. If so, remember that `flatMap` should also guard against null/undefined. Help the interviewee by drawing comparisons to Promise `then` (Monad).

```js
maybe('whatever')
.flatMap(something => maybe('hi'))
.map(s => s + '.')
.value() // 'hi.'
// flatMap :: Maybe a ~> (a -> Maybe b) -> Maybe b
```

???

Being flatMappable makes Maybe a *monad*.

---

### Answers to Common Questions

* What is a Functor?
  * Functors are things that can be mapped.

```js
         [1, 2, 3].map (double) // [2, 4, 6]
Promise.resolve(3).then(double) // Promise for 6
          maybe(5).map (double) // maybe(10)
```

* What is a Monad?
  * Monads are Functors that can be flatMapped.

```js
Promise.resolve().then(()    => Promise.resolve('hi')) // Promise for 'hi' — unwrapped!
         maybe(5).flatMap(() => maybe('hi'))           // maybe('hi') — unwrapped!
```

---

## Solution Code A (factory)

```js
const maybe = val => ({
  value: () => val, // returns the closure
  map: fn => (val === undefined || val === null)
    ? maybe(null) // if the closure is null/undef., do not run `fn`
    : maybe(fn(val)), // if the closure is usable, run `fn` and wrap in Maybe
  flatMap: fn => (val === undefined || val === null)
    ? maybe(null) // if the closure is null/undef., do not run `fn`
    : fn(val) // if the closure is usable, run `fn` (but do not nest Maybes)
})
```

---

## Solution Code B (class)

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

---

## More Solutions?

Other solutions involve a `maybe` factory which returns `just` or `nothing` values with identical method names (`map`, `value` etc.) that do different things. See links at end.

---

## Summary / Resources

* https://gist.github.com/michaelficarra/ecdee4b556bcb5c6969a
* http://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/
* https://cwmyers.github.io/monet.js/#maybe
* http://sean.voisen.org/blog/2013/10/intro-monads-maybe/
* https://github.com/ramda/ramda-fantasy/blob/master/docs/Maybe.md
* https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript

---
