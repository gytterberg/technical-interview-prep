[Slides](http://slides.com/gtelljohann/reacto-decimal-binary/)

---

# Prompt

Write 2 functions, one that takes the a number in base 10 (decimal) and converts it to the string representation of that number in base 2 (binary), and one that converts back.

You may not use `parseInt`, `toString`, or any similar function which does base conversion for you.

# Examples

```js
decimalToBinary(4); // should return '100'
decimalToBinary(67); // should return '1000011'

binaryToDecimal('100'); // should return 4
binaryToDecimal('1000011'); // should return 67
```

# Solutions

We could use modular math and iterate through all the digits.

```javascript
function decimalToBinary(num) {
  var power = 2;
  var binaryStr = '';
  while(num) {
    var remainder = num % power;
    var digit = remainder ? 1 : 0;
    binaryStr = digit + binaryStr;
    num = num - remainder;
    power *= 2;
  }
  return binaryStr;
}  
function binaryToDecimal (numStr) {
  var sum = 0;
  var reversedStr = numStr.split('').reverse();
  for (var i = 0; i < reversedStr.length; i++) {
    sum += Math.pow(2, i) * reversedStr[i];
  }
  return sum;
}
```

Or we could use some fancy bit logic that should ultimately be more performant.

```js
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
