// pages/viewer/viewer.js
import { getWords } from "../../services/wordManager"
import { bingTrans } from '../../services/onlineTrans'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: '',
    note: '',
    prop: '',
    transContent: ''
  },

  getOnlineTrans: function(word, targetKey) {
    bingTrans(word, false)
      .then(([res, error]) => {
        if (error) {
          console.error(error)
        }
        const setDataObj = {}
        setDataObj[targetKey] = res
        this.setData(setDataObj)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { index } = options
    var [words, error] = getWords()
    if (error) {
      console.error(error)
      return 
    }

    const { word, note, prop } = words[index]

    this.setData({
      word,
      note,
      prop
    })

    // GET ONLINE TRANSLATION OF THE WORD
    this.getOnlineTrans(word, 'transContent')
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