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

