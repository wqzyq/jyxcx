// pages/hetong/hetong.js
var config = require('../../utils/config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    URL: config.URL,
    index: 0,
    xsdbs: [],
    cps: [],
    listData: [],
    ckName:'罐区',
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


  //新增按钮
  btnNew: function() {
    let that = this;
    that.setData({
      htph: '',
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
    })

  },

  //提交按钮
  formSubmit: function(e) {
    let _listData=this.data.listData;
    wx.showModal({
      title: '提示',
      content: '确定要提交吗？',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了提交 
          wx.request({
            url: config.URL + '/hetongadd',
            method: 'POST',
            data: {
              htsj: e.detail.value,
              listData:_listData
            },
            success: function(res) {
              console.log(res);
              if (res.data == 1) {
                //添加成功提示
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 3000
                })
              } else {
                wx.showToast({
                  title: '提交失败,有可能重复提交或者必填字段为空，请检查！',
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
    let crtime = that.data.crtime;
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
      ckName:e.detail.value
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
    let _ckName=that.data.ckName;

    list.push({
      id: cps[_cpid],
      prName: cps[_cpid],
      Model: cps[_cpid],
      sl: _sl,
      dj: _dj,
      je: _je,
      ckName:_ckName
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





})