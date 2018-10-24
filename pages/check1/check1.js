// pages/newadd/newadd.js
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: config.URL,
    winWidth: 0,
    winHeight: 0,
    xsdb: '',
    htph: '',
    khmc: '',
    bzyq: '',
    htqx: '',
    shdz: '',
    shr: '',
    shrdh: '',
    bz: '',
    fhfs: '',
    ck: '',
    cpname: '',
    sl: '',
    dj: '',
    je: 0,
  },


  onLoad: function() {
    var that = this;
    let _xsdb, _htph, _khmc, _bzyq, _htqx, _shdz, _shr;
    let _shrdh, _bz, _fhfs, _ck, _cpname, _sl, _dj, _je;
    //获取单据信息（数据）
    wx.request({
      url: config.URL + '/getchesj1',
      success: function(res) {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          _xsdb = res.data[i].xsdb;
          _htph = res.data[i].htph;
          _khmc = res.data[i].khmc;
          _bzyq = res.data[i].bzyq;
          _htqx = res.data[i].htqx;
          _shdz = res.data[i].shdz;
          _shr = res.data[i].shr;
          _shrdh = res.data[i].shrdh;
          _bz = res.data[i].bz;
          _fhfs = res.data[i].fhfs;
          _ck = res.data[i].ck;
          _cpname = res.data[i].cpname;
          _sl = res.data[i].sl;
          _dj = res.data[i].dj;
          _je = res.data[i].je;
        }
        that.setData({
          xsdb: _xsdb,
          htph: _htph,
          khmc: _khmc,
          bzyq: _bzyq,
          htqx: _htqx,
          shdz: _shdz,
          shr: _shr,
          shrdh: _shrdh,
          bz: _bz,
          fhfs: _fhfs,
          ck: _ck,
          cpname: _cpname,
          sl: _sl,
          dj: _dj,
          je: _je,
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