// pages/editor/editor.js
import { getWords, addWord, updateWord } from '../../services/wordManager'

const PROPS = ['v', 'n', 'adj', 'adv', 'abbr', 'other']
const PROPS_CH = ['動詞', '名詞', '形容詞', '副詞', '縮寫', '其他']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // word: 
    word: '',
    wordMaxLength: 30,
    // note:
    note: '',
    noteCurLength: 0,
    noteMaxLength: 100,
    // prop:
    selectedPropIndex: PROPS.length-1,
    props: PROPS,
    propsCH: PROPS_CH,
    // page init:
    index: -1,
    btnIndex: '',
  },

  updateWord: function(evt) {
    const { value } = evt.detail
    this.setData({
      word: value
    })
  },

  updateProp: function(evt) {
    const { value } = evt.detail
    this.setData({
      selectedPropIndex: value
    })
  },

  updateNote: function(evt) {
    const { value } = evt.detail
    this.setData({
      note: value,
      noteCurLength: value.length
    })
  },

  submitWord: function() {
    const newWord = {
      word: this.data.word,
      prop: PROPS[this.data.selectedPropIndex],
      note: this.data.note
    }

    const { index } = this.data
    var res, error 

    if (index < 0) {
      [res, error] = addWord(newWord)
    } else {
      [res, error] = updateWord(index, newWord)
    }
    if (error) {
      console.error(error)
    } else {
      console.log('set storage success')
      wx.navigateBack({ delta: 1 })
    }
  },

  cancelWord: function() {
    wx.navigateBack({ delta: 1 })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { index } = options

    // Now it's going to add a new word. 
    // All inputs remain empty
    if (index < 0) {
      this.setData({
        index,
        btnIndex: 'ADD'
      })
      return 
    }

    const [words, error] = getWords()
    if (error) {
      console.error(error)
      wx.navigateBack({ delta: 1 })
      return 
    }

    const { word, note, prop } = words[index]
    this.setData({
      index,
      btnIndex: 'UPDATE',
      word,
      note,
      noteCurLength: note.length,
      selectedPropIndex: PROPS.indexOf(prop)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})