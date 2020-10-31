function t(t) {
    wx.getNetworkType({
        success: function(e) {
            t(e.networkType);
        }
    });
}

function e() {
    var t = wx.getSystemInfoSync();
    return {
        adt: t.model,
        scl: t.pixelRatio,
        scr: t.windowWidth + "x" + t.windowHeight,
        lg: t.language,
        fl: t.version,
        jv: t.system,
        tz: t.platform
    };
}

function n() {
    try {
        return wx.getStorageSync(h.prefix + "auid");
    } catch (t) {}
}

function r() {
    try {
        var t = i();
        return wx.setStorageSync(h.prefix + "auid", t), t;
    } catch (t) {}
}

function a() {
    try {
        return wx.getStorageSync(h.prefix + "ssid");
    } catch (t) {}
}

function o() {
    try {
        var t = "s" + i();
        return wx.setStorageSync(h.prefix + "ssid", t), t;
    } catch (t) {}
}

function i(t) {
    return (t || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date() % 1e10;
}

function s() {
    try {
        var t = getCurrentPages(), e = "/";
        return 0 < t.length && (e = t.pop().__route__), e;
    } catch (t) {
        console.log("get current page path error:" + t);
    }
}

function p() {
    var t = {
        dm: "wechat.apps.xx",
        url: s(),
        pvi: "",
        si: "",
        ty: 0
    };
    return t.pvi = function() {
        var e = n();
        return e || (e = r(), t.ty = 1), e;
    }(), t.si = function() {
        var t = a();
        return t || (t = o()), t;
    }(), t;
}

function u() {
    var n = e();
    return t(function(t) {
        wx.setStorageSync(h.prefix + "ntdata", t);
    }), n.ct = wx.getStorageSync(h.prefix + "ntdata") || "4g", n;
}

function c() {
    return {
        r2: h.app_id,
        r4: "wx",
        ext: "v=" + h.version
    };
}

var h = {
    app_id: "",
    event_id: "",
    api_base: "https://pingtas.qq.com/pingd",
    prefix: "_mta_",
    version: "1.3.1",
    stat_share_app: !1,
    stat_pull_down_fresh: !1,
    stat_reach_bottom: !1
}, f = {
    App: {
        init: function(t) {
            "appID" in t && (h.app_id = t.appID), "eventID" in t && (h.event_id = t.eventID), 
            "statShareApp" in t && (h.stat_share_app = t.statShareApp), "statPullDownFresh" in t && (h.stat_pull_down_fresh = t.statPullDownFresh), 
            "statReachBottom" in t && (h.stat_reach_bottom = t.statReachBottom), o();
        }
    },
    Page: {
        init: function() {
            var t = getCurrentPages()[getCurrentPages().length - 1];
            t.onShow && function() {
                var e = t.onShow;
                t.onShow = function() {
                    f.Page.stat(), e.call(this, arguments);
                };
            }(), h.stat_pull_down_fresh && t.onPullDownRefresh && function() {
                var e = t.onPullDownRefresh;
                t.onPullDownRefresh = function() {
                    f.Event.stat(h.prefix + "pulldownfresh"), e.call(this, arguments);
                };
            }(), h.stat_reach_bottom && t.onReachBottom && function() {
                var e = t.onReachBottom;
                t.onReachBottom = function() {
                    f.Event.stat(h.prefix + "reachbottom"), e.call(this, arguments);
                };
            }(), h.stat_share_app && t.onShareAppMessage && function() {
                var e = t.onShareAppMessage;
                t.onShareAppMessage = function() {
                    return f.Event.stat(h.prefix + "shareapp", {
                        url: t.__route__
                    }), e.call(this, arguments);
                };
            }();
        },
        stat: function() {
            if ("" != h.app_id) {
                for (var t = [], e = 0, n = [ p(), u(), c(), {
                    rand: +new Date()
                } ], r = n.length; e < r; e++) for (var a in n[e]) n[e].hasOwnProperty(a) && t.push(a + "=" + (void 0 === n[e][a] ? "" : n[e][a]));
                wx.request({
                    url: h.api_base + "?" + t.join("&").toLowerCase()
                });
            }
        }
    },
    Event: {
        stat: function(t, e) {
            if ("" != h.event_id) {
                var n = [], r = p(), a = c();
                r.dm = "wxapps.click", r.url = t, a.r2 = h.event_id;
                var o;
                o = void 0 === e ? {} : e;
                var i, s = [];
                for (i in o) o.hasOwnProperty(i) && s.push(i + "=" + o[i]);
                for (o = s.join(";"), a.r5 = o, o = 0, a = (r = [ r, u(), a, {
                    rand: +new Date()
                } ]).length; o < a; o++) for (var f in r[o]) r[o].hasOwnProperty(f) && n.push(f + "=" + (void 0 === r[o][f] ? "" : r[o][f]));
                wx.request({
                    url: h.api_base + "?" + n.join("&").toLowerCase()
                });
            }
        }
    }
};

module.exports = f;