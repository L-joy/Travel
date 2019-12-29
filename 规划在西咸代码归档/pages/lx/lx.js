var config = require('../../utils/config.js');
var img_url = config.img_url;
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    userInfo: {},
    userinfo_flag: false,
    img_url: img_url,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  index_go_page: function (e) {

    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../info/info?id=' + e.currentTarget.dataset.id
    })
  },
  go_game: function (e) {

     
    wx.navigateTo({
      url: '../web/web'
    })
  },
  onPageScroll: function (e) {
    // console.log(e);//{scrollTop:99}
  },
  onLoad: function () {

 
    wx.pageScrollTo({
      scrollTop: 80,
      duration: 1500
    })
 
    //系统信息
    var window_info = wx.getStorageSync('dev_info')
    var cate_list = wx.getStorageSync('cate_list')
    var userInfo_name = wx.getStorageSync('userInfo_name');
    var that = this;
	console.log(cate_list)

   

    if (userInfo_name == '') {


      that.setData({

        userinfo_flag: false,


      });

    } else {

      that.setData({

        userinfo_flag: true,


      });

    }



    var that = this;


    if (cate_list == '') {


      config.get_index_api.call(that, 1, function (data) {


        wx.setStorageSync('cate_list', data)


        that.setData({

          pic_list: img_url + data['cate'][1]['pic']['photos'][0]['url'],
          windowHeight: window_info.windowHeight,
          cate_list_cate_info: data['cate_info'],
          cate_btn_img: data['cate_btn_lits'],
		 

        });



      })

    } else {


      that.setData({
        pic_list: img_url + cate_list['cate'][1]['pic']['photos'][0]['url'],
        windowHeight: window_info.windowHeight,
        cate_list_cate_info: cate_list['cate_info'],
        cate_btn_img: cate_list['cate_btn_lits'],
		

      });
	 

    }

 




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



  }
})
