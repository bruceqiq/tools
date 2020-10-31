const util = require('../../../utils/util.js')
Page({
  data: {
    danmuList: [{
      text: '非常棒！！！',
      color: '#ff0000',
      time: 3
    },
    {
      text: '不错哦~~~~',
      color: '#ff00ff',
      time: 3
    },
    {
      text: '超级厉害！',
      color: '#ff00ff',
      time: 5
    },
    {
      text: '无敌~',
      color: '#ff00ff',
      time: 5
    },
    {
      text: '很棒',
      color: '#ff00ff',
      time: 5
    },
    {
      text: '超赞！',
      color: '#ff00ff',
      time: 8
    },
    {
      text: '给力',
      color: '#ff00ff',
      time: 8
    },
    {
      text: 'thorui~~~~~',
      color: '#ff00ff',
      time: 10
    },
    {
      text: '给力~~~',
      color: '#ff00ff',
      time: 16
    },
    {
      text: '给力~~~',
      color: '#ff00ff',
      time: 20
    },
    {
      text: 'thorui~~~~~',
      color: '#ff00ff',
      time: 30
    },
    {
      text: 'thorui~~~~~',
      color: '#ff00ff',
      time: 50
    },
    {
      text: 'thorui~~~~~',
      color: '#ff00ff',
      time: 50
    }
    ],
    fabulous: 123,
    isFabulous: false,
    isCollection: false,
    show: 2,
  },
  onLoad: function (options) {
    this.setData({
      videoUrl: options.videoUrl,
      source: options.source,
      shareNumber: options.playNumber,
      title: options.title,
      videoSource: options.videoSource,
      show: options.show,
    });
    wx.setNavigationBarTitle({
      title: options.title,
    });
  },
  btnFabulous: function () {
    this.setData({
      fabulous: this.data.isFabulous ? 123 : 124,
      isFabulous: !this.data.isFabulous
    })
  },
  onShareAppMessage: function(e){
  },
  onShareTimeline: function (e) {
  },
})