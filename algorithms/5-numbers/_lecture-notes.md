# Numbers

## Modular math

- The modulo operator gets the remainder
- "Cyclic" operations, e.g. clock math

Exercise: get the last digit after multiplying a sequence of positive integers together.

```js
lastDigitAfterMultiplying([2,4,5]); // => 0
lastDigitAfterMultiplying([2,2,2,2,2,2,2,2,2,2]); // => 4
lastDigitAfterMultiplying([7,9,6,6,7,5,2]); // => ???
lastDigitAfterMultiplying([567, 143, 88, 192, 3333356, 9, 801029]); // => 6
```

Mod ten every number in the array, as you multiply those single-digit numbers, continue getting the mod ten of that result.

```js
function lastDigitAfterMultiplying (nums) {
  let result = 1;
  for (let i = 0; i < nums.length; i++) {
    result = (result * (nums[i] % 10)) % 10;
  }
  return result;
}
```

## Bases, binary

- A base represents how big each individual digit can get
- The "number of fingers you can count with"
- Computers often use binary, so two is then new ten
- In JS, use `.toString(2)` to "see" a binary number if you want
- Why do computers use binary? ON/OFF, TRUE/FALSE information at the lowest level, it's sort of easier to keep things in two different states than three (or more)
- How many digits a number has—that's what `log` calculates
- Big O: if we're dealing with numbers, do we care about the number's "absolute magnitude" or do we care about its digit size

## Bits

### Bit shifting

- <<, bit shift left, add 0 to end
- >>, bit sheft right, chop off rightmost bit
- Why is bit shift left like multiplying by 2? Think about "decimal" shifting. So we have 765 decimal shift left 7650, that's a lot like multiplying by ten. So it's the same for binary, but with 2.
- Very low-level operation, hyper-performant, use it when you can
- Can help optimize problems
- Can be necessary to solve the problem (in any reasonable way)

### Bitwise operators

- AND, & both are 1, then it outputs 1
  - `x & 0 == 0`
  - `x & -1 == x`
- OR, | either is 1, outputs 1
  - `x | 0 == x`
  - `x | -1 == -1`
- XOR, ^ exactly one of them is 1 (the second number "flips" the first)
  - `x ^ 0 == x`
  - `x ^ -1 == ~x`
- NOT, ~ inverts all 1s to 0s and 0s to 1s
  - `~x == -(x + 1)`

```
E.g. 55 & 467, => 19

     110111
& 111010011
-----------
      10011

E.g. 34 ^ 71 => 101

   100010
^ 1000111
---------
  1100101
```

Exercise one: get the nth bit of a number. You can't use `.toString()`.

```js
getNthBit(871, 4); // => 0
//      v
// 1101100111
```

Shift right by index and check if even or odd, with modulus 2.

```js
function getNthBit (num, idx) {
  return num >> idx % 2;
}
```

Cool trick for checking whether a number is even or odd, `& 1` it.

```js
function getNthBit (num, idx) {
  return num >> idx & 1;
}
// 1101100111
// shift right
// 110110
// AND one
//   110110
// &      1
// --------
//        0
```

Exercise two: set the nth bit of a number. You can't use `.toString()`.

```js
setNthBit(871, 4); // => 887
// 1101100111
//      v
// 1101110111
```

```js
function setNthBit (num, idx) {
  return (1 << idx) | num;
}
// shift 1 left by index
// 10000
// OR with original
//   1101100111
// |      10000
// ------------
//   1101110111
```

How might we "clear" a bit?

1. Shift 1 left by bit index
2. Invert that (with NOT)
3. AND that result with the original number

```js
// shift 1 left by index
// 0000010000
// invert it with NOT
// 1111101111
// AND with original
//   1101100111
// & 1111101111
// ------------
//   1101100111
```

### Bit Masks
- "A bitmask is a sequence of bits that can manipulate and/or read flags." - MDN
- Turning some bits on: `| 1111`
- Turning some bits off (to ignore them): `& 0000`
- Querying the status of a bit: turn off all other bits (`& 0000`), compare desired bit to `1`
- [Additional reading/examples on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Flags_and_bitmasks)

### Practical Applications of Bitwise Operations
- Can be useful for low level pixel operations, or audio operations
- Optimized numerical conversions - faster than `Math` or `parseInt` equivalents
  - `Math.floor`: `~~n`
  - Toggling between 0 and 1: ^= 1
- Performance optimization, but at the cost of readability
- You may see some libraries like Bluebird and jQuery use them internally
  - [How Bluebird uses them internally](https://www.reaktor.com/blog/javascript-performance-fundamentals-make-bluebird-fast/) (see especially section 2, "Minimize object size")
