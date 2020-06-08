function baz(){
  // call-stack is: `baz`
  // so, our call-site is in the global scope

  console.log('baz');
  bar(): // <-- call-site for `bar`
}

function bar() {
  // call-stack is: `baz` -> `bar`
  // so, our call-site is in `baz`
  console.log('bar');
  foo(); // <-- call-site for `foo`
}

function foo() {
  // call-stack is: `baz` -> `bar` -> `foo`
  // so, our call-site is in `bar`

  console.log("foo");
  // DEBUGGER INSERTED HERE
  debugger;
}

baz(); // <-- call-site for `baz`

// foo
// bar
// baz


// Call-Stack Looks like this, the list of functions that were called
// to get to where the "debugger" keyword is.

// If you are trying to find the call-site and what the this binding is referencing,
// use the dev-tools to visualize the call-stack
