const util = require('../../utils/util')
const funct = require('../../utils/function')
const commonApi = require('../../utils/common_api')
Page({
    data: {
        nickname: '',
        avatar: '',
        menu: [],
    },
    onLoad: function (options) {

    },
    onShow: function () {
        var that = this;
        var nickname = wx.getStorageSync('nickname');
        var avatar = wx.getStorageSync('avatar');
        that.setData({
            nickname: nickname,
            avatar: avatar,
        });
        commonApi.getMenu(2, function (res) {
            that.setData({
                menu: res
            })
        })
    },
    menuRedirect(e) {
        funct.menuRedirect(e)
    },

    onShareAppMessage: function () {
        // 页面被用户分享时执行
    },
    onShareTimeline: function (e) {
    },
})