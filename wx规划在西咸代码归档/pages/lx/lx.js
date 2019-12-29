var config = require('../../utils/config.js');
var img_url = config.img_url;
var WxParse = require('../../wxParse/wxParse.js');
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },


  onLoad: function () {
    // var id = 14;
    var that = this;

    config.get_info.call(that, 14, function (data) {


      WxParse.wxParse('article', 'html', data.post_content, that, 5);

    })
	config.get_info.call(that, 15, function (data) {
	
	
	  WxParse.wxParse('articles', 'html', data.post_content, that, 5);
	
	})

  },

  
})
