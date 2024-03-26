// pages/identification/indentification.js
const PREDICTION = require('../wxapi/Prediction')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // Van-weapp相关的数据
    show: false,

    // 定义数据
    actionsMap: {
      0: '拍照',
      1: '相册'
    },

    result: {
      '主类': null,
      '子类': null,
      '概率': null,
      '图片地址': null
    },

    // # 翻译表：将英文结果翻译为中文
    translationTable: {
      'R': '可回收垃圾',
      'H': '有害垃圾',
      'F': '厨余垃圾',
      'O': '其他垃圾',
      'badge': '金属徽章',
      'bag': '包',
      'bottlecap': '瓶盖',
      'can': '易拉罐',
      'cardbox': '纸板箱',
      'chair': '座椅',
      'datawire': '数据线/充电线',
      'earphone': '耳机',
      'ewatch': '电子表',
      'expresspackage': '快递包装',
      'glassbottle': '玻璃瓶',
      'glasses': '眼镜',
      'laptop': '笔记本电脑',
      'microphone': '麦克风',
      'mouse': '鼠标',
      'nailclipper': '指甲刀',
      'oldbook': '旧书藉',
      'oldclothes': '旧衣服',
      'pcframe': '电脑机箱',
      'pcscreen': '电脑显示屏',
      'phonesocket': '手机充电头',
      'plasticbag': '塑料袋',
      'plasticbottle': '塑料瓶',
      'poker': '扑克牌',
      'powerbank': '充电宝',
      'shampoobottle': '洗发水瓶',
      'shoe': '鞋',
      'tablet': '平板',
      'toothbrush': '牙刷',
      'towel': '毛巾',
      'vaccumbottle': '保温杯',
      'battery': '电池',
      'bulb': '电灯',
      'eyedropbottle': '滴眼液瓶',
      'medicalthermometer': '水银体温计',
      'oralliquid': '口服液瓶',
      'pesticidebottle': '杀虫剂',
      'pilltablets': '药品',
      'xray': 'X光片',
      'bone': '剩骨头',
      'egg': '鸡蛋',
      'fruitrind': '果皮',
      'leftover': '残羹剩饭',
      'tealeaf': '茶叶渣',
      'blackboarderaser': '黑板擦',
      'broom': '扫帚',
      'carpet': '地毯',
      'cigarettebutt': '烟蒂',
      'dentalfloss': '牙线棒',
      'disposablefoodbox': '一次性餐盒',
      'medifacemask': '医用口罩',
      'mosquitorepellantincense': '蚊香',
      'napkin': '餐巾纸',
      'pen': '笔',
      'plasticstraw': '塑料管',
      'shatteredplate': '碎碗',
      'summermat': '凉席',
      'toothpick': '牙签'
    }
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
  /**
   * 1. 弹出ActionSheet，并提供拍照、从相册选择，该两种接口。
   * 2. 在选择好图片后，图片发送给后端，并保存后端结果到globalData.tmpDataToResults
   * 作为与results页面通信的数据接口，和localStorage.resultsLogged，作为与logs页面
   * 通信的数据接口。
   * 3. 跳转到results页面，显示结果。
   */
  showPopup() {
    let that = this
    wx.showActionSheet({
      itemList: ['拍照', '相册'],
      success: (res) => {
        // 显示itemList被选中的index
        console.log(res.tapIndex)
        // 获取用户点击的action名
        let actionName = that.data.actionsMap[res.tapIndex]
        
        if (actionName == '相册') {
          // 从相册中选择一个图片
          wx.chooseMedia({
            count:1,
            mediaType: ['iamge'],
            sourceType: ['album'],
            success: (img_res) => {
              console.log(img_res)
              // 调用图像识别模块，并保存识别结果
              that.uploadAndGetResults(img_res.tempFiles[0].tempFilePath)
                  .then(() => {
                    // 将用户上传的图像保存在小程序私有文件存储区中，并记录图片路径到result
                    // .then()函数是为了保证同步，因为saveFile和predict是异步的。
                    wx.getFileSystemManager().saveFile({
                      tempFilePath: img_res.tempFiles[0].tempFilePath,
                      success: (res => {
                        let savedFilePath = res.savedFilePath
                        // 将数据更新到globalData中
                        let app = getApp()
                        app.globalData.tmpDataToPageResults = {
                          result: that.data.result,
                          imagePath: savedFilePath
                        }
                        // 将数据保存到localStorage，新的结果存在最前面
                        let resultsLogged = wx.getStorageSync('resultsLogged') || []
                        let tmp = {
                          date: Date.now(),
                          result: that.data.result,
                          imagePath: savedFilePath
                        }
                        resultsLogged.unshift(tmp)
                        wx.setStorageSync('resultsLogged', resultsLogged)

                        // 跳转到results界面
                        wx.navigateTo({
                          url: '../results/results',
                        })
                      })
                    })
                  })
            },
            fail: (img_res) => {
              console.log(img_res.errMsg)
            }
          })
        }
        else if (actionName == '拍照') {
          wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['camera'],
            success: (md_res) => {
              that.uploadAndGetResults(md_res.tempFiles[0].tempFilePath)
                  .then(() => {
                    wx.getFileSystemManager().saveFile({
                      tempFilePath: md_res.tempFiles[0].tempFilePath,
                      success: (res => {
                        let savedFilePath = res.savedFilePath
                        // 将数据更新到globalData中
                        let app = getApp()
                        app.globalData.tmpDataToPageResults = {
                          result: that.data.result,
                          imagePath: savedFilePath
                        }
                        // 将数据保存到localStorage，新的结果存在最前面
                        let resultsLogged = wx.getStorageSync('resultsLogged') || []
                        let tmp = {
                          date: Date.now(),
                          result: that.data.result,
                          imagePath: savedFilePath
                        }
                        resultsLogged.unshift(tmp)
                        wx.setStorageSync('resultsLogged', resultsLogged)

                        // 跳转到results界面
                        wx.navigateTo({
                          url: '../results/results',
                        })
                      })
                    })
                  })
            }
          })
        }
      },
      fail: (res) => {
        // 显示错误信息
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 上传文件，并将推理结果返回
   * @param {string} filePath 上传的文件路径
   */
  uploadAndGetResults(filePath) {
    // 上传文件
    let that = this
    return PREDICTION.predict(filePath)
              .then(res => {
                // 格式化推理结果
                that.processRawPredictions(res)
              })
  },

  /**
   * 处理TorchServe返回的的结果，将之转换为我们需要的格式
   * @param {string} rawPrediction TorchServe直接返回的json结果 
   */
  processRawPredictions(rawPredictionJson) {
    // 若输入参数为字符串，则转换为json对象
    let jsonObject = rawPredictionJson
    if (typeof jsonObject == 'string') {
      jsonObject = JSON.parse(rawPredictionJson)
      console.log(jsonObject)
    }
    
    // 获取概率最大的key，第一个为maxKey
    let maxKey = null
    for (let key in jsonObject) {
      maxKey = key
      break
    }

    if (jsonObject[maxKey] > 0.6) {
      // 将键值对转化为我们需要的格式
      let [majorCategory, subCategory] = maxKey.split('/')
      let translationTable = this.data.translationTable
      this.setData({
        result: {
          '主类': translationTable[majorCategory],
          '子类': translationTable[subCategory],
          '概率': jsonObject[maxKey]
        }
      })
    }
    else {
      this.setData({
        result: {
          '主类': null,
          '子类': null,
          '概率': null
        }
      })
    }

    
    
    // 以下可以调用全局存储模块，把推理结果存储到全局
    // 方便日志中显示
  }

})