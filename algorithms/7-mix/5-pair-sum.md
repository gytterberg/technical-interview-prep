class: center middle
## Pair Sum

---

## Interviewer Prompt

Given an array of integers (`array`) and a number `n`, write an algorithm that determines whether or not there exists two elements in the `array` whose sum is `n`.

---

## Example Output

```javascript
pairSum([1, 2, 3, 4, 5], 9) // returns an array with the pair: [4, 5]
pairSum([1, 2, 3, 4, 5], 10) // returns an empty array: []
```

---

class: center middle
## Interviewer Guide

---

### RE

Coaching advice for the interviewer to make sure that their interviewee is asking the right questions

#### Example:
* If your interviewee continues without asking questions, stop them and ask, "Do you have any questions about the result?" Your prompt should only specify that `n` is an integer, and `array` is an array of integers. Make sure that they're thinking about that.

---

### Answers to Common Questions

#### Example:
* Can the input array be empty?
  * _Possibly_
* Is the input array sorted?
  * _No, not at first_
* Can `n` be positive or negative?
  * _`n` could be either positive or negative_
* Does the order of the output array matter?
  * _No, but it should be stable (that is, you should always get the same result for the same input)_
* What if there is more than one matching pair?
  * _Return the first one you find_

---

## Solution and Explanation (a)

There are two approaches to solving this.

One solution can be done in `O(nlog(n))` time, and requires no extra space.

The other can be done in `O(n)` time, but requires `O(n)` extra space.

---

## Solution 1:

Time: O(n), Space: O(n)

```javascript
const pairSum = (array, n) => {
  // worst case, this object will need
  // about as much space as the input array
  const dict = {}

  for (let i = 0; i < array.length; i++) {
    const current = array[i]
    const complement = n - current
    // We'll check the dict to see if the "complement"
    // has been previously stored in the dictionary
    if (dict[complement]) {
      return [current, complement] // Found it!
    } else {
      dict[current] = true
    }
  }

  // Not found :(
  return []
}
```

---

## Solution 2:

Time: O(nlog(n)), Space: O(1)

```javascript
const pairSum = (array, n) => {
  let start = 0
  let end = array.length - 1

  // Assume this sort is nlog(n),
  // which is as good as we're going to get
  array.sort((a, b) => a - b)

  // Because we know the array is sorted, we can "ratchet"
  // through the array with our pointers and try to find
  // a matching pair!

  while (start < end) {
    const sum = array[start] + array[end]
    if (sum === n) // Found it!
      return [array[start], array[end]]
    else if (sum > n)
      end-- // Move the 'end' pointer further left
    else
      start++ // Move the 'start' pointer further right
  }

  // Not found :(
  return []
}
```

---

## Summary

* We often trade space for time
* Which approach you take may depend on your situation

---
