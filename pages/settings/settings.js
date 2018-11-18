// pages/settings/settings.js
import { 
  getSettings, 
  setGistID,
  toggleSync,
  toggleSam
} from "../../services/settingsManager";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    needSam: false,
    autoSync: false,
    gistID: '',
  },

  editingGistID: '',

  updateSettings: function() {
    const [settings, error] = getSettings()
    if (error) {
      console.error(error)
      return
    }
    Object.keys(settings).forEach(key => {
      const dataObj = {}
      dataObj[key] = settings[key]
      this.setData(dataObj)
    })
  },

  changeSamHandler: function() {
    toggleSam()
    this.updateSettings()
  },

  changeSyncHandler: function() {
    toggleSync()
    this.updateSettings()
  },

  changeIDHandler: function(evt) {
    const { value } = evt.detail.detail
    this.setData({
      gistID: value
    })
  },

  blurIDHandler: function() {
    const [res, error] = setGistID(this.data.gistID)
    if (error) {
      console.error(error)
    } else {
      // 
    }
    this.updateSettings()
  },

  generateHandler: function() {
    
  },

  syncHandler: function() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateSettings()
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