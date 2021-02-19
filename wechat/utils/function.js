var app = getApp();
let apiUrl = app.data.url;
/**
 * 获取banner
 * @param int position 显示位置 
 */
function getBanner(position = 1, callback) {
    let loginToken = wx.getStorageSync('authentication');
    wx.request({
        url: apiUrl + "v1/common/banner/list",
        method: 'GET',
        data: {
            position: position,
        },
        header: {
            'content-type': 'application/json',
            'cookie': "authentication=" + loginToken,
            'device': 'wechat'
        },
        success(res) {
            var data = res.data;
            if (res.statusCode == 500) {
                wx.showToast({
                    title: '服务异常',
                    icon: 'none',
                    duration: 2000,
                });
            }
            if (data.code == 1000) {
                callback(data.data);
            } else if (showMessage == 2) {
                callback(data.data);
            } else if (data.code == 1004) {
                wx.navigateTo({
                    url: '/pages/user/login/login',
                });
            }
        }
    });
}
// 显示加载模态框
function showLoadding(loadingTime = 2000, message = '努力加载中') {
    wx.showLoading({
        title: message,
        mask: true,
    })
    setTimeout(function () {
        wx.hideLoading()
    }, loadingTime)
}
// 获取年月日(年-月-日)
function getYearMoneyDate() {
    let currentDate = new Date()
    let day = (currentDate.getDate()) < 10 ? ('0' + currentDate.getDate()) : currentDate.getDate()
    let month = (currentDate.getMonth() + 1) < 10 ? ('0' + (currentDate.getMonth() + 1)) : (currentDate.getMonth() + 1)
    let dateArray = []
    dateArray['year'] = currentDate.getFullYear// 年份
    dateArray['money'] = month// 月份
    dateArray['day'] = day// 日期
    dateArray['full'] = currentDate.getFullYear() + '-' + month + '-' + day// 年-月-日
    return dateArray
}
exports.getBanner = getBanner;
exports.showLoadding = showLoadding;
exports.getYearMoneyDate = getYearMoneyDate;