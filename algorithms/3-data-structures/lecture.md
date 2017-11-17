
# Quiz
Sort into: abstract data type, implementation (data strcuture).

Abstract Data Types:
  - Interfaces, not implementations
  - Describe the actions you can perform on a DS of this type, without
    saying how they're implemented.

Data Structure:
  - The actual implementation

- Linked list     [DS] of List ADT
- Map             [ADT]
- Trie (tryyyy)   [DS] of Map ADT, with interesting / useful performance implications
- Graph           [ADT]
- Adjacency list  [DS]

Adjacency list:
(A, B)
(B, C)
...

Adjacency Matrix:
  A B C D E F ...
A
B 0 0 1
C
D
E
F
.
.
.

- Set [ADT]
  - Hash sets
  - Linked sets...

- Bloom filter [DS implements Set]
  - Heuristic

- Array heap [DS] 
  - NOT Heap ADT
  - Way of storing binary trees, where the children of i are at 2*i and 2*i + 1

  [1, 2, 3, 4]  =

     1
    2  3
   4

- Binary tree  [ADT]
  - Linked tree [DS implements Tree ADT]


# Lists
- In JS, you're almost always using Arrays to represents lists
  - You might use require('immutable').List

  // Mutation operations
  + append(item)
  + remove(index)
  + set(index, item)

  // Retrieval
  + get(item)
  + count

# Maps & Sets

## Operations on maps:
  + set(key, item)
  + get(key)
  + count

When implemtned with a Hash table:
  + set   O(1)
  + get   O(1)
  + count O(1)

- In JS, Maps are implemented by Objects and also by the Map class

## Operations on sets:
  + add(key)
  + has(key)

- In JS, you can use Objects for Sets but probably better to use the Set class.


### Trie

TRIE: {}
INSERT: 'Surabhi'
{
  'S':{
    'u': {
      'r': {
        'a': {
          'b': {
            'h': {
              'i': {
                word: 'Surabhi'
              }
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
              'i': {
                word: 'Surabhi'
                s: {word: 'Surabhis'}
                p: 0.2
              }
            }
          }
        }
      }
    },
    'e': {
      'a': {
        'n': {word: 'Sean'}
      }
    }
  }
}

# Trees
  - Decision tree
  - Binary search tree:
                                   worst case:
  + insert(value)    O(log_2 n)   - O(n)
  + delete(value)    O(log_2 n)   - O(n)
  + has(value)       O(log_2 n)   - O(n)

  - Red-Black trees have the same big-O, but they tend towards
    being balanced

    3
      4
        5
          6
            7


        3r
      4b   5b
    6   7
        
  - Avoids the worst case runtimes more often.

# Graphs

- Most able to model the natural world
  - human social connections
  - mycellium
  - subway system, highway system
  - git

    C1
    C2
    C3
    |  \
    C7  C4
    C8  C5
    C9  C6 #mybranch
    |  /
    M1    
    #master

  - has vertices and edges
    - Edges can be
      - directed or undirected
        - git graph: Directed
      - weighted (some data, usually score / cost assoc. with them)
        - git doesn't have this
  - Cyclic or acyclic:
  
  Cyclic:
      B
    ↗️   ↘️
  A   ⬅️   C ➡️ D ➡️ E

  Acyclic:

      B ➡️ Q ➡️ Z
    ↗️   ↘️     ⬇️
  A       C ➡️ D ➡️ E

  - Git is acyclic, making it a Directed Acyclic Graph, or DAG

# Extremely exotic data structures

## Bloom filter
  - Data structure implementing Heuristic Set ADT

  + maybeHas(key) -> True|False
    True: might be here
    False: definitely isn't
  + add(key)

  8-bit bloom filter:
  [0 0 0 0 0 0 0 0]

  add('hello')
    H1('hello') = 3
    H2('hello') = 7
    H3('hello') = 1

  [0 1 0 1 0 0 0 1 0]

  maybeHas('hello')
    H1('hello') = 3
    H2('hello') = 7
    H3('hello') = 1
  [0 1 0 1 0 0 0 1 0]
    -> True, it's maybe there

  If we didn't have 'hello':
  [0 1 0 1 0 0 0 0 0]
    -> False, it's definitely not there, otherwise
       bit 7 would have been set.


    

