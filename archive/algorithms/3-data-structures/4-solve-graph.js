const doesPathExist = (graph, start, target, visited = {}) => {
  //if there are no nodes connected to the start, return false
  if (!graph[start]) return false
  //start tracking visited nodes --> visited = {start: true}
  visited[start] = true;

  return graph[start].some((vertex) => {
    //if this item in the array is the end of the path, return true
    if (vertex === target) return true;

    //if we have not yet visited this item in the array, keep looking by recursing
    if (!visited[vertex]) {
      return doesPathExist(graph, vertex, target, visited);
      //else, if we have already visited this item in the array, that means we do not want to keep looking infinitely
    } else {
      return false;
    }
  });
}

//GRAPH 1
const graph = {
  a: ['b'],
  b: ['c', 'd'],
  c: ['d'],
  d: [],
}

//GRAPH 1 OUTPUTS
console.log(doesPathExist(graph, 'a', 'b')) // true
console.log(doesPathExist(graph, 'a', 'e')) // false
console.log(doesPathExist(graph, 'a', 'd')) // true
console.log(doesPathExist(graph, 'a', 'a')) // false


//GRAPH and OUTPUT that trigger the final ELSE case
// const graph = {
//   a: ['b'],
//   b: ['c', 'd'],
//   c: ['d', 'a'],
//   d: [],
//   e:[]
// }

// console.log(doesPathExist(graph, 'a', 'e'))


//GRAPH 2
// const graph = {
//   a: ['a', 'c'],
//   c: ['r', 's'],
//   r: ['a'],
//   s: []
// }

//GRAPH 2 OUTPUTS
// console.log(doesPathExist(graph, 'a', 'a')) // true
// console.log(doesPathExist(graph, 'c', 'c')) // true
// console.log(doesPathExist(graph, 'r', 's')) // true

// console.log(doesPathExist(graph, 's', 'c')) // false

// console.log(doesPathExist(graph, 's', 'a')) // false
