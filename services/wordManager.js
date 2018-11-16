const _STOKEY = 'words'

function getWords() {
  try {
    var res = wx.getStorageSync(_STOKEY)
    return [res || [], null]
  } catch (error) {
    console.log(error)
    return [null, error]
  }
}

function addWord(word) {
  var [lastList, error] = getWords()
  if (error) {
    return [false, error]
  }
  lastList.push(word)
  var [result, error] = setWords(lastList)
  return [result, error]
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

module.exports = {
  getWords,
  addWord
}