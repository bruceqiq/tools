var app = getApp();
let apiUrl = app.data.url;

/**
 * Get请求
 * 
 * @param string url 请求参数
 * @param object requestData 请求参数
 * @param mixed callback 回调函数
 * @param int showMessage 是否显示提示信息
 * @return object
 */
function getRequest(url, requestData = {}, callback, showMessage = 2) {
    let loginToken = wx.getStorageSync('authentication');
    wx.request({
        url: apiUrl + url,
        method: 'GET',
        data: requestData,
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
            }  else if (data.code == 1004) {
                wx.navigateTo({
                    url: '/pages/login/login',
                });
            }else {
                callback(data.data);
            }
        }
    });
}

/**
 * Post请求
 * 
 * @param string url 请求参数
 * @param object requestData 请求参数
 * @param mixed callback 回调函数
 * @param integer showMessage 是否显示提示消息,1显示2不显示
 * @return object
 */
function postRequest(url, requestData = {}, callback, showMessage = 2) {
    let loginToken = wx.getStorageSync('authentication');
    wx.request({
        url: apiUrl + url,
        method: 'POST',
        data: requestData,
        header: {
            'content-type': 'application/json',
            'cookie': "authentication=" + loginToken,
            'device': 'wechat'
        },
        success(res) {
            var data = res.data;
            if (res.statusCode == 500) {// 服务器内部异常情况
                wx.showToast({
                    title: '服务异常',
                    icon: 'none',
                    duration: 2000,
                });
            }
            // if (showMessage == 2) {// 不显示提示信息
            //     callback(data.data);
            // } else {
            let message = data.message;
            console.log(data.code);
            if (data.code === 1000) {// 提交数据
                if (showMessage == 1) {
                    wx.showToast({
                        title: message,
                        icon: 'none',
                        duration: 2000,
                    });
                } 
                callback(data);
            } else if (data.code === 1004) {// 暂未登录
               if (showMessage == 1) {
                    wx.showToast({
                        title: '请先进行登录',
                        duration: 2000,
                        icon: 'none',
                    });
               }
                wx.navigateTo({
                    url: '/pages/login/login',
                });
            } else {
                wx.showToast({
                    title: '操作失败',
                    duration: 2000,
                    icon: 'none',
                });
            }
            // }
        }
    });
}

/**
 * 统一文件上传路径
 * 
 * @param string url  上传文件服务器地址
 * @param string fileName  上传文件字段名称
 * @param string fileRealPath  上传文件地址
 * @param object formData  表单数据
 * @param function callback  回调函数
 */
function fileUpload(url, fileName, fileRealPath, formData, callback) {
    formData.login_token = wx.getStorageSync('login_token');
    let upTask = wx.uploadFile({
        url: apiUrl + url,
        filePath: fileRealPath,
        name: 'file',
        formData: formData,
        header: {
            'content-type': 'application/json'
        },
        success: (result) => {
            callback(result);
        },
        fail: () => { },
        complete: () => { }
    });
}
exports.postRequest = postRequest;
exports.getRequest = getRequest;
exports.fileUpload = fileUpload;