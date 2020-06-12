class: center middle
# Reverse a Linked List

---

## Interviewer Prompt

```js
const mkNode = (value, next = null) => ({ value, next })
const nums = mkNode(1, mkNode(2, mkNode(3)))
```

1. Given a linked list with `.value` (first value) and `.next` (remaining list) interface, log the values in reverse order.
2. Write a function which returns a new reversed linked list.

**Restrictions**:

- no mutation at all, 100% pure (except for `console.log` in Part 1)
- no built-in data structures or methods, only variables / functions / control flow
  - no arrays, no objects except the (immutable) list nodes themselves
  - no iterables or iteration protocol (`for`-`of`, `...`)

---

## Example Output

Part 1:

```js
const nums = mkNode(1, mkNode(2, mkNode(3)))
logReverse(nums)
```

```
3
2
1
```

Part 2:

```js
const nums = mkNode(1, mkNode(2, mkNode(3)))
const reversed = reverse(nums)
console.log(reversed)
```

```
{ value: 3, next: { value: 2, next: { value: 1, next: null } } }
```

---

class: center middle
## Interviewer Guide

---

### RE

* Give Part 1 before hinting that there is a Part 2 (if you can).
* The list is singly-linked – it only has `value` (or `head`) and `next` (or `tail`) properties.
* The list can be implemented as a class, or factory function, or just manually-constructed POJOs. It doesn't really matter.

---

### AC

* List nodes can be constructed, but _not_ changed after construction.

```js
// OK:
const newNodeOK = { value: something, next: oldNode }
// NOT OK:
const newNodeBad = { value: something }
newNodeBad.next = oldNode
```

* Parameters and variables can be _defined_ but not _reassigned_. Parameters _may_ have default values (but it is not strictly necessary to solve the problem).
* If they are hitting a complete wall, point out that instead of loops, functional languages use recursion.
* Think of `null` as "empty list" – in practice it is a cleaner and more natural base case for recursion than the last "occupied" node.
* For Part 2, if they are trying to re-use existing nodes, help guide them towards the realization that it is impossible to re-use existing nodes in a reversed list without mutating those nodes.

---

### TO

- Ensure solution has no reassigned variables, parameters, or properties
- Ensure solution uses no built-in data structures or methods (except the list objects themselves)
- Best possible time & space for Part 1: `O(n)` time, `O(n)` stack space
  - Tail recursion won't work because we need to cause an effect (`console.log`)
- Best possible time & space for Part 1: `O(n)` time, `O(n)` space
  - Have to construct an all-new list of n nodes, that takes time and space!

---

### Answers to Common Questions

- Is this actually better than loops or whatever?
  - In JS? Not necessarily. Sometimes recursion is cleaner or more natural looking, but it is rarely faster or smaller than an imperative loop. In functional languages, you don't have the option of a loop, but a _tail-recursive_ function gets optimized into a loop by the compiler anyway. Also, better data structures exist than linked lists!
- So what's the point?
  - FP isn't just "normal programming minus some conveniences" – by structuring code in terms of functions, static typing, purity, etc. you actually also unlock and gain new tools for static analysis (dev tools and enforced correctness), composability, ability to reason about code in terms of laws, etc. This REACTO doesn't reveal any of that however, it's just a fun/challenging puzzle.
- How do I account for recursion in Big O?
  - The space complexity due to recursion is a factor of the maximum height of the call stack (i.e. the deepest recursive branch). The time complexity can be harder to analyze as it depends on whether you have multiple recursive calls – you need a way to figure out how many recursive calls you will use in total.

---

## Part 1 Solution

```js
// O(n) time, O(n) stack space
const logReversed = list => {
    if (!list) return
    logReversed(list.next)
    console.log(list.value)
}
```

---

## Part 2A: Expected / Efficient Solution (Implicit Fold)

```js
// O(n) time, O(n) space, tail-recursive
const reverse = (oldList, newList = null) => {
    if (!oldList) return newList
    const newerList = mkNode(oldList.value, newList)
    return reverse(oldList.next, newerList)
}
```

In FP langs, you cannot have "optional" params, so you'd do this:

```js
const reverse = initList => {
    const go = (oldList, newList) => {
        if (!oldList) return newList
        const newerList = mkNode(oldList.value, newList)
        return go(oldList.next, newerList)
    }
    return go(initList, null)
}
```

---

## Part 2B: FP Veteran Solution (Explicit Fold, Currying, Combinators)

Something to share afterwards; not an expected REACTO solution, but something a practiced FP-er might translate from similar built-in functions in e.g. Haskell.

```js
const foldl = (combine, accum) => list => {
    if (!list) return accum
    const newAccum = combine(accum, list.value)
    return foldl(combine, newAccum)(list.next)
}

const flip = f => (a, b) => f(b, a)

const reverse = foldl(flip(mkNode), null)
```

---

## Part 2C: Inefficient Solution (Concat)

This isn't an intended solution, but is included for your information / in case students try this approach.

```js
// O(l + r) time, O(l + r) space
const concat = (left, right) => {
    if (!left) return right
    if (!right) return left // optional optimization
    return mkNode(
        left.value,
        concat(left.next, right)
    )
}

// O(n^2) time, O(n) space
const reverseMeh = list => {
    if (!list) return list
    return concat(
        reverseMeh(list.next),
        mkNode(list.value)
    )
}
```

---

## Summary / Resources

* [Wikipedia: cons cells](https://en.wikipedia.org/wiki/Cons)
