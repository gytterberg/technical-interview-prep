/*
INTERVIEW 1: 


The following problems test students' knowledge of evaluation strategies via the same 
example. For an in-depth look at evaluation strategies, go here: 
https://docs.google.com/document/d/1orBKbxW782yYI2wdVOZvj6We_Zbdl5ZjlL9LvNnoz4c/edit

Overall point: JavaScript's evaluation strategy with regards to objects involves passing 
a reference by value --- JS effectively copies the reference. 

*/

function changeStuff(num, obj1, obj2){
  num = num * 10;
  obj1.item = "changed";
  obj2 = {item: "changed"};
}
 
var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};
 
changeStuff(num, obj1, obj2);
 
console.log(num);           
console.log(obj1.item);      
console.log(obj2.item);


/*

Q1: What will the three console logs print? 
A1: 10, 'changed', 'unchanged' 

*/

console.log(num);           //  100
console.log(obj1.item);     // 'changed'
console.log(obj2.item);     // 'unchanged'

/*

Q2: Please explain the output
A2: JS's evaluation stragegy is call-by-sharing which means that the function receives 
a copy of the reference to the passed in object. The Call-by-sharing evaluation strategy 
differs from pass by reference in that the assignment of a new value to an object argument 
passed to the function does not affect the corresponding object that exists outside the 
function. 

This is the key insight. Here's how it works: 
var a = [1, 2, 3]; 
var b = a;    // b is a copy of a reference to the array a
//if we change b via reassignment inside a function or outside of the //function, that reassignment does not affect a
b = [2]; 
console.log(a) // [1, 2, 3]
console.log(b) // [2]

BUT, if we change b not by reassignment but by mutation 
(i.e. changing the properties, that change does affect a 
whether we are in a function or outside a function. 

In other words, changes of properties of the local argument object are in fact reflected 
in the external object. As we already know, changes to primitives are not reflected
because new assignments of primitive values in JavaScript create copies (new allocations
of memory). 
*/


/*

Q2: What would happen if JS were purely pass by reference?

A2: If JS were purely pass by reference, we would expect the rebinding of obj2 to affect
the object outside the function scope. But it doesn't.  

*/

console.log(num);           //  100
console.log(obj1.item);     // 'changed'
console.log(obj2.item);     // 'changed'


/*

Q3: What would happen in JS were purely pass by value?

A3: If JS were purely pass by value, we wouldn't expect the assignment of 'changed' 
to obj1.item within the function to affect obj1.item outside the function

*/

console.log(num);           //  10
console.log(obj1.item);     // 'unchanged'
console.log(obj2.item);     // 'unchanged'
 

/*
