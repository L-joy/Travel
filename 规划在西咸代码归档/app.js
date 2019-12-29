//app.js
App({
  onLaunch: function () {
    
    
    this.wx_login_user();


    ///获取系统
    wx.getSystemInfo({
      success: function (res) {

        wx.setStorageSync('dev_info', res)
		console.log(res)

      },
    })
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  wx_login_user:function(){

    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://zhixun.mobi/minapp_admin/public/xicity/api/user_info',
            data: {
              code: res.code,

            },
            success: function (res) {
              
              var sessionId = res.data.session_key;

              wx.setStorageSync('sessionId', sessionId)
              wx.setStorageSync('openid', res.data.openid)


            }
          })
        }
      }
    });


  },
  get_map_cate: function () {

    var that = this;
    wx.request({
      url: 'https://zhixun.mobi/minapp_admin/public/xicity/api',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.setStorageSync('cate_list', res.data)
        that.globalData.cate_list = res.data;

      }
    })

  },
  globalData: {
    userInfo: null
  }
})