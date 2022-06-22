function getPINs(observed) {
  const assumptions = {
    1: ['1', '2', '4'],
    2: ['2', '1', '3', '5'],
    3: ['2','3', '6'],
    4: ['1','4', '5', '7'],
    5: ['2','4', '5', '6', '8'],
    6: ['3','5','6','9'],
    7: ['7','4', '8'],
    8: ['8', '7','5','9', '0'],
    9: ['6', '8', '9'],
    0: ['0', '8'],
  };
  if (observed.length <= 1) {
    return assumptions[observed];
  }

  const matchedValues = [...observed].map((cur) => assumptions[cur]);

  const split = (matrix) => {
    if (matrix.length <= 2) {
      return toMix(...matrix);
    }

    const mid = matrix.length / 2 | 0;
    const left = matrix.slice(0, mid);
    const right = matrix.slice(mid);

    return toMix(split(left), split(right));
  };

  const toMix = (arr1, arr2) => {
    if (!arr2) {
      return arr1;
    }
    const result = [];

    for (let i = 0, j = 0; i < arr1.length; i++, j = 0) {
      while (j < arr2.length) {
        result.push(arr1[i] + arr2[j++]);
      }
    }
    return result;
  };

  return split(matchedValues);
};
