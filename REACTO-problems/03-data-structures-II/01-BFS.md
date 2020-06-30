class: center middle

## Tree Traversal

---

## Interviewer Prompt

Today you will write a series of iterator functions for trees.

- `breadthFirst`
- `depthFirstPreOrder`

(if time allows)

- `depthFirstPostOrder`

Each of these function will take a node of the tree and a callback. The function will iterate through the child nodes, calling the callback function on each of them. The difference between them is the order in which they iterate.

---

## Setup

```javascript
function node(value) {
  return {
    value,
    children: [],
  };
}
var a = node('a');
var b = node('b');
var c = node('c');
var d = node('d');
var e = node('e');
var f = node('f');
var g = node('g');
var h = node('h');
var i = node('i');
var j = node('j');
var k = node('k');
var l = node('l');
var m = node('m');

a.children.push(b, c, d);
b.children.push(e);
e.children.push(k, l);
c.children.push(f, g, h);
h.children.push(m);
d.children.push(i, j);
```

---

## Example

![tree](https://www.cpp.edu/~ftang/courses/CS241/notes/images/trees/tree1.bmp)

| Algorithm             | Order                       | Explanation                                                |
| --------------------- | --------------------------- | ---------------------------------------------------------- |
| `breadthFirst`        | `A B C D E F G H I J K L M` | Each "level" of the tree is printed in order               |
| `depthFirstPreOrder`  | `A B E K L C F G H M D I J` | Children nodes are visited before sibling nodes            |
| `depthFirstPostOrder` | `K L E B F G M H C I J D A` | A node is not traversed until all its children are reached |

---

class: center middle

## Interviewer Guide

---

### RE

- This differs from the traversal we worked on in junior phase in that each node may have any number of children

- You may need to remind your interviewee of what the different types of traversal mean

- Interviewee does not need to write the "node" function, but should be aware of the structure of a node

- Be sure to have your interviewee sketch an example tree

---

### AC

- Push a recursive solution

- Remind them that each child of a tree node is it's own tree

---

### TO

- If your interviewee finishes, ask them:
  - What is the Big O of the breadth first? Depth first?
  - Does your answer change if this becomes a binary search tree (max 2 children)?

---

## Solution Code (Breadth First)

```javascript
const breadthFirst = (root) => {
 //first always check if there is a root, if not we return null
 if(!root){
  return null
 }
 //BFS works best with a queue, so now we setup our Queue to hold the root node
 let queue = [root];
 //Setup a result array to store all of our nodes.
 let result = [];
 //Next we iterate while the queue has nodes in it
 while(queue.length){
 //setup another variable to keep track of where we are and process that nodes children
 //We take the first item off the queue since queues are FIFO.
 let current = queue.shift();
 //Check if our current node has and left children, if it does add them to the queue.
 if(current.left){
  queue.push(current.left)
  }
  //Check if our current node has and left children, if it does add them to the queue.
  if(current.right){
  queue.push(current.right)
  }
  //Lastly we push our current nodes value into an array to store all nodes processed.
  result.push(current.val)
 }
 return result;
};
```

---

## Solution Code (Depth First)

```javascript
// depth first seems trivial in comparison! Simply log the value
// and then call the function on each node
const depthFirstPreOrder = (startingNode, callback) => {
  callback(startingNode.value);
  startingNode.children.forEach(child => {
    depthFirstPreOrder(child, callback);
  });
};

const depthFirstPostOrder = (startingNode, callback) => {
  startingNode.children.forEach(child => {
    depthFirstPostOrder(child, callback);
  });
  callback(startingNode.value);
};
```

---

## Summary

Big O

- Breadth First: O(n)
- Depth First: O(n)

[Video Solution](https://www.youtube.com/watch?v=4JPG-eRQpzY)
