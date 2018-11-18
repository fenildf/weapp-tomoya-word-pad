import { _STOKEY } from './stoKeys'

function getWords() {
  try {
    var res = wx.getStorageSync(_STOKEY)
    try {
      res = JSON.parse(res)
    } catch (error) {
      res = []
    }
    return [res, null]
  } catch (error) {
    // console.log(error)
    return [null, error]
  }
}

function addWord(word) {
  var [lastList, error] = getWords()
  if (error) {
    return [false, error]
  }
  lastList.push(word)
  return setWords(lastList)
}

function setWords(words) {
  try {
    wx.setStorageSync(_STOKEY, JSON.stringify(words))
    return [true, null]
  } catch (error) {
    console.log(error)
    return [false, error]
  }
}

function markWord(index) {
  var [words, error] = getWords()
  if (error) {
    console.log(error)
    return [false, error]
  }
  var isMarked = words[index].isMarked = !words[index].isMarked
  var [result, error] = setWords(words)
  return [isMarked, error]
}

function updateWord(index, word) {
  var [words, error] = getWords()
  if (error) {
    console.log(error)
    return [false, error]
  }
  Object.keys(word).forEach((key) => {
    words[index][key] = word[key]
  })
  return setWords(words)
}

module.exports = {
  getWords,
  addWord,
  updateWord,
  markWord
}