# Graph Terminology

A graph consists of a set of vertices connected together by a set of edges. A tree is a special type of graph. In this example, a vertex is a node of that tree, and an edge is a link between a parent and one of it's children.

# Prompt

Write a function that determines if a path exists between two vertices of a graph.

The graph will be represented as an object, each of whose keys represents a vertex of the graph and whose value represents all vertices that can be reached from the aforementioned key. In the example below, there is a connection from vertex `a` to vertex `b` and a connection from vertex `b` to vertices `c` and `d` but not a connection from vertex `b` to vertex `a`.

    {a: ['b'],
     b: ['c', 'd'],
     c: ['d']
     }

# Approach

This problem is essentially a DFS/BFS problem. Either algorithm is sufficient. The only catch is that graphs can be cyclic. In other words, it's possible for a loop to exist in the graph. The graph below showcases this problem:

`{a: ['a', 'c'],
 c: ['s', 'r']
 r: ['a'],
 s: []
 }`

     
Imagine we started travsering at vertex `a`. Eventually we would reach vertex `r`, but notice that it points right back to vertex `a`. If you were to unleash an unmodified BFS/DFS traversal algorithm on this input, the algorithm would proceed in an infinite loop. This means that the algorithm must be changed to keep track of all vertices that it has seen. If a vertex has been seen, we know to not consider it's edges a second time. The algorithm completes when either it has found the target vertex or when it has exhausted all possible vertices without finding it's target.

# Discussion

The data structure seen above used to represent the graph is called an ajacency list. An alternative data structure exists for representing graphs called adjacency matrices. The cyclic graph above could have been modeled as follows using an adjacency matrix:

        a  c  s  r
      a 1  1  0  0
      c 0  0  1  1
      s 0  0  0  0
      r 1  0  0  0
    
In javascript, this table would be represented using an array of arrays or object of objects. A 1 indicates that a given vertex has an edge pointing to another vertex, and a 0 indicates that it does not. 

This table reads as follows:<br>

`a -> a`<br>
`a -> c`<br>
`c -> s`<br>
`c -> r`<br>
`r -> a`

Consider the transoffs between using one of these data structres of the other. How do they compare for the following ways:

| Attribute                                             | Answer                                                            |
| ------------------------------------------------------|------------------------------------------------------------------:|
| Testing if a given edge is in the graph               | adjacency matrix                                                  |
| Finding the degree (number of edges of) a vertex      | adjacency list                                                    |
| Insertion/deletion of edges                           | adjacency matrix O(1) vs O(d) where d is the degree of the vertex |
| Memory usage for sparse graphs                        | adjacency list (m + n) vs (n^2)                                   |
| Memory usage for dense graphs                         | adjacency matrix                                                  |
| Graph traversal                                       | adjacency list O(m + n) vs O(n^2)                                 |
| Better overall                                        | adjacency list                                                    |

Comparison from The Algoritm Design Manual, Skiena - second Edition - page 152

# Solution

```javascript
var graph = {a: ['c'],
 b: ['c'],
 c: ['s', 'r'],
 d: ['a'],
 s: ['a', 'c'],
 r: ['d'],
 z: ['z']
 };

var doesPathExist = function(graph, visited, start, target) {
  visited[start] = true;
  return graph[start].some(function(vertex){
    if (start === target) {
      return true;
    } else if (!visited[vertex]) {
      return doesPathExist(graph, visited, vertex, target);
    } else {
      return false;
    }
  });
};


console.log(doesPathExist(graph, {}, 'a', 'c')) // true
console.log(doesPathExist(graph, {}, 'a', 's')) // true
console.log(doesPathExist(graph, {}, 'a', 'b')) // false
console.log(doesPathExist(graph, {}, 'b', 'a')) // true
console.log(doesPathExist(graph, {}, 'a', 'd')) // true
console.log(doesPathExist(graph, {}, 's', 'r')) // true
console.log(doesPathExist(graph, {}, 'z', 'z')) // true
console.log(doesPathExist(graph, {}, 'c', 'c')) // true
```
