const util = require('../../../utils/util.js')
const wxRequest = require('.././../../utils/request.js');
Page({
  data: {
    fabulous: 123,
    isFabulous: false,
    isCollection: false,
    modal8: false,
    id: 0,
    show: 2,
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id,
      title: options.title,
    })
    wx.setNavigationBarTitle({
      title:options.title,
    })
    this.getArticle()
  },
  onShow: function () {
    var that = this;
    that.articleRead();
  },
  btnFabulous: function () {
    this.setData({
      fabulous: this.data.isFabulous ? 123 : 124,
      isFabulous: !this.data.isFabulous
    });
    this.articleClick();
  },
  getArticle: function () {
    var that = this;
    wxRequest.getRequest('v1/common/article/detail', { id: that.data.id }, function (res) {
      res.content = res.content.replace(/\<img/gi, '<img class="rich-img" ');
      that.setData({
        content: res,
        show: res.show,
        title: res.second_title,
      });
    });
  },
  articleClick: function () {
    wxRequest.postRequest('v1/common/article/click', { id: this.data.id }, function (res) {
    });
  },
  articleRead: function () {
    wxRequest.postRequest('v1/common/article/read', { id: this.data.id }, function (res) {
    });
  },
  copywx: function (e) {
    let number = e.currentTarget.dataset.number;
    wx.setClipboardData({
      data: number,
      success(res) {
        wx.showToast({
          title: '复制成功',
          icon: "none",
        });
      }, error: function () {
        wx.showToast({
          title: '复制失败',
          icon: 'none',
        });
      }
    })
  },
  saveFile: function (e) {
    let img = e.currentTarget.dataset.img;
    wx.previewImage({
      current: img, 
      urls: [img]
    })
  },
  hide8() {
    this.setData({
      modal8: false
    })
  },
  show8() {
    this.setData({
      modal8: true
    })
  },
  copyUrl(e){
      let url = e.currentTarget.dataset.url;
      wx.setClipboardData({
        data: url,
        success(res) {
          wx.showToast({
            title: '复制成功',
            icon: "none",
          });
        }, error: function () {
          wx.showToast({
            title: '复制失败',
            icon: 'none',
          });
        }
      })
  },
  collection: function () {
    this.setData({
      isCollection: !this.data.isCollection
    }, () => {
      if (this.data.isCollection) {
        util.toast("收藏成功！");
      }
    })
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onShareTimeline: function (e) {
  },
})