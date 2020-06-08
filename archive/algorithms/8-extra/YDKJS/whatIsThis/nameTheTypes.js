/*
During Foundations, you learned the four ways that 'THIS' is bound 

1 - default binding
2 - implict binding 
3 - explicit binding 
4 - new binding 


Come up with examples for each type of binding and even better, for how they 
interact/override each other
*/

// DEFAULT binding

function foo(){
  console.log(this.a); 
}

var a = 2; 

foo(): // 2

/*
explanation: variables declared in the global scope, such as 
var a = 2, are synonymuos with global properties of the same name. 
var a = 2 is window.a = 2 except if "use strict"; is active

*/

function foo(){
  "use strict"; 

  console.log(this.a); 
}

var a = 2; 

foo(): // TypeError: `this` is `undefined`



// IMPLICIT BINDING

function foo(){
  console.log(this.a); 
}

var obj = {
  a: 2, 
  foo: foo
}; 

obj.foo(); //2 

// EXPLICIT BINDING

function foo(){
  console.log(this.a); 
}

var obj = {
  a: 2
};

foo.call(obj); //2 


// NEW BINDING

function foo(a){
  this.a = a; 
}

var bar = new foo(2); 
console.log(bar.a); //2 


// HOW NEW OVERRIDES EXPLICIT BINDING

function foo(something) { 
  this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 ); 

bar( 2 );

console.log( obj1.a ); // 2

var baz = new bar( 3 ); 

console.log( obj1.a ); // 2 

console.log( baz.a ); // 3


