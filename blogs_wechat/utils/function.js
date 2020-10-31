var app = getApp();
let apiUrl = app.data.url;
/**
 * 获取banner
 * @param int position 显示位置 
 */
function getBanner(position = 1,callback) {
    let loginToken = wx.getStorageSync('authentication');
    wx.request({
        url: apiUrl + "v1/common/banner/list",
        method: 'GET',
        data: {
            position:position,
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
exports.getBanner = getBanner;