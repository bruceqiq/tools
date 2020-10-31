const util = require('../../utils/util.js')
const wxRequest = require('../../utils/request.js');
Page({
  data: {
    click: 0,
    isFabulous: false,
    isCollection: false,
    loadding: false,
    id: '',
  },
  onLoad: function (options) {
    var that = this;
    that.aboutMe();
  },
  btnFabulous: function () {
    var that = this;
    that.setData({
      fabulous: this.data.isFabulous ? 123 : 124,
      isFabulous: !this.data.isFabulous
    });
    var id = that.data.id;
    if(id !=''){
      wxRequest.postRequest('v1/common/about/me/click', { id: id }, function (res) {
      });
    }
  },
  aboutMe: function () {
    var that = this;
    wxRequest.getRequest('v1/common/about/me/detail', {}, function (res) {
      that.setData({
        content: res.content,
        id: res.id,
        click: res.click
      });
    });
  },
  onShareAppMessage: function () {
  },
  onShareTimeline: function (e) {
  },
})