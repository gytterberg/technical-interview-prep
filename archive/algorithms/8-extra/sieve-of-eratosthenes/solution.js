function sieve (max) {

  // create an array with values at all indices from 2 to max assigned to true
  let primes = Array(max + 1).fill(true, 2);

  // iterate through the array, starting at 2, incrementing by 1
  // if the value at a given index i is true, this means it is a prime
  // start another loop iterating through all multiples of i, starting at i squared
  // assign the value of all multiples to false
  // the outer loop only has to iterate up to the square root of max to find all composites
  let maxToCheck = Math.sqrt(max);
  for (let i = 2; i <= maxToCheck; i++) {
    if (primes[i]) {
      for (let multiple = i * i; multiple <= max; multiple += i) {
        primes[multiple] = false;
      }
    }
  }

  // sum the indices of all trues in the array
  return primes.reduce((sum, prime, idx) => prime ? sum + idx : sum, 0);

}