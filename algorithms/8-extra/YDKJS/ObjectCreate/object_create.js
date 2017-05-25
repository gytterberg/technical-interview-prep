/*

INTERVIEW 3: 

Q1: before ES5 codified prototypal inheritance into JavaScript with Object.create(), 
many JS programmers innovated their own Object.create() functions
Write the polyfill for Object.create



A1: Simple Solution: 

*/


if (!Object.create){
    Object.create = function(obj){
        //create a throwaway F function
        function F() {}
        //override the prototype property that each function receives upon declaration
        //and point the prototype property to the obj we want to link it to
        F.prototype = obj; 
        //use the new F() construction to make a new object that will be linked as specified
        // it does not run the passed in object through own properties 
        return new F(); 
    };
}

// More Complex Solution: 

if (typeof Object.create != 'function') {
  Object.create = (function() {
    var Temp = function() {};
    return function (prototype) {
      if (arguments.length > 1) {
        throw Error('Second argument not supported');
      }
      if (typeof prototype != 'object') {
        throw TypeError('Argument must be an object');
      }
      Temp.prototype = prototype;
      var result = new Temp();
      Temp.prototype = null;
      return result;
    };
  })();
}


/*