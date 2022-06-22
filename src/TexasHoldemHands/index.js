function hand(holeCards, communityCards) {
  const CARDS_WEIGHT = {
    '2': 1,
    '3': 2,
    '4': 3,
    '5': 4,
    '6': 5,
    '7': 6,
    '8': 7,
    '9': 8,
    '10': 9,
    'J': 10,
    'Q': 11,
    'K': 12,
    'A': 13,
  }

  const COMBINATION_ENUM = {
    'straight-flush': 9,
    'four-of-a-kind': 8,
    'full house': 7,
    'flush': 6,
    'straight': 5,
    'three-of-a-kind': 4,
    'two pair': 3,
    'pair': 2,
    'nothing': 1,
    9:'straight-flush',
    8:'four-of-a-kind',
    7:'full house',
    6:'flush',
    5:'straight',
    4:'three-of-a-kind',
    3:'two pair',
    2:'pair',
    1:'nothing',
  }


  const flat = arr => [].concat(...arr)

  const cards = [...holeCards, ...communityCards]
  .map((card) => {
    const spread = [...card]
    const rank = spread.splice(0, card.length - 1).join('')
    const [suit] = spread
    return { rank, suit, weight: CARDS_WEIGHT[rank] }
  })
  .sort((a, b) => b.weight - a.weight)

  class CombinationCheck {

    static isStraightFlush(cards) {
      const result = CombinationCheck.isStraight(CombinationCheck.isFlush(cards))
      if (!Array.isArray(result)) return false
      return result.length === 5 ? result : false
    }

    static isFourOfKind(cards) {
      const four = CombinationCheck.getDuplicatesByNumber(cards, 4)
      return four.length ? flat(four) : false
    }

    static isFullHouse(cards) {
      const three = CombinationCheck.isThree(cards)
      if (!three) {
        return false
      }
      const [_, secondThree] = CombinationCheck.getDuplicatesByNumber(cards, 3)
      let pair = CombinationCheck.isPair(cards)

      if ((Array.isArray(secondThree) && secondThree[0] && secondThree[0].weight) > Array.isArray(pair) && pair[0] && pair[0].weight) {
        pair = secondThree.slice(0, 2)
      }
      if (pair.length) {
        return [...three, ...pair]
      }
    }

    static isFlush(cards) {
      const suits = cards.reduce((res, card) => {
        const { suit } = card
        if (suit in res) {
          res[suit].push(card)
        } else {
          res[suit] = [card]
        }
        return res
      }, {})
      const flush = Object.values(suits).filter((cards) => cards.length >= 5)
      return flush.length ? flat(flush) : false
    }

    static isStraight(cards) {
      const sequence = CombinationCheck.findSequence(cards)
      return sequence.length > 4 ? sequence.slice(0, 5) : false
    }

    static isThree(cards) {
      const three = CombinationCheck.getDuplicatesByNumber(cards, 3)
      return three.length ? flat(three.slice(0, 1)) : false
    }

    static isTwoPair(cards) {
      const result = CombinationCheck.getDuplicatesByNumber(cards, 2)
      return result.length >= 2 ? flat(result.slice(0, 2)) : false

    }

    static isPair(cards) {
      const [pair] = CombinationCheck.getDuplicatesByNumber(cards, 2)
      if (!Array.isArray(pair)) {
        return false
      }
      return pair.length ? pair : false
    }

    static isNothing(cards) {
      return cards.slice(0, 5)
    }

    static findSequence(cards) {
      if (!cards && !cards.length) {
        return []
      }
      // TODO возвращать самую длинную последовательность
      const { sequence } = (cards || []).reduce(({ sequence, prevCard }, card ) => {

        if (sequence.length < 5) {
          if (!prevCard || !sequence.length || (prevCard.weight - card.weight === 1)) {
            sequence.push(card)
          } else if (prevCard.weight - card.weight > 1) {
            sequence = [card]
          }
        }

        return {
          sequence,
          prevCard: card,
        }


      }, { sequence: [] , prevCard: null })

      return sequence
    }

    static findDuplicatesByRank(cards) {
      return cards.reduce((coincidences, card )  => {
        if (card.rank in coincidences) {
          coincidences[card.rank].push(card)
        } else {
          coincidences[card.rank] = [card]
        }
        return coincidences

      }, {})
    }

    static getDuplicatesByNumber(cards, amount) {
      const coincidences = CombinationCheck.findDuplicatesByRank(cards)
      const hashMap = {}
      Object.entries(coincidences).forEach(([rank, cards]) => {
        const count = cards.length
        if (count > 1) {
          if (hashMap[count]) {
            hashMap[count].push(cards)
          } else {
            hashMap[count] = [cards]
          }
        }
      })
      return [...(hashMap[amount] || [])].sort((a,b) => b[0].weight - a[0].weight)
    }

    static getCombination(first, cards) {
      if (!Array.isArray(first) || !first.length) {
        return null
      }
      return [...new Set([...first, ...cards])].slice(0, 5)
    }

    static computeCombination(cards) {
      const { isNothing, isPair, isThree, isFlush, isStraight, isTwoPair, isFullHouse, isFourOfKind, getCombination, isStraightFlush } = CombinationCheck
      const combinations = [isNothing, isPair, isTwoPair, isThree, isStraight, isFlush, isFullHouse, isFourOfKind, isStraightFlush]

      const getCombinate = (cards, combinationFn, type) => {
        const combination = getCombination(combinationFn(cards), cards) || []
        const ranks = combination.map((card) => card.rank)
        return {
          type: COMBINATION_ENUM[type],
          ranks: (ranks && ranks.length) ? [...new Set(ranks)] : null
        }
      }

      let result = {};
      let i = combinations.length - 1;


      while (i >= 0 && !result.ranks) {
        result = getCombinate(cards, combinations[i], i + 1)
        i--
      }

      return result
    }
  }


  return CombinationCheck.computeCombination(cards)

}
