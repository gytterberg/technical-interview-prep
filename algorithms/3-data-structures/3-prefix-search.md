# Prompt

Given a "book" and a string to search for, return the character index for every word that begins with that string. The book will be given as two things: a book id and a string of English text. The search should be case *insensitive*.

Follow-up: consider the possibility of repeated searches through the same book.

# Examples

```js
const book = {
  id: 1,
  text: 'Once upon a time, there was a book with words. The book had not been catalogued, but would catch the eyes of onlookers nonetheless.'
};

findWordsStartingWith(book, 'the'); // should return [ 18, 47, 97 ]
findWordsStartingWith(book, 'cat'); // should return [ 69, 91 ]
```

# Solutions

A naive solution involves a simple loop through the text.

```js
function findWordsStartingWith (book, prefix) {
  const text = book.text.toLowerCase();
  prefix = prefix.toLowerCase();
  const finds = [];
  for (let i = 0; i < text.length - prefix.length; i++) {
    if (i !== 0 && text[i - 1] !== ' ') continue;
    for (let j = 0; j < prefix.length; j++) {
      if (prefix[j] !== text[i + j]) break;
      if (j + 1 == prefix.length) {
        finds.push(i);
      }
    }
  }
  return finds;
}
```

For repeated executions, precomputing a trie would be extremely helpful.

```js
const tries = {};
function buildTrie (text) {
  const trie = {};
  text = text.toLowerCase();
  for (let i = 0; i < text.length; i++) {
    let node = trie;
    const starting = i;
    while (text[i] !== ' ' && text[i] !== ',' && text[i] !== '.') {
      const char = text[i];
      node[char] = node[char] || {indexes: []};
      node[char].indexes.push(starting);
      node = node[char];
      i++;
    }
  }
  return trie;
}
function findOrCreateTrie (book) {
  if (!tries.hasOwnProperty(book.id)) {
    tries[book.id] = buildTrie(book.text);
  }
  return tries[book.id];
}
function findWordsStartingWith (book, prefix) {
  prefix = prefix.toLowerCase();
  const trie = findOrCreateTrie(book);
  let node = trie;
  for (let i = 0; i < prefix.length; i++) {
    const char = prefix[i];
    node = node[char];
    if (!node) return [];
  }
  return node.indexes;
}
```
