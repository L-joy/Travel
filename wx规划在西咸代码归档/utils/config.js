var url = 'https://zhixun.mobi/minapp_admin/public';
var obj_dir ="/xicity/api/";
 
 
 
 
function get_index_list(u_data, cb, fail_cb, data) {

  var that = this;
  
  wx.request({
    url: url + obj_dir + "get_wx_info_list",
    data: {
      data: u_data,
    },
    method: 'POST',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {

      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function () {

      wx.stopPullDownRefresh()
      typeof fail_cb == 'function' && fail_cb()
    }
  })

}
function get_index_api(u_data, cb, fail_cb, data) {

  var that = this;

  wx.request({
    url: url + obj_dir + "index",
    data: {
      data: u_data,
    },
    method: 'POST',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {

      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function () {

      wx.stopPullDownRefresh()
      typeof fail_cb == 'function' && fail_cb()
    }
  })

}

function send_data(u_data, cb, fail_cb, data) {

  var that = this;

  wx.request({
    url: url + obj_dir + "send_data",
    data: {
      data: u_data,
    },
    method: 'POST',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {

      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function () {

      wx.stopPullDownRefresh()
      typeof fail_cb == 'function' && fail_cb()
    }
  })

}


function get_data(u_data,action,cb, fail_cb, data) {

  var that = this;

  wx.request({
    url: url + obj_dir + action,
    data: {
      data: u_data,
    },
    method: 'POST',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {

      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function () {

      wx.stopPullDownRefresh()
      typeof fail_cb == 'function' && fail_cb()
    }
  })

}



function get_info(u_data, cb, fail_cb, data) {

  var that = this;

  wx.request({
    url: url + obj_dir + "get_wx_info",
    data: {
      id: u_data,
    },
    method: 'POST',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {

      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function () {

      wx.stopPullDownRefresh()
      typeof fail_cb == 'function' && fail_cb()
    }
  })

}


function get_index(u_data, cb, fail_cb, data) {

  var that = this;

  wx.request({
    url: url + obj_dir + "index",
    method: 'POST',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {

      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function () {

      wx.stopPullDownRefresh()
      typeof fail_cb == 'function' && fail_cb()
    }
  })

}



 
module.exports = {
  img_url: url + "/upload/",
  req_url: url,
  get_index_list: get_index_list,
  get_info: get_info,
  get_index: get_index,
  get_index_api: get_index_api,
  send_data: send_data,
  get_data: get_data
  
  
}