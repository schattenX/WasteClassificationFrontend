const PRE_API = require("../wxapi/Prediction")
const MAN_API = require("../wxapi/Mangement")

// pages/home/home.js
Page({

  /**
   * 页面的初始数据s
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("why?")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onClickToPing() {
    PRE_API.ping().then(res => {
      console.log(res)
    })
  },

  onClickCheckAllModels() {
    wx.request({
      url: 'http://localhost:8081/models',
      method: 'GET',
      success(res) {
        console.log(res)
      }
    })
  },
  onClickTestPredict() {
    // wx.chooseImage({
    //   success: function(res) {
    //     var filePath = res.tempFilePaths[0]
    //     console.log(filePath)
    //     wx.uploadFile({
    //       url: 'http://localhost:8080/predictions/wastenet3',
    //       filePath: filePath,
    //       name: 'file',
    //       success: function(res) {
    //         console.log(res.data)
    //       }
    //     })
    //   }
    // })
    console.log("onClickTestPredict")
    wx.uploadFile({
      filePath: 'images/test/vaccum_bottle.jpg',
      name: 'data',
      url: 'http://localhost:8080/predictions/wastenet3_new_prep',
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})