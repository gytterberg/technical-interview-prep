
---

# Prompt

A **binary heap** has 2 properties:
1. uses a *complete* binary tree which means that every level of the tree is full except the bottom level which is filled from left to right 
2. insertions satisfy the *heap-order-property* which says that no child's priority is less than its parent's priority 

note: the description and solution in this file describe a min-heap but obviously this can all be applied to max-heaps as well


Because binary heaps are complete binary trees, they're often stored as arrays in an order that follows a level ordered traversal starting at the root. We could use a pointer and node based data structure for the heap implementation but the array runs faster because we don't have to set and reset references from one node to another.

By mapping objects to indices in this way we can easily get an object's parent or children based on its index.
If i is the index of an object we can use the following formulas:
    - parent is i/2 rounded down 
    - left child is 2i
    - right child is 2i + 1 

note: these formulas assume you're not using index 0 at all as a way of making indexing nicer 


Implement a binary heap with the following 3 methods:

```javascript
insert(data, priority) // inserts data into the binary heap with the given priority
```
Because we're working with a complete binary tree we insert at the bottom level at the first free spot from the left - push it into our array. In the case that a new insertion violates the heap-order-property we need to re-heapify. This is done by comparing the insertion's priority with its parent's priority and swapping the objects if the insertion's priority is less - repeat this process until the insertion's priority is not less than it's parent.

```javascript
min() // returns the value of the item with the highest priority without removing it from the binary heap
```
Returning the minimum value is easy since the heap-order-property guarantees that the minimum priority will always be at the root of the tree.

```javascript
popMin() // returns the value of the item with the highest priority and also removes it from the binary heap
```
This is done by removing the root object and replacing it with the last entry in the tree. This almost always ends up violating the heap-order-property so we need to re-heapify. This is done by comparing the root/parent's priority with its children's priorities. A swap should happen if the parent's priority is greater than one or both of its children's priorities and should be done with the child holding the smaller priority. Repeat this process until the parent's priority is not greater than either of its children's priorities.


# Examples

For example, a hospital emergency room could use a binary heap to determine the order in which their doctors see patients.  The binary heap would work the following way:

```javascript
const heap = new HeapPQ()
heap.insert('Jill, concussion', 3);
heap.insert('John, stomach pain', 5);
heap.min() // ==> 'Jill, concussion'
heap.min() // ==> 'Jill, concussion'  // Jill is still in the heap
heap.insert('Dave, sprained ankle', 10);
heap.insert('Bob, breathing problems', 2)
heap.min() // ==> 'Bob, breathing problems'
heap.popMin() // ==> 'Bob, breathing problems'
heap.popMin() // ==> 'Jill, concussion' // Bob has been removed from the PQ
```

# Solution

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

    swap (childIdx, parentIdx) {
        [this.array[childIdx], this.array[parentIdx]] = [this.array[parentIdx], this.array[childIdx]]
    }

    parentIdx (childIdx) {
        return Math.floor(childIdx/2)
    }

    childrenIdx (parentIdx) {
        return [parentIdx * 2, parentIdx * 2 + 1]
    }

    priority (i) {
        return this.array[i].priority
    }
}
```