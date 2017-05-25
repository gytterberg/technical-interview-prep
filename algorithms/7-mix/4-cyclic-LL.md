## Finding a cycle in a Linked List

[Slides](http://slides.com/katehumphrey/reacto-3-2-3#/)

### Prompt 

Given the head of a singly linked list, determine if there is a cycle within the linked list. If there is a cycle, return true and log the length of the cycle and the first node in the cycle. If there is no cycle, return false.

Caveat: you may not use any additional data structures, nor may you modify the existing data structure. No arrays, no objects, no maps, no linked lists, etc.

Remember: The nodes in the linked list can have the same values.

### Setup 

See slides for diagrams and hints!

### Solution and Helper Functions

'use strict';

function detectLoop (linkedList) {
    var startNode = linkedList.head
    // An empty list has no cycles
    if (startNode === null || startNode.next === null) {
        return false;
    }

    var slowNode = startNode,
        fastNode = startNode.next;

    while(fastNode !== null) {
        slowNode = slowNode.next;

        if (fastNode.next === null) {
            return false;
        }

        fastNode = fastNode.next.next;

        if (slowNode === fastNode) {
            console.log(findCycleLength(slowNode), 
                findStartOfCycle(startNode,findCycleLength(slowNode)))
            return true; 
        }
    }
    return false;
}

function findCycleLength(nodeInCycle) {
    var count = 1;
    var runner = nodeInCycle.next;
    while (runner !== nodeInCycle) {
        runner = runner.next;
        count++;
    }
    return count;
}

function findStartOfCycle(startNode, cycleLength) {
    var fastNode = startNode,
        slowNode = startNode;

    for (var i = 0; i < cycleLength; i++) {
        fastNode = fastNode.next;
    }

    while (fastNode !== slowNode) {
        fastNode = fastNode.next;
        slowNode = slowNode.next;
        if (fastNode === slowNode) {
            return fastNode;
        }
    }
}

// Helper Functions to build test cases

function Node (value) {
    this.value = value;
    this.next = null;
}

function BuildLinkedList (linkedListLength, cycleLength) {
    if (cycleLength >= linkedListLength) {
        throw new Error('cycleLength must be smaller than linkedListLength');
    }
    var newNode;
    var startNode =  new Node(randomNum());
    this.head = startNode;
    var previous = startNode;

    for (var i = 1; i < linkedListLength; i++) {
        newNode = new Node(randomNum());
        previous.next = newNode;
        previous = newNode;
        if (i === linkedListLength - cycleLength) {
            var startingNodeOfCycle = newNode; 
        }
    }
    newNode.next = startingNodeOfCycle;
}

function randomNum() {
    return Math.floor(Math.random() * 100) + 1;
}
