const wxRequest = require('../../../utils/request')
const funct = require('../../../utils/function')
Page({

    /**
     * Page initial data
     */
    data: {
        billInfo: {},
        text: '支出',
        id: 0,
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        let id = options.id
        this.getBill(id)
    },

    /**
     * 获取账单信息
     */
    getBill: function (id) {
        let that = this;
        wxRequest.getRequest('v1/bill/detail', { id: id }, function (data) {
            that.setData({
                billInfo: data,
                text: data.type == 1 ? '收入' : '支出',
                id: id,
            })
        });
    },

    /**
     * 删除账单信息
     */
    delBill() {
        let id = this.data.id
        wx.showModal({
            title: '操作提示',
            content: '确认删除账单?',
            success: function (res) {
                if (res.confirm) {
                    wxRequest.postRequest('v1/bill/delete', { id: id }, function (data) {
                        wx.reLaunch({
                            url: '/pages/bill/list/list',
                        })
                    })
                }
            }
        })
    },

    /**
     * 修改账单信息
     */
    editBill() {
        wx.navigateTo({
            url: '/pages/bill/bill/bill?billId=' + this.data.id,
        })
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {
        
    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})