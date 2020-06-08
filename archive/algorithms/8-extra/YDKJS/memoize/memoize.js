var memory = {}
var iterations = 0
function fib(n){
    
    iterations += 1; 
    if (n in memory){
        return memory[n]
    }
    
    if (n <= 2){
        memory[n] = n
        return n
    }
    
    else {
        memory[n] = fib(n-1) + fib(n-2)
        return memory[n]
    }

}