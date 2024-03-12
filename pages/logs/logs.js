// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    resultsLogged: []
  },
  onLoad() {
    this.setData({
      resultsLogged: (wx.getStorageSync('resultsLogged') || []).map((record) => {
        console.log(record)
        return {
          date: util.formatTime(new Date(record.date)),
          result: record.result,
          imagePath: record.imagePath,
          timeStamp: record.date
        }
      })
    })
  },

  onClickJumpToResult(options) {
    // 获取被点击元素在resultsLogged里面的索引
    let index = options.currentTarget.dataset.index
    // 将对应的元素存放至app.globalData.tmpDataToResults
    let app = getApp()
    let record = this.data.resultsLogged[index]
    app.globalData.tmpDataToPageResults = {
      result: record.result,
      imagePath: record.imagePath
    }
    // 跳转到results页面
    wx.navigateTo({
      url: '../results/results',
      fail: ((res) => {
        console.log(res.errMsg)
      })
    })
  }
})
