let globalData = getApp().globalData;
const util = require('../../utils/util.js')
Page({
  data: {
    nickname: '',
    avatar: '',
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    var nickname = wx.getStorageSync('nickname');
    var avatar = wx.getStorageSync('avatar');
    that.setData({
      nickname: nickname,
      avatar: avatar,
    });
  },
  tapEvent: function (e) {
    let index = e.currentTarget.dataset.index;
    let url = "";
    if (index == 1) {
      url = '/pages/feedback/feedback'
    } else if (index == 2) {
      let key = e.currentTarget.dataset.key;
      url = '/pages/maps/maps?key=' + key
    } else {
      wx.showToast({
        title: '努力开发中...',
        icon: "none",
      });
      url = "/";
    }
    wx.navigateTo({
      url: url
    })
  },
  previewReward: function () {
    wx.previewImage({
      urls: ["https://youpaiyun.qqdeveloper.com/wx_reward.jpeg"]
    })
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onShareTimeline: function (e) {
  },
})