# Merge Two Linked Lists

## Learning Objective
* Apply pointer logic to multiple linked lists


## Interviewer Prompt

Write a function that takes in the heads of two Singly Linked Lists that are in sorted order, respectively. The function should merge the lists in place (i.e., it shouldn't create a brand new list) and return the head of the merged list; the merged list should be in sorted order.

Each `LinkedList` node has an integer `value` as well as a `next` node pointing to the next node in the list or to `null` if it's the tail of the list.

## Examples

```
headOne = 2 -> 6 -> 7 -> 8 // the head node with value 2
headTwo = 1 -> 3 -> 4 -> 5 -> 9 -> 10 // the head node with value 1
mergeLinkedLists(headOne, headTwo) = 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 // the new head node with value 1
```

## Interviewer Strategy Guide

First, make sure the interviewee understands the structure of a `LinkedList` and its constraints. Because the lists are already sorted, traditional sorting algorithms won't be needed. 

The interviewee can implement this algorithm either iteratively or recursively following nearly identical logic, so you can leave that up to them.

Most interviewees will get the process, but it's very easy to "solve" the problem by creating a malformed `LinkedList`. Make sure 3 nodes are being manipulated at every step to ensure the final LinkedList doesn't have any holes or misdirected pointers.

## Hints

* You can iterate through the Linked Lists from head to tail and merge them along the way by inserting nodes from the second Linked List into the first Linked List.
* You'll need to manipulate three nodes at once at every step.

## Solutions

**Optimized Solution 1:** O(n+m) time complexity, O(1) space complexity (n=length(headOne),m=length(headTwo))

```js
function mergeTwoLists(headone, headtwo) {
  if (headone === null || headtwo === null)
    return headone === null ? headtwo : headone

  // p1 starts at the smaller head
  let p1 = headone.value <= headtwo.value ? headone : headtwo
  let p2 = headone === p1 ? headtwo : headone
  let head = p1

  while (p1.next !== null && p2 !== null) {
    // if p1.next is less than p2 we can just move ahead one spot with p1
    if (p1.next.value <= p2.value) {
      p1 = p1.next
    }
    // if p2 is less than p1.next we'll need to slot p2
    // in between p1 and p1.next without losing the reference to p1.next
    else {
      let temp = p1.next
      p1.next = p2
      p2 = temp
    }
  }

  p1.next = p2
  return head
}
```

**Optimized Solution 2:** O(n+m) time complexity, O(n+m) space complexity (n=length(headOne),m=length(headTwo))

```js
function mergeLinkedLists(headOne, headTwo) {
  recursiveMerge(headOne, headTwo, null);
  return headOne.value < headTwo.value ? headOne : headTwo;
}
​
function recursiveMerge(p1, p2, p1Prev) {
  if (p1 === null) {
    p1Prev.next = p2;
    return;
  }
  if (p2 === null) return;

​  if (p1.value < p2.value) {
    recursiveMerge(p1.next, p2, p1);
  } else {
    if (p1Prev !== null) p1Prev.next = p2;
    const newP2 = p2.next;
    p2.next = p1;
    recursiveMerge(p1, newP2, p2);
  }
}
```

**Optimized Solution 3:** O(n+m) time complexity, O(n+m) space complexity (n=length(headOne), m=length(headTwo))

```js
function mergeLists(headone, headtwo) {
  if (headone === null || headtwo === null) {
    return headone === null ? headtwo : headone
  }

  let p1 = headone.val <= headtwo.val ? headone : headtwo
  let p2 = p1 === headone ? headtwo : headone
  const head = p1

  head.next = mergeLists(p1.next, p2)

  return head
}
```

## Resources

* [Sample Slides](https://docs.google.com/presentation/d/1Bm02MoVpBkTsvy8GdGjbVXvLMLYYeiEc/edit#slide=id.p1)
* [AlgoExpert Link](https://www.algoexpert.io/questions/Merge%20Linked%20Lists)

for testing
```js
class LinkedList {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

function createList (nums) {
  let head = new LinkedList(nums[0])
  let origHead = head
  for (let i = 1; i < nums.length; i++) {
    head.next = new LinkedList(nums[i])
    head = head.next
  }
  return origHead
}

let headone = createList([2, 4, 6, 8])
let headtwo = createList([1, 3, 5, 7])
```
