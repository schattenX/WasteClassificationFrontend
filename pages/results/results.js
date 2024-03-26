// pages/results/results.js
const GLOBAL_DATA = getApp().globalData
const DEFAULT_IMG_PATH = '../../images/test/数据接口.jpg'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: null,
    src: DEFAULT_IMG_PATH,
    majorCategory: '未知',
    subCategory: '未知',
    probability: 0.0
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
    let imgPath = GLOBAL_DATA.tmpDataToPageResults.imagePath
    let mCate   = GLOBAL_DATA.tmpDataToPageResults.result['主类']
    let sCate   = GLOBAL_DATA.tmpDataToPageResults.result['子类']
    let pro     = GLOBAL_DATA.tmpDataToPageResults.result['概率']
    if (imgPath == null) 
      imgPath = DEFAULT_IMG_PATH
    if (mCate == null)
      mCate = '未知'
    if (sCate == null) 
      sCate = '未知'
    if (pro == null)
      pro = 0.0
    
    this.setData({
      src: imgPath,
      majorCategory: mCate,
      subCategory: sCate,
      probability: pro
    })
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

  }
})