const fibCached = n => fibCached[n] ||
  (fibCached[n] = (n === 0 || n === 1) ? 1 :
    fibCached(n - 1) + fibCached(n - 2))

  const fibonacci = n => (n === 0 || n === 1) ? 1 :
    fibonacci(n - 1) + fibonacci(n - 2)

console.log(fibCached(100))