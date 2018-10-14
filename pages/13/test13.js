// pages/13/test13.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr1: [
      {
        id:1,
        name:"汽油",
        gg:"95#"
      },
      {
        id:2,
        name:"柴油",
        gg:"0#"
      },
      {
        id:3,
        name:"非标汽油",
        gg:"90#"
      }
    ],
    arr2: [],
    selDataId: [],  
    da01: "01",
  },

  toindex: function() {
    wx.navigateTo({
      url: '../14/test14',
    })
  },
  chkChange: function(e) {
    let that = this;
    let id, name, gg;    
    let selDataId = that.data.selDataId;
    let index;
    console.log(e);
    if (e.detail.value.length == 1) {
      id = parseInt(e.currentTarget.dataset.id);
      selDataId.push(id);
      console.log(selDataId);
    } else {   
      id = parseInt(e.currentTarget.dataset.id);
      index = selDataId.indexOf(id);
      selDataId.splice(index, 1);
      console.log(selDataId);
    }
 
  },

  formSubmit: function(e) {
    var that = this;
    console.log(e);
    var formData = e.detail.value;
    let bb = that.data.bb;
    that.setData({
      bb: formData
    })
    console.log(e.detail.value);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let cc = that.data.cc;
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