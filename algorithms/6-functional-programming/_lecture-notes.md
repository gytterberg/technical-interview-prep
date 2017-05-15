# Functional Programming

## What is functional programming?

- better than dysfunctional programming (but less fun)
- mantra: "a lot of little functions"
- functions are pure: no side effects, no mutations of data, same input produces same output
- has its roots in math
- functions as first class, higher order functions
- often touted as "anti object oriented"
- immutability: data gets transformed into new data, not mutated
- recursion
- compsotion of functions
#### How does it all fit together - having functions that transform data, focused on micro-transformations and composing them into the input/output pipelines we need

## Higher order functions, first class functions

Functions can be used as parameters to other functions, and/or functions can be returned as output.

Exercise: build an `EventEmitter` class. Instances should have two methods: `on` and `emit`. `on` takes an event name and a handler function, and registers that handler callback for that event name. `emit` takes an event name and some data, and invokes all callbacks registered to that event name (with the given data).

Follow-up: make `on` return a function that "deregisters" the given handler.

```js
function EventEmitter () {
  this._handlers = {};
}

EventEmitter.prototype.on = function (eventName, handler) {
  if (!this._handlers[eventName]) {
    this._handlers[eventName] = [handler];
  } else {
    this._handlers[eventName].push(handler);
  }
  return this.off.bind(this, eventName, eventHandler);
};

EventEmitter.prototype.off = function (eventName, handler) {
  const idx = this._handlers[eventName].indexOf(handler);
  this._handlers[eventName].splice(idx, 1);
}

EventEmitter.prototype.emit = function (eventName, data) {
  if (!this._handlers[eventName]) return;
  this._handlers[eventName].forEach(handler => {
    handler(data);
  });
};
```

## Partial application of functions

Taking a function, passing it *some* of its arguments, and getting a function back that takes the *remaining* arguments.

General idea for two-argument functions:

```js
function partiallyApply (originalFn, firstArg) {
  function partiallyAppliedFn (secondArg) {
    return originalFn(firstArg, secondArg);
  }
  return partiallyAppliedFn;
}

function addTwoThings (a, b) {
  return a + b;
}

const addFiveToOneThing = partiallyApply(addTwoThings, 5);

addFiveToOneThing(10); // 15
```

*What is `bind` in js?*

Takes a function and returns another function with a "baked-in", fixed `this` context. It also takes any number of arguments to partially apply!

```js
function addTwoThings (a, b) {
  return a + b;
}

const addFiveToOneThing = addTwoThings.bind(null, 5);

addFiveToOneThing(10); // 15
```

## Compisition

When we compose functions, we "merge" them.

```js
function composeAnd (fnA, fnB) {
  return function composed (thing) {
    const boolean = fnA(thing) && fnB(thing);
    return boolean;
  };
}
function isEven (num) {
  return num % 2 === 0;
}
function isPositive (num) {
  return num >= 0;
}
const isEvenAndPositive = composeAnd(isEven, isPositive);
isEvenAndPositive(-2); // false
isEvenAndPositive(3); // false
isEvenAndPositive(6); // true

function composeResults (fnA, fnB) {
  return function composed (input) {
    return fnB(fnA(input));
  }
}
function addFive (num) {
  return num + 5;
}
function multiplyByTen (num) {
  return num * 10;
}
const addFiveThenMultiplyByThen = composeResults(addFive, multiplyByTen);
addFiveThenMultiplyByThen(3); // 80
```

## Object-oriented: composition over inheritance

Classical inheritance involves *extending* one class from another. It models the "is-a" relationship.

```js
class Fruit {
  constructor () {
    this.dropped = false;
  }
  dropFromPlant () {
    this.dropped = true;
  }
}
// inheritance
class Apple extends Fruit {
  turnIntoJuice () {
    return 'apple juice';
  }
}
```

Composition involves *using* one class from another. It models the "has-a" relationship.

```js
class Fruit {
  constructor () {
    this.dropped = false;
  }
  dropFromPlant () {
    this.dropped = true;
  }
}
// composition
class Apple {
  constructor () {
    this._fruit = new Fruit();
  }
  turnIntoJuice () {
    return 'apple juice';
  }
  dropFromPlant () {
    return this._fruit.dropFromPlant();
  }
}
```

How do we choose one versus the other? Maybe when we don't want all the methods from the "parent class", just some of them we use composition. Maybe when we have multiple inheritance, composition works well. Non-linear relationship, composition is perfect.

In general, when in doubt, choose composition—it is inherently more flexible.

Composition is in general a functional programming technique.

## Immutability

We don't mutate. But what about the world? The world changes? Well we model that by returning new states from previous ones.

Benefits: 1) We can easily step through the history of "changes" by simply inspecting each successive new state. 2) Predictability: if your data isn't mutating, it's more isolated and predictable. 3) Structural sharing between successive states.

Exercise: build an immutable singly-linked list. It should have `head` property, and two methods: `addToHead` (which takes a value) and `removeFromHead` (which takes nothing). Each node in the linked list should have a `value` property (with the value given when it was added to the head) and a `next` property pointing to the next node, or null if it's the tail.

```js
function ImmutableLinkedList (head) {
  if (!this.head) {
    this.head = null;
  } else {
    this.head = head;
  }
}
ImmutableLinkedList.prototype.addToHead = function (value) {
  const node = {
    value: value,
    next: this.head
  };
  return new ImmutableLinkedList(node);
};
ImmutableLinkedList.prototype.removeFromHead = function () {
  if (!this.head) return this;
  return new ImmutableLinkedList(this.head.next);
};
```

With history...

```js
function ImmutableLinkedListWithHistory () {
  this.history = [];
  this._current = new ImmutableLinkedList();
}
ImmutableLinkedListWithHistory.prototype.addToHead = function (value) {
  this._current = this._current.addToHead(value);
  this.history.push(this._current);
};
ImmutableLinkedListWithHistory.prototype.removeFromHead = function () {
  this._current = this._current.removeFromHead();
  this.history.push(this._current);
};
```
