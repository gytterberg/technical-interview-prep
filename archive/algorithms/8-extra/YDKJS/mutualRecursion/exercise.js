/*
Example of mutual recursion: a is invoked and a calls b, which calls c, whic calls a, and on
and on until some termination condition is reached. 
JS can handle this because all function declarations are hoisted, which means that 
their values are registered at the same time as their declarations. 
If hoisting did not exist, one of these functions would always be declared too late; invalidating mutual 
recursion. 
An interpreted language cannot handle mutual recursion because it doesn't know about line 4 when it is 
on line 3. It would get to function a and say 'i dont know about function b' so it would have had to put function
b first but then b requires function c to be first but c requires function a so function a would have to be first 
so it would be impossible for an interpeted language to parse this. 
*/



a(1); 

function a(foo){
  if (foo > 20) return foo; 
  return b(foo + 2); 
}

function b(foo){
  return c(foo) + 1; 
}

function c(foo){
  return a(foo * 2); 
}