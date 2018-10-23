// pages/hetong/hetong.js
var config = require('../../utils/config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    URL: config.URL,
    xsdbs: [],
    cps: [],
    crTime: '',
    xsdbId: 0,
    cpId: 0,
    sl: 0,
    dj: 0,
    je: 0,
    winWidth: 0,
    winHeight: 0,
    listData: [{
        "PrName": "改性醇胺",
        "Model": "规格10",
        "Number": "100",
        "price": "5000",
        "Money": "50000"
      },
      {
        "PrName": "复性醇胺",
        "Model": "规格11",
        "Number": "100",
        "price": "5000",
        "Money": "50000"
      },
    ],
    items: [{

        name: '装置',
        checked: 'true'
      },
      {
        name: '仓库',
      },
      {
        name: '外仓'
      },
    ],
    thitems: [{
        name: '发货',
        checked: 'true'
      },
      {
        name: '自提',
      },

    ],
  },

  //新增按钮
  btnAdd: function(e) {
    this.setData({
      htInput: '',
      khInput: '',
    })
  },

  //提交按钮
  formSubmit: function(e) {
    console.log(e);
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

  //单据初始化
  onLoad: function() {
    var that = this;
    let _xsdbs = [];
    let recps = [];
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