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
    wx.showModal({
      title: '提示',
      content: '确定要提交吗？',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了提交 
          wx.request({
            url: config.URL + '/givehtxg',
            method: 'POST',
            data: {
              htsj: e.detail.value
            },
            success: function(res) {
              if (res.data !=0 ) {
                //添加成功修改提示
                wx.showToast({
                  title: '提交修改成功',
                  icon: 'success',
                  duration: 3000
                })
              } else {
                wx.showToast({
                  title: '提交修改失败,请检查！',
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
  //数量输入
  slchange: function(e) {
    let that = this;
    let _sl = e.detail.value;
    let _htmx = that.data.htmx;
    for (let i = 0; i < _htmx.length; i++) {
      _htmx[i]["sl"] = _sl;
      _htmx[i]["je"] = _htmx[i]["dj"] * _htmx[i]["sl"]
    }
    that.setData({
      htmx: _htmx
    })
  },

  //单价输入
  djchange: function(e) {
    let that = this;
    let _dj = e.detail.value;
    let _htmx = that.data.htmx;
    for (let i = 0; i < _htmx.length; i++) {
      _htmx[i]["dj"] = _dj;
      _htmx[i]["je"] = _htmx[i]["dj"] * _htmx[i]["sl"]
    }
    that.setData({
      htmx: _htmx
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

  //销售代表Id
  bindPickerChange: function(e) {
    let xsdbId = this.data.xsdbId;
    this.setData({
      xsdbId: e.detail.value
    })
  },

  //产品Id
  cpPickerChange: function(e) {
    let cpId = this.data.cpId;
    this.setData({
      cpId: e.detail.value
    })
  },
})