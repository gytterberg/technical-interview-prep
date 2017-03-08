[Out of date slides](http://slides.com/benjaminconant/reacto#/)

---

# Prompt

Today you will write a series of iterator functions for trees.

- `breadthFirst`
- `depthFirstPreOrder`

(if time allows)

- `depthFirstPostOrder`

Each of these function will take a node of the tree and iterate through all other nodes. The difference between them is the order in which they iterate.

# Examples

For the following examples consider this tree:

![tree](https://www.cpp.edu/~ftang/courses/CS241/notes/images/trees/tree1.bmp)

| Algorithm             | Order                       | Explanation                                                |
|-----------------------|-----------------------------|------------------------------------------------------------|
| `breadthFirst`        | `A B C D E F G H I J K L M` | Each "level" of the tree is printed in order               |
| `depthFirstPreOrder`  | `A B E K L C F G H M D I J` | Children nodes are visited before sibling nodes            |
| `depthFirstPostOrder` | `K L E B M F G H C I J D A` | A node is not traversed until all its children are reached |


A tree is represented by its `root` or top node. In other words, the top node is what will be passed into your function. You can assume that each node in the tree contains the following properties:

* `.value` — the content (data) of the node, what you should print out
* `.children` — an ordered array of child nodes for that node


# Solution

```javascript
function breadthFirst (startingNode) {
  const queue = [startingNode];
  while(queue.length) {
    let node = queue.shift();
    console.log(node.value);
    queue.push(...node.children);
  }
}

function depthFirstPreOrder(startingNode) {
  console.log(startingNode.value);
  startingNode.children.forEach(function(child) {
    depthFirstPreOrder(child);
  });
}

function depthFirstPostOrder(startingNode) {
  startingNode.children.forEach(function(child) {
    depthFirstPreOrder(child);
  });
  console.log(startingNode.value);
}

function node(value) {
  return {
    value,
    children: []
  }
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

a.children.push(b,c,d);
b.children.push(e);
e.children.push(k,l);
c.children.push(f,g,h);
h.children.push(m);
d.children.push(i,j);
```
