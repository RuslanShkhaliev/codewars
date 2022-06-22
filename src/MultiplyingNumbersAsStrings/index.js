const sum = (init, added, offset = 0, base = 10) => {
  let [min, max] = [init, added].sort((a,b) => a.length - b.length)
  const difference = max.length - min.length;

  min = '0'.repeat(difference) + min

  let i = max.length - 1
  let overload = 0;
  let result = ''
  while(i >= 0 || overload) {
    const numA = Number(min[i] || 0)
    const numB = Number(max[i] || 0)

    const sum = numA + numB + overload

    result = sum%base + result

    overload = Number(sum>=base)

    i--
  }
  return result
}

function multiply(a,b) {
  const BASE = 10;

  const nums = [a, b].map((num) => num.startsWith('0') ? num.slice(1) : num)
  let [min, max] = nums.sort((a,b) => a.length - b.length)

  if (max.length <= 7) {
    return String(min * max)
  }

  if (!min.length) {
    console.log('!min', {min, max})
    return max
  } else if (!max.length) {
    console.log('!max')
    return min
  }



  min = [...min];
  max = [...max]

  let result = []
  while (min.length) {
    let i = max.length - 1;
    const minNum = Number(min.pop())

    let res = ''
    let overload = 0
    let right = 1
    while (i >= 0 || overload) {
      const maxNum = Number(max[i] || 0)
      const multy = minNum * maxNum + overload
      res = multy%BASE + res

      overload = Math.floor(multy / BASE)
      i--
    }
    result.push(res)

  }
  if (result.length < 2) {
    return result[0]
  }
  const equal = result.reduce((s, n, offset) => sum(s, n + '0'.repeat(offset)), '')
  console.log({equal})

  return equal
}
