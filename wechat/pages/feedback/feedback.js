const app = getApp();
const wxRequest = require('../../utils/request.js');
Page({
  data: {
    serverUrl: app.data.sourceUrl + 'file',
    imageData: [],
    strLen: 0,
    strMaxLen: 500,
    status: 1,
  },
  onLoad: function (options) {
  },
  // 文件选择成功
  result: function (e) {
    this.setData({
      imageData: e.detail.imgArr
    });
  },
  // 文件移除
  remove: function (e) {
    //移除图片
    let index = e.detail.index;
  },
  strLenListen: function (e) {
    var strLen = e.detail.value.length;
    this.setData({
      strLen: strLen,
    });
  },
  formSubmit: function (e) {
    var desc = e.detail.value.desc;
    var that = this;
    if (desc.length == 0) {
      wx.showToast({
        title: "反馈内容不能为空",
        icon: "none",
      });
    } else if (that.data.status == 2) {
      wx.showToast({
        title: "不能重复提交",
        icon: "none",
      });
    } else {
      var imgs = JSON.stringify(this.data.imageData);
      wxRequest.postRequest('v1/mini/user/feedbak/submit', { desc: desc, imgs: imgs }, function (result) {
        if (result.code == 1000) {
          that.setData({
            status: 2
          });
        }
      }, 1);
    }
  },  
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
});