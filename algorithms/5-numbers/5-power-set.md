# Prompt

Given an array of distinct items return the power set of the array. The power
set of a set is the set of all possible subsets. Given the input array, produce
an array where each item is an array representation of a possible subset. The
order of the resulting array does not matter.

# Examples

```js
> powerSet([1, 2, 3])
[ [], [ 1 ], [ 2 ], [ 3 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ] ]

> powerSet([1, 2, 3, 4])
[ [],
  [ 1 ],
  [ 2 ],
  [ 3 ],
  [ 4 ],
  [ 1, 2 ],
  [ 1, 3 ],
  [ 1, 4 ],
  [ 2, 3 ],
  [ 2, 4 ],
  [ 3, 4 ],
  [ 1, 2, 3 ],
  [ 1, 2, 4 ],
  [ 1, 3, 4 ],
  [ 2, 3, 4 ],
  [ 1, 2, 3, 4 ] ]

> powerSet(['a', 'b', 'c'])
[ [],
  [ 'c' ],
  [ 'b' ],
  [ 'a' ],
  [ 'a', 'c' ],
  [ 'a', 'b' ],
  [ 'b', 'c' ],
  [ 'a', 'b', 'c' ] ]
```

# Solutions

## Recursive Approach

The idea for this soultion is a form of divide and conquer which arises from an
observation: the complete power set is a union of two sets which do not
overlap. In particular, those sets are the power set of the array without the
first element, and those sets with the first element included. Put another way,
a subset of the original array is a set with or without the first element, but
not both. For example, take the following array `eg = ['a', 'b', 'c']` and note
that `['c']` is an array without the first element of `eg` which corresponds to
the array `['a', 'c']` with the first element.

As in any recursive solution, we want to explicitly manage the base case. The
base case of this problem is taking the power set of the empty array `[]` which
is the array of the empty array `[[]]`.

Once that is done, we can firstly, take the first element, secondly,
recursively call the function on the slice of the array without the first
element, thirdly, take that output array and add the first element to each
item, fourthly, combine these two arrays and finally, return the result.

```js
const powerSetRecursive = (array) => {
  if(array.length === 0) return [[]]
  const first = [array[0]]
  const slice = array.slice(1)
  const withoutFirst = powerSetRecursive(slice)
  const withFirst = withoutFirst.map((elt) => first.concat(elt))
  return [
    ...withFirst,
    ...withoutFirst,
  ]
}
```

Testing this on one of our examples gives the following code. Notice that the
order is different, but the problem statement said that sorting the output is
not required.

```js
> powerSetRecursive([1, 2, 3])
[ [ 1, 2, 3 ], [ 1, 2 ], [ 1, 3 ], [ 1 ], [ 2, 3 ], [ 2 ], [ 3 ], [] ]
```

What is the time and space complexity of this solution? In fact, it is
`O(n*2**n)`, in both cases, where `n` is the number of items in the original
array. While this is technically correct, it is not what most people will
expect you to say about this problem. This problem is *exponential* meaning
that it requires at least an exponential number of steps, in this case `2**n`.
The space complexity is easy to understand in this case, since there are `2**n`
arrays in our final array, each with length `O(n)` Exercise: explain why the
length of each is `O(n)`. The time complexity is more difficult to analyze, but
if you are up for the challenge [the analysis][powerSetRecursive-analysis] uses
[mathematical induction][wiki-induction].

[powerSetRecursive-analysis]: 5-power-set-analysis.md
[wiki-induction]: https://en.wikipedia.org/wiki/Mathematical_induction

## Iterative Approach

As noted in the previous solution, there are `2**n` subsets to enumerate, and
the idea behind this solution is simply to count to `2**n`. The idea here is
that each integer corresponds to a subset that you want, so there is no loss in
being exhaustive. Now the question is, how does each integer correspond to a
subset? By representing the integers as a `n`-bit binary word, we produce what
is known as a mask. This mask tells us which elements to include and which to
exclude, and we make the arbitrary decision to include elements corresponding
to `1` and exclude those corresponding to `0`. Recall the array `eg` before,
and while running the loop the index will be 3 which corresponds to `11` in
binary which results in a mask of `011` which, finally, corresponds to the
array `[2, 3]`. Exercise: Why is picking `1` arbitrary?

```js
const pad = (part, len, char) => {
  if(char.length !== 1) throw Error('Unsupported pad character.')
  const full = Array(len).fill(char).join('')
  return full.slice(part.length) + part
}

const maskArray = (array, mask) => (
  array.filter((el, ix) => (mask[ix] === '1'))
)

const powerSetIterative = (array) => (
  Array(2**array.length).fill(1).map((el, ix) => {
    return maskArray(array, pad(ix.toString(2), array.length, '0'))
  })
)
```

Again, we test our code on one of our examples. Notice that the order is
different from the recursive solution and the problem statement, but, again,
the problem statement said that the order of the output does not matter.

```js
> powerSetIterative([1, 2, 3])
[ [], [ 3 ], [ 2 ], [ 2, 3 ], [ 1 ], [ 1, 3 ], [ 1, 2 ], [ 1, 2, 3 ] ]
```
How does this work? Consider the following table:

| index | mask | masked array |
|-------|------|--------------|
|     0 |  000 | `[]`         |
|     1 |  001 | `[3]`        |
|     2 |  010 | `[2]`        |
|     3 |  011 | `[2, 3]`     |
|     4 |  100 | `[1]`        |
|     5 |  101 | `[1, 3]`     |
|     6 |  110 | `[1, 2]`     |
|     7 |  111 | `[1, 2, 3]`  |

Take note of how each integer index corresponds to a 3 bit mask. Look at the
mask for index 3, `011`, and recall this means exclude the first element and
include the second and third element of the array resulting in `[2, 3]`. Then
the final output is an array of all the items in the masked array column.

What is the time and space complexity here? The space is the same as above,
since the output is the same length, although it is in a different order, still
`O(n*2**n)`. Again this is *exponential*, and we can see that the time
complexity is also exponential because we have a loop that has `2**n` steps,
and each step in the loop is `O(n)`.

## Appendix

Note that `powerSetIterative` could also be written this way, which some may
find more readable than the comparatively terse solution above.

```js
const powerSetIterative2 = (array) => {
  let output = []
  for(let ix=0; ix < 2**array.length; ix++) {
    output.push(
      maskArray(array, pad(ix.toString(2), array.length, '0'))
    )
  }
  return output
}

> powerSetIterative2([1, 2, 3])
[ [], [ 3 ], [ 2 ], [ 2, 3 ], [ 1 ], [ 1, 3 ], [ 1, 2 ], [ 1, 2, 3 ] ]
```
