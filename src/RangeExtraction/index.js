function solution(list){
  let result = [];
  let i = 0;
  let k = j = 1;
  while (i < list.length) {
    let counter = 1;
    while (Math.abs(list[i] - list[j]) === k++) {
      counter++
      j++
    }
    if (counter > 2) {
      result.push(`${list[i]}-${list[j - 1]}`)
      i = j;
      j = i + 1;
    } else {
      result.push(`${list[i]}`)
      i++;
      j = i + 1
    }
    k = 1
  }
  return result.join(',')
}
