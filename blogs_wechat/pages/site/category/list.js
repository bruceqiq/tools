const wxRequest = require('.././../../utils/request.js');
const functions = require('.././../../utils/function.js');
const app = getApp();
Page({
  data: {
    tabbar: ["推荐分类", "进口超市", "国际名牌", "奢侈品", "海囤全球", "男装", "女装", "男鞋", "女鞋", "钟表珠宝", "手机数码", "电脑办公", "家用电器", "玩具乐器", "运动户外", "宠物生活", "特产馆"],
    menuHeight: "", //菜单高度
    currentTab: 0, //预设当前项的值
    scrollTop: 0 //tab标题的滚动条位置
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          menuHeight: res.windowHeight - res.windowWidth / 750
        });
      }
    });
    this.getSiteCategory();
    this.getBanner();
  },
  // 获取站点分类
  getSiteCategory: function () {
    var that = this;
    wxRequest.getRequest('v1/site/category/first/list', {}, function (res) {
      that.setData({
        menuList: res,
      });
    });
  },
  getBanner: function () {
    let that = this;
    functions.getBanner(5, function (res) {
      that.setData({
        banner: res.items
      });
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    let cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      wx.pageScrollTo({
        scrollTop: 0
      });
      this.setData({
        currentTab: cur
      })
      this.checkCor();
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    let that = this;
    //这里计算按照实际情况进行修改，动态数据要进行动态分析
    //思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
    //数据很多可以多次if判断然后进行滚动距离计算即可
    if (that.data.currentTab > 7) {
      that.setData({
        scrollTop: 500
      })
    } else {
      that.setData({
        scrollTop: 0
      })
    }
  },
  productList(e) {
    let key = e.currentTarget.dataset.key;
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/site/list/list?id=' + key + '&title=' + title,
    })
  },
  // 跳转
  redirect(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },
  onShareAppMessage: function () {

  },
  onShareTimeline: function (e) {
  },
})