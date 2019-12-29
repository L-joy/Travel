Page({

  /**
   * 页面的初始数据
   */
  data: { 
	  isShowpart1:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
	  console.log(e.id)
	  if(e.id === '1'){
		  this.setData({
			  isShowpart : 1
		  })
	  }else if(e.id === '2'){
		  this.setData({
			  isShowpart : 2
		  })
	  }else if(e.id === '3'){
		  this.setData({
			  isShowpart : 3
		  })
	  }else if(e.id === '4'){
		  this.setData({
			  isShowpart : 4
		  })
	  }
	  console.log(this.isShowpart)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  bindinput: function(e) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  subit: function() {


  },

  get_usr_mgs:function(){


  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  //用户信息数据
  onGotUserInfo: function(e) {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  user_zan: function(e) {


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