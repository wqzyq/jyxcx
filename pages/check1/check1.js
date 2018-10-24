// pages/newadd/newadd.js
var config = require('../../utils/config.js');
Page({
  /*** 页面的初始数据 ***/
  data: {
    URL: config.URL,
    winWidth: 0,
    winHeight: 0,
    chetime1: '',
    xsdb: '',
    htph: '',
    khmc: '',
    bzyq: '',
    htqx: '',
    shdz: '',
    shr: '',
    shrdh: '',
    bz: '',
    fhfs: '',
    ck: '',
    cpname: '',
    sl: '',
    dj: '',
    je: 0,
  },
  //提交按钮
  formSubmit: function(e) {
    wx.showModal({
      title: '提示',
      content: '确定要提交吗？',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了提交 
          wx.request({
            url: config.URL + '/givechesj1',
            method: 'POST',
            data: {
              htsj: e.detail.value
            },
            success: function(res) {
              if (res.data == 1) {
                //添加成功提示
                wx.showToast({
                  title: '提交成功!',
                  icon: 'success',
                  duration: 3000
                })
              } else {
                wx.showToast({
                  title: '提交失败！',
                  icon: 'none',
                  duration: 3000
                })
              }
            }
          })
        } else if (sm.cancel) {
          //用户点击了取消
        }
      }
    })
  },

  //撤回按钮
  btnCh: function() {
    let that=this;
    wx.showModal({
      title: '提示',
      content: '确定要撤回吗？',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了撤回 
          wx.request({
            url: config.URL + '/givechech1',
            method: 'POST',
            data: {
             htph:that.data.htph
            },
            success: function(res) {              
              if (res.data == 1) {
                //撤回成功提示
                wx.showToast({
                  title: '撤回成功!',
                  icon: 'success',
                  duration: 3000
                })
              } else {
                wx.showToast({
                  title: '撤回失败！',
                  icon: 'none',
                  duration: 3000
                })
              }
            }
          })
        } else if (sm.cancel) {
          //用户点击了取消
        }
      }
    })
  },


  onLoad: function() {
    var that = this;
    //获取提交时间
    var date = new Date();
    var myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    that.setData({
      chetime1: myDate
    })
    //获取单据信息（数据）
    wx.request({
      url: config.URL + '/getchesj1',
      success: function(res) {
        that.setData({
          xsdb: res.data[0].xsdb,
          htph: res.data[0].htph,
          khmc: res.data[0].khmc,
          bzyq: res.data[0].bzyq,
          htqx: res.data[0].htqx,
          shdz: res.data[0].shdz,
          shr: res.data[0].shr,
          shrdh: res.data[0].shrdh,
          bz: res.data[0].bz,
          fhfs: res.data[0].fhfs,
          ck: res.data[0].ck,
          cpname: res.data[0].cpname,
          sl: parseFloat(res.data[0].sl).toFixed(2),
          dj: parseFloat(res.data[0].dj).toFixed(2),
          je: parseFloat(res.data[0].je).toFixed(2),
        });
      }
    })

    /*** 获取系统信息  ***/
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },


})