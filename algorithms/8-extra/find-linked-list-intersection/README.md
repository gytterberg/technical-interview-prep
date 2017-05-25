# Find Linked List Intersection 

This problem is divided into 3 steps. 

1. Write a function that takes in two node references, each pointing to the head of a difference singly linked list, and determine if the two lists intersect.

2. Solve the same problem above in O(c) space. This means that the inputted linked lists will not be modified, and no additional data strucutres will be used.

3. Write a function that takes in two singly linked lists, and if they intersect, returns the node of intersection. If they do not intersect, this function should return null.

Allocate about 10 minutes for each step. If you're interviewer has no solved a particular problem within 10 minutes, move onto the next task.

## Approach

1. A student can solve this problem by maintaing a set or hash table that stores references to every node in the first linked list. Then, upon traversing the second linked list, each node can be checked for existence within the hash table or set. If there are any duplicates, the two linked lists must intersect.

2. A clever observation reveals that two intersecting linked lists must end at the same point: they must have the same tail.
