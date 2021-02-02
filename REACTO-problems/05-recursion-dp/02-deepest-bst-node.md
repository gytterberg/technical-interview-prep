## Tree Traversal

---

## Learning Objective

Apply recursion to BSTs, understand recursive structure of BSTs

---

## Interviewer Prompt

Given a binary tree, write a function that will return the node in the tree with greatest depth.You may assume there is a unique deepest node.

---

## Setup and Example

```javascript
function node(val) {
  return {
    val,
    left: null,
    right: null
  };
}
let a = node('a');
let b = node('b');
let c = node('c');
let d = node('d');
let e = node('e');
let f = node('f');

a.left = b;
a.right = c;
b.right = d;
d.left = f;
c.left = e;

findDeepest(a) //Result: f
```

---

## Interviewer Guide

---

### RE

- Interviewee does not need to write the "node" function, but should be aware of the structure of a node

- Be sure to have your interviewee sketch an example tree

- You may need to remind your interviewee of what depth means in a tree (the root has depth 0, and each node's depth is it's parent's depth + 1)

---

### AC

- You may want to remind your interviewee that many tree problems have a depth-first and a breadth-first solution

- Remind them that each child of a tree node is it's own tree

---

### TO

  - If your interviewee finishes, ask them:
  - What is the Big O of their approach?
  - If they found the depth first solution, suggest they look for a breadth first solution, or vice-versa

---

## Solution Code (Depth First)

```javascript
const findDeepestDFS = (node) => {
  let deepestNode = node
  let deepestLevel = 0
  // find is a helper function which we'll recurse over
  const find = (node, level = 0) => {
    if (node) {
      // if this node's level is deeper than the current "deepestLevel", replace it
      if (level > deepestLevel) {
        deepestNode = node;
        deepestLevel = level;
      }
      // recursive cases: if node.left and/or node.left exist, call the function on each, increasing the level by 1
      if (node.left) {
        find(node.left, level + 1);
      }
      if (node.right) {
        find(node.right, level + 1);
      }
      // the base case is implicit here: if there's no node.left or node.right, the function execution ends
    }
  }
  find(node)
  return deepestNode;
};
```

---

## Solution Code (Breadth First)

```javascript
const findDeepestBFS = (node) => {
  // we use a queue to iterate over the tree
  let queue = [node]
  let current;
  while (queue.length > 0) {
    current = queue.shift()
    if (current.left) queue.push(current.left)
    if (current.right) queue.push(current.right)
  }
  // when we exit the while loop, it means we've seen every node, in breadth-first order
  //current will be the last node we saw, which will necessarily be the deepest node in the tree
  return current;
}
```

---

## Summary

#### Big O

In both solutions, you must visit every node in the tree.
- Depth First: O(n)
- Breadth First: O(n)

## Resources
_Feel free to PR any useful resources! :)_

* [Sample Slides](https://docs.google.com/presentation/d/1zSNxir8ogHsZJtXXVWxYJf_GORQJBWvSoCQ7KEjgW9c/edit#slide=id.gb085c6eb8e_0_6)
* [Algo Expert Similar Problem](https://www.algoexpert.io/questions/Node%20Depths)
