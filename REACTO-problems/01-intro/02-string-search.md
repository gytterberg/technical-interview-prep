# String Search

## Learning Objective
* Apply Big O Analysis with multiple variables

# Prompt

You are attempting to find the index of the first appearance of one string (the needle) inside of another (the haystack).

---

# Examples

```javascript
indexOf('or', 'hello world'); // should return 7
indexOf('hello world', 'or'); // should return -1
indexOf('howdy', 'hello world'); // should return -1
indexOf('oox', 'ooboxoooxo'); // should return 6
```

---

## Common approaches

**built-in methods**

- Most students' first instincts will be to use built-in string methods like `indexOf()`, `includes()` or `substring()`. `indexOf()` is, of course, explicitly forbidden; steer them away from methods like `includes()` and `substring()`.


- Many whiteboard interviews will be language-agnostic and focus on the underlying concepts. You will want to show that you understand how these methods work, not that you happened to read the right documentation the night before.


- You may actually be adding more (hidden) complexity. Look into how `indexOf()`, `includes()` and `substring()` work under the hood. Many built-in methods actually add an operation that's O(n), or worse.


## Common approaches

**split() and loop**

- Most students also move to split the haystack into an array of characters, and then loop through.


- This approach would work; but imagine the space complexity of generating a new array and then holding it in memory for a very, very large haystack. You would be introducing another O(n) dimension in time and space, where n is the length of the haystack.


- If they're in a groove, have them finish out this approach and pseudocode it; then ask them how they would do this without generating a second copy of the haystack.


# Solution(s)

```javascript
function indexOf(substring, string) {
  for (let start = 0; start <= string.length - substring.length; start++) {
    for (let offset = 0; offset < substring.length; offset++) {
      if (string[start + offset] !== substring[offset]) {
        break;
      }
      if (offset + 1 === substring.length) {
        return start;
      }
    }
  }
  return -1;
}
```

---

# Big O

Where n is the haystack size and m the needle size, the solution is O(n\*m).

**Why?**

```javascript
function indexOf(substring, string) {
  for (let start = 0; start <= string.length - substring.length; start++) {
    // We have to do this loop N times, where N is the length of `string`
    for (let offset = 0; offset < substring.length; offset++) {
      // We have to do this loop M times, where M is the length of `substring`
      if (string[start + offset] !== substring[offset]) {
        break;
      }
      if (offset + 1 === substring.length) {
        return start;
      }
      // ^ Body of inner loop is constant time, O(1)
    }
  }
  return -1;
  // ^ Constant time, O(1);

  // Overall algorithm is O(N * M) time complexity, O(1) space complexity
  // Could also say that the algorithm is O(P), where P = N * M.
  // This demonstrates that overall the growth is linear, not quadratic (N^2).
}
```

So, O(n \* (m \* (1 + 1)))=> O(n\*m)


## Resources
_Feel free to PR any useful resources! :)_

* [Sample Slides](https://docs.google.com/presentation/d/1XfnxmFlgMpcSvj4t3fuDFOs6WHpL9VAYxwTcEBr_bsA/edit#slide=id.p)
* Video Solution [Matt Mintzer](https://www.youtube.com/watch?v=RDYZCErOQws)
* Video Solution: [Gabriel Ytterberg](https://youtu.be/UJQPVpvlZLA)
* There are that can perform at O(n+m) time—or even faster:
      * [other algorithms](https://en.wikipedia.org/wiki/String_searching_algorithm#Single_pattern_algorithms);
      * [Boyer-Moore](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm);
      * [modified slightly](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm#The_Galil_Rule)
