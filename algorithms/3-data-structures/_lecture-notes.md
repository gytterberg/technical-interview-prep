# Data structures

## What is a data stucture?

A thing to store and organize data. Describes what it looks like in memory. How can a computer represent it? IMPLEMENTATION.

## What is an abstract data type?

Higher level structures that you can do stuff with. Describes how it works, and what we can do with it. BEHAVIOR.

## Quiz

Sort into property category:

*Data structures*

- Array (as in C array)
- Linked list
- Hash table
- Tree (if we're thinking about its low level storage)

*Abstract data types*

- Array (as in a Javascript array)
- Stack
- Queue
- "Object" (or dictionary)
- Tree (if we're thinking about traversal mechanisms)

## Array

- JS "array" is really more of an "array list" (dynamically sized)
- "True" (C) array is fixed size
- Each element is the same size
- Analogy: a book

## Stack

- Last in first out (push, pop)
- Analogy: pancakes

## Queue

- First in first out (enqueue, dequeue)
- Analogy: line at DMV

## Linked list

- Pointer to head node
- Each node has a value and a pointer to the "next" node
- Singly-linked (has just a "next" pointer) and doubly-linked (has a "next" and a "previous" pointer)
- Analogy: scavenger hunt

## Hash table

- Use a hash function on each key to convert it to an index
- Use that index to store the value in an array (true array)
- Must deal with collisions, e.g. actually store a linked list at each index value
- Analogy: dewey decimal, file cabinet with entries by a single letter (principal's office permanent records), card catalogue

## Set

- Abstract data type
- Unique values, no duplicates
- Constant time to add
- Constant time to check for membership
- Analogy: these are a few of my favorite things, children

## Tree

- (Green, maybe red, maybe bird nests)
- A root, has children (branches)
- Branches have branches or leaves
- Has no cycles
- Analogy: tree

One of the things to look out for is degenerate trees. They often make common algorithms not optimal.

Types of trees:

- Binary tree (every node has at most two branches)
- Binary search tree (sorting or ordering)
- Self-balancing trees (look up b-trees if you're curious)

## Trie

- Re(trie)val
- Essentially a tree for storing strings
- Split it up by characters
- Each characeter is a node that points to the next
- Example use case: predictive autocomplete
- Structural sharing going on

```
TRIE: {}
INSERT: 'Surabhi'
{
  'S':{
    'u': {
      'r': {
        'a': {
          'b': {
            'h': {
              'i': true
            }
          }
        }
      }
    }
  }
}
INSERT: 'Sean'
{
  'S':{
    'u': {
      'r': {
        'a': {
          'b': {
            'h': {
              'i': true
            }
          }
        }
      }
    },
    'e': {
      'a': {
        'n': true
      }
    }
  }
}
```

## Heap

- Tree where parent parent is greater than the child (or less than, either way: strict ordering)
- Only parent / child relationship is primary
- Analogy: family tree
- Note: no relation to "the heap", meaning memory area allocated for runtime variables

## Graph

- Not the kind with pretty colors
- Like a tree but it can have cycles
- It has nodes and edges
- Each node can point to any other node (including itself)
- Directed graphs (edges/connections are one way)
- Undirected graphs (connections two way)
- Analogy: choose your own adventure book, highway system (or map of any kind)
