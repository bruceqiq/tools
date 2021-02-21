const wxRequest = require('./../../utils/request.js')
const funct = require('../../utils/function')
const commonApi = require('../../utils/common_api')
Page({
    data: {
        banner: [],
        menu: [],
        current: 0,
        page: 1,
        size: 10,
        spotList: [],
        notice: [],
    },
    onLoad: function () {
        var that = this
        commonApi.getBanner(1, function(res) {
            that.setData({
                banner:res
            })
        })
        commonApi.getNotice(1, function(res) {
            that.setData({
                notice:res
            })
        })
        commonApi.getMenu(1, function(res) {
            that.setData({
                menu:res
            })
        })
    },
    menuRedirect (e) {
        funct.menuRedirect(e)
    },
    change: function (e) {
        this.setData({
            current: e.detail.current
        })
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