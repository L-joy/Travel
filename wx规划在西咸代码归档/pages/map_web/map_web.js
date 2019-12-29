// pages/map_web/map_web.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    if (options.id == 18) {


      this.setData({

        weburl: "https://zhixun.mobi/minisite/h5/xixian/"
      })

    } else if (options.id == 19) {

      this.setData({

        weburl: "https://zhixun.mobi/minisite/h5/xixian/index2.php"
      })

    } else if (options.id == 20) {

      this.setData({

        weburl: "https://zhixun.mobi/minisite/h5/xixian/index3.php"
      })

    } else if (options.id == 21) {

      this.setData({

        weburl: "https://zhixun.mobi/minisite/h5/xixian/index4.php"
      })

    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})