# Prompt

Implement a function that adds two numbers without using `+` or any other built-in arithmetic operators.

# Examples

```js
add(8, 0);     // 8
add(1, 1);     // 2
add(2, 2);     // 4
add(123, 456); // 579
add(19, 82);   // 101
```
# Resources

[Slides](http://slides.com/luisamiranda/reacto-selection-sort)

[BitWise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)

# Solution

An optimized solution would make use of bitwise operations. There are a number of ways we might do this. The important thing to keep in mind is that addition works much the same way with binary numbers as it does with decimal numbers. That is:

We can add columns from right to left and carry a `1` to the next column if the previous column adds to `10` or greater. In our case `10` is not "ten" though, it's "two". So if we have two ones in a column it will result in a `0` below it and a `1` carried over to the next column.

```
 1 <= carried
  10
+ 11
----
 101
```

Below is one possible solution. It uses XOR to compute the result without the "carries" (let's call this value "uncarried"). Then it uses AND to find the "carries" and LEFT SHIFT to shift those carries one bit left to where they belong (let's call this "carries"). We can then repeat the process. This time we XOR our "uncarried" result with our "carries" to get a new uncarried result, then we AND our uncarried result with our carries and shift left to get our new carries. We continue this until the "carries" equal `0`, meaning we've moved all the value out of one register into the other.

## Iterative

```js
function add (a, b) {
  while (b !== 0) {
    const uncarried = a ^ b;
    const carries = (a & b) << 1;
    a = uncarried;
    b = carries;
    // ^^ reseting `a` and `b` like this will ensure we continue XOR and AND ing the new values for the next cycle of the loop
  }
  return a;
}
```

## Recursive

```js
//Recursive Solution!
const add = (a, b) => {
  // Base case is that there is no more uncarried value.
  if (b === 0) return a;
  // Grab the raw bit addition through XOR
  const uncarried = a ^ b;
  // Check to see if there are any 'collisions' aka carry overs
  const carried = (a & b) << 1;
  // Call add again with new values
  return add(uncarried, carried);
}

//Recursive Solution Going to Prom
const promAdd = (a, b) => b === 0 ? a : promAdd(a ^ b, (a & b) << 1);
```
