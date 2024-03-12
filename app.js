// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    // 定义了identification，logs到results页面的数据接口
    tmpDataToPageResults: {
      result: {
        '主类': null,
        '子类': null,
        '概率': null
      },
      imagePath: null
    }
  }
})
