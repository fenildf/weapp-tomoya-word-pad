// pages/home/home.js
import {
  getWords,
  markWord
} from '../../services/wordManager'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    words: []
  },

  markHandler: function(evt) {
    const { index } = evt.currentTarget.dataset
    const [isMarked, error] = markWord(index)
    if (error) {
      console.error(error)
      return 
    }
    const _setDataObj = {}
    _setDataObj[`words[${index}].isMarked`] = isMarked
    this.setData(_setDataObj)
  },

  editHandler: function(evt) {
    const { index } = evt.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/editor/editor?index=${index}`,
      complete: function() {
        console.log(`edit ${index}`)
      }
    })
  },

  addHandler: function(evt) {
    wx.navigateTo({
      url: `/pages/editor/editor?index=-1`
    })
  },

  settingHandler: function(evt) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    const [words, error] = getWords()
    if (error) {
      console.error(error)
      return 
    }
    this.setData({
      words
    })
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