const wxRequest = require('.././../../utils/request.js');
Page({
  data: {
    siteList: [],
    page: 1,
    size: 10,
    title: '',
    keyWord: '',
  },
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id: id,
      title: options.title,
    });
    wx.setNavigationBarTitle({
      title: options.title,
    });
    this.getSite(options.id);
  },
  detail: function (e) {
    let data = e.currentTarget.dataset;
    let source = data.source;
    let title = data.title;
    let author = data.author;
    let created_at = data.created_at;
    let collection = data.collection;
    let siteUrl = data.url;
    let id = data.id;
    wx.navigateTo({
      url: '/pages/site/detail/detail?title=' + title + '&source=' + source + '&author=' + author + '&created_at=' + created_at + '&collection=' + collection + '&siteUrl=' + siteUrl + '&id=' + id,
    });
  },
  /**
   * 查询站点列表
   * @param string id  站点分类id
   * @param int scene 1上拉|2下拉
   */
  getSite: function (id = '', scene = 1) {
    let that = this;
    let getParams = { id: id, page: this.data.page, size: this.data.size };
    if (this.data.keyWord != '') {
      getParams.title = this.data.keyWord;
    }
    wxRequest.getRequest('v1/site/list', getParams, function (res) {
      if (scene == 1) {
        that.setData({
          siteList: that.data.siteList.concat(res.items),
          page: res.page + 1,
          size: res.size,
        });
      } else {
        let arr = res.items.concat(that.data.siteList);
        that.setData({
          siteListL: arr,
          page: res.page + 1,
          size: res.size,
          show: res.show
        });
      }
    });
  },
  onReachBottom: function () {
    this.siteList(this.data.id, 2);
  },
  onPullDownRefresh: function () {
    this.getSite(this.data.id);
  },
  search: function (e) {
    let keyWord = e.detail.value;
    this.setData({
      page: 1,
      size: 10,
      siteList: [],
      keyWord: keyWord,
    });
    this.getSite(this.data.id);
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onShareTimeline: function (e) {
  },
})