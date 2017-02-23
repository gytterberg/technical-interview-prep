# Prompt

Given an array of phone book entries return a function that can take a phone number and will return the matching entry (or `undefined` if no match exists). This is a "reverse" phone book lookup (by number instead of by name). This array of "phone book entries" will look like:

```js
[
  'Alexa Quigley ... 013-410-3292',
  'Luis Wisoky ... 648-377-3486',
  'Tessie Walter ... 399-926-3371',
  'Declan Boyer ... 607-731-1862',
  'Jade Fay ... 929-689-8345',
  'Brando Kunde ... 444-899-5147',
  'Nellie Swaniawski ... 078-540-4797',
  'Dr. Marquise Lueilwitz ... 803-336-1863',
  'Julian Feest PhD ... 853-712-7819',
  'Russel Roberts ... 845-613-3905'
  // ... etc
]
```

Follow-up: you are not allowed to use a hash table / object / map / dictionary, but you may use arrays (except for using an array to create a hash table).

# Examples

```js
const findByNumber = generateSearcher([
  'Alexa Quigley ... 013-410-3292',
  'Luis Wisoky ... 648-377-3486',
  'Tessie Walter ... 399-926-3371',
  'Declan Boyer ... 607-731-1862',
  'Jade Fay ... 929-689-8345',
  'Brando Kunde ... 444-899-5147',
  'Nellie Swaniawski ... 078-540-4797',
  'Dr. Marquise Lueilwitz ... 803-336-1863',
  'Julian Feest PhD ... 853-712-7819',
  'Russel Roberts ... 845-613-3905'
]);
findByNumber('399-926-3371'); // 'Tessie Walter ... 399-926-3371'
findByNumber('853-712-7819'); // 'Julian Feest PhD ... 853-712-7819'
findByNumber('444-899-5147'); // 'Brando Kunde ... 444-899-5147'
findByNumber('803-336-1863'); // 'Dr. Marquise Lueilwitz ... 803-336-1863'
findByNumber('123-456-7890'); // undefined
```

# Solution

The simplest possible approach is an `O(n)` brute-force search through the entries. Something like:

```js
function generateSearcher (entries) {
  return function (phoneNumber) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry.slice(-12) === phoneNumber) {
        return entry;
      }
    }
  };
}
// or with ES6 `Array.prototype.find`
function generateSearcher (entries) {
  return function (phoneNumber) {
    return entries.find(entry => entry.slice(-12) === phoneNumber);
  };
}
```

For repeated searches we can do _much_ better. For example, we could precompute a hash table mapping numbers to names. This would be `O(n)` upfront cost, but then `O(1)` for each search, though it would involve `O(n)` extra space.

```js
function generateSearcher (entries) {
  const byPhone = {};
  entries.forEach(entry => {
    const phoneNumber = entry.slice(-12);
    byPhone[phoneNumber] = entry;
  });
  return phoneNumber => byPhone[phoneNumber];
}
```

...but if we're told we are not allowed to use a hash map there are still good options open to us. If we sort the entries by phone number that would be `O(n * log n)` upfront time and we could use binary search to get `O(log n)` for each search. This could in theory involve `O(1)` extra space (though the solution below copies the array before sorting it, so as not to mutate the incoming array).

```js
function entryComparator (entryA, entryB) {
  const phoneNumberA = entryA.slice(-12);
  const phoneNumberB = entryB.slice(-12);
  if (phoneNumberA === phoneNumberB) {
    return 0;
  } else if (phoneNumberA > phoneNumberB) {
    return 1;
  } else if (phoneNumberA < phoneNumberB) {
    return -1;
  }
}
function generateSearcher (entries) {
  const sorted = entries.slice().sort(entryComparator); // clone the given array so the sort does not mutate it
  return function (phoneNumber) {
    let leftIdx = 0;
    let rightIdx = sorted.length - 1;
    let middleIdx;
    while (leftIdx <= rightIdx) {
      middleIdx = Math.floor((leftIdx + rightIdx) / 2);
      const entry = sorted[middleIdx];
      const entryPhoneNumber = entry.slice(-12);
      if (entryPhoneNumber === phoneNumber) {
        return entry;
      } else if (entryPhoneNumber < phoneNumber) {
        leftIdx = middleIdx + 1;
      } else if (entryPhoneNumber > phoneNumber) {
        rightIdx = middleIdx - 1;
      }
    }
  };
}
```

Given interview time constraints, it might be a good idea to invoke a hypothetical `binarySearch` function. That way, it's possible to demonstrate the outline of the solution in code, and then "fill in" the generic `binarySearch` function afterwards—if there's time. All of this is assuming—of course—that the interviewer would agree to such decisions.

This abstract `binarySearch` function could take a sorted array, something to find, and a comparator (which would conform to the same behavior as a `.sort` comparator—read more [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)). That means our solution could be simplified to:

```js
function entryComparator (entryA, entryB) {
  const phoneNumberA = entryA.slice(-12);
  const phoneNumberB = entryB.slice(-12);
  if (phoneNumberA === phoneNumberB) {
    return 0;
  } else if (phoneNumberA > phoneNumberB) {
    return 1;
  } else if (phoneNumberA < phoneNumberB) {
    return -1;
  }
}
function generateSearcher (entries) {
  const sorted = entries.slice().sort(entryComparator); // clone the given array so the sort does not mutate it
  return function (phoneNumber) {
    return binarySearch(sorted, phoneNumber, entryComparator);
  };
}
```

...then, if we have time to implement our generic binary search utility, it might look like:

```js
function binarySearch (sorted, toFind, comparator) {
  let leftIdx = 0;
  let rightIdx = sorted.length - 1;
  let middleIdx;
  while (leftIdx <= rightIdx) {
    middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    const elem = sorted[middleIdx];
    const compared = comparator(toFind, elem);
    if (compared === 0) {
      return elem;
    } else if (compared > 0) {
      leftIdx = middleIdx + 1;
    } else if (compared < 0) {
      rightIdx = middleIdx - 1;
    }
  }
}
```

An even more optimal non-hash-map solution that could involve a trie. This should be `O(n)` preprocessing time and `O(1)` lookup time, with `O(n)` additional space. Below we have a "trie" implemented as an eleven-element array, where elements 0 through 9 are reserved for other tries and the 10th element can hold a value.

```js
function phoneDigits (phoneNumber) {
  return phoneNumber.split('').filter(ch => ch !== '-');
}
function generateSearcher (entries) {
  const trie = new Array(11);
  entries.forEach(entry => {
    const phoneNumber = entry.slice(-12);
    const digits = phoneDigits(phoneNumber);
    let node = trie;
    digits.forEach(digit => {
      node = (node[digit] = (node[digit] || new Array(11)));
    });
    node[10] = entry;
  });
  return function (phoneNumber) {
    const digits = phoneDigits(phoneNumber);
    let node = trie;
    for (const digit of digits) {
      node = node[digit];
      if (!node) return;
    }
    return node[10];
  };
}
```

Again, it could be a good idea to _assume_ we have some trie class ready-to-use, and build that class afterwards if there's time. So our solution might look like:

```js
function phoneDigits (phoneNumber) {
  return phoneNumber.split('').filter(ch => ch !== '-');
}
function generateSearcher (entries) {
  const trie = new DecimalTrie();
  entries.forEach(entry => {
    const digits = phoneDigits(entry.slice(-12));
    trie.insert(digits, entry);
  });
  return function (phoneNumber) {
    const digits = phoneDigits(phoneNumber);
    return trie.find(digits);
  };
}
```

...where a generic `DecimalTrie` class would hold arbitrary data for sequences of decimal digits. Given enough time we might implement it like so:

```js
class DecimalTrie {
  constructor () {
    this._children = new Array(11);
  }
  insert (digitSeq, value) {
    let node = this;
    digitSeq.forEach(digit => {
      node = node._children[digit] = node._children[digit] || new DecimalTrie();
    });
    node._children[10] = value;
    return this;
  }
  find (digitSeq) {
    let node = this;
    for (const digit of digitSeq) {
      node = node._children[digit];
      if (!node) return;
    }
    return node._children[10];
  }
}
```
