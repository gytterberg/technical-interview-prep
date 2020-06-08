// add(a: Int, b: Int) -> Int
//
// Add two numbers without using the + operator.
function add (a, b) {
  while (b !== 0) {
    const uncarried = a ^ b;
    const carries = (a & b) << 1;
    a = uncarried;
    b = carries;
    // ^^ reseting `a` and `b` like this will ensure we continue XOR and AND ing the new values for the next cycle of the loop
  }
  return a;
}

const assert = require('assert')
    , test = f => {
      console.log(f.toString())
      assert(f())
      console.log('OK')
    }

test(() => add(1, 1) === 2)
test(() => add(128, 256) === 384)
test(() => add(0, 0) === 0)
