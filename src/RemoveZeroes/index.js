function removeZeros(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i;
    if (current === '0' || current === 0) {
      continue
    }
    while (j > 0 && arr[j - 1] == '0') {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = current;
  }
  return arr;
}
