### A proof

To analyze the complexity of `powerSetRecursive` we will use a mathematical
method known as induction. Induction in some ways is the analogy of recursion
in mathematics. You prove that a statement, known as the induction hypothesis,
is true for the **base case** (usually `n = 0`) and then prove that if it is
true for a case `n` then it is also true for the case `n+1`.

We wish to prove `powerSetRecursive` is `O(n*2**n)`, and it will suffice for
our induction hypothesis to be:

> The number of steps `powerSetRecursive` takes for an array of length `n`
> is less than `c*n*2**n` for some constant `c`.

Big O notation ignores multiplicative constants, but our proof requires keeping
track of one.

Is the induction hypothesis true for the base case? The number of steps
`powerSetRecursive` takes when given an empty list is exactly `1` since all it
does is return the constant `[[]]`. Therefore we say `n = 1`, and our constant
has to satisfy `c*1*2**1 = 2*c`, so we can choose `c` to be anything greater
than `1/2` and the statement is true for `n = 1`.

Now assume that our induction hypothesis is true for the case `n`. Why can we
do this? We at least have that it is true for `n = 1`, so this assumption is
not *baseless* (haha induction jokes). Now, if we show that knowing that the
statement is true for `n` proves that it is also true for `n+1` then we can
apply this procedure any number of times to show it is prove for all `n`.
Recall the induction hypothesis:

> The number of steps `powerSetRecursive` takes for an array of length `n`
> is less than `c*n*2**n` for some constant `c`.

Now examine what happens when we pass an array of length `n+1` to
`powerSetRecursive`. We check the base case, count that as `1` step. We make an
array with the first item, count that as `1` step. We take a slice of the
array, and we can be careful and say that it takes **no more than** `n` steps.
This slice is length `n` and we apply `powerSetRecursive` to this array. This
takes, by assumption, **no more than** `c*n*2**n` steps. We just used the
induction hypothesis. Then we map over the resulting array which we can say
takes **no more than** `n*2**n` steps. Then we return the concatenation of
these two arrays which stakes **no more than** `2**n` steps. Then we can add
all these steps to find the `total`:

    total = 1 + 1 + n + c*n*2**n + n*2**n + 2**n
    total = 2 + n + 2**n + (c+1)*n*2**n
    total < (c+2)*n*2**n

Our induction hypothesis for `n+1` says our number of steps is **no more than**

    c*(n+1)*2**(n+1) = c*2**(n + 1) + c*n*2**(n+1)

And we require

    (c+2)*n*2**n < c*n*2**(n+1) = (2*c)*n*2**n

which will be true as long as `c + 2 < 2*c`. Now we need to find a `c` which
satisfies this and is greater than `1/2` which was a requirement from the base
case. Note that `c = 3` works. This shows that our induction hypothesis is true
with `c = 3` for all `n`. This shows that the number of steps
`powerSetRecursive` takes for an array of length `n` is less than `3*n*2**n`.
Therefore `powerSetRecursive` is `O(n*2**n)`.
