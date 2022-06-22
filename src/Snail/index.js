const snail = function(array) {
  if (!array[0].length) {
    return array[0];
  }
  const len = array.length;
  const result = [];

  let startRow = 0;
  let startCol = 0;
  let endRow = array.length - 1;
  let endCol = endRow;

  const assignVal = (row, col) => {
    result.push(array[row][col]);
  }

  while (startRow <= endRow && startCol <= endCol) {

    //left->right
    for (let i = startCol; i <= endCol; i++) {
      assignVal(startRow, i)
    }
    startRow++;
    //top->down
    for (let i = startRow; i <= endRow; i++) {
      assignVal(i, endCol)
    }
    endCol--;
    //right-left
    for (let i = endCol; i >= startCol; i--) {
      assignVal(endRow, i)
    }
    endRow--;
    //bottom-top
    for (let i = endRow; i >= startRow; i--) {
      assignVal(i, startCol)
    }
    startCol++;
  }
  return result
}
