# Numbers

## Current questions

### Binary

Why is binary important and why is it so often associated with computers?

### Fixed point versus floating point

What is the difference in fixed point arithmetic and floating point arithmetic?
What is a situation where fixed point is more appropriate? What is a situation
where floating point is more appropriate?

### Integers and floats in Javascript

What is `Number.MAX_SAFE_INTEGER` and why should I care?

#### Potential answer

The value `Number.MAX_SAFE_INTEGER` is the largest integer JavaScript can
natively store faithfully. Numbers larger than this are represented as floating
point numbers and the gap between each is larger than one. The
[`BigInt` proposal][bigint-proposal] provides arbitrary precision integer
arithmetic in Javascript, and even though it is not in the official
specification yet, it is supported in Chrome.

[bigint-proposal]: https://github.com/tc39/proposal-bigint

## Extra questions

- Why is 2 the default numerical base for computers? Why is 16 also a popular
  numerical base?
- Suppose we are given the number 12345, and told it is base `n`. How can we
  convert that number (both in JS and using pen and paper) into base 10?
- What are some real world use-cases for bitwise operators?
- URL shortner: convert the web URL to a unique base-10 index and then convert
  that to a base - 36 (or base-62) number to use alphanumeric characters
- CSS Prompt: Parse a 6-digit hex string, into 3 base-10 strings. Apply some
  sort of gradient on it (90% R, 10% G, 55% B), convert the 3 values back into
  base-16 and concatenate.
- You are a medical researcher preparing to distribute the cure for a worldwide
  zombie outbreak. Unfortunately, one of your colleagues has gone mad and sided
  with the undead. You have 500 vials of zombie cure, but one of them has been
  poisoned by your rogue colleague. You want to determine which vial is
  poisoned, and you have ten lab rats that you can use to help. The poison
  takes 24 hours to work. Can you find the poison in the next 25 hours?

## Thanks

Thanks to the following contributors to this page:
- Dan Sohval
