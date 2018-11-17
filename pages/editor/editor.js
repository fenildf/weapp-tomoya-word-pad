// pages/editor/editor.js
const PROPS = ['v', 'n', 'adj', 'adv', 'abbr', 'other']
const PROPS_CH = ['動詞', '名詞', '形容詞', '副詞', '縮寫', '其他']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // word: 
    _word: '',
    wordMaxLength: 30,
    // note:
    _note: '',
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
      _word: value
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
      _note: value,
      noteCurLength: _note.length
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      index,
      word,
      prop,
      note
    } = options

    if (index < 0) { 
      this.setData({
        index,
        btnIndex: 'ADD'
      })
    } else {
      this.setData({
        index,
        btnIndex: 'UPDATE',
        _word: word,
        _note: note,
        selectedPropIndex: PROPS.indexOf(prop)
      })
    }
  },

  submitWord: function() {
    
  },

  cancelWord: function() {

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