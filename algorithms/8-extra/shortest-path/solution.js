var G1 = {a: ['q', 'b', 'c'],
		  b: ['a', 'd'],
	   	  c: ['a','d', 'y'],
	   	  d: ['b', 'c', 'r', 'x'],
		  q: ['a', 'r'],
		  r: ['d', 'q', 'z'],
		  x: ['d'],
		  y: ['c'],
		  z: ['r']
 }

var G2 = {a: ['b'],
		  b: ['a','c'],
		  c: ['b']
		  }

function BFS(graph, startNode, targetNode){
	var queue = [startNode];
	var discovered = {[startNode]: true};
	var parents = {};
	var finished = false; 
	while (!isEmpty(queue) && !finished){
		var nodeToCheck = queue.shift(); // Remove node form the front of the queue
		graph[nodeToCheck].forEach(function(neighborNode){
			if (!discovered[neighborNode]) {
				parents[neighborNode] = nodeToCheck;	
				discovered[neighborNode] = true
				queue.push(neighborNode);
			}
			if (targetNode === neighborNode) {
				finished = true; 
			}
		})
	}
	return findPath(targetNode, parents)
}


var isEmpty = function(queue) {
	return queue.length === 0;
}

var findPath = function(node, parents) {
	if (!parents[node]) {
		return [node]; 
	} else {
		return findPath(parents[node], parents).concat(node);
	}
}

console.log(BFS(G2, 'a', 'b')) // ['a', 'b']
console.log(BFS(G2, 'a', 'c')) // ['a', 'b', 'c'] or adc
console.log(BFS(G1, 'a', 'd')) // ['a', 'b', 'd']
console.log(BFS(G1, 'a', 'b')) // ['a', 'b']
console.log(BFS(G1, 'a', 'z')) 
console.log(BFS(G1, 'a', 'x')) 
console.log(BFS(G1, 'a', 'y')) 
