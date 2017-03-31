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

Perhaps the most prominent different is that with inheritance, `Queue` and `Stack` end up with extraneous methods: there's nothing stopping us from writing `myQueue.addToTail(someItem)` if we use inheritance with `extends`.

However, we're still relying on the convention of denoting "private" methods with a leading underscore, and trusting other programmers to respect that convention. There's technically nothing stopping them from writing `myQueue._linkedList.addToTail(someItem)`.

Even though JavaScript doesn't give us `public` and `private` keywords to restrict the way methods can be used, as we would get in a language like Java, we can still create properties and methods that are *actually* private through... *closure*!

Here's an example of using closure to make an internal list private using a factory function:

```js
function createQueue () {
  const list = new LinkedList();
  const queue = {};
  queue.enqueue = function (item) {
    list.addToTail(item); 
  };
  queue.dequeue = function () {
    return list.removeFromHead(); 
  };

  return queue;
}
```

Now there's no way for someone to directly access the `list` after the queue instance is created and returned. Consumers of the queue can only interact with the list indirectly through the `enqueue` and `dequeue` methods.


Here's an example of one way we could leverage closure and composition to create `Queue` and `Stack` classes with truly private internal lined lists:


```js
const _linkedLists = new WeakMap();

class Queue {
  constructor () {
    _linkedLists.set(this, new DoublyLinkedList());
  }
  enqueue (value) {
    return _linkedLists.get(this).addToHead(value);
  }
  dequeue () {
    return _linkedLists.get(this).removeFromTail();
  }
}
class Stack {
  constructor () {
    _linkedLists.set(this, new DoublyLinkedList());
  }
  push (value) {
    return _linkedLists.get(this).addToTail(value);
  }
  pop () {
    return _linkedLists.get(this).removeFromTail();
  }
}
```

> "The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle." - Joe Armstrong (Coders at Work)

