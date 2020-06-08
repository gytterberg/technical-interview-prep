/*

issues with implicit binding

problem 1: what will line 9 print? explain your reasoning. 
*/

var a = "oops, global"; 

doFoo( obj.foo );

function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    fn();
}

var obj = {
    a: 2,
    foo: foo
};


/* ANSWER 1: 
    obj.foo is just another reference to the foo object. Because it is 
    invoked in the context of the global window, this.a points to the 
    global variable, not to the property on obj. 
*/
var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"

function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // `fn` is just another reference to `foo`

    fn(); // <-- call-site!
}

var obj = {
    a: 2,
    foo: foo
};




/*


Question 2: How can we write this code to get the desired outcome: 2 not 'oops,global'?


Answer 2: call or bind: 
*/



function doFoo(fn){
  fn.call(obj)
}

function doFoo(fn){
  fn = fn.bind(obj)()
}


