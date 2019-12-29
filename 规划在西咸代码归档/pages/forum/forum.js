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
  index_go_page: function(e) {

    console.log(e.currentTarget.dataset.id)
	if(e.currentTarget.dataset.id === 5){
		wx.navigateTo({
		  url: '../detail_web/detail_web'
		})
	}else{
		wx.navigateTo({
		  url: '../detail/detail?id='+e.currentTarget.dataset.id
		})
	}
  },
  onLoad: function() {


    wx.createSelectorQuery().selectAll('.lz_img').boundingClientRect((ret) => {
      console.log(ret)
      
    }).exec()



    //系统信息
    var window_info = wx.getStorageSync('dev_info')
    var cate_list = wx.getStorageSync('cate_list')

    var that = this;

 

    if (cate_list == '') {


      config.get_index_api.call(that, 1, function(data) {
	

        wx.setStorageSync('cate_list', data)
		


        that.setData({
          pic_list: img_url + data['cate'][0]['pic']['photos'][0]['url'],
          windowHeight: window_info.windowHeight,
          cate_list_cate_info: data['cate_info'],
          cate_btn_img: data['cate_btn_lits'],
          pic_list_list: data['cate'][0]['pic']['photos2'],

        });



      })

    } else {

      that.setData({
        pic_list: img_url + cate_list['cate'][0]['pic']['photos'][0]['url'],
        windowHeight: window_info.windowHeight,
        cate_list_cate_info: cate_list['cate_info'],
        cate_btn_img: cate_list['cate_btn_lits'],
        pic_list_list: cate_list['cate'][0]['pic']['photos2'],

      });

    }



  },
  open_map: function() {

    wx.openLocation({
      name: "西安温得姆酒店",
      address: "陕西省西安市雁塔区慈恩东路398号",
      latitude: 34.205999,
      longitude: 108.965972,
      scale: 17
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onPageScroll: function (e) {
    // console.log(e);//{scrollTop:99}
  },
  onShareAppMessage: function (res) {

    var cate_fx = wx.getStorageSync('cate_list')

    


    return {
      title: cate_fx['cate_fx'].title,
      imageUrl: cate_fx['cate_fx'].pic,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
})