[Slides](http://slides.com/katehumphrey/reacto-3-8-10#/) - updated 5/25

Alternate slides for improved code readability (bigger font, white background), changed approach, removed steph curry:
[Slides](http://slides.com/yuvalidan/reacto-3-8-10-1-1#/)

---

# Problem

Currying is the process by which a function of N arguments is implemented as N single-argument functions such that first of them takes in the first argument and returns a function which takes in the 2nd argument and so on, until the Nth single-argument function finally returns the value of the multi-argument function being implemented.

# Example

```js
function calcAllFour (var1, var2, var3, var4) {
  return var1 + var2 - var3 * var4;
}
const curriedDoSomething = curry(calcAllFour); // closure memory -> []
const firstReturn = curriedDoSomething(1); // closure memory -> [1]
const secondReturn = firstReturn(2); // closure memory -> [1, 2]
const thirdReturn = secondReturn(3); // closure memory -> [1, 2, 3]
const fourthReturn = thirdReturn(4); // -9 -> (1 + 2 - 3 * 4)
```

Now you must be the Curry
- Implement the "curry" function to accomplish the previous example
- Things to keep in mind
  - You have to know how many arguments the function that you are currying  takes in
    - The previous example had 4 parameters
  - The function you return from currying must accumulate the number of succeeding arguments
  - The function must determine if arguments accumulated meet the number of parameters the original function require, and return what the original function would return with the accumulated arguments

# Solutions

```javascript
function curry (originalFunc) {
  let argsMemory = [];
  return function resolver () {
    const args = [].slice.call(arguments);
    argsMemory = argsMemory.concat(args);
    if (argsMemory.length >= originalFunc.length) {
      return originalFunc.apply(null, argsMemory) 
    } else {
      return resolver;
    }
  }
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
function curry( originalFunc ) {
  const __ = this.__ = {};

  const isFilled = list => list.every(item => item !== __);
  const getMemory = function(a) {
    return Array.apply(null, new Array(originalFunc.length))
            .map(() => a.shift() || __);
  };
	
  const applyToMemory = function(m, a) {
    m.forEach(function(item, index) {
      if (item === __) m[index] = a.shift();
    })
  };

  function resolver(...resolverArgs) {
    const memory = getMemory(resolverArgs);
		
    return function returningFunction (...returningFnArgs) {
	    let next;
	    applyToMemory(memory, returningFnArgs);
            
      if (isFilled(memory)) next = originalFunc;    
      else next = resolver;   

      return next.apply(null, memory); 
	  };
  }

  return resolver(); 
}

function calcAllFour(a, b, c, d) {
  return a + b - c * d;
}

const __ = curry.__;
const curried = curry(calcAllFour);
const lastOne = curried(__, __, __, 4);
lastOne(1,2,3); // -9 -> (1 + 2 - 3 * 4)
```
