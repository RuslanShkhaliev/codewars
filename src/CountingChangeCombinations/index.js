var countChange = function(money, coins) {
  let counter = 0;

  const changer = (index, value) => {
    let current = coins[index];

    if (index === 0) {
      if (value%current === 0){
        counter++
      }
      return
    }

    while(value >= 0) {
      changer(index-1, value)
      value -= current
    }
  }
  changer(coins.length - 1, money);
  return counter
}
