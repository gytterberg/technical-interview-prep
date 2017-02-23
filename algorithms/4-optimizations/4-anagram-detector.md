# Prompt

You are given an array of strings only (could be words, phrases etc). Create a function to find all the anagrams within that array. The output should be an array where each element in the array is itself an array of anagrams.

[Slides](http://slides.com/lindakung417/anagram-detection/#/) (note: the slides have a slightly different output requirement—a string that is a number listed).

# Examples

```js
const words = ['cat', 'act', 'ignore', 'a phrase', 'tape', 'pate', 'e hpsara'];
listAnagrams(words); // [['cat', 'act'], ['a phrase', 'e hpsara'], ['tape', 'pate']]
```

Notice that `'ignore'` does not appear in the output.

# Solutions

One effective approach is:

1. Sort each string in the array
2. Create a hash table of these sorted strings and arrays of words that match
3. Go through all of the values in that hash table and add them to the output array they contain at least two elements

```js
function listAnagrams (wordsArr) {
  const wordsTable = {};
  wordsArr.forEach(function (word) {
    // in order to sort a string we must convert it into an array of its characters
    const wordKey = word.split('').sort().join('');
    // if this sorted entry already exists push the word into the array with its sibling anagrams
    if (wordsTable[wordKey]) {
      wordsTable[wordKey].push(word);
    }
    // or if we have not yet visited any anagrams of this word, create a new array for it
    else wordsTable[wordKey] = [word];
  });
  const output = [];
  Object.keys(wordsTable).forEach(function (wordKey) {
    const anagrams = wordsTable[wordKey];
    // only include lists with more than one anagram
    if (anagrams.length > 1) {
      output.push(anagrams);
    }
  });
  return output;
}
```

"Minified" solution:

```js
const anagramDetector = strArr => Object.values(
  strArr.reduce((hash, word) => {
    const wordSort = word.split('').sort().join('');
    if (hash[wordSort]) hash[wordSort].push(word)
    else hash[wordSort] = [word];
    return hash;
  }, {})).filter(anagrams => anagrams.length > 1)
```
