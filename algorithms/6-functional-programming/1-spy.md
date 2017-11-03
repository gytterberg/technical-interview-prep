[Slides](http://slides.com/bryangergen/reacto_spy#/)

[Repl](https://repl.it/CkaZ)

[ES6 Repl](https://repl.it/CkaY/2)

---

# Prompt

Testing and assertion libraries like Jasmine, Mocha, Chai, Sinon etc. have a special feature called *spies*. Spies allow test specs to track how specific functions of interest are used: whether they are called, how many times, what they are called with, what they return, if they throw errors, etc.

For this REACTO problem, implement a `spyOn` function which does the following:

* Takes a function `func` as its parameter
* Returns a spy function `spy` that takes any number of arguments
* `spy` calls `func` with the given arguments and returns what `func` returns
* `spy` has the following methods:
  - `.getCallCount()`: returns the number of times `spy` has been called
  - `.wasCalledWith(val)`: returns `true` if `spy` was ever called with `val`, else returns `false`
  - `.returned(val)`: returns `true` if `spy` ever returned `val`, else returns `false`

---
# Example

Below is a specific example of how `spyOn` might work in the wild. Keep in mind that not all functions take only two arguments…

```javascript
function adder(n1, n2) { return n1 + n2; }

const adderSpy = spyOn( adder );

adderSpy.getCallCount(); // 0

adderSpy(2, 4); // returns 6
adderSpy.getCallCount(); // 1

adderSpy(3, 5); // returns 8
adderSpy.getCallCount(); // 2
adderSpy.wasCalledWith(2); // true
adderSpy.wasCalledWith(0); // false
adderSpy.returned(6); // true
adderSpy.returned(9); // false
```
---
# Solution

```javascript
function spyOn (func) {
  let callCount = 0;
  const calledWith = new Set();
  const returnVals = new Set();

  function spy (...args) {
    const result = func(...args);
    callCount++;
    args.forEach(arg => calledWith.add(arg));
    returnVals.add(result);
    return result;
  }

  spy.getCallCount = function () {
    return callCount;
  };

  spy.wasCalledWith = function (argument) {
    return calledWith.has(argument);
  };

  spy.returned = function (result) {
    return returnVals.has(result);
  };

  return spy;
}

module.exports = spyOn;
```
