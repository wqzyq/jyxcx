// pages/hetong/htmingxi.js
var config = require('../../utils/config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    URL: config.URL,
    items: [{
        name: 'db',
        value: '待办',
        checked: 'true'
      },
      {
        name: 'yb',
        value: '已办(500)'
      },
    ]
  },


btncs:function(){

},
btnadd:function(){

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //从数据库获取产品
    wx.request({
      url: config.URL + '/getcp',
      success: function (res) {
        for (let i = 0; i < res.data.length; i++) {
          recps.push(res.data[i].name);
        }
        that.setData({
          cps: recps
        });
      }
    })
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