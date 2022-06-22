const sides = {
  NORTH: "SOUTH",
  SOUTH: "NORTH",
  EAST: "WEST",
  WEST: "EAST",
};

const isOppositeSides = (side, index, arr) => sides[side] === arr[index + 1]

function dirReduc(arr) {
  if (!arr.some(isOppositeSides)) {
    return arr;
  }

  for (const [index, current] of arr.entries()) {
    if (isOppositeSides(current, index, arr)) {
      arr.splice(index, 2);
      return dirReduc(arr);
    }
  }
  return []
}
