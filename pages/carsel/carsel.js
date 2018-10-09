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
    index: 0,
    logistics: ['茂名市长洲物流有限公司', '海南茂捷物流有限公司', '茂名市交投集团物流中心'],
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
        name: 'item0',
      value: '槽罐车',
        checked: 'true'
      },
      {
        name: 'item1',
        value: '平扳车',
      },
      {
        name: 'item2',
        value: '箱体车'
      },
      {
        name: 'item3',
        value: '普通货车'
      },
      {
        name: 'item4',
        value: '箱体车'
      },

    ],

  },

  radioChange: function(e) {

  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
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