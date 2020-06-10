

# Decimal-To-Binary & reverse
---

# Prompt

Write 2 functions, one that takes the a number in base 10 (decimal) and converts it to the string representation of that number in base 2 (binary), and one that converts back.

You may not use `parseInt`, `toString`, or any similar function which does base conversion for you.

---

# Examples

```js
decimalToBinary(4); // should return '100'
decimalToBinary(67); // should return '1000011'

binaryToDecimal('100'); // should return 4
binaryToDecimal('1000011'); // should return 67
```
---
# Solutions - BinaryToDecimal

We could iterate through all the digits multiplying them by increasing powers of 2.

```javascript
function binaryToDecimal(num){
    let arr = num.split("")
    let power = 1
    let total = 0
    for (let i=arr.length-1; i>=0; i--){
        total += arr[i]*power
        power *= 2
    }
    return total;
}

//or

function binaryToDecimal2(numStr) {
    let sum = 0;
    let reversedStr = numStr.split('').reverse();
    for (let i = 0; i < reversedStr.length; i++) {
        sum += Math.pow(2, i) * reversedStr[i];
    }
    return sum;
}

```
---
# Solutions - DecimalToBinary
The easiest but most expensive way is to find the largest power of 2 that is smaller than or equal to n, (where n is the original decimal). Then we subtract that from n and repeat. Say the largest divisor is 2^k, then the binary expansion has a 1 in position 2^k. Then set n = n - 2^k and continue (until we get to 0).

More effecient solutions:

```javascript

function decimalToBinary(num) {
    let binaryStr = '';
    while(num) {
        let remainder = num % 2;
        binaryStr = remainder + binaryStr;
        num = (num - remainder)/2;
    }
    return binaryStr;
}

// Division by 2    Quotient    Remainder    Bit #
// 13/2                 6              1          0
// 6/2                  3              0          1
// 3/2                  1              1          2
// 1/2                  0              1          3

```
---


Similarly we can increase the divisor (by a power of 2):

```javascript

function decimalToBinary2(num) {
  let power = 2;
  let binaryStr = '';
  while(num) {
    let remainder = num % power;
    let digit = remainder ? 1 : 0;
    binaryStr = digit + binaryStr;
    num = num - remainder;
    power *= 2;
  }
  return binaryStr;
}

```
---

Or we could use some fancy bit logic that should ultimately be more performant.


```javascript

function decimalToBinary (num) {
    const bits = [];
    while (num !== 0) {
        bits.push(num & 1);
        num >>= 1;
    }
    return bits.reverse().join('');
}

function binaryToDecimal (binStr) {
    let num = 0;
    for (let i = 0; i < binStr.length; i++) {
        num <<= 1;
        if (binStr[i] === '1') {
            num |= 1;
        }
    }
    return num;
}
```
---



