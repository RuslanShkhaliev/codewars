function topThreeWords(text, k = 3) {
  const soonWords = text
  .toLowerCase()
  .replace(/[^\w'\s]/g, '')
  .split(/\s/)
  .reduce((acc, word) => {
    if ((/[a-z]/g).test(word)) {
      acc[word] = acc[word] + 1 || 1
    }
    return acc;
  }, {})

  return Object
  .keys(soonWords)
  .sort((a,b) => soonWords[b] - soonWords[a])
  .slice(0, k);
}
