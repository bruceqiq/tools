var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}(require("../../utils/global.js")), t = require("../../utils/wxcharts"), a = (require("../../utils/html2canvas.min"), 
require("../../utils/util.js")), i = null;

Page({
    data: {
        mainBg: "C0",
        isLocation: !0,
        location: {},
        observeInfo: {},
        alarmInfo: [],
        airInfo: {},
        hoursInfo: [],
        daysInfo: [],
        indexInfo: {},
        limitInfo: {},
        weatherTips: "",
        weatherTipsLen: 0,
        weatherTipsIndex: 0,
        tipsChanging: !1,
        addressType: "internal",
        isShowUpdateTime: !0,
        toggleWindHumidity: !0,
        isShowOverlay: !1,
        isClickAble: !0,
        popupType: "",
        popupAlarmIndex: 0,
        popupServiceIndex: 0,
        accelerometerX: 0,
        isNight: !1,
        sharePicUrl: "",
        swiperItems: [ "", "" ],
        swiperCurIndex: 0,
        isPlaying: !1,
        isShowAudio: !1,
        audioSrc: "",
        audioCtx: null,
        autoplay: !0,
        interval: 2500,
        duration: 1e3,
        vertical: !0,
        swiperIndex: 0,
        swiperData: [],
        currentIndex: 0,
        selectedFlag: !1,
        channel: [],
        topVideos: [],
        topBlVideos: [],
        topsum: 0,
        relateVideos: [],
        blVideos: [],
        feedsum: 0,
        imgData: [],
        curpage: 0,
        newHidden: !0,
        broadcast_arr: {
            speed: 3.5,
            font_size: "28",
            text_color: "#ffffff",
            back_color: "",
            starspos: "240"
        }
    },
    onReady: function(e) {
        this.audioCtx = wx.createAudioContext("myAudio");
    },
    onShow: function() {
        this.audioPause();
    },
    onPullDownRefresh: function() {
        console.log("下拉刷新"), wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    onLoad: function(t) {
        var a = this;
        switch (console.log("o:", t), t.type) {
          case "internal":
            e.searchLocation = t, t.province && (t.province = decodeURIComponent(t.province)), 
            t.city && (t.city = decodeURIComponent(t.city)), t.district && (t.district = decodeURIComponent(t.district)), 
            this.setData({
                addressType: "internal",
                location: t,
                isLocation: !1
            }), this.getInternalWeather(t);
            break;

          case "tourist":
            t.tourist = decodeURIComponent(t.tourist), e.searchLocation = t, this.setData({
                addressType: "tourist",
                location: t,
                isLocation: !1
            }), this.getScenicWeather(t);
            break;

          case "external":
            e.searchLocation = t, t.province && (t.province = decodeURIComponent(t.province)), 
            t.city && (t.city = decodeURIComponent(t.city)), this.setData({
                addressType: "external",
                location: t,
                isLocation: !1
            }), this.getExternalWeather(t);
            break;

          default:
            this.getLocation();
        }
        wx.onAccelerometerChange(function(t) {
            t.x > 1 && (t.x = 1), t.x < -1 && (t.x = -1), "android" !== e.systemInfo.platform && a.setData({
                accelerometerX: t.x.toFixed(2)
            });
        }), wx.getStorageSync("firstTime") || (0 === wx.getSystemInfoSync().system.indexOf("iOS") && wx.showModal({
            title: "添加我的小程序",
            content: "点击右上角按钮的三个小点点，即可选择旅行掌上攻略天气添加到我的小程序，快来试试吧~",
            showCancel: !1,
            confirmText: "学会了"
        }), 0 === wx.getSystemInfoSync().system.indexOf("Android") && wx.showModal({
            title: "添加到手机桌面",
            content: "点击右上角按钮的三个小点点，即可选择将旅行掌上攻略天气添加到手机桌面，快来试试吧~",
            showCancel: !1,
            confirmText: "学会了"
        }), wx.setStorage({
            key: "firstTime",
            data: "no"
        })), this.loadTopvideo();
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            success: function(a) {
                e.isGetLocation = !0, t.getPCC(a);
            },
            fail: function() {
                e.isGetLocation = !1, t.setData({
                    location: e.defaultLocation,
                    isLocation: !1
                }), t.getInternalWeather(e.defaultLocation);
            }
        });
    },
    getPCC: function(t) {
        var a = this;
        wx.request({
            url: e.MapAPI + t.latitude + "," + t.longitude,
            success: function(t) {
                var i = t.data;
                if (0 === i.status && i.result) {
                    var s = i.result.address_component;
                    e.searchLocation = s, console.log("地理定位：", s), wx.setStorage({
                        key: "province",
                        data: s.province
                    }), wx.setStorage({
                        key: "city",
                        data: s.city
                    }), wx.setStorage({
                        key: "district",
                        data: s.district
                    }), a.setData({
                        location: s,
                        isLocation: !0
                    }), a.getInternalWeather(s);
                }
            }
        });
    },
    getInternalWeather: function(t) {
        function a() {
            wx.request({
                url: e.BaseAPI + "/weather/common",
                data: {
                    weather_type: "air",
                    source: "wxa",
                    province: t.province || "",
                    city: t.city || ""
                },
                success: function(e) {
                    var t = e.data;
                    200 === t.status && t.data && i.fillAirData(t.data.air);
                }
            });
        }
        var i = this;
        this.setData({
            isShowUpdateTime: !0
        }), wx.request({
            url: e.BaseAPI + "/weather/common",
            data: {
                weather_type: "observe|alarm|air|forecast_1h|forecast_24h|index|limit|tips|rise",
                source: "wxa",
                province: t.province || "",
                city: t.city || "",
                county: t.district || ""
            },
            success: function(t) {
                var s = t.data;
                200 === s.status && s.data && (e.allWeatherInfo = s.data, console.log("天气信息：", s.data), 
                i.topgetVideos(), i.fillObsseveData(s.data.observe), i.fillAlarmData(s.data.alarm), 
                i.fillHoursData(s.data.forecast_1h, s.data.rise), i.fillDaysData(s.data.forecast_24h), 
                i.fillIndexData(s.data.index, s.data.limit), i.fillTipsData(s.data.tips), i.textToVoice(s.data), 
                a());
            }
        }), i.setData({
            channel: e.channel
        }), i.loadBlimg(), i.getVideos();
    },
    getScenicWeather: function(t) {
        var a = this;
        wx.request({
            url: e.BaseAPI + "/weather/tourist",
            data: {
                weather_type: "observe|forecast_1h|forecast_24h|tips|rise",
                source: "wxa",
                tourist: t.tourist
            },
            success: function(t) {
                var i = t.data;
                200 === i.status && i.data && (e.allWeatherInfo = i.data, a.fillObsseveData(i.data.observe), 
                a.fillHoursData(i.data.forecast_1h, i.data.rise), a.fillDaysData(i.data.forecast_24h), 
                a.fillTipsData(i.data.tips), a.textToVoice(i.data));
            }
        });
    },
    getExternalWeather: function(t) {
        function a() {
            wx.request({
                url: e.BaseAPI + "/weather/common",
                data: {
                    weather_type: "air",
                    source: "wxa",
                    province: t.province || "",
                    city: t.city || ""
                },
                success: function(e) {
                    var t = e.data;
                    200 === t.status && t.data && self.fillAirData(t.data.air);
                }
            });
        }
        var i = this;
        this.setData({
            isShowUpdateTime: !0
        }), wx.request({
            url: e.BaseAPI + "/weather/external",
            data: {
                weather_type: "observe|forecast_24h|tips",
                source: "wxa",
                country: t.country || "",
                city: t.city || ""
            },
            success: function(t) {
                var s = t.data;
                200 === s.status && s.data && (e.allWeatherInfo = s.data, i.fillObsseveData(s.data.observe), 
                i.fillDaysData(s.data.forecast_24h), i.fillTipsData(s.data.tips), i.textToVoice(s.data), 
                a());
            }
        });
    },
    fillObsseveData: function(t) {
        var a = this;
        this.setData({
            mainBg: e.classKeys[t.weather_code]
        }), t.update_time = "中央气象台 " + t.update_time.slice(8, 10) + ":" + (t.update_time.slice(10, 12) || "00") + "发布", 
        setTimeout(function() {
            a.setData({
                isShowUpdateTime: !1
            });
        }, e.showUpdateTime), t.isLessZero = parseInt(t.degree, 10) < 0 ? "minus" : "", 
        t.dot = "dot", t.degree = t.degree.replace("-", ""), t.humidity = "湿度 " + t.humidity + "%", 
        t.wind_direction_cn = e.windDirection[t.wind_direction], t.wind_power = t.wind_power + "级", 
        this.setData({
            observeInfo: t
        }), setInterval(function() {
            a.data.toggleWindHumidity ? a.setData({
                toggleWindHumidity: !1
            }) : a.setData({
                toggleWindHumidity: !0
            });
        }, 5e3);
    },
    fillAlarmData: function(e) {
        console.log("预警信息:", e);
        for (var t = [], a = [], i = 0; i < 4; i++) e[i] && t.push(e[i]);
        for (var s = 0, o = t.length; s < o; s++) {
            for (var n = -1, r = 0; r < a.length; r++) a[r].type_name === t[s].type_name && (n = r);
            -1 === n && a.push(t[s]);
        }
        this.setData({
            alarmInfo: a
        });
    },
    fillAirData: function(e) {
        e.aqi_key = "空气", this.setData({
            airInfo: e
        }), e.aqi > 200 && "C7" !== this.data.mainBg && this.setData({
            mainBg: "C6"
        });
    },
    fillHoursData: function(e, t) {
        var a = new Date().getTime(), i = t[0], s = new Date(i.time.slice(0, 4) + "/" + i.time.slice(4, 6) + "/" + i.time.slice(6, 8) + " " + i.sunrise).getTime(), o = new Date(i.time.slice(0, 4) + "/" + i.time.slice(4, 6) + "/" + i.time.slice(6, 8) + " " + i.sunset).getTime();
        if (a > s && a < o ? this.setData({
            isNight: !1
        }) : this.setData({
            isNight: !0
        }), e) {
            for (var n = [], r = 0, c = 0; c < 24; c++) if (e[c]) {
                var l = e[c], d = l.update_time.slice(8, 10) + ":00", h = new Date(l.update_time.slice(0, 4) + "/" + l.update_time.slice(4, 6) + "/" + l.update_time.slice(6, 8) + " " + l.update_time.slice(8, 10) + ":" + l.update_time.slice(10, 12)).getTime();
                "00:00" === d && (0 === r ? (r++, d = "明天") : d = "后天"), l.time = d, l.degree = l.degree, 
                l.de = "de";
                for (var u in t) {
                    var f = t[u].time, p = new Date(f.slice(0, 4) + "/" + f.slice(4, 6) + "/" + f.slice(6, 8) + " " + t[u].sunrise).getTime(), g = new Date(f.slice(0, 4) + "/" + f.slice(4, 6) + "/" + f.slice(6, 8) + " " + t[u].sunset).getTime();
                    h > p && h - 36e5 < p && n.push({
                        time: t[u].sunrise,
                        weather_code: "sunrise",
                        degree: "日出",
                        de: ""
                    }), h > g && h - 36e5 < g && n.push({
                        time: t[u].sunset,
                        weather_code: "sunset",
                        degree: "日落",
                        de: ""
                    }), h > g && h < p - 0 + 864e5 && ("00" !== l.weather_code && "01" !== l.weather_code && "03" !== l.weather_code && "13" !== l.weather_code || (l.weather_code = l.weather_code + "_n"));
                }
                n.push(l);
            }
            this.setData({
                hoursInfo: n
            });
        }
    },
    fillDaysData: function(a) {
        for (var s = [], o = [], n = [], r = [], c = 0; c < 6; c++) {
            var l = a[c];
            if (l && l.time) {
                var d = new Date(l.time);
                l.weekDay = c < 4 ? e.weekDayCn[c] : e.weekDay[d.getDay()], l.date = l.time.slice(5).replace("-", "/"), 
                o.push(l.max_degree), n.push(l.min_degree), r.push(""), "00" !== l.night_weather_code && "01" !== l.night_weather_code && "03" !== l.night_weather_code && "13" !== l.night_weather_code || (l.night_weather_code = l.night_weather_code + "_n"), 
                s.push(l);
            }
        }
        this.setData({
            daysInfo: s
        }), i = new t({
            canvasId: "daysLineCanvas",
            type: "line",
            categories: r,
            animation: !1,
            series: [ {
                color: "#ffb74d",
                fontSize: 28 * e.scale,
                fontColor: "#333333",
                skewY: 25 * e.scale,
                data: o,
                format: function(e) {
                    return e + "°";
                }
            }, {
                color: "#4fc3f7",
                fontSize: 28 * e.scale,
                fontColor: "#333333",
                skewY: -45 * e.scale,
                data: n,
                format: function(e) {
                    return e + "°";
                }
            } ],
            xAxis: {
                disableGrid: !0,
                type: "calibration"
            },
            yAxis: {
                disabled: !0,
                disableGrid: !0,
                gridColor: "#ffffff",
                fontSize: 17
            },
            legend: !1,
            dataLabel: !0,
            paddingTop: 40 * e.scale,
            width: 750 * e.scale,
            height: 276 * e.scale,
            extra: {
                lineStyle: "curve"
            }
        });
    },
    fillIndexData: function(t, a) {
        for (var i = [], s = e.service, o = 0, n = s.length; o < n; o++) {
            var r = {};
            0 === o ? r = {
                detail: "",
                info: a.tail_number,
                name: "尾号限行",
                type: "carlimit"
            } : t[s[o]] && ((r = t[s[o]]).type = s[o]), i.push(r);
        }
        a && a.tail_number ? (i[0].detail = "今日限行尾号为" + i[0].info + "，临时号牌按号牌尾号数字限行，机动车车牌尾号为英文字母的按0号管理。", 
        this.setData({
            indexInfo: i.slice(0, i.length - 1)
        })) : this.setData({
            indexInfo: i.slice(1)
        });
    },
    fillTipsData: function(e) {
        var t = [];
        for (var a in e) for (var i in e[a]) t.push(e[a][i]);
        this.setData({
            weatherTipsLen: t.length,
            weatherTipsIndex: Math.floor(Math.random() * t.length),
            weatherTips: t
        });
    },
    changeTips: function() {
        var e = this.data.weatherTipsIndex, t = this.data.weatherTipsLen;
        t > 1 && this.setData({
            weatherTipsIndex: e + 1 >= t ? 0 : e + 1
        });
    },
    hidePopup: function(t) {
        var a = this;
        this.data.isClickAble && (this.setData({
            isClickAble: !1,
            isFadeInOverlay: !1
        }), setTimeout(function() {
            a.setData({
                isShowOverlay: !1,
                isClickAble: !0
            });
        }, 300), this.fillDaysData(e.allWeatherInfo.forecast_24h));
    },
    showPopup: function(e) {
        var t = e.currentTarget.dataset, a = t.type, i = "https://btrace.qq.com/kvcollect?BossId=5199&Pwd=451708158&ip=&qq=&pac_uid=&ua=&platform=xcx&_dc=" + Math.random();
        switch (a) {
          case "aqi":
            i += "&fun=aqi", this.setData({
                popupType: "aqi",
                isShowOverlay: !0,
                isFadeInOverlay: !0
            });
            break;

          case "alarm":
            i += "&fun=yj", this.setData({
                popupType: "alarm",
                popupAlarmIndex: t.index,
                isShowOverlay: !0,
                isFadeInOverlay: !0
            });
            break;

          case "service":
            i += "&fun=shzs", this.setData({
                popupType: "service",
                popupServiceIndex: t.index,
                isShowOverlay: !0,
                isFadeInOverlay: !0
            });
        }
        wx.request({
            url: i,
            method: "POST",
            success: function(e) {}
        });
    },
    showAirPop: function() {
        var e = this;
        this.data.isClickAble && (this.setData({
            isClickAble: !1,
            isShowOverlay: !0,
            isFadeInOverlay: !0
        }), setTimeout(function() {
            e.setData({
                isClickAble: !0
            });
        }, 600));
    },
    isShareImgBlock: !1,
    drawCanvas: function(t) {
        var a = this;
        wx.getStorageSync("drawOk");
        if (t.downLoadList.length > 0) {
            console.log("下载图片个数大于0");
            var i = t.downLoadList.pop();
            wx.downloadFile({
                url: i.url,
                fail: function() {
                    a.isShareImgBlock = !1;
                },
                success: function(e) {
                    console.log("图片下载成功", e.tempFilePath), i.path = e.tempFilePath, t.imageList.push(i), 
                    a.drawCanvas(t);
                }
            });
        } else {
            console.log("绘制开始"), this.setData({
                showcanvas: !1
            });
            var s = wx.createCanvasContext("shareQRcode"), o = (this.data, s.createLinearGradient(0, 0, 0, 958));
            o.addColorStop(0, e.bgCss[t.bgType].start), o.addColorStop(1, e.bgCss[t.bgType].stop), 
            s.setFillStyle(o), s.fillRect(0, 0, 750, 958), t.imageList.forEach(function(e) {
                console.log("绘制图片path：", e.path, e.pos), s.drawImage(e.path, e.pos[0], e.pos[1], e.pos[2], e.pos[3]);
            }), s.setTextAlign("center"), s.setFillStyle("#ffffff"), s.setFontSize(32), s.setTextBaseline("top"), 
            s.fillText(t.local, 375, 38), s.save(), "internal" === this.data.addressType && (this.data.airInfo.aqi_name.length > 2 ? (s.beginPath(), 
            s.arc(34, 134, 14, Math.PI, 1.5 * Math.PI), s.lineTo(158, 120), s.arc(158, 134, 14, 1.5 * Math.PI, 2 * Math.PI), 
            s.lineTo(172, 194), s.arc(158, 194, 14, 0, .5 * Math.PI), s.lineTo(108, 208), s.arc(34, 194, 14, .5 * Math.PI, Math.PI), 
            s.lineTo(20, 134), s.setFillStyle(e.apiBgCss[t.apiBgType]), s.fill(), s.setFillStyle("#ffffff"), 
            s.setFontSize(24), s.fillText(this.data.airInfo.aqi, 96, 130), s.setFontSize(28), 
            s.fillText(this.data.airInfo.aqi_name, 96, 164)) : (s.beginPath(), s.arc(34, 134, 14, Math.PI, 1.5 * Math.PI), 
            s.lineTo(94, 120), s.arc(94, 134, 14, 1.5 * Math.PI, 2 * Math.PI), s.lineTo(108, 194), 
            s.arc(94, 194, 14, 0, .5 * Math.PI), s.lineTo(34, 208), s.arc(34, 194, 14, .5 * Math.PI, Math.PI), 
            s.lineTo(20, 134), s.setFillStyle(e.apiBgCss[t.apiBgType]), s.fill(), s.setFillStyle("#ffffff"), 
            s.setFontSize(24), s.fillText(this.data.airInfo.aqi, 64, 130), s.setFontSize(28), 
            s.fillText(this.data.airInfo.aqi_name, 64, 164))), s.save();
            var n = this.data.observeInfo.degree, r = 24;
            "minus" === this.data.observeInfo.isLessZero && (n = "-" + this.data.observeInfo.degree, 
            r = -10), s.setFontSize(128), s.setFillStyle("#ffffff"), s.fillText(n + "°", 375 + r, 238), 
            s.setFontSize(44), s.fillText(this.data.observeInfo.weather_short, 375, 378), s.setFontSize(28), 
            s.fillText(this.data.observeInfo.wind_direction_cn + " " + this.data.observeInfo.wind_power, 375, 442), 
            s.setFontSize(32), s.fillText(this.data.weatherTips[this.data.weatherTipsIndex], 375, 570);
            var c = function e() {
                wx.canvasToTempFilePath({
                    canvasId: "shareQRcode",
                    success: function(e) {
                        wx.hideLoading(), a.isShareImgBlock = !1, wx.saveFile({
                            tempFilePath: e.tempFilePath,
                            success: function(e) {
                                console.log("图片已经保存起来", e.savedFilePath), wx.previewImage({
                                    urls: [ e.savedFilePath ],
                                    success: function(t) {
                                        console.log("图片临时路径", t, e.savedFilePath);
                                    },
                                    fail: function(t) {
                                        console.log("preview image is fail", t, e.savedFilePath);
                                    }
                                });
                            },
                            fail: function(e) {
                                console.log(e, "save file fail");
                            }
                        }), a.setData({
                            showcanvas: !0
                        });
                    },
                    fail: function(t) {
                        console.log("fail to temp", t), setTimeout(e, 2e3);
                    }
                });
            };
            s.draw(), setTimeout(function() {
                c();
            }, 100);
        }
    },
    shareImg: function() {
        var e = this.data, t = "", a = "", i = "", s = "https://mat1.gtimg.com/tianqi/weapp-weather/images/bg/", o = "https://btrace.qq.com/kvcollect?BossId=5199&Pwd=451708158&ip=&qq=&pac_uid=&ua=&platform=xcx&&fun=tpfx&_dc=" + Math.random();
        if (wx.request({
            url: o,
            method: "POST",
            success: function(e) {}
        }), !this.isShareImgBlock) {
            switch (this.isShareImgBlock = !0, wx.showLoading({
                title: "加载中"
            }), e.addressType) {
              case "internal":
                t = e.location.province && e.location.city && e.location.district ? e.location.city + " " + e.location.district : e.location.province && e.location.city ? e.location.province === e.location.city ? e.location.province : e.location.province + " " + e.location.city : e.location.province;
                break;

              case "tourist":
                t = e.location.shortname || e.location.tourist;
                break;

              case "external":
                t = e.location.country + " " + e.location.city;
            }
            a = !e.isNight || "C2" !== e.mainBg && "C9" !== e.mainBg ? e.mainBg : e.mainBg + "N", 
            i = "a" + e.airInfo.aqi_level;
            var n = [ {
                url: s + a + "-scenery-near.png",
                pos: [ -80, -42, 910, 1e3 ]
            }, {
                url: s + a + "-scenery-in.png",
                pos: [ -80, -42, 910, 1e3 ]
            }, {
                url: s + a + "-scenery-far.png",
                pos: [ -80, -42, 910, 1e3 ]
            }, {
                url: "https://mat1.gtimg.com/tianqi/weapp-weather/images/share-bottom.png",
                pos: [ 0, 948, 750, 176 ]
            } ];
            wx.getSavedFileList({
                success: function(e) {
                    console.log("未缓存saveFileList"), e.fileList.length > 0 && wx.removeSavedFile({
                        filePath: e.fileList[0].filePath,
                        complete: function(e) {
                            console.log("移除文件", e);
                        }
                    });
                }
            }), this.drawCanvas({
                downLoadList: n,
                imageList: [],
                local: t,
                apiBgType: i,
                bgType: a
            });
        }
    },
    swiperChange: function(e) {
        this.setData({
            swiperCurIndex: e.detail.current
        });
    },
    textToVoice: function() {
        function e(e) {
            return new Date(e).getTime();
        }
        var t = this.data, a = new Date(), i = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate(), s = e(a), o = e(i + " 05:00"), n = e(i + " 08:00"), r = e(i + " 11:00"), c = e(i + " 13:00"), l = e(i + " 18:00"), d = "您好";
        s > o && s <= n && (d = "早晨好"), s > n && s <= r && (d = "上午好"), s > r && s <= c && (d = "中午好"), 
        s > c && s <= l && (d = "下午好"), s > l && (d = "晚上好");
        var h = "，为你天气为您播报。", u = "", f = t.location;
        if ("internal" === t.addressType && (u = f.province && f.city && f.district ? f.city === f.district ? f.district : f.city + "," + f.district : f.province === f.city ? f.city : f.province + "," + f.city), 
        "tourist" === t.addressType && (u = f.tourist), "external" === t.addressType && (u = f.country + f.city), 
        s > l) {
            var p = t.daysInfo[2];
            d + h + u + ",明天白天到夜间," + (p.day_weather_short === p.night_weather_short ? p.day_weather_short : p.day_weather_short + "转" + p.night_weather_short) + ",温度," + (p.min_degree < 0 ? "零下" + Math.abs(p.min_degree) : p.min_degree) + "到" + (p.max_degree < 0 ? "零下" + Math.abs(p.max_degree) : p.max_degree) + "摄氏度," + (p.day_wind_power > 0 ? p.day_wind_direction + p.day_wind_power + "级。" : "") + "小贴士提醒您: " + t.weatherTips[t.weatherTipsIndex];
        } else {
            var g = t.daysInfo[1];
            d + h + u + ",今天白天到夜间," + (g.day_weather_short === g.night_weather_short ? g.day_weather_short : g.day_weather_short + "转" + g.night_weather_short) + ",温度," + (g.min_degree < 0 ? "零下" + Math.abs(g.min_degree) : g.min_degree) + "到" + (g.max_degree < 0 ? "零下" + Math.abs(g.max_degree) : g.max_degree) + "摄氏度," + (g.day_wind_power > 0 ? g.day_wind_direction + g.day_wind_power + "级。" : "") + "小贴士提醒您: " + t.weatherTips[t.weatherTipsIndex];
        }
    },
    broadcastWeather: function(t) {
        var a = this;
        wx.request({
            url: e.VoiceAPI,
            data: {
                text: t
            },
            success: function(e) {
                console.log("res", e), e.data && e.data.data.voice && a.setData({
                    audioSrc: e.data.data.voice,
                    isShowAudio: !0
                });
            }
        });
    },
    controlAudio: function() {
        console.log(this.data.isPlaying), this.data.isPlaying ? this.audioPause() : this.audioPlay();
    },
    audioPlay: function() {
        this.audioCtx.play(), this.setData({
            isPlaying: !0
        });
    },
    audioPause: function() {
        this.audioCtx && (this.audioCtx.pause(), this.playEnd());
    },
    audioStart: function() {
        this.audioCtx.seek(0);
    },
    playEnd: function() {
        this.setData({
            isPlaying: !1
        }), this.audioStart();
    },
    onShareAppMessage: function(t) {
        var a = "";
        return e.searchLocation.district && (a = e.searchLocation.district), !e.searchLocation.district && e.searchLocation.city && (a = e.searchLocation.city), 
        !e.searchLocation.city && e.searchLocation.province && (a = e.searchLocation.province), 
        {
            title: a + " " + e.allWeatherInfo.observe.weather + " " + e.allWeatherInfo.observe.degree + "°",
            path: "",
            success: function(t) {
                var a = "https://btrace.qq.com/kvcollect?BossId=5199&Pwd=451708158&ip=&qq=&pac_uid=&ua=&platform=xcx&fun=share&_dc=" + Math.random();
                wx.request({
                    url: a,
                    method: "POST",
                    success: function(t) {
                        e._debug && console.log("成功分享:", t);
                    }
                });
            },
            fail: function(e) {}
        };
    },
    changeToggle: function() {
        this.data.selectedFlag ? this.data.selectedFlag = !1 : this.data.selectedFlag = !0, 
        this.setData({
            selectedFlag: this.data.selectedFlag
        }), a.clickBOSS({
            fun: "7zhedie"
        });
    },
    topgetVideos: function() {
        var e = this, t = [];
        wx.request({
            url: "https://pacaio.match.qq.com/irs/rcd",
            data: {
                cid: 16,
                token: "71f49bbe8421ff549909a6900da01ba6"
            },
            success: function(a) {
                for (var i = a.data.data, s = e.data.topBlVideos, o = 0; o < s.length; o++) t.push(s[o]);
                for (var n = 0; n < i.length; n++) t.push(i[n]);
                console.log(t), e.setData({
                    topVideos: t
                }), e.gotoLeft(t), e.setData({
                    newHidden: !1
                });
            }
        });
    },
    loadTopvideo: function() {
        var e = this;
        wx.request({
            url: "https://mat1.gtimg.com/rain/bl20/json/57.js",
            dataType: "javascript",
            header: {
                "content-type": "application/javascript"
            },
            success: function(t) {
                for (var a = JSON.parse(t.data.substring(t.data.indexOf("=") + 1)), i = [], s = 0; s < a.length; s++) if ("热门" == a[s].name) for (var o = a[s].videos, n = 0; n < o.length; n++) {
                    var r = new Date().getTime(), c = new Date(o[n].starttime + "+08:00").getTime(), l = new Date(o[n].endtime + "+08:00").getTime();
                    c < r && l > r && "number" == typeof o[s].order && o[s].order >= 0 && i.push(o[n]);
                }
                var d = i.length;
                e.setData({
                    topBlVideos: i,
                    topsum: d
                });
            }
        });
    },
    gotoLeft: function(e) {
        var t = e, a = this.data.broadcast_arr, i = 0, s = this.data.broadcast_arr.speed * this.data.broadcast_arr.font_size;
        for (var o in t) a.starspos = wx.getSystemInfoSync().windowWidth - 150, i += (t[o].title.length - 3) * this.data.broadcast_arr.font_size;
        var n = i;
        a.time = n / s, a.width_mal = n, this.setData({
            broadcast_arr: a,
            topVideos: t
        });
    },
    loadBlimg: function() {
        var e = this;
        wx.request({
            url: "https://mat1.gtimg.com/rain/bl20/json/59.js",
            dataType: "javascript",
            header: {
                "content-type": "application/javascript"
            },
            success: function(t) {
                var a = JSON.parse(t.data.substring(t.data.indexOf("=") + 1));
                e.setData({
                    imgData: a
                });
            }
        });
    },
    gotoActivity: function(e) {
        var t = e.currentTarget.dataset, i = t.vid, s = t.channel, o = t.path;
        if ("" != o && "" == s && "" == i) console.log(o + "&pgv_ref=tencenttianqi"), wx.navigateToMiniProgram({
            appId: "wx0d7f9a7816347b3d",
            path: o + "&pgv_ref=tencenttianqi"
        }); else if ("" != s && "" == o && "" == i) {
            console.log(s);
            var n = "";
            n = "活动" == s ? "/pages/activity/index?pgv_ref=tencenttianqi" : "/pages/index/index?pgv_ref=tencenttianqi&tabName=" + s, 
            wx.navigateToMiniProgram({
                appId: "wx0d7f9a7816347b3d",
                path: n
            });
        } else "" != i && "" == o && "" == s && (console.log(i), a.videos(i));
        a.clickBOSS({
            fun: "hfhd"
        });
    },
    gotoVideo: function(e) {
        var t = e.currentTarget.dataset, i = t.vid, s = t.fun, o = t.modular;
        if ("yunying" == o) {
            var n = e.currentTarget.dataset, r = n.img, c = n.title, l = n.viewcount;
            wx.navigateToMiniProgram({
                appId: "wx0d7f9a7816347b3d",
                path: "/pages/video/index?pgv_ref=tencenttianqi&id=" + i + "&title=" + c + "&img=" + r + "&view_count=" + l + "&likecount=0"
            });
        } else "video" == o && a.videos(i);
        a.clickBOSS({
            fun: s,
            modular: o
        });
    },
    onReachBottom: function() {
        console.log(++this.data.curpage), this.getVideos();
    },
    getVideos: function() {
        var e = this;
        this.loadBldata(), wx.request({
            url: "https://pacaio.match.qq.com/irs/rcd",
            data: {
                cid: 14,
                token: "d66a99965aad83253ea69e6f47e574a6",
                page: this.data.curpage
            },
            success: function(t) {
                var a = e.data.relateVideos, i = t.data.data;
                if (null != a) {
                    for (var s = 0; s < i.length; s++) a.push(i[s]);
                    e.setData({
                        relateVideos: a
                    });
                } else e.setData({
                    relateVideos: i
                });
            }
        });
    },
    loadBldata: function() {
        var e = this;
        wx.request({
            url: "https://mat1.gtimg.com/rain/bl20/json/37.js",
            dataType: "javascript",
            header: {
                "content-type": "application/javascript"
            },
            success: function(t) {
                for (var a = JSON.parse(t.data.substring(t.data.indexOf("=") + 1)), i = [], s = 0; s < a.length; s++) if ("热门" == a[s].name) for (var o = a[s].videos, n = 0; n < o.length; n++) {
                    var r = new Date().getTime(), c = new Date(o[n].starttime + "+08:00").getTime(), l = new Date(o[n].endtime + "+08:00").getTime();
                    c < r && l > r && "number" == typeof o[s].order && o[s].order >= 0 && i.push(o[n]);
                }
                var d = i.length;
                e.setData({
                    blVideos: i,
                    feedsum: d
                });
            }
        });
    },
    changeChannel: function(e) {
        var t = e.currentTarget.dataset, i = t.index, s = t.name, o = t.fun;
        this.setData({
            currentIndex: i
        }), wx.navigateToMiniProgram({
            appId: "wx0d7f9a7816347b3d",
            path: "/pages/index/index?pgv_ref=tencenttianqi&tabName=" + s
        }), a.clickBOSS({
            fun: o
        });
    },
    onShareAppMessage: function () {
    },
    onShareTimeline: function (e) {
    },
});