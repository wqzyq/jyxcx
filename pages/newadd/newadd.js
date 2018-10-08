// pages/newadd/newadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    khname: '厦门海立德新材料有限公司',
    htInput: '',
    prInput:'',
    khInput: '',
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    listData: [{
        "PrName": "甲基烯丙醇聚氧乙烯醚（固体）",
        "Model": "规格11",
        "Number": "100",
        "price": "5000",
        "Money": "50000"
      },
      {
        "PrName": "甲基烯丙醇聚氧乙烯醚（液体）",
        "Model": "规格11",
        "Number": "100",
        "price": "5000",
        "Money": "50000"
      },
    ],
    selProData: [],
  },

  btnAdd: function(e) {
    this.setData({
      htInput: '',
      khInput: '',
    })
  },
  onLoad: function() {
    var that = this;
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

  chkChange: function (res) {
  },

  /**
   * 滑动切换tab
   */
  bindChange: function(e) {
    var that = this;
    var exp = e.detail.current;
    var proData = [{
      "PrName": "甲基烯丙醇聚氧乙烯醚（液体）",
      "Model": "规格11"
    }, {
        "PrName": "表面活性剂",
      "Model": "规格12"
      },{
        "PrName": "甲基烯丙醇聚氧乙烯醚（液体）",
        "Model": "规格13"
      },
    ];
    var proData1 = [{
      "PrName": "甲基烯丙醇聚氧乙烯醚（液体）1",
      "Model": "规格11"
    }, {
      "PrName": "甲基烯丙醇聚氧乙烯醚（液体）1",
      "Model": "规格12"
    }];
    that.setData({
      currentTab: exp
    });
    switch (exp) {
      case 0:
        that.setData({
          selProData: proData
        })
        break;
      case 1:
        that.setData({
          selProData: proData1
        })
        break;
    }

  },
  /**
   * 点击tab切换
   */
  swichNav: function(e) {

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

})