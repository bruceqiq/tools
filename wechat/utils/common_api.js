let apiUrl = getApp().data.url;

/**
 * 获取banner
 * @param {*} position 显示位置
 * @param {*} callback 
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
                callback(data.data.items);
            }
        }
    });
}

/**
 * 获取系统菜单
 * @param {*} position 显示位置
 */
function getMenu(position = 0, callback) {
    let loginToken = wx.getStorageSync('authentication');
    wx.request({
        url: apiUrl + "v1/common/menu/list",
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
            }
        }
    });
}

/**
 * 获取系统公告
 * @param {*} position 显示位置
 */
function getNotice(position = 0, callback) {
    let loginToken = wx.getStorageSync('authentication');
    wx.request({
        url: apiUrl + "v1/common/notice/list",
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
            }
        }
    });
}

exports.getBanner = getBanner;
exports.getMenu = getMenu;
exports.getNotice = getNotice;