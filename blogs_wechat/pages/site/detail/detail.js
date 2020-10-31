const wxRequest = require('.././../../utils/request.js');
Page({
  data: {
    isCollection: 2,
    modal8: false,
    show: 2,
  },
  onLoad: function (options) {
    this.setData({
      title: options.title,
      source: options.source,
      author: options.author,
      created_at: options.created_at,
      collection: options.collection,
      siteUrl: options.siteUrl,
      show: options.show,
      id: options.id
    });
    this.getSiteDetail(options.id);
  },
  /**
   * 查询站点详情
   * @param string id 站点id 
   */
  getSiteDetail: function (id) {
    var that = this;
    wxRequest.getRequest('v1/site/detail', { id: id }, function (res) {
      let detail = res.detail;
      let content = detail.content.replace(/\"/gi, "'");
      content = content.replace(/\<img/gi, "<img class='rich-img'");
      that.setData({
        content: content,
        show: detail.public_is_show,
        public_cover: detail.public_cover,
        public_name: detail.public_name,
        public_number: detail.public_number,
        isCollection: res.collection
      });

    });
  },
  collection: function () {
    let that = this;
    if (this.data.isCollection == 2) {
      wxRequest.postRequest('v1/site/collection', { site_id: this.data.id }, function (res) {
        that.setData({
          isCollection: 1
        });
      }, 1);
    }
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
  copyUrl(e) {
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
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onShareTimeline: function (e) {
  },
})