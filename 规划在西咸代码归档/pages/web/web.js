// pages/web/web.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

    var userInfo_name = wx.getStorageSync('userInfo_name');

    var openid = wx.getStorageSync('openid');

    var userInfo_avatarUrl = wx.getStorageSync('userInfo_avatarUrl');

    var ur = encodeURI("https://zhixun.mobi/min_h5/18_game_h5/index.php?openid=" + openid + "&face=" + userInfo_avatarUrl + "&nickname=" + userInfo_name +"#wechat_redirect")

    this.setData({

      web_url: ur

    });


    
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
  onShareAppMessage: function (res) {

    var cate_fx = wx.getStorageSync('cate_list')




    return {
      title: cate_fx['cate_fx'].title,
      imageUrl: cate_fx['cate_fx'].pic,
      path:"pages/lx/lx?top=1",
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
})