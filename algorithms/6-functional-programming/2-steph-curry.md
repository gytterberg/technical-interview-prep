[Slides](http://slides.com/samchun/reacto-3-8-10-1#/)

Alternate slides for improved code readability (bigger font, white background), changed approach, removed steph curry:
[Slides](http://slides.com/yuvalidan/reacto-3-8-10-1-1#/)

---

# Problem

Currying is the process by which a function of N arguments is implemented as N single-argument functions such that first of them takes in the first argument and returns a function which takes in the 2nd argument and so on, until the Nth single-argument function finally returns the value of the multi-argument function being implemented.

# Example

```js
function addAllFour (var1, var2, var3, var4) {
  return var1 + var2 - var3 * var4;
}
const curriedDoSomething = curry(addAllFour); // closure memory -> []
const firstReturn = curriedDoSomething(1); // closure memory -> [1]
const secondReturn = firstReturn(2); // closure memory -> [1, 2]
const thirdReturn = secondReturn(3); // closure memory -> [1, 2, 3]
const fourthReturn = thirdReturn(4); // 9 (1 + 2 - 3 * 4)
```

Now you must be Steph Curry
- Implement the "curry" function to accomplish the previous example
- Things to keep in mind
- You have to know how many arguments the function that you are currying  takes in
- The previous example had 4 parameters
- The function you return from currying must have some sorts of ways to accumulate the number of following arguments
- Once your accumulation meets the number of parameters the original function takes in, the curried function that brought in the nth-argument will return whatever the original function returns

# Solutions

```javascript
function curry( originalFunc ) {
  const originalLength = originalFunc.length;

  function resolver() {
    const memory = Array.prototype.slice.call( arguments );
    
    const whatToReturn = function() {
      let next;
      const args = Array.prototype.slice.call( arguments );
      const copy = memory.concat(args);

      if (copy.length >= originalLength) {
        next = originalFunc;
      } else {
        next = resolver;
      }

      return next.apply(null, copy);
    };

  
    return whatToReturn;
  }

  return resolver();
}
```

A smaller solution, but maybe less or more readable depending on the reader.

```js
function curry (original) {
  return function curried (...args) {
    if (args.length >= original.length) {
      return original(...args);
    } else {
      return function curriedWithArgs (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}
```

A solution that allows for currying different argument positions.

```javascript
function curry(originalFunc) {
  const __ = this.__ = {};

  const originalLength = originalFunc.length;

  const isFilled = function (list) {
    return list.every(function (item) {
      return item !== __;
    });
  };

  const getMemory = function (a) {
    return Array.apply(
      null,
      new Array(originalLength)).map(function (_, i) {j
        return a.shift() || __;
      }
    );
  };

  const applyToMemory = function (m, a) {
    m.forEach(function (item, index) {
      if (item === __) {
        m[index] = a.shift();
      }
    })
  };

  function resolver() {
    const args = Array.prototype.slice.call(arguments);
    const memory = getMemory(args);

    const returningFunction = function () {
      let next;
      const args = Array.prototype.slice.call(arguments);

      applyToMemory(memory, args);

      if (isFilled(memory)) {
        next = originalFunc;
      } else {
        next = resolver;
      }

      return next.apply(null, memory);
    };

    return returningFunction;
  }

  return resolver();
}


function addNums(a, b, c, d) {
  console.log(a, b, c, d);
  return a + b - c * d;
}

const __ = curry.__;
const curried = curry(addNums);
const lastOne = curried(__, __, __, 1);
lastOne(1,2,3);
```
