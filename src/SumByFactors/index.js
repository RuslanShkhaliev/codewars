const isPrime = (num) => {
  if (Math.abs(num) <= 3) {
    return true
  }
  for (let i = 2; i <= Math.sqrt(Math.abs(num)); i++) {
    if (num % i == 0) return false
  }
  return true
}


function sumOfDivided(list) {
  const [max] = list.sort((a,b) => Math.abs(b) - Math.abs(a))

  const primeNums = Array.from({ length: Math.abs(max) + 2 }, (_, index) => index + 2).filter(isPrime)

  const result = []

  for (let i = 0; i < primeNums.length; i++) {
    const prime = primeNums[i]
    const pairs = []
    for (let j = 0; j < list.length; j++) {
      if (!(list[j] % prime)) {
        pairs.push(list[j])
      }
    }
    if (pairs.length) {
      result.push([prime, pairs.reduce((sum, cur) => sum+=cur, 0)])
    }
  }
  return result
}
