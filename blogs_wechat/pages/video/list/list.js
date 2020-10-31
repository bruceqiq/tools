const utils = require('../../../components/utils/utils');
const wxRequest = require('.././../../utils/request.js');
Page({
  data: {
    hotSearch: [
      "早安D站",
      "2019退役球星",
      "卡拉斯科"
    ],
    banner: [{
      img: "banner_1.jpg",
      title: "山东官方：德尔加多已完成全部手续办理，具备上场比赛资格"
    }, {
      img: "banner_2.jpg",
      title: "这个世界上，或许没有真正的托黑"
    }, {
      img: "banner_3.jpg",
      title: "金童再见！西班牙前锋托雷斯宣布退役"
    }],
    title: '',
    newsList: [],
    page: 1,
    size: 10,
    loadding: false,
    pullUpOn: true
  },
  onLoad: function (options) {
    this.getVideo();
    this.getBanner();
  },
  getBanner: function () {
    var that = this;
    wxRequest.getRequest("v1/common/banner/list", { position: 4 }, function (res) {
      that.setData({
        banner: res.items
      });
    });
  },
  /**
   * 获取视频数据
   * @param {*} scene 1上拉刷新|2下拉刷新
   */
  getVideo: function (scene = 1,title = '') {
    let that = this;
    title == '' ? (this.data.title) : title = title;
    wxRequest.getRequest('common/v1/video/list', { page: this.data.page, size: this.data.size,title:title }, function (res) {
      if (scene == 1) {
        that.setData({
          newsList: that.data.newsList.concat(res.items),
          page: res.page + 1,
          size: res.size
        });
      } else {
        that.setData({
          newsList: res.items.concat(that.data.newsList),
          page: res.page + 1,
          size: res.size
        });
      }
      that.showTotal(res.items.length);
    });
  },
  /**
   * 显示刷新条数
   * @param {*} number 
   */
  showTotal: function (number = 10) {
    let options = {
      msg: "刷新成功，为你更新了" + number + "条数据",
      duration: 2000,
      type: "translucent"
    };
    setTimeout(() => {
      utils.toast(options);
    }, 300);
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    this.getVideo(2);
    wx.stopPullDownRefresh()
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {

  },
  search: function (e) {
    this.setData({
      newsList:[],
      page:1,
      size:10,
      title:e.detail.value,
    });
    this.getVideo(0, e.detail.value);
  },
  bannerDetail: function () {
    wx.navigateTo({
      url: '../newsDetail/newsDetail'
    });
  },
  onShareAppMessage: function (e) {
  },
  onShareTimeline: function (e) {
  },
})