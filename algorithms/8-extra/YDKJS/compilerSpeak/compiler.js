/*

INTERVIEW 2: Compiler speak
This interview deals with the following code snippet:  

*/

var foo = 'bar'; 
 
function bar(){
    var foo = 'baz'; 
    
    function baz(foo){
        foo = 'bam'; 
        bam = 'yay'; 
    }
    baz(); 
}
 
console.log(bar());  
console.log(foo);    
console.log(bam);    
console.log(baz());  


/*

Q1: What will the console logs print: 

A1: 

bar();  // undefined (because there's no return value)
foo;    // 'bar'
bam;    // 'yay'
baz();  // ReferenceError: baz is not defined!

Q2: Explain these outputs


A2: Take-aways: 
1. When we have an LHS reference (an assignment) for a variable that has not been declared, 
if we're not in strict mode, the global scope will create that variable for us. 
2. When we have an RHS reference for a variable that has not been declared and assigned a value, the global 
scope throws a ReferenceError (the global scope can create undeclared variables that have been assigned values
but it cannot create function definitions out of thin air to fulfill RHS references)
3. So in strict mode, both undeclared variables and RHS references that don't have definitions result in a 
    ReferenceError. In non-strict mode, the global scope will create the undeclared variable and yet still the 
    RHS reference that doesn't have a definition will result in a ReferenceError. 


Q3: Look at the following text snippet. Please write out how the Engine sees this code. 
*/



a; 
b; 
var a = b; 
var b = 2; 
b; 
a; 


/*

A3: 

var a; 
var b; 
a; 
b; 
a = b; 
b = 2; 
b; 
a; 

Because the compiler moves all variable declarations to the top of their scopes 
and leaves all assignments in place
the compiler also moves all function declarations to the tops of their scopes 

gist: https://gist.github.com/awilson28/5042f65d1c917459ffb1

*/


/*

Q4: hoisting: you write the following. How does 
the compiler see your code? 

*/
foo();

var foo = 2; 

function foo(){
  console.log('bar'); 
}

function foo(){
  console.log('foo');
}

/*

ANSWER: the compiler writes this, which the engine sees: 

*/

function foo(){
  console.log('bar'); 
}
function foo(){
  console.log('foo'); 
}
foo()

/*
explanation: 


NOTE: the var foo declaration on line 7 is ignored because the engine encounters the 
the function declarations before it encounters the variable declarations 

NOTE2: it is specified by ECMA that the compiler will assign function declarations to the scopes with 
their values. the compiler simply declares variables; it leaves their assignments in place. With functions, 
their values are registered at the same time that they are declared. 

so what is console.log-ed? 'foo' is console.log-ed because the second
foo function declaration overrides the first foo function declaration. 
if the order were reversed, 'bar' would be console.log-ed

GIST: https://gist.github.com/awilson28/02b73179f4ec6bff7911

*/


