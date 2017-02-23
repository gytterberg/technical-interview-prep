# Prompt

You are attempting to find the index of the first appearance of one string (the needle) inside of another (the haystack).

# Examples

``` javascript
indexOf('or', 'hello world'); // should return 7
indexOf('howdy', 'hello world'); // should return -1
```

# Solution(s)

```javascript
function indexOf (needle, haystack) {
  for (let hIdx = 0; hIdx + needle.length <= haystack.length; hIdx++) {
    for (let nIdx = 0; nIdx < needle.length; nIdx++) {
      if (haystack[hIdx + nIdx] !== needle[nIdx]) break;
      if (nIdx + 1 === needle.length) return hIdx;
    }
  }
  return -1;
}
```

*Note: where n is the haystack size and m the needle size, the solution above is O(n&#42;m). There are [other algorithms](https://en.wikipedia.org/wiki/String_searching_algorithm#Single_pattern_algorithms), such as [Boyer-Moore](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm) (well, [modified slightly](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm#The_Galil_Rule)), that can perform at O(n+m) time—or even faster.*
