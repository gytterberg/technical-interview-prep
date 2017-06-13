//SLIDES -- http://slides.com/es1831/reacto#/

/**
 * Extending Builtin Array Type
 */
Array.prototype.isInt = function() {
  return this.filter(function(num) {
    return (typeof num === 'number') && (num % 1 === 0);
  });
}

Array.prototype.even = function() {
  return this.isInt().filter(function(num) {
    return (num % 2 === 0);
  });
}

Array.prototype.odd = function() {
  return this.isInt().filter(function(num) {
    return (num % 2 !== 0);
  });
}

Array.prototype.under = function(criteria) {
  return this.isInt().filter(function(num) {
    return (num < criteria);
  });
}

Array.prototype.over = function(criteria) {
  return this.isInt().filter(function(num) {
    return (num > criteria);
  });
}

Array.prototype.inRange = function(min, max) {
  return this.isInt().filter(function(num) {
    return (num >= min) && (num <= max);
  });
}

/**
 * New Array Subclass (ES5)
 */
function FancyArray() {
  if (Array.isArray(arguments[0])) {
    this.push.apply(this, arguments[0]);
  } else {
    this.push.apply(this, arguments);
  }
}

FancyArray.prototype = Object.create(Array.prototype);
FancyArray.prototype.constructor = FancyArray;

FancyArray.prototype.isInt = function() {
  return new FancyArray(this.filter(function(num) {
    return (typeof num === 'number') && (num % 1 === 0);
  }));
}

FancyArray.prototype.even = function() {
  return new FancyArray(this.isInt().filter(function(num) {
    return (num % 2 === 0);
  }));
}

FancyArray.prototype.odd = function() {
  return new FancyArray(this.isInt().filter(function(num) {
    return (num % 2 !== 0);
  }));
}

FancyArray.prototype.under = function(criteria) {
  return new FancyArray(this.isInt().filter(function(num) {
    return (num < criteria);
  }));
}

FancyArray.prototype.over = function(criteria) {
  return new FancyArray(this.isInt().filter(function(num) {
    return (num > criteria);
  }));
}

FancyArray.prototype.inRange = function(min, max) {
  return new FancyArray(this.isInt().filter(function(num) {
    return (num >= min) && (num <= max);
  }));
}

/**
 * New Array Subclass (ES6)
 */
class FancyArray extends Array {
  constructor() {
    if (Array.isArray(arguments[0])) {
      super(arguments[0]);
    } else {
      super(arguments);
    }
  }

  isInt() {
    return this.filter(num => (typeof num === 'number') && (num % 1 === 0));
  }

  even() {
    return this.isInt().filter(num => (num % 2 === 0));
  }

  odd() {
    return this.isInt().filter(num => (num % 2 !== 0));
  }

  inRange(min, max) {
    return this.isInt().filter(num => (num >= min) && (num <= max));
  }

  over(criteria) {
    return this.isInt().filter(num => (num > criteria));
  }

  under(criteria) {
    return this.isInt().filter(num => (num < criteria));
  }
}
