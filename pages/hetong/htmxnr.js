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
    listData: [],
    ck: '罐区',
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
        name: '罐区',
        checked: true
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
              if (res.data != 0) {
                //添加成功修改提示
                wx.showToast({
                  title: '提交修改成功',
                  icon: 'success',
                  duration: 3000
                })
              } else {
                wx.showToast({
                  title: '提交修改失败,有可能字段不满足要求，或已经提交的不能重复，请检查！',
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
    let _listData = [];

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
    
    //从数据库获取该合同表体的所有信息
    wx.request({
      url: config.URL + '/gethtentry',
      method: 'POST',
      data: {
        htph: _htph
      },
      success: function (res) {   
        //console.log(res);   
        for (let i = 0; i < res.data.length; i++) {
          _listData.push(res.data[i]);
        }
        that.setData({
          listData: _listData
        })
      }
    })

    //从数据库获取该合同表头的所有信息
    wx.request({
      url: config.URL + '/gethtmx',
      method: 'POST',
      data: {
        htph: _htph
      },
      success: function(res) {
        for (let i = 0; i < res.data.length; i++) {
          _htmx.push(res.data[i]);
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
  //仓库选择
  ckchange: function(e) {
    this.setData({
      ck: e.detail.value
    })
  },
  //增加产品
  btnAdd: function(e) {
    let that = this;
    let cps = that.data.cps;
    let list = that.data.listData;
    let _cpid = that.data.cpId;
    let _sl = that.data.sl;
    let _dj = that.data.dj;
    let _je = that.data.je;
    let _ck = that.data.ck;

    list.push({
      id: cps[_cpid],
      cpname: cps[_cpid],
      Model: cps[_cpid],
      sl: _sl,
      dj: _dj,
      je: _je,
      ck: _ck
    });
    that.setData({
      listData: list,
    })
  },
  //删除选项
  deleteIitems(e) {
    let idx = e.currentTarget.dataset.idx
    let list = this.data.listData
    let filterRes = list.filter((ele, index) => {
      return index != idx
    })
    this.setData({
      listData: filterRes
    })
  },

  //数量输入
  slchange: function(e) {
    let that = this;
    let _sl = e.detail.value;
    let sl = that.data.sl;
    let dj = that.data.dj;
    let je = that.data.je;
    that.setData({
      sl: _sl
    })
    that.setData({
      je: _sl * dj
    })

  },

  //单价输入
  djchange: function(e) {
    let that = this;
    let _dj = e.detail.value;
    let sl = that.data.sl;
    let dj = that.data.dj;
    let je = that.data.je;
    that.setData({
      dj: _dj
    })
    that.setData({
      je: sl * _dj
    })
  },

})