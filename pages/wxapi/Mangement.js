const config = require("./config")

const MANAGEMENT_BASE_URL = config.MANAGEMENT_BASE_API
const HEADER_JSON = config.HEADER_CONTENT_JSON

const request = (url, method, header) => {
  let _url = MANAGEMENT_BASE_URL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      header: header,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

module.exports = {
  getAllModels: () => {
    return request("models", "GET", HEADER_JSON)
  },
  getSpecificModel: (modelName) => {
    return request('models/' + modelName, 'GET', HEADER_JSON)
  }
}