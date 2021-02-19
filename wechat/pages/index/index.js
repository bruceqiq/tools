const wxRequest = require('./../../utils/request.js')
const funct = require('../../utils/function')
const app = getApp();
Page({
    data: {
        banner: [],
        menu: [],
        current: 0,
        page: 1,
        size: 10,
        spotList: [],
        key: "OIXBZ-OGZWD-P4G4Z-PW4VS-NG5P7-HAFBI"
    },
    onLoad: function (options) {
        var that = this
        that.getBanner()
        that.getNotice()
        that.getMenu()
        that.location()
        that.getSite()
        funct.showLoadding()
    },
    location: function () {
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                that.setData({
                    longitude: res.longitude,
                    latitude: res.latitude,
                });
            }
        });
    },
    change: function (e) {
        this.setData({
            current: e.detail.current
        })
    },
    // banner-list
    getBanner: function () {
        var that = this;
        wxRequest.getRequest("v1/common/banner/list", { position: 1 }, function (res) {
            that.setData({
                banner: res.items
            });
        });
    },
    // notice
    getNotice: function () {
        var that = this;
        wxRequest.getRequest("v1/common/notice/list", { position: 1 }, function (res) {
            that.setData({
                notice: res
            });
        });
    },
    // menu
    getMenu: function () {
        var that = this;
        wxRequest.getRequest('v1/common/menu/list', { position: 1 }, function (res) {
            that.setData({
                menu: res
            });
        });
    },
    // sites
    getSite: function () {
        var that = this;
        wxRequest.getRequest('v1/common/site/top', {}, function (res) {
            that.setData({
                site: res
            });
        });
    },
    site: function (e) {
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
        })
    },
    redirect: function (e) {
        var key = e.currentTarget.dataset.key;
        var url = e.currentTarget.dataset.url;
        var type = e.currentTarget.dataset.type;
        if (type === 'road') {
            this.mapRoute();
        } else if (type == 'subway') {
            this.subWay();
        } else if (type == 'search') {
            this.mapChoose();
        } else if (type == 'mini') {
            wx.navigateToMiniProgram({
                appId: key,
                path: url,
            })
        } else if (type == 'tabbar') {
            wx.reLaunch({
                url: url,
            })
        } else {
            // 跳转具体页面
            wx.navigateTo({
                url: url + '?key=' + key,
            });
        }
    },
    // 路线规划
    mapRoute: function () {
        let plugin = requirePlugin('routePlan');
        let key = this.data.key;
        let referer = '路线规划';
        let endPoint = JSON.stringify({
            'name': this.data.spotName,
            'latitude': this.data.latitude,
            'longitude': this.data.longitude,
        });
        wx.navigateTo({
            url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
        });
    },
    // 附近搜索
    mapChoose: function () {
        let key = this.data.key;
        let referer = '附近搜索';
        let location = JSON.stringify({
            'latitude': this.data.latitude,
            'longitude': this.data.longitude,
        });
        const category = '生活服务,星级酒店,旅游景点';
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
        });
    },
    // 地铁路线
    subWay: function () {
        let plugin = requirePlugin("subway");
        let key = this.data.key;
        let referer = '地铁路线';
        wx.navigateTo({
            url: 'plugin://subway/index?key=' + key + '&referer=' + referer
        });
    },
    // 跳转
    bannerRedirect(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    onShareAppMessage: function () {
    },
    onShareTimeline: function (e) {
    },
    onAddToFavorites: function () {

    },
})