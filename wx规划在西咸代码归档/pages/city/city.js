var config = require('../../utils/config.js');
var img_url = config.img_url;
// pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userinfo_flag: false,
    img_url: img_url,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  
  },
  //事件处理函数
  // index_go_page: function (e) {

  //   console.log(e.currentTarget.dataset.id)
  //   wx.navigateTo({
  //     url: '../info/info?id=' + e.currentTarget.dataset.id
  //   })
  // },
  go_game: function (e) {
    wx.navigateTo({
      url: '../web/web'
    })
  },
  onPageScroll: function (e) {
    // console.log(e);//{scrollTop:99}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    //系统信息
    var window_info = wx.getStorageSync('dev_info')
    var cate_list = wx.getStorageSync('cate_list')
    var userInfo_name = wx.getStorageSync('userInfo_name');
    var that = this;
	console.log(cate_list)


    this.setData({
      pic_list: img_url + cate_list['cate'][2]['pic']['photos'][0]['url'],
      windowHeight: window_info.windowHeight,
      cate_list_cate_info: img_url + cate_list['cate_info'][12][0].more.thumbnail,

    });
    if (userInfo_name == '') {


      that.setData({

        userinfo_flag: false,


      });

    } else {

      that.setData({

        userinfo_flag: true,


      });

    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  go_lx: function () {
  
    wx.navigateTo({
      url: '../lx/lx'
    })
  },
  
  go_chat: function () {
  
    wx.navigateTo({
      url: '../chat/chat'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  go_wenjuan: function () {
  
    wx.navigateTo({
      url: '../map_web/map_web?id=21' 
    })
  },
  //用户信息数据
  onGotUserInfo: function (e) {


    var res = e.detail;
    var that = this

    if (res.errMsg == "getUserInfo:ok") {

      that.setData({

        userinfo_flag: true,

      });


      wx.setStorageSync('userInfo_name', res.userInfo.nickName)
      wx.setStorageSync('userInfo_avatarUrl', res.userInfo.avatarUrl)


      wx.navigateTo({
        url: '../web/web'
      })




    }
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