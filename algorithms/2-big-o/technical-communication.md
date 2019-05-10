# Big O

## Current Questions

### What is Big O?

What is Big O notation? Explain big O notation, its definition and usage in a
sentence or two.

### What is the order of complexities?

Order the following from decreasing to increasing complexity and justify your
order: `O(n!), O(n), O(n log n), O(log n) O(2**n), O(n**2), O(1)`.

### Examples of solutions by a given complexity

Find an example problem with a solution that has a given time/space complexity,
preferably one where that complexity is required. For example, sorting can be
solved with bubble sort in `O(n**2)` time, but we know sorting can be solved in
`O(n log n)`. Find a problem whose best solution, as far as you know, runs in
`O(n**2)`. One solution: all possible sums of numbers from two arrays. For this
question use one of the following complexities:

    1, log n, n, n log n, n**2, 2**n, n!

#### Potential answers

See also: Wikipedia's table of common [time complexities][time-complexities].

- `O(1)`: Finding the median value in a list of sorted numbers
- `O(log n)`: Binary search
- `O(n)`: Finding the smallest or largest item in an unsorted array
- `O(n log n)`: Fastest possible comparison sort
- `O(n**2)`: Comparison sort w/ constant space
- `O(2**n)`: Solving the traveling salesman problem (w/ dynamic programming)
- `O(n!)`: Generating all permutations of a string

[time-complexities]: https://en.wikipedia.org/wiki/Time_complexity#Table_of_common_time_complexities):

## Extra Questions

 - Describe two array sorting algorithms and their Big O notation.
 - How would you go about determining the Big O of a given algorithm?
    - Answer should include methodical approaches to determining Big O (i.e. is
      input size irrelevant to time, do you have to go through entire list, does
      algorithm’s processing time increase at slower rate than size of data set,
      are there nested loops, etc.), dropping less significant terms, ignoring
      multiplicative constants.

- Explain the difference between time complexity and space complexity and when
    you would be concerned about one over the other.

# Thanks

Thanks to the following contributors to this page:
- Geoff Bass
- Priti Patel
