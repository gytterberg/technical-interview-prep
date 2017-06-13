
// Default catch all rule when nothing else applies
// - like an "else" statement

/*

1 : Global variables are properties on the Global Object
     - In the browser, Window is the Global Object
     - window.foo();
     - window.a
     - run the code below in the chrome console, then inspect the window object
       notice the window object has these values as key/value pairs.
2 : How does 'use strict' change how 'this' works?
     - If strict mode is in effect, the global object is not eligible for the
       default binding, so the this is instead set to undefined.
     - The global object is only eligible for the default binding rule if the contents
        foo are not running in strict mode.

*/

// 'use strict'


function foo(){
  console.log(this.a);
}

var a = 2;

foo(); //2

(function(){
 "use strict";
 foo(); // 2
})();
