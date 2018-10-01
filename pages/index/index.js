//index.js
//获取应用实例
const app = getApp()
var template = require('../../template/template.js');

Page({
  data: {
    motto: 'Hello World',
    datas:[],   
  },

  getinfo:function(res){
    var datagi = [];
    var that=this;
    wx.request({      
      url: 'https://www.wqpeixun.com',
      data: {},
      method: 'POST',       
      success: function (res) {
        //console.log(res);
        for (var i=0;i<res.data.length;i++){
          datagi.push(res.data[i]);
        }
        that.setData({datas:datagi});
      }
    })
  },

  totest: function () {   
    wx.redirectTo({
      url: '../13/test13',
    })
  },

  totest14:function(){
    wx.navigateTo({
      url: '../14/test14',
    })
  },
  //获取远端信息
 
 
  onLoad: function () {
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
  },

})