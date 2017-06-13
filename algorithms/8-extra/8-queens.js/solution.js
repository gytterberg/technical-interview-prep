const GRID_SIZE = 8;

function generateArrangements(row = 0, columns = []) {
  let validConfigurations = [];
  if (row === GRID_SIZE) {
    return [columns];
  } else {
    for (let column = 0; column < GRID_SIZE; column++){
      const newColumns = columns.slice();
      newColumns[row] = column;
      if (isValidBoard(newColumns)) {
        validConfigurations = validConfigurations.concat(generateArrangements(row + 1, newColumns));
      }
    }
    return validConfigurations;
  }
}

function isValidBoard(columns) {
  if (columnsIntersect(columns)) return false;
  if (diagonalsIntersect(columns)) return false;
  return true;
}

const columnsIntersect = columns => {
  return Object.values(columns).some((column1, row1) => {
      return Object.values(columns).some((column2, row2) => {
        return (row1 !== row2) && (column1 === column2)
      });
  });
}

const diagonalsIntersect = columns => {
  return Object.values(columns).some((column1, row1) => {
      return Object.values(columns).some((column2, row2) => {
        return isDiagonal(row1, column1, row2, column2);
      });
  });
}

const isDiagonal = (row1, column1, row2, column2) => (Math.abs(row1 - row2) === Math.abs(column1 - column2)) && (row1 - row2 !== 0)