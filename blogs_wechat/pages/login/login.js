const app = getApp();
Page({
  onLoad:function (e) {
    console.log(e);
  },
  onGetUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
    wx.login({
      success(res) {
        let code = res.code;
        wx.getUserInfo({
          withCredentials: true,
          success: function (user) {
            wx.showLoading({
              title: '加载中',
            });
            wx.request({
              url: app.data.url + 'v1/mini/user/login',
              method: 'POST',
              data: {
                code: code,
                encrypted_data: user.encryptedData,
                iv: user.iv,
                wxapp_id: 0,
                app_type:2,
              },
              success: (res) => {
                var data = res.data;
                if (data.code == 1003) {
                  wx.showToast({
                    title: '登录成功',
                    icon: 'none',
                    duration: 3000,
                  });
                  wx.setStorage({
                    data: data.data.token,
                    key: 'authentication',
                  });
                  wx.setStorage({
                    data: data.data.userInfo.nickname,
                    key: 'nickname',
                  });
                  wx.setStorage({
                    data: data.data.userInfo.avatar_url,
                    key: 'avatar',
                  });
                  let pages = getCurrentPages(); //页面栈
                  let beforePage = pages[pages.length - 2];
                  wx.switchTab({
                    url: '/pages/index/index',
                  });
                  // wx.reLaunch({
                  //   url: '/' + beforePage.route + "?id=" + that.data.id,
                  //   success: function () {
                  //     if (beforePage.route == '/pages/index/index') {
                  //       beforePage.syncPageData()
                  //     }
                  //   }
                  // });
                } else {
                  wx.showToast({
                    title: '登录失败',
                    icon: 'none',
                    duration: 3000,
                  });
                }
              }
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '取消登录',
              icon: 'none',
              duration: 3000,
            });
          }
        });
      }
    });
  },
  // 取消登录
  onNotLogin: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  onShareTimeline: function (e) {
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
})