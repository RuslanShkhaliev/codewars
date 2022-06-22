var Sudoku = function(data) {
  //   Private methods
  // -------------------------
  const size = data.length;
  let boxSize = 1;
  if (size === 25) {
    boxSize = 5;
  } else if (size === 9) {
    boxSize = 3
  } else if (size === 4) {
    boxSize = 2
  }
  const sectors = size / boxSize;
  const checkValidSize = (list) => new Set(list).size === size

  //   Public methods
  // -------------------------
  return {
    isValid: function() {
      if (size === 1) {
        return data[0][0] === 1
      }
      for (let i = 0; i < size; i++) {
        const row = data[i];
        const col = [];
        for (let j = 0; j < size; j++) {
          if (!(Number.isInteger(row[j]) && Number.isInteger(data[j][i]))) {
            return false
          }
          col.push(data[j][i])
        }

        if (!(checkValidSize(row) && checkValidSize(col))) {
          return false
        }
      }

      for (let i = 0; i < sectors; i++) {
        for (let j = 0; j < size; j += boxSize) {
          const section = [];
          for (let k = 0; k < boxSize; k++) {
            let start = i * boxSize;
            let end = (i + 1) * boxSize
            while (start < end) {
              section.push(data[j + k][start])
              start++
            }
          }
          if (!checkValidSize(section)) {
            return false
          }
        }
      }
      return true;
    }
  };
};
