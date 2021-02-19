const wxRequest = require('.././../../utils/request.js');
Page({
  data: {
    current: -1,
  },
  onLoad: function (options) {
      this.getResume();
      this.getCollege();
      this.getWork();
      this.getProject();
  },
  getResume: function () {
      let that = this;
      wxRequest.getRequest("v1/site/resume/detail", {}, function(res){
          that.setData({
            resume:res
          });
      });
  },
  getCollege: function () {
      let that = this;
      wxRequest.getRequest("v1/site/resume/college", {}, function(res){
        that.setData({
          college:res
        });
    });
  },
  getWork: function () {
    let that = this;
    wxRequest.getRequest("v1/site/resume/work", {}, function(res){
      that.setData({
        work:res
      });
    });
  },
  getProject: function () {
    let that = this;
    wxRequest.getRequest("v1/site/resume/project", {}, function(res){
      that.setData({
        project:res
      });
    });
  },
  change3(e) {
    //可关闭自身
    let index = e.detail.index
    this.setData({
      current: this.data.current == index ? -1 : index
    })
  },
  copy(e) {
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