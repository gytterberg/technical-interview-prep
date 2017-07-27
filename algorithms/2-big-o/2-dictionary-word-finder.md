[Slides](http://slides.com/mschreiber/reacto)
---

# Prompt

Given an alphabetical array of dictionary entries and a word to search for, find that word's definition (if it exists). This array of dictionary entries will be formatted like so:

```javascript
[
  'definition - A statement of the exact meaning of a word, especially in a dictionary',
  'inane - Lacking sense or meaning; silly',
  'word - A single distinct meaningful element of speech or writing, used with others (or sometimes alone) to form a sentence and typically shown with a space on either side when written or printed'
]
```

...though the actual array of entries should be an input to the algorithm.

# Examples

```javascript
const dictionary = [
  'a - Used when mentioning someone or something for the first time in a text or conversation',
  'and - Used to connect words of the same part of speech, clauses, or sentences, that are to be taken jointly',
  'be - Exist',
  'in - Expressing the situation of something that is or appears to be enclosed or surrounded by something else',
  'of - Expressing the relationship between a part and a whole',
  'that - Used to identify a specific person or thing observed or heard by the speaker',
  'the - Denoting one or more people or things already mentioned or assumed to be common knowledge',
  'to - Expressing motion in the direction of (a particular location)'
];
definitionOf('be', dictionary); // should return 'Exist'
definitionOf('that', dictionary); // should return 'Used to identify a specific person or thing observed or heard by the speaker'
definitionOf('to', dictionary); // should return 'Expressing motion in the direction of (a particular location)'
definitionOf('wizbing', dictionary); // should return undefined
```

# Solutions

The naive (brute force) solution, `O(n)` time (or `O(n*m)` if we consider the word length itself, `m`, to grow arbitrarily large) and `O(1)` space*:

```javascript
function definitionOf (word, dict) {
  for (let i = 0; i < dict.length; i++) {
    if (dict[i].startsWith(word + ' - ')) {
      return dict[i].slice(word.length + 3); // "subtract" the word itself (plus the ' - ' part)
    }
  }
}
// with fancy `.find` method
function definitionOf (word, dict) {
  const foundEntry = dict.find(entry => entry.startsWith(word + ' - '));
  if (!foundEntry) return;
  return foundEntry.slice(word.length + 3); // "subtract" the word itself (plus the ' - ' part)
}
```

The optimized binary search solution can be `O(log n)` time and `O(1)` space&#42; (see below). Note to interviewers:  the less than `<` and greater than `>` operators can compare strings by alphabetical order (or really by character code, but that's close enough for what we're doing here). If a candidate goes down a rabbit-hole trying to implement a `compareByAlphabeticalOrder` function, just let them know that they can use `<`/`>`.

```javascript
function definitionOf (word, dict) {
  // initialize indexes at the beginning and end of the dictionary, these define the bounds of our "search window"
  let prevLeft = 0;
  let prevRight = dict.length - 1;
  let index;
  // continue until the index has not changed from the previous cycle
  while (index !== prevLeft && index !== prevRight) {
    // find the middle of the existing search window
    index = Math.floor((prevLeft + prevRight) / 2);
    if (dict[index].startsWith(word + ' - ')) {
      return dict[index].slice(word.length + 3); // "subtract" the word itself (plus the ' - ' part)
    }
    if (word < dict[index]) {
      // "shrink" the right half of the search window
      prevRight = index - 1;
    } else {
      // "shrink" the left half of the search window
      prevLeft = index + 1;
    }
  }
}
```

...or more modular:

```js
function binaryFind (arr, matcher, comparator) {
  // initialize indexes at the beginning and end of the array, these define the bounds of our "search window"
  let prevLeft = 0;
  let prevRight = arr.length - 1;
  let index;
  // continue until the index has not changed from the previous cycle
  while (index !== prevLeft && index !== prevRight) {
    // find the middle of the existing search window
    index = Math.floor((prevLeft + prevRight) / 2);
    if (matcher(arr[index])) {
      return arr[index];
    }
    if (comparator(arr[index])) {
      // "shrink" the right half of the search window
      prevRight = index - 1;
    } else {
      // "shrink" the left half of the search window
      prevLeft = index + 1;
    }
  }
}
function definitionOf (word, dict) {
  const foundEntry = binaryFind(
    dict,
    entry => entry.startsWith(word + ' - '),
    entry => word < entry
  );
  return foundEntry.slice(word.length + 3); // "subtract" the word itself (plus the ' - ' part)
}
```

The further-optimized precomputed hash map solution, `O(n)` time for the first run, `O(1)` for every subsequent run (AKA `O(n)` preprocessing time), and `O(n)` space*:

```javascript
// this cache will hold ALL dictionaries (though we'll only ever have one)
const cache = new Map();
function findOrCreateHashMap (dict) {
  // use the dictionary array object itself as a KEY
  if (cache.has(dict)) return cache.get(dict);
  const hashmap = {};
  dict.forEach(entry => {
    const [word, definition] = entry.split(' - ');
    hashmap[word] = definition;
  });
  cache.set(dict, hashmap);
  return hashmap;
}
function definitionOf (word, dict) {
  const hashmap = findOrCreateHashMap(dict);
  return hashmap[word];
}
```

&#42; - Actually if you consider the size of an entry to be a relevant variable, then the space complexity changes by a multiplier of `p`, the average size of an entry in the dictionary.
