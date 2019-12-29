var config = require('../../utils/config.js');
var img_url = config.img_url;
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    userInfo: {},
    img_url: img_url,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  index_go_page: function (e) {

    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../map_web/map_web?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad: function () {

    //系统信息
    var window_info = wx.getStorageSync('dev_info')
    var cate_list = wx.getStorageSync('cate_list')
    console.log(cate_list)

  
    var that = this;
    if (cate_list == '') {


      config.get_index_api.call(that, 1, function (data) {


        wx.setStorageSync('cate_list', data)


        that.setData({

          pic_list: img_url + data['cate'][1]['pic']['photos'][0]['url'],
          windowHeight: window_info.windowHeight,
          cate_list_cate_info: data['cate_info'],
          cate_btn_img: data['cate_btn_lits'],
          cate_btn_img: data['cate_btn_lits'],

        });



      })

    } else {


      that.setData({
        pic_list: img_url + cate_list['cate'][3]['pic']['photos'][0]['url'],
        windowHeight: window_info.windowHeight,
        cate_list_cate_info: cate_list['cate_info'],
        cate_btn_img: cate_list['cate_btn_lits'],

      });


    

    }







  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
