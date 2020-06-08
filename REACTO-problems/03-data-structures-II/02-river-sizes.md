# River Sizes
## Interviewer Prompt
You are given a two-dimensional array (a matrix) of potentially unequal height and width that contains only values of `0` and `1`. Each `0` represents land, and each `1` represents part of a river. A river consists of any number of `1`s that are either horizontally or vertically adjacent, but not diagonally adjacent. The number of adjacent `1`s forming a river determine it's size.

Write a function that returns an array of the sizes of all rivers represented in the input matrix. The sizes do not need to be in any particular order.

### Examples

```javascript
const matrix = [
  [1, 0, 1, 0],
  [0, 1, 1, 1],
  [1, 0, 0, 1]
]

riverSizes(matrix) //should return [1, 1, 5]
````
```javascript
const matrix = [
  [1, 0, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0]
]

riverSizes(matrix)  //should return [1, 2, 2, 2, 5]
```
## Interviewer Strategy Guide

- It may help the interviewee to think of the matrix as a graph, where each node in the matrix has 4 neighboring nodes - up, down, left, right- that may be part of the same river
- Prompt the interviewee to think about how they might count all the adjacent `1`s to a given node. How can they repeat this process to count all the `1`s in a single river? This can be done recursively or using a stack.
- Make sure that the interview has some type of validation to make sure that i and j are valid inputs as they make recursive calls or add nodes to their stack
- If the interviewer has not yet considered a way to keep track of what nodes they have already visited, remind them that this is likely necessary to avoid repeat visits to a node

Note: The recusive solution shown mutates the input array and the iterative approach shown does not. This is to demonstrate different approaches to the problem. An interviewee's solution can be any combination of impure/pure and recursive/iterative.

## Solutions

### Solution 1: Iterative

**Strategy:**
Create an auxiliary data structure to keep track of which nodes in the matrix have already been visited. Then traverse through each element in the matrix. If the node has been visited before, move on. Otherwise visit the node and if it is a river, add its unvisited neighbors to a stack. Proceed through the stack iteratively and update the auxiliary matrix as each node is visited.

**Time Complexity:**
O(wh) where `w` is width and and `h` is height of the matrix. We visit every node once as we iterate through the array, which gives us O(w*h). We have the possibility of visiting each node up to four additional times. This is due to the fact that at every node, we might need to check the four surrounding nodes to see if they might be part of a river. But note, checking a node is a constant time operation and we perform it at most four times. So time complexity is still O(wh).

**Space Complexity:**
O(wh) where `w` is width and and `h` is height of the matrix. This is due to the creation of the `visitedNodes` matrix, which is the same size as the input matrix.

```javascript
function riverSizes(matrix) {
  const sizes = [];

  //Create a secondary matrix keep track of visited nodes
  const visitedNodes = matrix.map(row => row.map(elem => false));

	//Iterate through the matrix
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[0].length; j++) {
			//If we have looked at this node before, skip it
			if (visited[i][j]) continue;
			//If the node has a value of 1 and has never been visited, investigate it
			visitRiver(matrix, i, j, visitedNodes, sizes);
		}
	}
  return sizes;
}

function visitRiver(matrix, i, j, visitedNodes, sizes) {
	let currentRiverSize = 0;

	//Keep track of unvisited nodes that could be part of the same river we are investigating
	const nodesToExplore = [[i,j]];

	//Iterate through those potential river nodes
	while (nodesToExplore.length) {
		const currentNode = nodesToExplore.pop()
		[i, j] = currentNode

		//If we have looked at this node before, skip it. If not, mark it as visited.
		if (visited(i, j)) continue;
		visited[i][j] = true;

		//Account for the current node in our currentRiverSize counter
		if (matrix[i][j] === 0) continue;
		currentRiverSize++;

		//Add unvisited neighbors to the stack
		getUnvisitedNeighbors(matrix, i, j, visited, nodesToExplore)
	}
	sizes.push(currentRiverSize);
}

function getUnvisitedNeighbors(matrix, i, j, visited, nodesToExplore) {
	//Validate the i and j inputs
	if (i > 0 && !visited[i-1][j]) nodesToExplore.push([i-1, j]);
	if (i < matrix.length - 1 && !visited[i+1][j]) nodesToExplore.push([i+1, j]);
	if (j > 0 && !visited[i][j-1]) nodesToExplore.push([i, j-1]);
	if (j < matrix.length - 1 && !visited[i][j+1]) nodesToExplore.push([i, j+1]);
}

```

### Solution 2: Recursive

**Strategy:**
Traverse through each element in the matrix. If a node is land (`0`), skip it. If a node is part of a river (`1`) then recurse through that nodes neighbors to determine the river's size. An auxiliary structure is not used to keep track of visited nodes for this solution. Instead, the input matrix itself is mutated. A `0` now indicates either a land element or a node that has been previously visited. A `1` indicates an unvisited river node.

**Time Complexity:**
O(wh) where `w` is width and and `h` is height of the matrix. This is due to the same reasons cited in Solution 1.

**Space Complexity:**
O(wh) where `w` is width and and `h` is height of the matrix. This is due to the callstack. Consider a worst case situation in which every node is a part of the same river. The callstack would have a recursive function call for every node before resolving.

```javascript
function riverSizes(matrix) {
	const sizes = [];

	//Iterate through the matrix. For a 0, move on. For a 1, stop to investigate.
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[0].length; j++) {
			if (matrix[i][j] === 1) {
				//Investigate the river and add its size to our sizes array
				sizes.push(visitRiver(matrix, i, j));
			}
		}
	}
	return sizes;
}

function visitRiver(matrix, i, j) {
	//Base Case:
	//Validate the i and j inputs first, then check if the node value is 0
	if (i >= matrix.length || j >= matrix[0].length || i < 0 || j < 0 || !matrix[i][j]) return 0;

	//Recursive Case:
	//Mutate the current matrix element to a 0 to indicate it has been visisted
	matrix[i][j] = 0;
	//Recurse to the 4 directions around you & return the final size
	return 1 + visitRiver(matrix,i+1,j) + visitRiver(matrix,i-1,j) + visitRiver(matrix,i,j+1) + visitRiver(matrix,i,j-1);
}
```
