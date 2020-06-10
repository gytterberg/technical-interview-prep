Get the interviee to write factorial tail-recursively. 

The common solution is: 

```javascript
function factorial (n){
    return n ? n * factorial(n - 1) : 1
}
```

this doesn't work with factorial(10000). 

The function calls itself n times and therefore needs n stack frames. 

But if the last call is the recursive call, then the engine can turn the recursion into a WHILE loop which means only one stack frame will be creates ---> we can't blow the stack!