// pages/hetong/hetong.js
var config = require('../../utils/config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    URL: config.URL,
    htph: '',
    htmx: [],
    xsdbs: [],
    cps: [],
    crtime: '',
    xsdbId: 0,
    cpId: 0,
    sl: '',
    dj: '',
    je: 0,
    winWidth: 0,
    winHeight: 0,
    items: [{
        name: '装置',
        checked: false
      },
      {
        name: '仓库',
        checked: false
      },
      {
        name: '外仓',
        checked: false
      },
    ],
    thitems: [{
        name: '发货',
        checked: false,
      },
      {
        name: '自提',
        checked: false,
      },
    ],
    //input的值
    htphvalue: '',
    khmc: '',
    bzyq: '',
    htqx: '',
    shdz: '',
    shr: '',
    shrdh: '',
    bz: '',
    sl: '',
    dj: '',
    je: 0,
  },

  //提交按钮
  formSubmit: function(e) {
    let that=this;
    wx.showModal({
      title: '提示',
      content: '确定要提交吗？',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了提交 
          wx.request({
            url: config.URL + '/givechecktj2',
            method: 'POST',
            data: {
              htph:that.data.htph,
              crtime:that.data.htph
            },
            success: function(res) {
              if (res.data != 0) {
                //添加成功修改提示
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 3000
                })
              } else {
                wx.showToast({
                  title: '提交失败,请检查！',
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
  chehui: function() {
    let that = this;
    let _htph = that.data.htph;  
    wx.showModal({
      title: '提示',
      content: '确定要撤回吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了撤回
          wx.request({
            url: config.URL + '/givecheckch2',
            method: 'POST',
            data: {
              htph:_htph
            },
            success: function (res) {
              if (res.data != 0) {
                //添加撤回修改提示
                wx.showToast({
                  title: '撤回成功',
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

  //作废按钮
  zuofei: function () {
    let that = this;
    let _htph = that.data.htph;
    wx.showModal({
      title: '提示',
      content: '确定要作废吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定
          wx.request({
            url: config.URL + '/givecheckzf2',
            method: 'POST',
            data: {
              htph: _htph
            },
            success: function (res) {
              if (res.data != 0) {
                //添加修改提示
                wx.showToast({
                  title: '作废成功',
                  icon: 'success',
                  duration: 3000
                })
              } else {
                wx.showToast({
                  title: '作废失败！',
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

  //单据初始化
  onLoad: function(res) {
    var that = this;
    let _htph = res.htph;
    let _xsdbs = [];
    let recps = [];
    let crtime = that.data.crtime;
    let _htmx = [];

    //将单据编号写入data
    that.setData({
      htph:res.htph
    });

    //初始化日期
    var date = new Date();
    var myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    that.setData({
      crtime: myDate
    })

    //从数据库获取销售代表
    wx.request({
      url: config.URL + '/getxsdb',
      success: function(res) {
        for (let i = 0; i < res.data.length; i++) {
          _xsdbs.push(res.data[i].name);
        }
        that.setData({
          xsdbs: _xsdbs
        });
      }
    })
    //从数据库获取产品
    wx.request({
      url: config.URL + '/getcp',
      success: function(res) {
        for (let i = 0; i < res.data.length; i++) {
          recps.push(res.data[i].name);
        }
        that.setData({
          cps: recps
        });
      }
    })

    //从数据库获取该合同的所有信息
    wx.request({
      url: config.URL + '/gethtmx',
      data: {
        htph: _htph
      },
      success: function(res) {
        for (let i = 0; i < res.data.length; i++) {
          _htmx.push(res.data[i]);
        }
        //修改提货方式checked
        let _thitems = that.data.thitems;
        if (_htmx[0]["fhfs"] == "发货") {
          _thitems[0]["checked"] = true;
          _thitems[1]["checked"] = false;
        } else {
          _thitems[0]["checked"] = false;
          _thitems[1]["checked"] = true;
        }

        //修改仓库的checked
        let _items = that.data.items;
        switch (_htmx[0]["ck"]) {
          case "装置":
            _items[0]["checked"] = true;
            _items[1]["checked"] = false;
            _items[2]["checked"] = false;
            break;
          case "仓库":
            _items[0]["checked"] = false;
            _items[1]["checked"] = true;
            _items[2]["checked"] = false;
            break;
          default:
            _items[0]["checked"] = false;
            _items[1]["checked"] = false;
            _items[2]["checked"] = true;
            break;
        }
        //设置销售代表的xsdbId
        let _xsdbId = 0;
        wx.request({
          url: config.URL + '/getxsdbid',
          data: {
            xsdb: _htmx[0]["xsdb"]
          },
          success: function(res) {
            _xsdbId = res.data;
            that.setData({
              xsdbId: _xsdbId
            })
          }
        })

        //获取产品cpId
        let _cpId = 0;
        wx.request({
          url: config.URL + '/getcpid',
          data: {
            cpname: _htmx[0]["cpname"]
          },
          success: function(res) {
            _cpId = res.data;
            that.setData({
              cpId: _cpId
            })
          }
        })

        //设置data数据
        that.setData({
          htmx: _htmx,
          thitems: _thitems,
          items: _items,
        });
      }
    })

    /**
     * 获取系统信息
     */
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