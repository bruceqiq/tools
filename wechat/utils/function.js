var app = getApp();
let apiUrl = app.data.url;
const mapKey = 'OIXBZ-OGZWD-P4G4Z-PW4VS-NG5P7-HAFBI';
/**
 * 系统菜单跳转 
 * @param {*} e 
 */
function menuRedirect(e) {
  var key = e.currentTarget.dataset.key;
  var url = e.currentTarget.dataset.url;
  var type = e.currentTarget.dataset.type;
  if (type === 'road') {
    mapRoute(key);
  } else if (type == 'subway') {
    subWay(key);
  } else if (type == 'search') {
    mapChoose(key);
  } else if (type == 'mini') {
    wx.navigateToMiniProgram({
      appId: key,
      path: url,
    })
  } else if (type == 'tabbar') {
    wx.reLaunch({
      url: url,
    })
  } else if (type == 'image_preview') {
    previewReward(key)
  } else {
    // 跳转具体页面
    wx.navigateTo({
      url: url + '?key=' + key,
    });
  }
}

// 路线规划
function mapRoute(key) {
  let plugin = requirePlugin('routePlan');
  let referer = '路线规划';
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      let endPoint = JSON.stringify({
        'name': key,
        'latitude': res.latitude,
        'longitude': res.longitude,
      });
      const category = '生活服务,星级酒店,旅游景点';
      wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + mapKey + '&referer=' + referer + '&endPoint=' + endPoint
      });
    }
  });
}

// 附近搜索
function mapChoose(key) {
  let referer = '附近搜索';
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      let location = JSON.stringify({
        'latitude': res.latitude,
        'longitude': res.longitude,
      });
      const category = '生活服务,星级酒店,旅游景点';
      wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + mapKey + '&referer=' + referer + '&location=' + location + '&category=' + category
      });
    }
  });
}

// 地铁路线
function subWay(key) {
  let plugin = requirePlugin("subway");
  let referer = '地铁路线';
  wx.navigateTo({
    url: 'plugin://subway/index?key=' + mapKey + '&referer=' + referer
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

// 图片预览
function previewReward(key) {
  wx.previewImage({
    urls: [key]
  })
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

/**
 * 获取当前月份的第一天和最后一天
 */
function getStartEndPerMonth() {
  let currentDate = new Date()
  let month = (currentDate.getMonth() + 1) < 10 ? ('0' + (currentDate.getMonth() + 1)) : (currentDate.getMonth() + 1)
  let year = currentDate.getFullYear()
  let lastDay = 31; // 每月最后一天

  if ((year % 4 == 0 && year % 400 != 0) || (year % 100 == 0 && year % 3200 != 0)) {// 闰年
    if (month == 2) {
      lastDay = 28
    }
    if (month <= 7 && (Number(month) % 2 == 0) && month != 2) {// 7前单月
      lastDay = 30;
    }
    if (month > 7 && Number(month) % 2 == 0) {
      lastDay = 30;
    }
  }

  let dateArray = []
  dateArray['end'] = year + '-' + month + '-' + lastDay
  dateArray['start'] = year + '-' + month + '-' + '01'

  return dateArray
}

exports.menuRedirect = menuRedirect
exports.showLoadding = showLoadding
exports.getYearMoneyDate = getYearMoneyDate
exports.getStartEndPerMonth = getStartEndPerMonth