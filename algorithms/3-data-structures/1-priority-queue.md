[Slides](http://slides.com/gtelljohann/reacto-priority-queue/#/)

---

# Prompt

A *queue* is a data structure that stores pieces of data and returns them in the same order in which they were inserted.  One way of implementing them is as a linked list.  

A *priority queue* is a data structure that takes with each piece of data a priority value and returns the data in order of priority.  

Implement a priority queue with the following 3 methods:

insert(data, priority) // inserts data into the priority queue with the given priority

peek() // returns the value of the item with the highest priority without removing it from the priority queue

popMax() // returns the value of the item with the highest priority and also removes it from the priority queue

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

# Solutions

A linked list implementation of a priority queue using ES5

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
    // First case handles both empty PQ and higher priority than anything else
    var prevFirst = this.first;
    this.first = new Node(data, priority);
    this.first.next = prevFirst;
  } else {
    // Second case finds the place to insert the new item and inserts it
    var pointer = this.first;
    while (pointer.next && pointer.next.priority >= priority) {
      pointer = pointer.next;
    }
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

A Binary Heap implementation of a priority queue using ES6

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

    swap (childIdx, parentIdx) {
        [this.array[childIdx], this.array[parentIdx]] = [this.array[parentIdx], this.array[childIdx]]
    }

    parentIdx (childIdx) {
        return Math.floor(childIdx/2)
    }

    childrenIdx (parentIdx) {
        return [parentIdx * 2, parentIdx * 2 + 1]
    }

    min () {
        return this.array[1].data
    }

    heapifyDown (rootIdx) {
        let currentParent = rootIdx
            , [l, r] = this.childrenIdx(currentParent)
            , idxSmaller
        const length = this.array.length
        while (l < length) {
            if (r < length) 
                idxSmaller = this.priority(l) <= this.priority(r)? l : r
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

    priority (i) {
        return this.array[i].priority
    }

    popMin () {
        const min = this.array[1]
            , rootIdx = 1
        this.array[1] = this.array.pop()

        this.heapifyDown(rootIdx)
        return min.data
    }
}
```