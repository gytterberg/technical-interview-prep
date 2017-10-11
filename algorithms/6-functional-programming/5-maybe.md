class: center middle
## The Maybe Monad

---

## Interviewer Prompt

Implement a `maybe` factory or constructor. This function should return values implementing the "Maybe" API. For the purpose of this REACTO, that means Maybes need `value` and `map` methods.

???

Maybe is an entity used in many pure functional programming languages to deal with values that may or may not exist. For example, the first element in a list, the row with id 5 in the database, or the property `.name` of an object – each might be nonexistent. Without Maybe, your code needs "null checks" everywhere – `if (whatever) doThing()`. With `Maybe`, you can write a sequence of computations and ignore whether or not the value(s) actually exist until the very last step.

---

## Example Output

A Maybe's `value` returns the value held by the Maybe.

```js
const maybe5 = maybe(5)
console.log(maybe5.value()) // 5
// value :: Maybe a ~> () -> a
```

The `map` method takes a mapping function `f` and can be chained. The result can still report its `value`:

```js
maybe('yo')
.map(s => s.length)
.map(n => n + '!')
.value() // '2!'
// map :: Maybe a ~> (a -> b) -> Maybe b
```

Critically, Maybes protect against `null`/`undefined` values, preventing them from being used in calculations:

```js
maybe({name: 'Hermione'})
.map(person => person.sister) // undefined
.map(sibling => sibling.age) // uh oh!
.map(num => num % 2)
.value() // undefined - no thrown errors! :-)
```

???

Being mappable makes Maybe a *functor*.

---

class: center middle
## Interviewer Guide

---

### RE

* Feel free providing a lot guidance up front – this is not a usual REACTO problem.
* Show the example output. It is very hard to begin guiding them towards an answer without it.
* Introduce each main requirement (`value`, `map`, dealing with `undefined`) gradually, confirming understanding along the way. Have the student illustrate other examples before moving on to the next concept.

---

### AC

* Discourage class-based answers – they tend to add to the confusion. But if the interviewee wants to use a class, point out that `maybe(val)` can simply `return new Maybe(val)`, for sanity's sake.
* Suggest / guide the interviewee into following this sequence:
  1. implement `value`
  2. implement `map`
  3. deal with `undefined/null`
* Draw comparison to array `map` (Functor)
* If they suggest using `try-catch`, tell them it should be done without it
* Try to avoid saying "map returns a new maybe" at first; instead, say "map can be chained" and see if you can guide them towards understanding what that means. If they get stymied, teach them more directly.

---

### TO

As a bonus, you can also add `flatMap`, which prevents nested Maybes. If so, remember that `flatMap` should also guard against null/undefined. Help the interviewee by drawing comparisons to Promise `then` (Monad).

```js
// you might already have this because it's useful elsewhere:
const maybeFirst = strOrArr => maybe(strOrArr[0])

// now you want to re-use it in a chain, but…
maybe(['hello', 'goodbye'])
.flatMap(maybeFirst) // …cannot `map` bc `maybeFirst` returns a Maybe!
.flatMap(maybeFirst)
.map(yell)
.value() // 'g!'
// flatMap :: Maybe a ~> (a -> Maybe b) -> Maybe b
```

???

Being flatMappable makes Maybe a *monad*.

---

### Answers to Common Questions (a)

#### What is a Functor?

* Functors are things that can be mapped.
* Context / container for value(s), which can apply generic functions (like `double` or `yell`) that don't know about context
* `map` creates a new context with all values within mapped
* Examples
  * Array
  * Tree (with added `map` function)
  * Promise (`then`)
  * RxJS observables (functional streams)

```js
//        functor  map  generic -> new functor
         [1, 2, 3].map (double) // [2, 4, 6]
Promise.resolve(3).then(double) // Promise for 6
          maybe(5).map (double) // maybe(10)
```

```hs
map :: Functor a ~> (a -> b) -> Functor b
```

---

### Answers to Common Questions (b)

#### What is a Monad?

Monads are Functors that can be flat-mapped.
Flat mapping can "unwrap" / "un-nest" monads
Examples
  * Arrays (with added `flatMap` function)
  * Promise (also `then` – auto-selects mapping or flat mapping)
  * RxJS observables (functional streams)

```js
//         monad  flatMap   (fn returning monad)       -> new monad (not nested)
Promise.resolve().then   (() => Promise.resolve('hi')) // Promise for 'hi'
         maybe(5).flatMap(() => maybe('hi'))           // maybe('hi')
           [4, 7].flatMap(el => [el, el])              // [4, 4, 7, 7]
```

```hs
flatMap :: Monad a ~> (a -> Monad b) -> Monad b
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
