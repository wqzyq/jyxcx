//index.js
//获取应用实例
const app = getApp()
var template = require('../../template/template.js');

Page({
  data: {
    motto: 'Hello World',
    datas:[], 
    routers: [
      {
        name: '新增',
        url: '/pages/newadd/newadd',
        icon: '../../imgs/xinzeng.png',
        code: '10'
      },
      {
        name: '复核1',
        url: '/pages/check1/check1',
        icon: '../../imgs/fuhe1.png',
        code: '11'
      },
      {
        name: '复核2',
        url: '/pages/Course/course',
        icon: '../../imgs/fuhe2.png',
        code: '10'
      },
      {
        name: '选车',
        icon: '../../imgs/test1.png',
        code: '11'
      },
      {
        name: '车调',
        url: '/pages/Course/course',
        icon: '../../imgs/chediao.png',
        code: '10'
      },
      {
        name: '发货',
        icon: '../../imgs/fahuo.png',
        code: '11'
      },
      {
        name: '执行',
        url: '/pages/Course/course',
        icon: '../../imgs/zhixing.png',
        code: '10'
      },
      {
        name: '收货',
        icon: '../../imgs/shouhuo.png',
        code: '11'
      },
      {
        name: '知会',
        url: '/pages/Course/course',
        icon: '../../imgs/zhihui.png',
        code: '10'
      }
    ]

  },

 
  //获取远端信息  
  onLoad: function () {
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
  },

})