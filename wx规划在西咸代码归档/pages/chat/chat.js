// pages/chat/chat.js
var config = require('../../utils/config.js');
var img_url = config.img_url;
var text = "";
var user_list_arr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userinfo_flag: false,
    text: text,
    scroll_top:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var window_info = wx.getStorageSync('dev_info');
    var userInfo_name = wx.getStorageSync('userInfo_name');
    var that = this;


    if (window_info==""){

      wx.getSystemInfo({
        success: function (res) {


          console.log(res.windowHeight)
          
          that.setData({

            windowHeight: res.windowHeight,


          });


          wx.setStorageSync('dev_info', res)

        },
      })


      

    }else{


      that.setData({

        windowHeight: window_info.windowHeight,


      });



    }
  
    this.get_usr_mgs();



    if (userInfo_name==''){


      that.setData({

        userinfo_flag: false,


      });

    }else{

      that.setData({

        userinfo_flag: true,


      });

    }

  


 

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  bindinput: function(e) {

    //console.log(e.detail.value)

    text = e.detail.value
  },

  /**
   * 生命周期函数--监听页面显示
   */
  subit: function() {


    var that = this;
    if (text == '') {



      wx.showToast({
        title: "请输入你想说的话！",
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else {

      var userInfo_name = wx.getStorageSync('userInfo_name');

      var openid = wx.getStorageSync('openid');

      var userInfo_avatarUrl = wx.getStorageSync('userInfo_avatarUrl');


      var data = {
        'openid': openid,
        'userInfo_avatarUrl': userInfo_avatarUrl,
        'text': text,
        'userInfo_name': userInfo_name
      }

      config.send_data.call(that, data, function(data) {

        if (data == 1) {

          wx.showToast({
            title: "提交成功",
            icon: 'none',
            mask: true,
            duration: 2000
          })

          text="";

          that.setData({

            text: "",


          });

          that.get_usr_mgs();


        }

      })


    }


    console.log(text)
  },

  get_usr_mgs:function(){

    var that = this;

    var openid = wx.getStorageSync('openid');
 

    var data = {
      'openid': openid,
      'pagenum': 200,
    
    }


    config.get_data.call(that, data, "get_user_msg", function (data) {

      user_list_arr = data
      that.setData({

        user_list: data,
        scroll_top:0


      });

    })

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  //用户信息数据
  onGotUserInfo: function(e) {


    var res = e.detail;
    var that = this

    if (res.errMsg == "getUserInfo:ok") {

      that.setData({

        userinfo_flag: true,

      });

      wx.showTabBar()
      wx.setStorageSync('userInfo_name', res.userInfo.nickName)
      wx.setStorageSync('userInfo_avatarUrl', res.userInfo.avatarUrl)


    }



  },

  /**
   * 生命周期函数--监听页面卸载
   */
  user_zan: function(e) {


    var that = this


    var key = e.currentTarget.dataset.key

    var id = e.currentTarget.dataset.id

    var openid = wx.getStorageSync('openid');


    var data = {
      'openid': openid,
      'm_id': id
    }

    config.get_data.call(that, data, "msg_zan", function(data) {




      if (data == 1) {

        user_list_arr[key]['zan'] = user_list_arr[key]['zan'] + 1;
        user_list_arr[key]['zan_start'] = -1;


        that.setData({

          user_list: user_list_arr,

        });


      }

    })




  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }

  
})