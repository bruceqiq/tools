Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {}, e = {
    a1: "#A3D765",
    a2: "#F0CC35",
    a3: "#F1AB62",
    a4: "#EF7F77",
    a5: "#B28CCB",
    a6: "#AD788A"
}, s = {
    C1: {
        start: "#86c3ca",
        stop: "#b5e9e8"
    },
    C2: {
        start: "#3bbcff",
        stop: "#4af4ff"
    },
    C2N: {
        start: "#313877",
        stop: "#44abec"
    },
    C3: {
        start: "#43697f",
        stop: "#abd2d7"
    },
    C4: {
        start: "#67a1dc",
        stop: "#a8e0f7"
    },
    C5: {
        start: "#81aedc",
        stop: "#a9def1"
    },
    C6: {
        start: "#9b9b96",
        stop: "#c1c1bc"
    },
    C7: {
        start: "#c09461",
        stop: "#eedfa1"
    },
    C8: {
        start: "#3bbcff",
        stop: "#4af4ff"
    },
    C9: {
        start: "#50ade8",
        stop: "#7ae0fa"
    },
    C9N: {
        start: "#313877",
        stop: "#44abec"
    },
    chunjie: {
        start: "#fc6f6d",
        stop: "#ffccb6"
    }
}, o = {
    "00": "C2",
    "01": "C9",
    "02": "C1",
    "03": "C3",
    "04": "C3",
    "05": "C3",
    "06": "C3",
    "07": "C3",
    "08": "C3",
    "09": "C3",
    10: "C3",
    11: "C3",
    12: "C3",
    13: "C4",
    14: "C4",
    15: "C4",
    16: "C4",
    17: "C4",
    18: "C5",
    19: "C3",
    20: "C7",
    21: "C3",
    22: "C3",
    23: "C3",
    24: "C3",
    25: "C3",
    26: "C4",
    27: "C4",
    28: "C4",
    29: "C7",
    30: "C7",
    301: "C3",
    302: "C4",
    31: "C7",
    32: "C5",
    49: "C5",
    53: "C6",
    54: "C6",
    55: "C6",
    56: "C6",
    57: "C5",
    58: "C5",
    99: "C8"
}, r = {
    city: "北京",
    district: "海淀",
    province: "北京"
}, c = [ {
    city: "北京",
    province: "北京"
}, {
    city: "上海",
    province: "上海"
}, {
    city: "广州",
    province: "广东"
}, {
    city: "深圳",
    province: "广东"
}, {
    city: "郑州",
    province: "河南"
}, {
    city: "西安",
    province: "陕西"
}, {
    city: "南京",
    province: "江苏"
}, {
    city: "杭州",
    province: "浙江"
}, {
    city: "武汉",
    province: "湖北"
}, {
    city: "成都",
    province: "四川"
}, {
    city: "沈阳",
    province: "辽宁"
}, {
    city: "天津",
    province: "天津"
} ], i = [ {
    shortname: "故宫",
    tourist: "故宫博物院"
}, {
    shortname: "颐和园",
    tourist: "颐和园"
}, {
    shortname: "九寨沟",
    tourist: "九寨沟风景区"
}, {
    shortname: "凤凰古城",
    tourist: "凤凰古城景区"
}, {
    shortname: "秦始皇陵",
    tourist: "秦始皇陵"
}, {
    shortname: "龙门石窟",
    tourist: "龙门石窟景区"
}, {
    shortname: "武陵源",
    tourist: "武陵源风景名胜区"
}, {
    shortname: "华山",
    tourist: "华山风景名胜区"
}, {
    shortname: "黄山",
    tourist: "黄山风景区(山麓)"
} ], a = {}, C = [], p = [ "carlimit", "clothes", "umbrella", "cold", "carwash", "sports", "sunscreen", "fish", "tourism", "traffic", "diffusion", "comfort", "drying", "makeup", "morning", "allergy", "heatstroke" ], n = {}, f = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ], u = [ "昨天", "今天", "明天", "后天" ], x = {
    0: "微风",
    1: "东北风",
    2: "东风",
    3: "东南风",
    4: "南风",
    5: "西南风",
    6: "西风",
    7: "西北风",
    8: "北风",
    9: "旋转风"
}, h = [ {
    title: "热门",
    fun: "rm"
}, {
    title: "正能量",
    fun: "znl"
}, {
    title: "广场舞",
    fun: "gcw"
}, {
    title: "祝福",
    fun: "zf"
}, {
    title: "健康",
    fun: "jk"
}, {
    title: "妙招",
    fun: "mz"
} ];

exports.BaseAPI = "https://wis.qq.com", exports.MapAPI = "https://apis.map.qq.com/ws/geocoder/v1/?key=3BFBZ-ZKD3X-LW54A-ZT76D-E7AHO-4RBD5&location=", 
exports.VoiceAPI = "https://wx.cpcwe.com/index/voice", exports.allWeatherInfo = t, 
exports.apiBgCss = e, exports.bgCss = s, exports.classKeys = o, exports.debug = !1, 
exports.defaultLocation = r, exports.hotCity = c, exports.hotScenic = i, exports.isGetLocation = !1, 
exports.scale = .5, exports.searchLocation = a, exports.searchResults = C, exports.service = p, 
exports.showUpdateTime = 5e3, exports.systemInfo = n, exports.weekDay = f, exports.weekDayCn = u, 
exports.windDirection = x, exports.channel = h;