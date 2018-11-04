// pages/hetong/htmingxi.js
var config = require('../../utils/config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    URL: config.URL,
    phinput: '',
    mcinput: '',
    arrsjmx: [],
    radata: 'db',
    items: [{
        name: 'db',
        value: '待办',
        checked: true
      },
      {
        name: 'yb',
        value: '已办(500)',
        checked: false
      },
    ]
  },

  //到明细页面
  tomingxi: function(e) {
    let _htph = '';
    _htph = e.currentTarget.dataset.htph
    wx.navigateTo({
      url: 'check1nr?htph=' + _htph,
    })
  },

  //查询按钮
  btncs: function(e) {
    let that = this;
    let _items = that.data.items;
    let _radata = that.data.radata;
    let _phinput = that.data.phinput;
    let _mcinput = that.data.mcinput;   
    if (_radata == 'db') {
      //从数据库获取待办合同单据      
      that.gethtxi(1,_phinput,_mcinput);
    } else {
      //从数据库获取已办合同单据
      that.gethtxi(2,_phinput, _mcinput);
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //从数据库获取待办单据
    let that = this;
    that.gethtxi(1,'','');
  },

  gethtxi: function(n, m, k) {
    let that = this;
    let _arrsjmx = []; 
    wx.request({
      url: config.URL + '/getshsjmx1',
      data: {
        lc: n,
        htph: m,
        khmc: k,
      },
      success: function(res) {
        for (let i = 0; i < res.data.length; i++) {
          _arrsjmx.push(res.data[i]);
        }
        that.setData({
          arrsjmx: _arrsjmx
        });
      }
    })
  },

  //radio改变修改的值
  radioChange: function(e) {
    let that = this;
    let _radata = e.detail.value;
    that.setData({
      radata: _radata
    })
  },

  //获取合同编号input的值
  phinput: function(e) {
    this.setData({
      phinput: e.detail.value
    })
  },

  //获取客户名称input的值
  mcinput: function (e) {
    this.setData({
      mcinput: e.detail.value
    })
  },

})