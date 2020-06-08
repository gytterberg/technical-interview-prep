/*
PROBLEM 1: what is the big o of this fn?
Diagram the solution out

*/
function foo(arr) {
  var sum = 0;        
  var product = 1;      

  for (var i = 0; i < arr.length; i++)  
    sum += arr[i];          
  for (var j = 0; j < arr.length; j++)  
    product *= arr[i];        

  console.log(sum * product);   
}                  

/* Answer: 0(n)


function foo(arr) {
  var sum = 0;        // O(1)
  var product = 1;      // O(1)

  for (var i = 0; i < arr.length; i++)  // O(arr)
    sum += arr[i];          // O(1)
  for (var j = 0; j < arr.length; j++)  // O(arr)
    product *= arr[i];        // O(1)

  console.log(sum * product);   // O(1)
}                  

// O(1) + O(1) + (O(arr) * O(1)) + (O(arr) * O(1)) + O(1)
// O(6 * arr) => O(arr) => O(n)
*/

/*

Problem 2: 
*/
function bar(arr) {
  for (var i = 0; i < arr.length; i++)    
    for (var j = 0; j < arr.length; j++)    
      console.log(arr[i] + arr[j]);       
}

/*
Answer 2: On^2
function bar(arr) {
  for (var i = 0; i < arr.length; i++)    // O(arr)
    for (var j = 0; j < arr.length; j++)    // O(arr)
      console.log(arr[i] + arr[j]);       // O(1)
}

// O(arr) * O(arr) * O(1) => O(arr^2) => O(n^2)

*/


/*
Problem 3

*/

function baz(arrA, arrB) {
  for (var i = 0; i < arrA.length; i++)         
    for (var j = 0; j < arrB.length; j++)     
      console.log(arrA[i] + arrB[j]);   
}

/*
Answer 3: O(nm)

function baz(arrA, arrB) {
  for (var i = 0; i < arrA.length; i++)         // O(arrA)
    for (var j = 0; j < arrB.length; j++)     // O(arrB)
      console.log(arrA[i] + arrB[j]);   // O(1)
}

// O(arrA) * O(arrB) * O(1) => O(nm)

*/

/*

Problem 4
*/


function fib (n) {
    if (n === 1 || n === 0) return n;
    else return fib(n - 1) + fib(n - 2);
}

/*
Answer 4: O(2^n)

                     fib(4)
                    /      \
            fib(3)            fib(2)
           /      \          /      \
      fib(2)     fib(1)   fib(1)    fib(0)
      /    \
 fib(1)     fib(0)


our input is equal to 4: n = 4
we go four levels deep, so depth = n
we branch twice with each recursive call

therefore, runtime is O(2^n)!


*/


/*

Problem 5: 
*/

function fib (n, memo) {
    if (!memo) var memo = {};

    if (n === 1 || n === 0) return n;
    else if (memo[n]) return memo[n];
    else memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

/*
Answer 5: O(n)


                     fib(4)
                    /      \
            fib(3)            fib(2)
           /      \          /      \
      fib(2)     fib(1)   fib(1)    fib(0)
      /    \
 fib(1)     fib(0)



1. fib(4) = fib(3) + fib(2)
           /
2. fib(3) = fib(2) + fib(1)
             /
3. fib(2) = fib(1) + fib(0) = memo[2]

4. fib(3) = memo[2] + fib(1) = memo[3]

5. fib(4) = memo[3] + fib(2) = memo[3] + memo[2]



That entire second branch got taken out of the picture
Every step ends up being in constant time, which we only do a maximum of n times
Using a memo cuts runtime down to O(n)!

*/

