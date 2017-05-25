/*
we start with value 1 at function a. 
a(1)
b(3)
c(3) + 1
a(6) + 1 
b(8) + 1 
c(8) + 1 + 1; 
a(16) + 2 
b(18) 2 + 1  == b(18) + 3
a(36) which is greater than 20 so we hit terminating condition
36 + 3 
returns 39


Key insight: the 1's are added on the way back up as we return to the bottom-most 
stack frame -- the one that is created with the first invocation of a. 
*/