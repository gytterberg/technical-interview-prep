# Prompt

Given an existing (doubly) linked list class, implement a stack class and a queue class. Do so via classical inheritance and then do so separately via composition. Then talk about which you would choose in this situation and why.

The linked list class has instance methods for `addToHead`, `addToTail`, `removeFromHead`, and `removeFromTail`.

The queue class should have instance methods for `enqueue` and `dequeue`. The stack class should have instance methods for `push` and `pop`.

# Solution

Via inheritance:

```js
class Queue extends DoublyLinkedList {
  enqueue (value) {
    return this.addToHead(value);
  }
  dequeue () {
    return this.removeFromTail();
  }
}
class Stack extends DoublyLinkedList {
  push (value) {
    return this.addToTail(value);
  }
  pop () {
    return this.removeFromTail();
  }
}
```

Via composition:

```js
class Queue {
  constructor () {
    this._linkedList = new DoublyLinkedList();
  }
  enqueue (value) {
    return this._linkedList.addToHead(value);
  }
  dequeue () {
    return this._linkedList.removeFromTail();
  }
}
class Stack {
  constructor () {
    this._linkedList = new DoublyLinkedList();
  }
  push (value) {
    return this._linkedList.addToTail(value);
  }
  pop () {
    return this._linkedList.removeFromTail();
  }
}
```

Perhaps the most prominent different is that with inheritance, `Queue` and `Stack` end up with extraneous methods. 

> "The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle." - Joe Armstrong (Coders at Work)
