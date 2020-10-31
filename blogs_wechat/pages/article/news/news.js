const utils = require('../../../components/utils/utils');
const wxRequest = require('.././../../utils/request.js');
const app = getApp();
Page({
  data: {
    tabbar: [],
    banner: [],
    newsList: [],
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    pageIndex: 1,
    loadding: false,
    pullUpOn: true,
    size: 3,
    page: 1,
    count: 0,
    title:'',
  },
  onLoad: function () {
    let that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        let calc = res.windowHeight; //顶部脱离文档流了(- res.windowWidth / 750 * 100);
        that.setData({
          winHeight: calc
        });
      }
    });
    that.getCategory();
    that.getBanner();
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    let that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    let cur = e.currentTarget.dataset.current;
    let categoryId = e.currentTarget.dataset.id;
    this.setData({
      newsList: [],
      page: 1,
    });
    this.getArticleList(categoryId);
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
        categoryId: categoryId,
      })
    }
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    var that = this;
    if (!this.data.pullUpOn) return;
    this.setData({
      loadding: true
    }, () => {
      that.getArticleList(that.data.categoryId);
    });
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.getArticleList(that.data.categoryId);
    that.setData({
      pageIndex: 1,
      pullUpOn: true,
      loadding: false
    });
    wx.stopPullDownRefresh();
    that.showMessage(that.count);
  },
  showMessage: function (count = 0) {
    var message = "成功刷新" + count + "条新内容";
    if (count == 0) {
      message = "没有新内容可以刷新了";
    }
    let options = {
      msg: message,
      duration: 2000,
      type: "translucent"
    };
    setTimeout(() => {
      utils.toast(options);
    }, 300);
  },
  // category-list
  getCategory: function () {
    var that = this;
    wxRequest.getRequest("v1/article/category/list", { page: 1, size: 10 }, function (res) {
      that.getArticleList(res.items[0].id);
      that.setData({
        tabbar: res.items,
        categoryId:res.items[0].id,
      });
    });
  },
  // banner-list
  getBanner: function () {
    var that = this;
    wxRequest.getRequest("v1/common/banner/list", { position: 2 }, function (res) {
      that.setData({
        banner: res.items
      });
    });
  },
  // article-list
  getArticleList: function (categoryId = 0, title = '') {
    var that = this;
    (categoryId == 0) ? (categoryId = this.data.categoryId) : (categoryId = categoryId);
    (title == '') ? (title = this.data.title) : (title = title);
    wxRequest.getRequest("v1/common/article/list", { category_id: categoryId, page: that.data.page, size: that.data.size,title:title }, function (res) {
      var lists = that.data.newsList;
      var len = res.items.length;
      if (res.items.length != 0) {
        for (let i = 0; i < len; i++) {
          lists.unshift(res.items[i]);
        }
        that.setData({
          newsList: lists,
          page: res.page + 1,
          size: res.size,
          count: len,
          loadding: false,
        });
      }
    });
  },
  detail(e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/article/detail/detail?id=' + id + "&title=" + title,
    })
  },
  // 文章搜索
  search: function (e) {
    this.setData({
      newsList:[],
      page:1,
      size:10,
      title:e.detail.value,
    });
    this.getArticleList(0, e.detail.value);
  },
  // 跳转
  redirect(e){
    wx.navigateTo({
      url:e.currentTarget.dataset.url
    });
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onShareTimeline: function (e) {
  },
})