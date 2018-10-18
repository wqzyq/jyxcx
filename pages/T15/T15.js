// pages/T15/T15.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cps: ['HPEG', 'HPEG水剂', 'TPEG水剂', 'DEIPA'],
    index: 0,
    listData: [{
        id: "01",
        prName: "改性醇胺",
        Model: "规格10"
      },
      {
        id: "02",
        prName: "复性醇胺",
        Model: "规格11"
      },
    ]
  },

  formSubmit: function(e) {
    wx.showModal({
      title: '提示',
      content: '确定要提交吗？',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          //console.log("用户点击了确定")
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })

        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    // var aaa=e.detail.value;
    // var arr=[];
    // for (var i in aaa){
    //   arr.push(aaa[i]);
    // }
    // console.log(aaa);
    // console.log(arr);

    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  //增加产品
  btntest: function() {
    let cps = this.data.cps;
    let list = this.data.listData;
    let index = this.data.index;
    list.push({
      id: cps[index],
      prName: cps[index],
      Model: cps[index],
    });
    this.setData({
      listData: list
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

  //改变Picker获得选择的index
  bindPickerChange: function(e) {
    let index = this.data.index;
    this.setData({
      index: e.detail.value
    })
    index = this.data.index;
  },









  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})