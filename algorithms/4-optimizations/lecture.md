# Optimization

- Decrease the number of loops
  - Change data structures: 
    - Find a better one, i.e. use a {} rather than an [] if you're looking for something that can be a key (a number or string)
	  
    - Use pointers rather than nested loops
      - If you have parallel sorted data structures, (or just sorted in general) (or sometimes not even sorted), you can use ratcheting to avoid an inner loop.

- Binary search on BST

## Min/max

- Assume the best case scenario for your opponent for each move (pick the that minimizes YOUR outcome)
  - choose the one of these that maximizes your outcome

_ _ _
_ _ _
_ _ _









## Pair sum

Given a target number and an array, return true if there's a pair of numbers in the array that sums to the target.


// Time: O(n)
// Space: O(n)
function pairSum(target, ary) {
               // Time: O(n)
			   // Space: O(n)
  const diff = new Set(ary.map(x => target - x))
  
             // O(n)
  return ary.find(x => diff.has(x))
}

//// Ahh, but what about O(1) space?

function pairSumInPlace(target, ary) {
  if (ary.length < 2) return
  let a = 0, z = target.length - 1
  let sum
  
  while ((sum = ary[a] + ary[z]) != target) {
	if (sum < target) { ++a; continue }
	if (sum > target) {
	  a = 0
	  --z; continue
	}
  }
  
  return sum === target
}


# Memoization

// O(phi^n) = 1.5...?

const fibonacci = n => n === 1 || n === 0
	? 1
	: fibonacci(n - 1) + fibonacci(n - 2)


// O(n)
const fibonacciM = n => fibonacciM[n] ||
	(fibonacciM[n] =
		n === 1 || n === 0
			? 1
			: fibonacciM(n - 1) + fibonacciM(n - 2))

// O(n)
const each = (list, f) => f(each(list.next, f))


// O(1)
fib(n) = phi^n / something * something?  // ashi doesn't know


# Three major ways to optimize:
  - Reduce work by caching
  - Trade space for time with a clever data structure (set / hash)
  - "Ratcheting" -- Cleverly order your subproblems so that you can
    eliminate extra work.
	- By the time you get to some value, you've already seen
	  anything that might be better.
    - Sort the thing.
