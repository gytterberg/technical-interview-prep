// BREADTH-FIRST PRINT

function breadthFirst(startingNode) {  // Approach 1 (queue)
  const queue = [startingNode];

  while(queue.length) {
    const node = queue.shift();
    console.log(node.value);
    queue.push(...node.children);
  }
}

function breadthFirst(startingNode) {  // Approach 1.5
  const queue = [startingNode];

  for (let i = 0; i < queue.length; ++i) {
    const node = queue[i];
    console.log(node.value);
    queue.push(...node.children);
  }
}

function breadthFirstRecursive (node, ...queue) {  // Approach 3 (recursive)
  if (!node) return;
  console.log(node.value);
  breadthFirstRecursive(...queue, ...node.children);
}



// DEPTH FIRST PRE-ORDER PRINT

function depthFirstPreOrder(startingNode) {  // Approach 1 (recursive)
  console.log(startingNode.value);

  startingNode.children.forEach(child => depthFirstPreOrder(child));
}

function depthFirstPreOrderStack (startingNode) {  // Approach 2 (stack)
  const stack = [startingNode];
  while(stack.length) {
    let node = stack.shift();
    console.log(node.value);
    stack.unshift(...node.children);
  }
}



// DEPTH-FIRST POST-ORDER PRINT

function depthFirstPostOrder(startingNode) {
  startingNode.children.forEach(child => depthFirstPostOrder(child));

  console.log(startingNode.value);
}

// Remember that you don't have to use an anonymous callback for `forEach`, e.g.
function depthFirstPostOrder(startingNode) {
  startingNode.children.forEach(depthFirstPostOrder);
  console.log(startingNode.value);
}



// 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲



// CREATING THE TREE:
function Node(value) {
  this.value = value;
  this.children = [];
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');
const g = new Node('g');
const h = new Node('h');
const i = new Node('i');
const j = new Node('j');
const k = new Node('k');
const l = new Node('l');
const m = new Node('m');

a.children.push(b,c,d);
b.children.push(e);
e.children.push(k,l);
c.children.push(f,g,h);
h.children.push(m);
d.children.push(i,j);



// 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲 🎄 🌲



// TESTING THE FUNCTIONS

console.log('breadthFirst');
breadthFirst(a);

console.log('depthFirstPreOrder');
depthFirstPreOrder(a);

console.log('depthFirstPostOrder');
depthFirstPostOrder(a);