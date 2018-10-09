// pages/newadd/newadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    khname: '厦门海立德新材料有限公司',
    prInput: '',
    khInput: '',
    Remarks: '',
    winWidth: 0,
    winHeight: 0,
    selProData: [],
    sla: "",
    // tab切换
    currentTab: 0,
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
        name: 'paid',
        value: '已付',
        checked: 'true'
      },
      {
        name: 'unpaid',
        value: '未付',        
      },
      {
        name: 'partpaid',
        value: '部分付'
      },
      
    ],

  },

  radioChange: function(e) {

  },

  onLoad: function() {
    var that = this;
    var proData0 = [{
      "id": 2,
      "slid": 11,
      "djid": 12,
      "PrName": "改性醇胺",
      "Model": "规格10",
      "price": 2500,
    }, {
      "id": 2,
      "slid": 11,
      "djid": 12,
      "PrName": "复性醇胺",
      "Model": "规格11",
      "price": 2500,
    }, {
      "id": 3,
      "slid": 11,
      "djid": 12,
      "PrName": "复性醇胺",
      "Model": "规格12",
      "price": 2600,
    }, ]
    that.setData({
      selProData: proData0
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