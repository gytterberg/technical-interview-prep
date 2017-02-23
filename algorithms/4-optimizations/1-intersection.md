# Prompt

Given two sorted arrays of numbers, return an array containing all values that appear in *both* arrays. The numbers in the resulting array (the "intersection") may be returned in any order, they needn't be sorted.

Follow-up: now consider what you might do if the given arrays are *not* sorted.

# Examples

```js
intersection([1,4,9,10,11], [2,3,4,5,8,10]); // should return [4, 10] (numbers can be in any order)
```

Follow-up example:

```js
intersection([5,4,1,7,2], [4,2,3,5]); // should return [5, 4, 2] (numbers can be in any order)
```

# Solutions

A naive, brute-force solution is to loop over the elements of one array, and within that loop, to loop over elements of the other array. For each pair of elements (one from each array) that are equal, push that value to a resultant array. This ends up being `O(n*m)` time complexity where `n` and `m` are the size of the given arrays. Below is an implementation:

```js
function intersection (arrA, arrB) {
  const shared = [];
  arrA.forEach(elemA => {
    arrB.forEach(elemB => {
      if (elemA == elemB) {
        shared.push(elemA);
      }
    });
  });
  return shared;
}
```

A more optimal approach involves "ratcheting" forward through both arrays. You can start an index for each array at zero, incrementing each index whenever its corresponding element is less than its counterpart in the other array. Whenever two elements are equal, add that value to the resulting array (and increment both indexes). Diagrammed below:

```
/*
 i             j
 v             v
[1,4,9,10,11] [2,3,4,5,8,10]
left[i] < right[j] so i++

   v           v
[1,4,9,10,11] [2,3,4,5,8,10]
right[j] < left[i] so j++

   v             v
[1,4,9,10,11] [2,3,4,5,8,10]
right[j] < left[i] so j++

   v               v
[1,4,9,10,11] [2,3,4,5,8,10]
left[i] == right[j] so include 4 in result, and i++, j++

     v               v
[1,4,9,10,11] [2,3,4,5,8,10]
right[j] < left[i] so j++

...etc
*/
```

Ultimately this solution is only possible because both arrays are sorted. The resulting algorithm is `O(n+m)` time complexity. Here's an implementation:

```js
function intersection (arrA, arrB) {
  const shared = [];
  let idxA = 0;
  let idxB = 0;
  while (idxA < arrA.length && idxB < arrB.length) {
    const elemA = arrA[idxA];
    const elemB = arrB[idxB];
    if (elemA == elemB) {
      shared.push(elemA);
    }
    if (elemA <= elemB) {
      idxA++;
    }
    if (elemA >= elemB) {
      idxB++;
    }
  }
  return shared;
}
```

For the follow-up, we could use a hash map to make a trade: time for space. The following solution is `O(n+m)` time complexity, but `O(n+m)` additional space.

```js
function intersection (arrA, arrB) {
  const hashA = {};
  arrA.forEach(elemA => hashA[elemA] = true);
  const shared = [];
  arrB.forEach(elemB => {
    if (hashA.hasOwnProperty(elemB)) {
      shared.push(elemB);
    }
  });
  return shared;
}
```

We can also use a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) to achieve essentially the same thing:

```js
function intersection (arrA, arrB) {
  const setA = new Set(arrA);
  const shared = [];
  arrB.forEach(elemB => {
    if (setA.has(elemB)) {
      shared.push(elemB);
    }
  });
  return shared;
}
```
