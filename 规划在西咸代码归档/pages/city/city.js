var config = require('../../utils/config.js');
var img_url = config.img_url;
// pages/city/city.js
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
  
    //系统信息
    var window_info = wx.getStorageSync('dev_info')
    var cate_list = wx.getStorageSync('cate_list')


    this.setData({
      pic_list: img_url + cate_list['cate'][2]['pic']['photos'][0]['url'],
      windowHeight: window_info.windowHeight,

    });


    
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