[Slides](http://slides.com/gtelljohann/reacto-priority-queue/#/)

---

# Prompt

A *queue* is a data structure that stores pieces of data and returns them in the same order in which they were inserted.  One way of implementing them is as a linked list.

A *priority queue* is a data structure that takes with each piece of data a priority value and returns the data in order of priority.

Implement a priority queue with the following 3 methods:

`insert(data, priority)` // inserts data into the priority queue with the given priority

`peek()` // returns the value of the item with the highest priority without removing it from the priority queue

`popMax()` // returns the value of the item with the highest priority and also removes it from the priority queue

For the purposes of our implementation, "higher priority" corresponds to a higher integer value. Note, however, that this could be implemented either way.

*Note to interviewers: feel free to push candidates towards the optimized heap approach (or not, as you see fit).*

# Examples

For example, a hospital emergency room could use a priority queue to determine the order in which their doctors see patients.  The priority queue would work the following way:

```javascript
var pq = new PriorityQueue();
pq.insert('Jill, concussion', 7);
pq.insert('John, stomach pain', 5);
pq.peek() // ==> 'Jill, concussion'
pq.peek() // ==> 'Jill, concussion'  // Jill is still in the PQ
pq.insert('Dave, sprained ankle', 1);
pq.insert('Bob, breathing problems', 8)
pq.peek() // ==> 'Bob, breathing problems'
pq.popMax() // ==> 'Bob, breathing problems'
pq.peek() // ==> 'Jill, concussion' // Bob has been removed from the PQ
```

# Solution

A naive approach would be to have what is essentially a linked list where each node also has a priority. To insert, simply traverse until you reach a node that is lesser in priority, and put the new node just before that one.

```javascript
function Node(data, priority) {
  this.data = data;
  this.priority = priority;
  this.next;
}

function PriorityQueue() {
  this.first;
}

PriorityQueue.prototype.insert = function(data, priority) {
  if (!this.first || this.first.priority < priority) {
    // First case: Handle both empty PQ and higher priority than anything in the queue. The new Node becomes the new first.
    var prevFirst = this.first;
    this.first = new Node(data, priority);
    this.first.next = prevFirst;
  } else {
    // Second case: Find the place to insert the new item and insert it.
    var pointer = this.first;
    while (pointer.next && pointer.next.priority >= priority) { //Traverse the queue until it finds a node with priority < search priority.
      pointer = pointer.next;
    }
    //At this point in the algorithm, pointer is the node right before the position where you're meant to insert a new item. Accomplish this by pointing the next of your new Node to pointer's next, and then pointing pointer's next to the new Node.
    var newItem = new Node(data, priority);
    newItem.next = pointer.next;
    pointer.next = newItem;
  }
}

PriorityQueue.prototype.peek = function() {
  return this.first.data;
}

PriorityQueue.prototype.popMax = function() {
  var retVal = this.first.data;
  this.first = this.first.next;
  return retVal;
}
```

This should be `O(1)` time complexity for peek and popMax, but `O(n)` time complexity for insert (where `n` is the number of nodes in the priority queue).

## Optimization: Binary heap

A more optimal solution could involve a heap, in particular a binary heap. This could give us `O(log n)` insertion time, with the not-so-bad down-side of changing `popMax` time to `O(log n)`.

A **binary heap** has 2 properties:

1. Uses a *complete* binary tree, which means that every level of the tree is full except the bottom level, which is filled from left to right
2. Insertions satisfy the *heap-order-property*, which says that no child's priority is less than its parent's priority

Because binary heaps are complete binary trees, they're often stored as arrays in an order that follows a level ordered traversal starting at the root. We could use a pointer-and-node-based data structure for the heap implementation, but the array runs faster because we don't have to set and reset references from one node to another.

By mapping objects to indices in this way, we can easily get an object's parent or children based on its index.

If i is the index of an object we can use the following formulas:
- parent is i/2 rounded down
- left child is 2i
- right child is 2i + 1

## Resources

- Taken from [Princeton's Algorithms 4th Edition](http://algs4.cs.princeton.edu/24pq/):

![](http://algs4.cs.princeton.edu/24pq/images/heap-representations.png)

- [Stanford's CS106B PQueue explainer](http://web.stanford.edu/class/archive/cs/cs106b/cs106b.1174/handouts/190%20Assignment%205.pdf) -- binary heap explanation starts on pg. 7

- [CMU explainer](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Binary%20Heaps/heaps.html)

An implementation of a priority queue using ES6 (and a [REPL explainer](https://repl.it/JrH7/3)) follows. Note that this is a minHeap, versus the prompt above, which asks for a maxHeap. Conversion for `insert()` is just a matter of reversing the priority rules, but how would this change `popMin()` and `popMax()`?

```javascript
class HeapPQ {
  constructor () {
    this.array = [null]
  }

  insert (data, priority) {
    this.array.push({data, priority})
    let currentChild = this.array.length - 1
    this.heapifyUp(currentChild)
  }

  min () {
    return this.array[1].data
  }

  popMin () {
    const min = this.array[1]
      , rootIdx = 1
    this.array[1] = this.array.pop()

    this.heapifyDown(rootIdx)
    return min.data
  }

  heapifyDown (rootIdx) {
    let currentParent = rootIdx
      , [l, r] = this.childrenIdx(currentParent)
      , idxSmaller
    const length = this.array.length
    while (l < length) {
      if (r < length) {
        idxSmaller = this.priority(l) <= this.priority(r) ? l : r
      }
      else idxSmaller = l

      if (this.priority(currentParent) > this.priority(idxSmaller)) {
        this.swap(idxSmaller, currentParent)
        currentParent = idxSmaller
        ;[l, r] = this.childrenIdx(currentParent)
      }
      else return
    }
  }

  heapifyUp (deepestIdx) {
    let currentChild = deepestIdx
    while (this.parentIdx(currentChild) && this.array[currentChild].priority < this.array[this.parentIdx(currentChild)].priority) {
      this.swap(currentChild, this.parentIdx(currentChild))
      currentChild = this.parentIdx(currentChild)
    }
  }

  swap (childIdx, parentIdx) {
    [this.array[childIdx], this.array[parentIdx]] = [this.array[parentIdx], this.array[childIdx]]
  }

  parentIdx (childIdx) {
    return Math.floor(childIdx / 2)
  }

  childrenIdx (parentIdx) {
    return [parentIdx * 2, parentIdx * 2 + 1]
  }

  priority (i) {
    return this.array[i].priority
  }
}
```

Because we're working with a complete binary tree we insert at the bottom level at the first free spot from the left - push it into our array. In the case that a new insertion violates the heap-order-property we need to re-heapify. This is done by comparing the insertion's priority with its parent's priority and swapping the objects if the insertion's priority is less - repeat this process until the insertion's priority is not less than it's parent.

Returning the minimum value is easy since the heap-order-property guarantees that the minimum priority will always be at the root of the tree.

`popMin` is done by removing the root object and replacing it with the last entry in the tree. This almost always ends up violating the heap-order-property so we need to re-heapify. This is done by comparing the root/parent's priority with its children's priorities. A swap should happen if the parent's priority is greater than one or both of its children's priorities and should be done with the child holding the smaller priority. Repeat this process until the parent's priority is not greater than either of its children's priorities.
