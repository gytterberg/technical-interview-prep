class: center middle
## Curry

---

## Interviewer Prompt (a)

Currying is the process by which a function of N arguments is implemented as N single-argument functions such that first of them takes in the first argument and returns a function which takes in the 2nd argument and so on, until the Nth single-argument function finally returns the value of the multi-argument function being implemented.

### Your Task:

Write a function called `curry` that takes a function as an argument, and returns a "curried" version of that function.

???

Encourage interviewers to share the next prompts with interviewees to help them understand the concept.

---

## Interviewer Prompt (b)

For example, consider the function:

```javascript
const add = (x, y) => x + y
```

It's okay, but you know what would be cool? If instead of taking all of its arguments at once, it could take them one at a time. That way, we could build and re-use a bunch of smaller functions like so:

```javascript
const addOne = add(1)
addOne(2) // 3

const addFive = add(5)
addFive(10) // 15
```

We could do this if the `add` function looked like this:

```javascript
const add = x => y => x + y
```

---

## Interviewer Prompt (c)

Your task is to write a function called `curry` that can do this for us:

```javascript
const add = (x, y) => x + y
const curriedAdd = curry(add)

// curriedAdd can now take one argument at a time
// in other words, it will now behave like `const add = x => y => x + y`

const firstReturn = curriedAdd(1) // returns y => 1 + y
const result = firstReturn(2) // returns 3
```

---

## Example Output

```javascript
function doSomething (var1, var2, var3, var4) {
  return var1 + var2 - var3 * var4;
}

const curriedDoSomething = curry(doSomething); // a curried function
const firstReturn = curriedDoSomething(1); // var1 partially applied
const secondReturn = firstReturn(2); // var2 partially applied
const thirdReturn = secondReturn(3); // var3 partially applied
const finalResult = thirdReturn(4); // -9 -> (1 + 2 - 3 * 4)
```

---

class: center middle
## Interviewer Guide

---

### RE

* A good question would be: "Can you only give a curried function one argument at a time?"
  * For example, with `curriedDoSomething`, should we still be able to say: `curriedDoSomething(1, 2, 3, 4)` all at once? Respond with "yes" if this happens

* Be aware that curried functions at any stage should be able to be re-used. That is, they should not be "one and done". For example:

```javascript
function greet (title, name) {
  return "Hello, " + title + " " + name
}

const curriedGreet = curry(greet)

const greetJedi = curriedGreet('Jedi Master')
const greetSithLord = curriedGreet('Darth')

greetJedi('Mace Windu') // "Hello, Jedi Master Mace Windu"
greetSithLord('Vader')  // "Hello, Darth Vader"
```

---

### AC

* An important feature that your interviewee will need to leverage is using the `.length` of a function to get the number of arguments it receives. If they don't know or have forgotten about this, feel free to remind them

* You may also want to remind them that `.bind` can be used to partially apply arguments, not just `this` context

* Another related hint you may give is that when you partially apply an argument with `.bind`, this returns a new function whose length is decreased based on the number of arguments that have been partially applied! For example:

```javascript
const takesTwo = (x, y) => x + y
console.log(takesTwo.length) // 2

const takesOne = takesTwo.bind(null, 42)
console.log(takesOne.length) // 1
```

---

### TO

* When your interviewee finishes, make sure they check and that their curried functions are re-usable, and that they can handle more than one argument at a time

---

### Answers to Common Questions

#### Example:
* What if the function receives more arguments than it has room for?
  * _It should just ignore them like any JavaScript function does_
* Should I handle `this` context in any particular way?
  * _You may assume that any functions passed to curry do not use `this`_

---

## Solution and Explanation (a)

Many interviewees will probably start out with something like this:

```javascript
function curry (fn) {
  const memory = []
  const originalLength = fn.length

  return function innerFunc (...args) {
    // logic for dealing with memory/args goes here
  }
}
```

This won't cut it though! The function we return isn't re-usable because it closes over the same array!

We could improve this approach and wrap the inner function in another function or an IIFE...but things get messy quickly...

---

## Solution and Explanation (b)

A much easier approach is to utilize `Function.prototype.bind`:

```javascript
const curry = function (fn) {
  return function (...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      const partiallyAppliedFn = fn.bind(null, ...args)
      return curry(partiallyAppliedFn)
    }
  }
}
```

The magic that makes this work is that we also curry the partially applied function. Let's step through an example:

---

## Solution and Explanation (b cont'd)

```javascript
function greet (title, name) {
  return "Hello, " + title + " " + name
}

const curriedGreet = curry(greet)
```

Here, we initially pass the `greet` function into curry. We get the inner function returned as a result.

```javascript
const curry = function (fn) {
  return function (...args) {  // this is returned
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      const partiallyAppliedFn = fn.bind(null, ...args)
      return curry(partiallyAppliedFn)
    }
  }
}
```

---

## Solution and Explanation (b cont'd)

```javascript
const greetJedi = curriedGreet('Jedi Master')
```

Now, we pass in a single argument. `Fn` in this call still refers to the original function with an argument length of 2.

```javascript
const curry = function (fn) {
  return function (...args) { // ...args is ['Jedi Master']
    if (args.length >= fn.length) { // 1 >= 2, which is false
      return fn(...args)
    } else {
      // We run this else statement.
      // We make a new function that has the first argument bound
      // (this new function's length is 1),
      // and pass that new function into curry.
      // This returns another copy of this inner function.
      // Except this new copy's "version" of fn is the fn with the length of 1!
      const partiallyAppliedFn = fn.bind(null, ...args)
      return curry(partiallyAppliedFn)
    }
  }
}
```

---

## Solution and Explanation (b cont'd)

```javascript
greetJedi('Luke Skywalker')
```

Finally, we pass in the last argument:

```javascript
const curry = function (fn) { // this fn's first argument is bound to 'Jedi Master'
  return function (...args) { // ...args is ['Luke Skywalker']
    if (args.length >= fn.length) { // 1 >= 1, which is true
      // We run this statement and invoke fn, applying the new argument.
      // Combined with the previously bound argument,
      // this returns our final result
      return fn(...args)
    } else {
      const partiallyAppliedFn = fn.bind(null, ...args)
      return curry(partiallyAppliedFn)
    }
  }
}
```

---

## Solution Code

```javascript
const curry = function (fn) {
  return function (...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return curry(fn.bind(null, ...args))
    }
  }
}
```

---

## Solution Code

### As a fancy one-liner

```javascript
const curry = fn =>
  (...args) =>
    args.length >= fn.length ?
      fn(...args) :
      curry(fn.bind(null, ...args))
```

---

## Summary

* Currying is a very common functional programming technique. In fact, in pure functional languages, all functions are curried by default! If your functions are curried, it becomes easy to compose different functionality from the same basic building blocks

* Find the number of arguments (or `arity`) of a function using `.length`

* Use `.bind` to partially apply arguments to a function
