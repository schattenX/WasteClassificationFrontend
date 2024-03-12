const config = require("./config")

const PREDICTION_BASE_API = config.PREDICTION_BASE_API
const HEADER_JSON = config.HEADER_JSON
const UPLOAD_TOKEN = config.UPLOAD_TOKEN
const DEFAULT_MODEL = config.DEFAULT_MODEL

const request = (url, method, data, header) => {
  let _url = PREDICTION_BASE_API + url
  console.log(PREDICTION_BASE_API)
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
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

const upload = (url, method, filePath, formData) => {
  let _url = PREDICTION_BASE_API + url
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: _url,
      method: method,
      filePath: filePath,
      name: UPLOAD_TOKEN,
      formData: formData,
      header: {
        "Content-Type": "multipart/form-data",
        "accept": "application/json", 
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
    })
  })
}

module.exports = {
  ping: () => {
    return request("ping", "post", null, HEADER_JSON)
  },
  predict: (filePath) => {
    return upload('predictions/' + DEFAULT_MODEL, 'POST', filePath, null)
  }
}