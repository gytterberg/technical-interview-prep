function topologicalSort(adjacencyList){
  const visited = {};

  function tsort(vertex) {
    if (visited[vertex]) {
      return [];
    } else {
      visited[vertex] = true;
      return adjacencyList[vertex].map(dependency => tsort(dependency))
                                  .reduce((old, piece) => old.concat(piece), [])
                                  .concat(vertex);
      }
  }

  return Object.keys(adjacencyList).map(dependency => tsort(dependency))
                                   .reduce((old, piece) => old.concat(piece), []);
}

var graph = {
 a: ['c'],
 b: ['c', 'k'],
 c: ['s', 'r'],
 d: ['a'],
 r: ['m', 'n'],
 k: [],
 m: [],
 n: [],
 s: []
};

installedOrder = topologicalSort(graph)
console.log(installedOrder);

  // function DFS(vertex) {
  //   const dependencies = adjacencyList[vertex];
  //   const noDependencies = () => adjacencyList[vertex].length === 0;
  //   if (noDependencies(vertex)) {
  //     visited[vertex] = true;
  //   } else {
  //     if (!visited[vertex]) {
  //       visited[vertex] = true;
  //       dependencies.forEach(dependency => {
  //         DFS(dependency);
  //       });
  //     }
  //   }
  //   sorted.push(vertex);
  // }