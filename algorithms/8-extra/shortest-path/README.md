#Shortest Path (graph)

**Please have students do the "solve-graph" problem PRIOR to this one.**

Given an undirected graph, represented as an adjacency list, and two vertices of said graph, find the shortest path between the two vertices. 

##Prework

An undirected graph is a graph where all edges between vertices are mutual. This means that if there is an edge from vertex 'a' to 'b', then there must be an edge from vertex 'b' to 'a'. Facebook is an example of an undirected graph; it is impossible to have a one-way "friendship". Twitter is an example of a directed graph; just because I am your follower does not mean you are my follower. 

##Approach 

This problem can be solved with both a breadth first search and a depth first search; however, the latter is drastically inferior to the former. In order to find the shortest path between two vertices using DFS, we would need to find all possible paths from vertex 'a' to vertex 'b' and then take the path with the minimum length. 

BFS has a fascinating property; upon reaching any particular vertex for the first time, we can confidently state that we have taken the shortest path to that vertex. This is true because vertices are discovered in order of increasing distance from the root. Exploiting this property allows us to easily find the shortest path between any two vertices by simply expanding a BFS from the starting vertex until the target vertex is found. This algorithm would complete in `O(k^d)` time and space, where `k` is the average degree (number of outgoing edges from any vertex) and `d` is the number of vertices between the root and the target vertex. `k^d` represents the total number of vertices traversed. 

Once the target vertex has been found, we need a way to reconstruct the path that our BFS took to arrive there. We can do this by maintaining a hash table that stores the vertex from which every other vertex was found (the parents). 

##Additional discussion
Although we can't optimize this algorithm from a Big O perspective, for practical use cases, we can make it far more efficient. We will exploit an algorithm called bidirectional search. Imagine having two BFSs extending simultaneously from both the root vertex and the target vertex; eventually the queues used to implement these searches will contain overlapping vertices. At this point, we could deduce the path between the two vertices. Both searches would extend half the distance that a single BFS would traverse. This means that each of these searches will be `O(k^(d/2))`, yielding an algorithm that operates `O(2k^(d/2))` in time. Although this algorithm is technically still `O(k^d)`, it presents a significant optimization.

