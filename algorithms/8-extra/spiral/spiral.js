function spiral(array) {
  let result = [];
  while (array.length) {
    // Steal the first row.
    result = result.concat(array.shift());
    // Steal the right items.
    for (var i = 0; i < array.length; i++) result.push(array[i].pop());
    // Steal the bottom row.
    result = result.concat((array.pop() || []).reverse());
    // Steal the left items.
    for (var i = array.length - 1; i >= 0; i--) result.push(array[i].shift());
  }
  return result;
}

//~~~~~~~~~~~~~~~~ALTERNATE SOLUTION ~~~~~~~~~~~~~~~~~~~

// function spiral(array) {
//     //if the array has a length of 1, return array
//     if(array.length == 1) {
//         return array[0];
//     }
    
//     var firstRow = array[0],
//         numRows = array.length,
        
//         nextRow = [],
//         newArr,
//         rowIndex,
//         colIndex = array[1].length - 1;
    
//     //store elements in new arrays to push into the next row    
//     for(colIndex; colIndex >= 0; colIndex--) {
//         newArr = [];
//         for(rowIndex = 1; rowIndex < numRows; rowIndex++) {
//             newArr.push( array[rowIndex][colIndex]);
//         }
        
//         nextRow.push( newArr );
//     }
    
//     firstRow.push.apply( firstRow, spiral(nextRow));
    
//     return firstRow;
// }


//~~~~~~~~~~~~~~~~ALTERNATE SOLUTION ~~~~~~~~~~~~~~~~~~~

// function spiral (array) {
//   var res = [];
//   while(array.length) {
//     res = res.concat(array.shift())
//     array = expand(array);
//   }
//   return res;
// }


// function expand(matrix){
//     return matrix.reduce(function(res, arr, i){
//         arr.forEach(function(n, j){
//             if (!res[j]) res[j] = [];
//             res[j][i] = n;
//         })
//         return res;
//     }, []).reverse();
// }



