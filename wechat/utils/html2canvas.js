var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, n) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) && "object" === ("undefined" == typeof module ? "undefined" : e(module)) ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? exports.html2canvas = n() : t.html2canvas = n();
}(void 0, function() {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            });
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return t.d(n, "a", n), n;
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, t.p = "", t(t.s = 22);
    }([ function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                var n = [], r = !0, o = !1, a = void 0;
                try {
                    for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (e) {
                    o = !0, a = e;
                } finally {
                    try {
                        !r && u.return && u.return();
                    } finally {
                        if (o) throw a;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), i = /^#([a-f0-9]{3})$/i, u = function(e) {
            var t = e.match(i);
            return !!t && [ parseInt(t[1][0] + t[1][0], 16), parseInt(t[1][1] + t[1][1], 16), parseInt(t[1][2] + t[1][2], 16), null ];
        }, l = /^#([a-f0-9]{6})$/i, s = function(e) {
            var t = e.match(l);
            return !!t && [ parseInt(t[1].substring(0, 2), 16), parseInt(t[1].substring(2, 4), 16), parseInt(t[1].substring(4, 6), 16), null ];
        }, c = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/, d = function(e) {
            var t = e.match(c);
            return !!t && [ Number(t[1]), Number(t[2]), Number(t[3]), null ];
        }, f = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/, h = function(e) {
            var t = e.match(f);
            return !!(t && t.length > 4) && [ Number(t[1]), Number(t[2]), Number(t[3]), Number(t[4]) ];
        }, g = function(e) {
            return [ Math.min(e[0], 255), Math.min(e[1], 255), Math.min(e[2], 255), e.length > 3 ? e[3] : null ];
        }, p = function(e) {
            var t = v[e.toLowerCase()];
            return t || !1;
        }, m = function() {
            function e(t) {
                r(this, e);
                var n = Array.isArray(t) ? g(t) : u(t) || d(t) || h(t) || p(t) || s(t) || [ 0, 0, 0, null ], a = o(n, 4), i = a[0], l = a[1], c = a[2], f = a[3];
                this.r = i, this.g = l, this.b = c, this.a = f;
            }
            return a(e, [ {
                key: "isTransparent",
                value: function() {
                    return 0 === this.a;
                }
            }, {
                key: "toString",
                value: function() {
                    return null !== this.a && 1 !== this.a ? "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")" : "rgb(" + this.r + "," + this.g + "," + this.b + ")";
                }
            } ]), e;
        }();
        t.default = m;
        var v = {
            transparent: [ 0, 0, 0, 0 ],
            aliceblue: [ 240, 248, 255, null ],
            antiquewhite: [ 250, 235, 215, null ],
            aqua: [ 0, 255, 255, null ],
            aquamarine: [ 127, 255, 212, null ],
            azure: [ 240, 255, 255, null ],
            beige: [ 245, 245, 220, null ],
            bisque: [ 255, 228, 196, null ],
            black: [ 0, 0, 0, null ],
            blanchedalmond: [ 255, 235, 205, null ],
            blue: [ 0, 0, 255, null ],
            blueviolet: [ 138, 43, 226, null ],
            brown: [ 165, 42, 42, null ],
            burlywood: [ 222, 184, 135, null ],
            cadetblue: [ 95, 158, 160, null ],
            chartreuse: [ 127, 255, 0, null ],
            chocolate: [ 210, 105, 30, null ],
            coral: [ 255, 127, 80, null ],
            cornflowerblue: [ 100, 149, 237, null ],
            cornsilk: [ 255, 248, 220, null ],
            crimson: [ 220, 20, 60, null ],
            cyan: [ 0, 255, 255, null ],
            darkblue: [ 0, 0, 139, null ],
            darkcyan: [ 0, 139, 139, null ],
            darkgoldenrod: [ 184, 134, 11, null ],
            darkgray: [ 169, 169, 169, null ],
            darkgreen: [ 0, 100, 0, null ],
            darkgrey: [ 169, 169, 169, null ],
            darkkhaki: [ 189, 183, 107, null ],
            darkmagenta: [ 139, 0, 139, null ],
            darkolivegreen: [ 85, 107, 47, null ],
            darkorange: [ 255, 140, 0, null ],
            darkorchid: [ 153, 50, 204, null ],
            darkred: [ 139, 0, 0, null ],
            darksalmon: [ 233, 150, 122, null ],
            darkseagreen: [ 143, 188, 143, null ],
            darkslateblue: [ 72, 61, 139, null ],
            darkslategray: [ 47, 79, 79, null ],
            darkslategrey: [ 47, 79, 79, null ],
            darkturquoise: [ 0, 206, 209, null ],
            darkviolet: [ 148, 0, 211, null ],
            deeppink: [ 255, 20, 147, null ],
            deepskyblue: [ 0, 191, 255, null ],
            dimgray: [ 105, 105, 105, null ],
            dimgrey: [ 105, 105, 105, null ],
            dodgerblue: [ 30, 144, 255, null ],
            firebrick: [ 178, 34, 34, null ],
            floralwhite: [ 255, 250, 240, null ],
            forestgreen: [ 34, 139, 34, null ],
            fuchsia: [ 255, 0, 255, null ],
            gainsboro: [ 220, 220, 220, null ],
            ghostwhite: [ 248, 248, 255, null ],
            gold: [ 255, 215, 0, null ],
            goldenrod: [ 218, 165, 32, null ],
            gray: [ 128, 128, 128, null ],
            green: [ 0, 128, 0, null ],
            greenyellow: [ 173, 255, 47, null ],
            grey: [ 128, 128, 128, null ],
            honeydew: [ 240, 255, 240, null ],
            hotpink: [ 255, 105, 180, null ],
            indianred: [ 205, 92, 92, null ],
            indigo: [ 75, 0, 130, null ],
            ivory: [ 255, 255, 240, null ],
            khaki: [ 240, 230, 140, null ],
            lavender: [ 230, 230, 250, null ],
            lavenderblush: [ 255, 240, 245, null ],
            lawngreen: [ 124, 252, 0, null ],
            lemonchiffon: [ 255, 250, 205, null ],
            lightblue: [ 173, 216, 230, null ],
            lightcoral: [ 240, 128, 128, null ],
            lightcyan: [ 224, 255, 255, null ],
            lightgoldenrodyellow: [ 250, 250, 210, null ],
            lightgray: [ 211, 211, 211, null ],
            lightgreen: [ 144, 238, 144, null ],
            lightgrey: [ 211, 211, 211, null ],
            lightpink: [ 255, 182, 193, null ],
            lightsalmon: [ 255, 160, 122, null ],
            lightseagreen: [ 32, 178, 170, null ],
            lightskyblue: [ 135, 206, 250, null ],
            lightslategray: [ 119, 136, 153, null ],
            lightslategrey: [ 119, 136, 153, null ],
            lightsteelblue: [ 176, 196, 222, null ],
            lightyellow: [ 255, 255, 224, null ],
            lime: [ 0, 255, 0, null ],
            limegreen: [ 50, 205, 50, null ],
            linen: [ 250, 240, 230, null ],
            magenta: [ 255, 0, 255, null ],
            maroon: [ 128, 0, 0, null ],
            mediumaquamarine: [ 102, 205, 170, null ],
            mediumblue: [ 0, 0, 205, null ],
            mediumorchid: [ 186, 85, 211, null ],
            mediumpurple: [ 147, 112, 219, null ],
            mediumseagreen: [ 60, 179, 113, null ],
            mediumslateblue: [ 123, 104, 238, null ],
            mediumspringgreen: [ 0, 250, 154, null ],
            mediumturquoise: [ 72, 209, 204, null ],
            mediumvioletred: [ 199, 21, 133, null ],
            midnightblue: [ 25, 25, 112, null ],
            mintcream: [ 245, 255, 250, null ],
            mistyrose: [ 255, 228, 225, null ],
            moccasin: [ 255, 228, 181, null ],
            navajowhite: [ 255, 222, 173, null ],
            navy: [ 0, 0, 128, null ],
            oldlace: [ 253, 245, 230, null ],
            olive: [ 128, 128, 0, null ],
            olivedrab: [ 107, 142, 35, null ],
            orange: [ 255, 165, 0, null ],
            orangered: [ 255, 69, 0, null ],
            orchid: [ 218, 112, 214, null ],
            palegoldenrod: [ 238, 232, 170, null ],
            palegreen: [ 152, 251, 152, null ],
            paleturquoise: [ 175, 238, 238, null ],
            palevioletred: [ 219, 112, 147, null ],
            papayawhip: [ 255, 239, 213, null ],
            peachpuff: [ 255, 218, 185, null ],
            peru: [ 205, 133, 63, null ],
            pink: [ 255, 192, 203, null ],
            plum: [ 221, 160, 221, null ],
            powderblue: [ 176, 224, 230, null ],
            purple: [ 128, 0, 128, null ],
            rebeccapurple: [ 102, 51, 153, null ],
            red: [ 255, 0, 0, null ],
            rosybrown: [ 188, 143, 143, null ],
            royalblue: [ 65, 105, 225, null ],
            saddlebrown: [ 139, 69, 19, null ],
            salmon: [ 250, 128, 114, null ],
            sandybrown: [ 244, 164, 96, null ],
            seagreen: [ 46, 139, 87, null ],
            seashell: [ 255, 245, 238, null ],
            sienna: [ 160, 82, 45, null ],
            silver: [ 192, 192, 192, null ],
            skyblue: [ 135, 206, 235, null ],
            slateblue: [ 106, 90, 205, null ],
            slategray: [ 112, 128, 144, null ],
            slategrey: [ 112, 128, 144, null ],
            snow: [ 255, 250, 250, null ],
            springgreen: [ 0, 255, 127, null ],
            steelblue: [ 70, 130, 180, null ],
            tan: [ 210, 180, 140, null ],
            teal: [ 0, 128, 128, null ],
            thistle: [ 216, 191, 216, null ],
            tomato: [ 255, 99, 71, null ],
            turquoise: [ 64, 224, 208, null ],
            violet: [ 238, 130, 238, null ],
            wheat: [ 245, 222, 179, null ],
            white: [ 255, 255, 255, null ],
            whitesmoke: [ 245, 245, 245, null ],
            yellow: [ 255, 255, 0, null ],
            yellowgreen: [ 154, 205, 50, null ]
        };
        t.TRANSPARENT = new m([ 0, 0, 0, 0 ]);
    }, function(e, t, n) {
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.parseBoundCurves = t.calculatePaddingBoxPath = t.calculateBorderBoxPath = t.parsePathForBorder = t.parseDocumentSize = t.calculateContentBox = t.calculatePaddingBox = t.parseBounds = t.Bounds = void 0;
        var a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), i = r(n(7)), u = r(n(27)), l = t.Bounds = function() {
            function e(t, n, r, a) {
                o(this, e), this.left = t, this.top = n, this.width = r, this.height = a;
            }
            return a(e, null, [ {
                key: "fromClientRect",
                value: function(t, n, r) {
                    return new e(t.left + n, t.top + r, t.width, t.height);
                }
            } ]), e;
        }(), s = (t.parseBounds = function(e, t, n) {
            return l.fromClientRect(e.getBoundingClientRect(), t, n);
        }, t.calculatePaddingBox = function(e, t) {
            return new l(e.left + t[3].borderWidth, e.top + t[0].borderWidth, e.width - (t[1].borderWidth + t[3].borderWidth), e.height - (t[0].borderWidth + t[2].borderWidth));
        }, t.calculateContentBox = function(e, t, n) {
            var r = t[0].value, o = t[1].value, a = t[2].value, i = t[3].value;
            return new l(e.left + i + n[3].borderWidth, e.top + r + n[0].borderWidth, e.width - (n[1].borderWidth + n[3].borderWidth + i + o), e.height - (n[0].borderWidth + n[2].borderWidth + r + a));
        }, t.parseDocumentSize = function(e) {
            var t = e.body, n = e.documentElement;
            if (!t || !n) throw new Error("Unable to get document size");
            var r = Math.max(Math.max(t.scrollWidth, n.scrollWidth), Math.max(t.offsetWidth, n.offsetWidth), Math.max(t.clientWidth, n.clientWidth)), o = Math.max(Math.max(t.scrollHeight, n.scrollHeight), Math.max(t.offsetHeight, n.offsetHeight), Math.max(t.clientHeight, n.clientHeight));
            return new l(0, 0, r, o);
        }, t.parsePathForBorder = function(e, t) {
            switch (t) {
              case 0:
                return s(e.topLeftOuter, e.topLeftInner, e.topRightOuter, e.topRightInner);

              case 1:
                return s(e.topRightOuter, e.topRightInner, e.bottomRightOuter, e.bottomRightInner);

              case 2:
                return s(e.bottomRightOuter, e.bottomRightInner, e.bottomLeftOuter, e.bottomLeftInner);

              case 3:
              default:
                return s(e.bottomLeftOuter, e.bottomLeftInner, e.topLeftOuter, e.topLeftInner);
            }
        }, function(e, t, n, r) {
            var o = [];
            return e instanceof u.default ? o.push(e.subdivide(.5, !1)) : o.push(e), n instanceof u.default ? o.push(n.subdivide(.5, !0)) : o.push(n), 
            r instanceof u.default ? o.push(r.subdivide(.5, !0).reverse()) : o.push(r), t instanceof u.default ? o.push(t.subdivide(.5, !1).reverse()) : o.push(t), 
            o;
        }), c = (t.calculateBorderBoxPath = function(e) {
            return [ e.topLeftOuter, e.topRightOuter, e.bottomRightOuter, e.bottomLeftOuter ];
        }, t.calculatePaddingBoxPath = function(e) {
            return [ e.topLeftInner, e.topRightInner, e.bottomRightInner, e.bottomLeftInner ];
        }, t.parseBoundCurves = function(e, t, n) {
            var r = e.width / 2, o = e.height / 2, a = n[c.TOP_LEFT][0].getAbsoluteValue(e.width) < r ? n[c.TOP_LEFT][0].getAbsoluteValue(e.width) : r, u = n[c.TOP_LEFT][1].getAbsoluteValue(e.height) < o ? n[c.TOP_LEFT][1].getAbsoluteValue(e.height) : o, l = n[c.TOP_RIGHT][0].getAbsoluteValue(e.width) < r ? n[c.TOP_RIGHT][0].getAbsoluteValue(e.width) : r, s = n[c.TOP_RIGHT][1].getAbsoluteValue(e.height) < o ? n[c.TOP_RIGHT][1].getAbsoluteValue(e.height) : o, f = n[c.BOTTOM_RIGHT][0].getAbsoluteValue(e.width) < r ? n[c.BOTTOM_RIGHT][0].getAbsoluteValue(e.width) : r, h = n[c.BOTTOM_RIGHT][1].getAbsoluteValue(e.height) < o ? n[c.BOTTOM_RIGHT][1].getAbsoluteValue(e.height) : o, g = n[c.BOTTOM_LEFT][0].getAbsoluteValue(e.width) < r ? n[c.BOTTOM_LEFT][0].getAbsoluteValue(e.width) : r, p = n[c.BOTTOM_LEFT][1].getAbsoluteValue(e.height) < o ? n[c.BOTTOM_LEFT][1].getAbsoluteValue(e.height) : o, m = e.width - l, v = e.height - h, y = e.width - f, b = e.height - p;
            return {
                topLeftOuter: a > 0 || u > 0 ? d(e.left, e.top, a, u, c.TOP_LEFT) : new i.default(e.left, e.top),
                topLeftInner: a > 0 || u > 0 ? d(e.left + t[3].borderWidth, e.top + t[0].borderWidth, Math.max(0, a - t[3].borderWidth), Math.max(0, u - t[0].borderWidth), c.TOP_LEFT) : new i.default(e.left + t[3].borderWidth, e.top + t[0].borderWidth),
                topRightOuter: l > 0 || s > 0 ? d(e.left + m, e.top, l, s, c.TOP_RIGHT) : new i.default(e.left + e.width, e.top),
                topRightInner: l > 0 || s > 0 ? d(e.left + Math.min(m, e.width + t[3].borderWidth), e.top + t[0].borderWidth, m > e.width + t[3].borderWidth ? 0 : l - t[3].borderWidth, s - t[0].borderWidth, c.TOP_RIGHT) : new i.default(e.left + e.width - t[1].borderWidth, e.top + t[0].borderWidth),
                bottomRightOuter: f > 0 || h > 0 ? d(e.left + y, e.top + v, f, h, c.BOTTOM_RIGHT) : new i.default(e.left + e.width, e.top + e.height),
                bottomRightInner: f > 0 || h > 0 ? d(e.left + Math.min(y, e.width - t[3].borderWidth), e.top + Math.min(v, e.height + t[0].borderWidth), Math.max(0, f - t[1].borderWidth), h - t[2].borderWidth, c.BOTTOM_RIGHT) : new i.default(e.left + e.width - t[1].borderWidth, e.top + e.height - t[2].borderWidth),
                bottomLeftOuter: g > 0 || p > 0 ? d(e.left, e.top + b, g, p, c.BOTTOM_LEFT) : new i.default(e.left, e.top + e.height),
                bottomLeftInner: g > 0 || p > 0 ? d(e.left + t[3].borderWidth, e.top + b, Math.max(0, g - t[3].borderWidth), p - t[2].borderWidth, c.BOTTOM_LEFT) : new i.default(e.left + t[3].borderWidth, e.top + e.height - t[2].borderWidth)
            };
        }, {
            TOP_LEFT: 0,
            TOP_RIGHT: 1,
            BOTTOM_RIGHT: 2,
            BOTTOM_LEFT: 3
        }), d = function(e, t, n, r, o) {
            var a = (Math.sqrt(2) - 1) / 3 * 4, l = n * a, s = r * a, d = e + n, f = t + r;
            switch (o) {
              case c.TOP_LEFT:
                return new u.default(new i.default(e, f), new i.default(e, f - s), new i.default(d - l, t), new i.default(d, t));

              case c.TOP_RIGHT:
                return new u.default(new i.default(e, t), new i.default(e + l, t), new i.default(d, f - s), new i.default(d, f));

              case c.BOTTOM_RIGHT:
                return new u.default(new i.default(d, t), new i.default(d, t + s), new i.default(e + l, f), new i.default(e, f));

              case c.BOTTOM_LEFT:
              default:
                return new u.default(new i.default(d, f), new i.default(d - l, f), new i.default(e, t + s), new i.default(e, t));
            }
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.calculateLengthFromValueWithUnit = t.LENGTH_TYPE = void 0;
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = (function(e) {
            e && e.__esModule;
        }(n(5)), t.LENGTH_TYPE = {
            PX: 0,
            PERCENTAGE: 1
        }), i = function() {
            function e(t) {
                r(this, e), this.type = "%" === t.substr(t.length - 1) ? a.PERCENTAGE : a.PX;
                var n = parseFloat(t);
                isNaN(n) && console.error('Invalid value given for Length: "' + t + '"'), this.value = isNaN(n) ? 0 : n;
            }
            return o(e, [ {
                key: "isPercentage",
                value: function() {
                    return this.type === a.PERCENTAGE;
                }
            }, {
                key: "getAbsoluteValue",
                value: function(e) {
                    return this.isPercentage() ? e * (this.value / 100) : this.value;
                }
            } ], [ {
                key: "create",
                value: function(t) {
                    return new e(t);
                }
            } ]), e;
        }();
        t.default = i;
        var u = function e(t) {
            var n = t.parent;
            return n ? e(n) : parseFloat(t.style.font.fontSize);
        };
        t.calculateLengthFromValueWithUnit = function(e, t, n) {
            switch (n) {
              case "px":
              case "%":
                return new i(t + n);

              case "em":
              case "rem":
                var r = new i(t);
                return r.value *= "em" === n ? parseFloat(e.style.font.fontSize) : u(e), r;

              default:
                return new i("0");
            }
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.contains = function(e, t) {
            return 0 != (e & t);
        }, t.distance = function(e, t) {
            return Math.sqrt(e * e + t * t);
        }, t.copyCSSStyles = function(e, t) {
            for (var n = e.length - 1; n >= 0; n--) {
                var r = e.item(n);
                "content" !== r && t.style.setProperty(r, e.getPropertyValue(r));
            }
            return t;
        }, t.SMALL_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.PATH = {
            VECTOR: 0,
            BEZIER_CURVE: 1,
            CIRCLE: 2
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(0)), i = n(3), u = n(6), l = n(10), s = n(28), c = n(29), d = n(30), f = n(31), h = n(32), g = n(33), p = n(14), m = n(15), v = n(9), y = n(34), b = n(16), w = n(35), E = n(36), T = n(37), O = n(1), I = n(17), _ = [ "INPUT", "TEXTAREA", "SELECT" ], R = function() {
            function e(t, n, o, i) {
                var R = this;
                r(this, e), this.parent = n, this.index = i, this.childNodes = [];
                var x = t.ownerDocument.defaultView, N = x.pageXOffset, S = x.pageYOffset, A = x.getComputedStyle(t, null), C = (0, 
                c.parseDisplay)(A.display), L = "radio" === t.type || "checkbox" === t.type, M = (0, 
                m.parsePosition)(A.position);
                this.style = {
                    background: L ? I.INPUT_BACKGROUND : (0, u.parseBackground)(A, o),
                    border: L ? I.INPUT_BORDERS : (0, l.parseBorder)(A),
                    borderRadius: (t instanceof x.HTMLInputElement || t instanceof HTMLInputElement) && L ? (0, 
                    I.getInputBorderRadius)(t) : (0, s.parseBorderRadius)(A),
                    color: L ? I.INPUT_COLOR : new a.default(A.color),
                    display: C,
                    float: (0, d.parseCSSFloat)(A.float),
                    font: (0, f.parseFont)(A),
                    letterSpacing: (0, h.parseLetterSpacing)(A.letterSpacing),
                    opacity: parseFloat(A.opacity),
                    overflow: -1 === _.indexOf(t.tagName) ? (0, g.parseOverflow)(A.overflow) : g.OVERFLOW.HIDDEN,
                    padding: (0, p.parsePadding)(A),
                    position: M,
                    textDecoration: (0, v.parseTextDecoration)(A),
                    textShadow: (0, y.parseTextShadow)(A.textShadow),
                    textTransform: (0, b.parseTextTransform)(A.textTransform),
                    transform: (0, w.parseTransform)(A),
                    visibility: (0, E.parseVisibility)(A.visibility),
                    zIndex: (0, T.parseZIndex)(M !== m.POSITION.STATIC ? A.zIndex : "auto")
                }, this.isTransformed() && (t.style.transform = "matrix(1,0,0,1,0,0)"), "IMG" === t.tagName && t.addEventListener("load", function() {
                    R.bounds = (0, O.parseBounds)(t, N, S), R.curvedBounds = (0, O.parseBoundCurves)(R.bounds, R.style.border, R.style.borderRadius);
                }), this.image = P(t, o), this.bounds = L ? (0, I.reformatInputBounds)((0, O.parseBounds)(t, N, S)) : (0, 
                O.parseBounds)(t, N, S), this.curvedBounds = (0, O.parseBoundCurves)(this.bounds, this.style.border, this.style.borderRadius), 
                this.name = t.tagName.toLowerCase() + (t.id ? "#" + t.id : "") + t.className.toString().split(" ").map(function(e) {
                    return e.length ? "." + e : "";
                }).join("");
            }
            return o(e, [ {
                key: "getClipPaths",
                value: function() {
                    var e = this.parent ? this.parent.getClipPaths() : [];
                    return this.style.overflow === g.OVERFLOW.HIDDEN || this.style.overflow === g.OVERFLOW.SCROLL ? e.concat([ (0, 
                    O.calculatePaddingBoxPath)(this.curvedBounds) ]) : e;
                }
            }, {
                key: "isInFlow",
                value: function() {
                    return this.isRootElement() && !this.isFloating() && !this.isAbsolutelyPositioned();
                }
            }, {
                key: "isVisible",
                value: function() {
                    return !(0, i.contains)(this.style.display, c.DISPLAY.NONE) && this.style.opacity > 0 && this.style.visibility === E.VISIBILITY.VISIBLE;
                }
            }, {
                key: "isAbsolutelyPositioned",
                value: function() {
                    return this.style.position !== m.POSITION.STATIC && this.style.position !== m.POSITION.RELATIVE;
                }
            }, {
                key: "isPositioned",
                value: function() {
                    return this.style.position !== m.POSITION.STATIC;
                }
            }, {
                key: "isFloating",
                value: function() {
                    return this.style.float !== d.FLOAT.NONE;
                }
            }, {
                key: "isRootElement",
                value: function() {
                    return null === this.parent;
                }
            }, {
                key: "isTransformed",
                value: function() {
                    return null !== this.style.transform;
                }
            }, {
                key: "isPositionedWithZIndex",
                value: function() {
                    return this.isPositioned() && !this.style.zIndex.auto;
                }
            }, {
                key: "isInlineLevel",
                value: function() {
                    return (0, i.contains)(this.style.display, c.DISPLAY.INLINE) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_BLOCK) || (0, 
                    i.contains)(this.style.display, c.DISPLAY.INLINE_FLEX) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_GRID) || (0, 
                    i.contains)(this.style.display, c.DISPLAY.INLINE_LIST_ITEM) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_TABLE);
                }
            }, {
                key: "isInlineBlockOrInlineTable",
                value: function() {
                    return (0, i.contains)(this.style.display, c.DISPLAY.INLINE_BLOCK) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_TABLE);
                }
            } ]), e;
        }();
        t.default = R;
        var P = function(e, t) {
            if (e instanceof e.ownerDocument.defaultView.SVGSVGElement || e instanceof SVGSVGElement) {
                var n = new XMLSerializer();
                return t.loadImage("data:image/svg+xml," + encodeURIComponent(n.serializeToString(e)));
            }
            switch (e.tagName) {
              case "IMG":
                var r = e;
                return t.loadImage(r.currentSrc || r.src);

              case "CANVAS":
                var o = e;
                return t.loadCanvas(o);

              case "IFRAME":
                var a = e.getAttribute("data-html2canvas-internal-iframe-key");
                if (a) return a;
            }
            return null;
        };
    }, function(e, t, n) {
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.parseBackgroundImage = t.parseBackground = t.calculateBackgroundRepeatPath = t.calculateBackgroundPosition = t.calculateBackgroungPositioningArea = t.calculateBackgroungPaintingArea = t.calculateGradientBackgroundSize = t.calculateBackgroundSize = t.BACKGROUND_ORIGIN = t.BACKGROUND_CLIP = t.BACKGROUND_SIZE = t.BACKGROUND_REPEAT = void 0;
        var a = r(n(0)), i = r(n(2)), u = r(n(26)), l = r(n(7)), s = n(1), c = n(14), d = t.BACKGROUND_REPEAT = {
            REPEAT: 0,
            NO_REPEAT: 1,
            REPEAT_X: 2,
            REPEAT_Y: 3
        }, f = t.BACKGROUND_SIZE = {
            AUTO: 0,
            CONTAIN: 1,
            COVER: 2,
            LENGTH: 3
        }, h = t.BACKGROUND_CLIP = {
            BORDER_BOX: 0,
            PADDING_BOX: 1,
            CONTENT_BOX: 2
        }, g = t.BACKGROUND_ORIGIN = h, p = function e(t) {
            switch (o(this, e), t) {
              case "contain":
                this.size = f.CONTAIN;
                break;

              case "cover":
                this.size = f.COVER;
                break;

              case "auto":
                this.size = f.AUTO;
                break;

              default:
                this.value = new i.default(t);
            }
        }, m = (t.calculateBackgroundSize = function(e, t, n) {
            var r = 0, o = 0, a = e.size;
            if (a[0].size === f.CONTAIN || a[0].size === f.COVER) {
                var i = n.width / n.height, l = t.width / t.height;
                return i < l != (a[0].size === f.COVER) ? new u.default(n.width, n.width / l) : new u.default(n.height * l, n.height);
            }
            return a[0].value && (r = a[0].value.getAbsoluteValue(n.width)), a[0].size === f.AUTO && a[1].size === f.AUTO ? o = t.height : a[1].size === f.AUTO ? o = r / t.width * t.height : a[1].value && (o = a[1].value.getAbsoluteValue(n.height)), 
            a[0].size === f.AUTO && (r = o / t.height * t.width), new u.default(r, o);
        }, t.calculateGradientBackgroundSize = function(e, t) {
            var n = e.size, r = n[0].value ? n[0].value.getAbsoluteValue(t.width) : t.width, o = n[1].value ? n[1].value.getAbsoluteValue(t.height) : n[0].value ? r : t.height;
            return new u.default(r, o);
        }, new p("auto")), v = (t.calculateBackgroungPaintingArea = function(e, t) {
            switch (t) {
              case h.BORDER_BOX:
                return (0, s.calculateBorderBoxPath)(e);

              case h.PADDING_BOX:
              default:
                return (0, s.calculatePaddingBoxPath)(e);
            }
        }, t.calculateBackgroungPositioningArea = function(e, t, n, r) {
            var o = (0, s.calculatePaddingBox)(t, r);
            switch (e) {
              case g.BORDER_BOX:
                return t;

              case g.CONTENT_BOX:
                var a = n[c.PADDING_SIDES.LEFT].getAbsoluteValue(t.width), i = n[c.PADDING_SIDES.RIGHT].getAbsoluteValue(t.width), u = n[c.PADDING_SIDES.TOP].getAbsoluteValue(t.width), l = n[c.PADDING_SIDES.BOTTOM].getAbsoluteValue(t.width);
                return new s.Bounds(o.left + a, o.top + u, o.width - a - i, o.height - u - l);

              case g.PADDING_BOX:
              default:
                return o;
            }
        }, t.calculateBackgroundPosition = function(e, t, n) {
            return new l.default(e[0].getAbsoluteValue(n.width - t.width), e[1].getAbsoluteValue(n.height - t.height));
        }, t.calculateBackgroundRepeatPath = function(e, t, n, r, o) {
            switch (e.repeat) {
              case d.REPEAT_X:
                return [ new l.default(Math.round(o.left), Math.round(r.top + t.y)), new l.default(Math.round(o.left + o.width), Math.round(r.top + t.y)), new l.default(Math.round(o.left + o.width), Math.round(n.height + r.top + t.y)), new l.default(Math.round(o.left), Math.round(n.height + r.top + t.y)) ];

              case d.REPEAT_Y:
                return [ new l.default(Math.round(r.left + t.x), Math.round(o.top)), new l.default(Math.round(r.left + t.x + n.width), Math.round(o.top)), new l.default(Math.round(r.left + t.x + n.width), Math.round(o.height + o.top)), new l.default(Math.round(r.left + t.x), Math.round(o.height + o.top)) ];

              case d.NO_REPEAT:
                return [ new l.default(Math.round(r.left + t.x), Math.round(r.top + t.y)), new l.default(Math.round(r.left + t.x + n.width), Math.round(r.top + t.y)), new l.default(Math.round(r.left + t.x + n.width), Math.round(r.top + t.y + n.height)), new l.default(Math.round(r.left + t.x), Math.round(r.top + t.y + n.height)) ];

              default:
                return [ new l.default(Math.round(o.left), Math.round(o.top)), new l.default(Math.round(o.left + o.width), Math.round(o.top)), new l.default(Math.round(o.left + o.width), Math.round(o.height + o.top)), new l.default(Math.round(o.left), Math.round(o.height + o.top)) ];
            }
        }, t.parseBackground = function(e, t) {
            return {
                backgroundColor: new a.default(e.backgroundColor),
                backgroundImage: w(e, t),
                backgroundClip: v(e.backgroundClip),
                backgroundOrigin: y(e.backgroundOrigin)
            };
        }, function(e) {
            switch (e) {
              case "padding-box":
                return h.PADDING_BOX;

              case "content-box":
                return h.CONTENT_BOX;
            }
            return h.BORDER_BOX;
        }), y = function(e) {
            switch (e) {
              case "padding-box":
                return g.PADDING_BOX;

              case "content-box":
                return g.CONTENT_BOX;
            }
            return g.BORDER_BOX;
        }, b = function(e) {
            switch (e.trim()) {
              case "no-repeat":
                return d.NO_REPEAT;

              case "repeat-x":
              case "repeat no-repeat":
                return d.REPEAT_X;

              case "repeat-y":
              case "no-repeat repeat":
                return d.REPEAT_Y;

              case "repeat":
                return d.REPEAT;
            }
            return console.error('Invalid background-repeat value "' + e + '"'), d.REPEAT;
        }, w = function(e, t) {
            var n = O(e.backgroundImage).map(function(e) {
                if ("url" === e.method) {
                    var n = t.loadImage(e.args[0]);
                    e.args = n ? [ n ] : [];
                }
                return e;
            }), r = e.backgroundPosition.split(","), o = e.backgroundRepeat.split(","), a = e.backgroundSize.split(",");
            return n.map(function(e, t) {
                var n = (a[t] || "auto").trim().split(" ").map(E), i = (r[t] || "auto").trim().split(" ").map(T);
                return {
                    source: e,
                    repeat: b("string" == typeof o[t] ? o[t] : o[0]),
                    size: n.length < 2 ? [ n[0], m ] : [ n[0], n[1] ],
                    position: i.length < 2 ? [ i[0], i[0] ] : [ i[0], i[1] ]
                };
            });
        }, E = function(e) {
            return "auto" === e ? m : new p(e);
        }, T = function(e) {
            switch (e) {
              case "bottom":
              case "right":
                return new i.default("100%");

              case "left":
              case "top":
                return new i.default("0%");

              case "auto":
                return new i.default("0");
            }
            return new i.default(e);
        }, O = t.parseBackgroundImage = function(e) {
            var t = /^\s$/, n = [], r = [], o = "", a = null, i = "", u = 0, l = 0, s = function() {
                var e = "";
                if (o) {
                    '"' === i.substr(0, 1) && (i = i.substr(1, i.length - 2)), i && r.push(i.trim());
                    var t = o.indexOf("-", 1) + 1;
                    "-" === o.substr(0, 1) && t > 0 && (e = o.substr(0, t).toLowerCase(), o = o.substr(t)), 
                    "none" !== (o = o.toLowerCase()) && n.push({
                        prefix: e,
                        method: o,
                        args: r
                    });
                }
                r = [], o = i = "";
            };
            return e.split("").forEach(function(e) {
                if (0 !== u || !t.test(e)) {
                    switch (e) {
                      case '"':
                        a ? a === e && (a = null) : a = e;
                        break;

                      case "(":
                        if (a) break;
                        if (0 === u) return void (u = 1);
                        l++;
                        break;

                      case ")":
                        if (a) break;
                        if (1 === u) {
                            if (0 === l) return u = 0, void s();
                            l--;
                        }
                        break;

                      case ",":
                        if (a) break;
                        if (0 === u) return void s();
                        if (1 === u && 0 === l && !o.match(/^url$/i)) return r.push(i.trim()), void (i = "");
                    }
                    0 === u ? o += e : i += e;
                }
            }), s(), n;
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(4);
        t.default = function e(t, n) {
            r(this, e), this.type = o.PATH.VECTOR, this.x = t, this.y = n, isNaN(t) && console.error("Invalid x value given for Vector"), 
            isNaN(n) && console.error("Invalid y value given for Vector");
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(19), o = function(e) {
            if (e.createRange) {
                var t = e.createRange();
                if (t.getBoundingClientRect) {
                    var n = e.createElement("boundtest");
                    n.style.height = "123px", n.style.display = "block", e.body.appendChild(n), t.selectNode(n);
                    var r = t.getBoundingClientRect(), o = Math.round(r.height);
                    if (e.body.removeChild(n), 123 === o) return !0;
                }
            }
            return !1;
        }, a = function(e, t) {
            var n = new Image(), r = e.createElement("canvas"), o = r.getContext("2d");
            return new Promise(function(e) {
                n.src = t;
                var a = function() {
                    try {
                        o.drawImage(n, 0, 0), r.toDataURL();
                    } catch (t) {
                        return e(!1);
                    }
                    return e(!0);
                };
                n.onload = a, n.onerror = function() {
                    return e(!1);
                }, !0 === n.complete && setTimeout(function() {
                    a();
                }, 500);
            });
        }, i = function() {
            return void 0 !== new Image().crossOrigin;
        }, u = function() {
            return "string" == typeof new XMLHttpRequest().responseType;
        }, l = function(e) {
            var t = new Image(), n = e.createElement("canvas"), r = n.getContext("2d");
            t.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
            try {
                r.drawImage(t, 0, 0), n.toDataURL();
            } catch (e) {
                return !1;
            }
            return !0;
        }, s = function(e) {
            return 0 === e[0] && 255 === e[1] && 0 === e[2] && 255 === e[3];
        }, c = function(e) {
            var t = e.createElement("canvas");
            t.width = 100, t.height = 100;
            var n = t.getContext("2d");
            n.fillStyle = "rgb(0, 255, 0)", n.fillRect(0, 0, 100, 100);
            var o = new Image(), a = t.toDataURL();
            o.src = a;
            var i = (0, r.createForeignObjectSVG)(100, 100, 0, 0, o);
            return n.fillStyle = "red", n.fillRect(0, 0, 100, 100), (0, r.loadSerializedSVG)(i).then(function(t) {
                n.drawImage(t, 0, 0);
                var o = n.getImageData(0, 0, 100, 100).data;
                n.fillStyle = "red", n.fillRect(0, 0, 100, 100);
                var i = e.createElement("div");
                return i.style.backgroundImage = "url(" + a + ")", i.style.height = "100px", s(o) ? (0, 
                r.loadSerializedSVG)((0, r.createForeignObjectSVG)(100, 100, 0, 0, i)) : Promise.reject(!1);
            }).then(function(e) {
                return n.drawImage(e, 0, 0), s(n.getImageData(0, 0, 100, 100).data);
            }).catch(function(e) {
                return !1;
            });
        }, d = {
            get SUPPORT_RANGE_BOUNDS() {
                var e = o(document);
                return Object.defineProperty(d, "SUPPORT_RANGE_BOUNDS", {
                    value: e
                }), e;
            },
            get SUPPORT_SVG_DRAWING() {
                var e = l(document);
                return Object.defineProperty(d, "SUPPORT_SVG_DRAWING", {
                    value: e
                }), e;
            },
            get SUPPORT_BASE64_DRAWING() {
                return function(e) {
                    var t = a(document, e);
                    return Object.defineProperty(d, "SUPPORT_BASE64_DRAWING", {
                        value: function() {
                            return t;
                        }
                    }), t;
                };
            },
            get SUPPORT_FOREIGNOBJECT_DRAWING() {
                var e = "function" == typeof Array.from && "function" == typeof window.fetch ? c(document) : Promise.resolve(!1);
                return Object.defineProperty(d, "SUPPORT_FOREIGNOBJECT_DRAWING", {
                    value: e
                }), e;
            },
            get SUPPORT_CORS_IMAGES() {
                var e = i();
                return Object.defineProperty(d, "SUPPORT_CORS_IMAGES", {
                    value: e
                }), e;
            },
            get SUPPORT_RESPONSE_TYPE() {
                var e = u();
                return Object.defineProperty(d, "SUPPORT_RESPONSE_TYPE", {
                    value: e
                }), e;
            },
            get SUPPORT_CORS_XHR() {
                var e = "withCredentials" in new XMLHttpRequest();
                return Object.defineProperty(d, "SUPPORT_CORS_XHR", {
                    value: e
                }), e;
            }
        };
        t.default = d;
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.parseTextDecoration = t.TEXT_DECORATION_LINE = t.TEXT_DECORATION = t.TEXT_DECORATION_STYLE = void 0;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(0)), o = t.TEXT_DECORATION_STYLE = {
            SOLID: 0,
            DOUBLE: 1,
            DOTTED: 2,
            DASHED: 3,
            WAVY: 4
        }, a = t.TEXT_DECORATION = {
            NONE: null
        }, i = t.TEXT_DECORATION_LINE = {
            UNDERLINE: 1,
            OVERLINE: 2,
            LINE_THROUGH: 3,
            BLINK: 4
        }, u = function(e) {
            switch (e) {
              case "underline":
                return i.UNDERLINE;

              case "overline":
                return i.OVERLINE;

              case "line-through":
                return i.LINE_THROUGH;
            }
            return i.BLINK;
        }, l = function(e) {
            return "none" === e ? null : e.split(" ").map(u);
        }, s = function(e) {
            switch (e) {
              case "double":
                return o.DOUBLE;

              case "dotted":
                return o.DOTTED;

              case "dashed":
                return o.DASHED;

              case "wavy":
                return o.WAVY;
            }
            return o.SOLID;
        };
        t.parseTextDecoration = function(e) {
            var t = l(e.textDecorationLine ? e.textDecorationLine : e.textDecoration);
            return null === t ? a.NONE : {
                textDecorationLine: t,
                textDecorationColor: e.textDecorationColor ? new r.default(e.textDecorationColor) : null,
                textDecorationStyle: s(e.textDecorationStyle)
            };
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.parseBorder = t.BORDER_SIDES = t.BORDER_STYLE = void 0;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(0)), o = t.BORDER_STYLE = {
            NONE: 0,
            SOLID: 1
        }, a = t.BORDER_SIDES = {
            TOP: 0,
            RIGHT: 1,
            BOTTOM: 2,
            LEFT: 3
        }, i = Object.keys(a).map(function(e) {
            return e.toLowerCase();
        }), u = function(e) {
            switch (e) {
              case "none":
                return o.NONE;
            }
            return o.SOLID;
        };
        t.parseBorder = function(e) {
            return i.map(function(t) {
                var n = new r.default(e.getPropertyValue("border-" + t + "-color")), o = u(e.getPropertyValue("border-" + t + "-style")), a = parseFloat(e.getPropertyValue("border-" + t + "-width"));
                return {
                    borderColor: n,
                    borderStyle: o,
                    borderWidth: isNaN(a) ? 0 : a
                };
            });
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        function o(e, t, n) {
            return e.length > 0 ? t + n.toUpperCase() : e;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), i = n(16), u = n(18), l = function() {
            function e(t, n, o) {
                r(this, e), this.text = t, this.parent = n, this.bounds = o;
            }
            return a(e, null, [ {
                key: "fromTextNode",
                value: function(t, n) {
                    var r = c(t.data, n.style.textTransform);
                    return new e(r, n, (0, u.parseTextBounds)(r, n, t));
                }
            } ]), e;
        }();
        t.default = l;
        var s = /(^|\s|:|-|\(|\))([a-z])/g, c = function(e, t) {
            switch (t) {
              case i.TEXT_TRANSFORM.LOWERCASE:
                return e.toLowerCase();

              case i.TEXT_TRANSFORM.CAPITALIZE:
                return e.replace(s, o);

              case i.TEXT_TRANSFORM.UPPERCASE:
                return e.toUpperCase();

              default:
                return e;
            }
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = n(4), i = n(9), u = function(e, t) {
            var n = Math.max.apply(null, e.colorStops.map(function(e) {
                return e.stop;
            })), r = 1 / Math.max(1, n);
            e.colorStops.forEach(function(e) {
                t.addColorStop(r * e.stop, e.color.toString());
            });
        }, l = function() {
            function e(t) {
                r(this, e), this.canvas = t || document.createElement("canvas");
            }
            return o(e, [ {
                key: "render",
                value: function(e) {
                    this.ctx = this.canvas.getContext("2d"), this.options = e, this.canvas.width = Math.floor(e.width * e.scale), 
                    this.canvas.height = Math.floor(e.height * e.scale), this.canvas.style.width = e.width + "px", 
                    this.canvas.style.height = e.height + "px", this.ctx.scale(this.options.scale, this.options.scale), 
                    this.ctx.translate(-e.x, -e.y), this.ctx.textBaseline = "bottom", e.logger.log("Canvas renderer initialized (" + e.width + "x" + e.height + " at " + e.x + "," + e.y + ") with scale " + this.options.scale);
                }
            }, {
                key: "clip",
                value: function(e, t) {
                    var n = this;
                    e.length && (this.ctx.save(), e.forEach(function(e) {
                        n.path(e), n.ctx.clip();
                    })), t(), e.length && this.ctx.restore();
                }
            }, {
                key: "drawImage",
                value: function(e, t, n) {
                    this.ctx.drawImage(e, t.left, t.top, t.width, t.height, n.left, n.top, n.width, n.height);
                }
            }, {
                key: "drawShape",
                value: function(e, t) {
                    this.path(e), this.ctx.fillStyle = t.toString(), this.ctx.fill();
                }
            }, {
                key: "fill",
                value: function(e) {
                    this.ctx.fillStyle = e.toString(), this.ctx.fill();
                }
            }, {
                key: "getTarget",
                value: function() {
                    return Promise.resolve(this.canvas);
                }
            }, {
                key: "path",
                value: function(e) {
                    var t = this;
                    this.ctx.beginPath(), Array.isArray(e) ? e.forEach(function(e, n) {
                        var r = e.type === a.PATH.VECTOR ? e : e.start;
                        0 === n ? t.ctx.moveTo(r.x, r.y) : t.ctx.lineTo(r.x, r.y), e.type === a.PATH.BEZIER_CURVE && t.ctx.bezierCurveTo(e.startControl.x, e.startControl.y, e.endControl.x, e.endControl.y, e.end.x, e.end.y);
                    }) : this.ctx.arc(e.x + e.radius, e.y + e.radius, e.radius, 0, 2 * Math.PI, !0), 
                    this.ctx.closePath();
                }
            }, {
                key: "rectangle",
                value: function(e, t, n, r, o) {
                    this.ctx.fillStyle = o.toString(), this.ctx.fillRect(e, t, n, r);
                }
            }, {
                key: "renderLinearGradient",
                value: function(e, t) {
                    var n = this.ctx.createLinearGradient(e.left + t.direction.x1, e.top + t.direction.y1, e.left + t.direction.x0, e.top + t.direction.y0);
                    u(t, n), this.ctx.fillStyle = n, this.ctx.fillRect(e.left, e.top, e.width, e.height);
                }
            }, {
                key: "renderRadialGradient",
                value: function(e, t) {
                    var n = this, r = e.left + t.center.x, o = e.top + t.center.y, a = this.ctx.createRadialGradient(r, o, 0, r, o, t.radius.x);
                    if (a) if (u(t, a), this.ctx.fillStyle = a, t.radius.x !== t.radius.y) {
                        var i = e.left + .5 * e.width, l = e.top + .5 * e.height, s = t.radius.y / t.radius.x, c = 1 / s;
                        this.transform(i, l, [ 1, 0, 0, s, 0, 0 ], function() {
                            return n.ctx.fillRect(e.left, c * (e.top - l) + l, e.width, e.height * c);
                        });
                    } else this.ctx.fillRect(e.left, e.top, e.width, e.height);
                }
            }, {
                key: "renderRepeat",
                value: function(e, t, n, r, o) {
                    this.path(e), this.ctx.fillStyle = this.ctx.createPattern(this.resizeImage(t, n), "repeat"), 
                    this.ctx.translate(r, o), this.ctx.fill(), this.ctx.translate(-r, -o);
                }
            }, {
                key: "renderTextNode",
                value: function(e, t, n, r, o) {
                    var a = this;
                    this.ctx.font = [ n.fontStyle, n.fontVariant, n.fontWeight, n.fontSize, n.fontFamily ].join(" "), 
                    e.forEach(function(e) {
                        if (a.ctx.fillStyle = t.toString(), o && e.text.trim().length ? o.slice(0).reverse().forEach(function(t) {
                            a.ctx.shadowColor = t.color.toString(), a.ctx.shadowOffsetX = t.offsetX * a.options.scale, 
                            a.ctx.shadowOffsetY = t.offsetY * a.options.scale, a.ctx.shadowBlur = t.blur, a.ctx.fillText(e.text, e.bounds.left, e.bounds.top + e.bounds.height);
                        }) : a.ctx.fillText(e.text, e.bounds.left, e.bounds.top + e.bounds.height), null !== r) {
                            var u = r.textDecorationColor || t;
                            r.textDecorationLine.forEach(function(t) {
                                switch (t) {
                                  case i.TEXT_DECORATION_LINE.UNDERLINE:
                                    var r = a.options.fontMetrics.getMetrics(n).baseline;
                                    a.rectangle(e.bounds.left, Math.round(e.bounds.top + r), e.bounds.width, 1, u);
                                    break;

                                  case i.TEXT_DECORATION_LINE.OVERLINE:
                                    a.rectangle(e.bounds.left, Math.round(e.bounds.top), e.bounds.width, 1, u);
                                    break;

                                  case i.TEXT_DECORATION_LINE.LINE_THROUGH:
                                    var o = a.options.fontMetrics.getMetrics(n).middle;
                                    a.rectangle(e.bounds.left, Math.ceil(e.bounds.top + o), e.bounds.width, 1, u);
                                }
                            });
                        }
                    });
                }
            }, {
                key: "resizeImage",
                value: function(e, t) {
                    if (e.width === t.width && e.height === t.height) return e;
                    var n = this.canvas.ownerDocument.createElement("canvas");
                    return n.width = t.width, n.height = t.height, n.getContext("2d").drawImage(e, 0, 0, e.width, e.height, 0, 0, t.width, t.height), 
                    n;
                }
            }, {
                key: "setOpacity",
                value: function(e) {
                    this.ctx.globalAlpha = e;
                }
            }, {
                key: "transform",
                value: function(e, t, n, r) {
                    this.ctx.save(), this.ctx.translate(e, t), this.ctx.transform(n[0], n[1], n[2], n[3], n[4], n[5]), 
                    this.ctx.translate(-e, -t), r(), this.ctx.restore();
                }
            } ]), e;
        }();
        t.default = l;
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = function() {
            function e(t, n, o) {
                r(this, e), this.enabled = t, this.start = o || Date.now(), this.id = n;
            }
            return o(e, [ {
                key: "child",
                value: function(t) {
                    return new e(this.enabled, t, this.start);
                }
            }, {
                key: "log",
                value: function() {
                    if (this.enabled && window.console && window.console.log) {
                        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                        Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [ Date.now() - this.start + "ms", this.id ? "html2canvas (" + this.id + "):" : "html2canvas:" ].concat([].slice.call(t, 0)));
                    }
                }
            }, {
                key: "error",
                value: function() {
                    if (this.enabled && window.console && window.console.error) {
                        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                        Function.prototype.bind.call(window.console.error, window.console).apply(window.console, [ Date.now() - this.start + "ms", this.id ? "html2canvas (" + this.id + "):" : "html2canvas:" ].concat([].slice.call(t, 0)));
                    }
                }
            } ]), e;
        }();
        t.default = a;
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.parsePadding = t.PADDING_SIDES = void 0;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(2)), o = (t.PADDING_SIDES = {
            TOP: 0,
            RIGHT: 1,
            BOTTOM: 2,
            LEFT: 3
        }, [ "top", "right", "bottom", "left" ]);
        t.parsePadding = function(e) {
            return o.map(function(t) {
                return new r.default(e.getPropertyValue("padding-" + t));
            });
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = t.POSITION = {
            STATIC: 0,
            RELATIVE: 1,
            ABSOLUTE: 2,
            FIXED: 3,
            STICKY: 4
        };
        t.parsePosition = function(e) {
            switch (e) {
              case "relative":
                return r.RELATIVE;

              case "absolute":
                return r.ABSOLUTE;

              case "fixed":
                return r.FIXED;

              case "sticky":
                return r.STICKY;
            }
            return r.STATIC;
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = t.TEXT_TRANSFORM = {
            NONE: 0,
            LOWERCASE: 1,
            UPPERCASE: 2,
            CAPITALIZE: 3
        };
        t.parseTextTransform = function(e) {
            switch (e) {
              case "uppercase":
                return r.UPPERCASE;

              case "lowercase":
                return r.LOWERCASE;

              case "capitalize":
                return r.CAPITALIZE;
            }
            return r.NONE;
        };
    }, function(e, t, n) {
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.reformatInputBounds = t.inlineSelectElement = t.inlineTextAreaElement = t.inlineInputElement = t.getInputBorderRadius = t.INPUT_BACKGROUND = t.INPUT_BORDERS = t.INPUT_COLOR = void 0;
        var o = r(n(11)), a = n(6), i = n(10), u = r(n(41)), l = r(n(7)), s = r(n(0)), c = r(n(2)), d = (n(1), 
        n(18), n(3)), f = (t.INPUT_COLOR = new s.default([ 42, 42, 42 ]), new s.default([ 165, 165, 165 ])), h = new s.default([ 222, 222, 222 ]), g = {
            borderWidth: 1,
            borderColor: f,
            borderStyle: i.BORDER_STYLE.SOLID
        }, p = (t.INPUT_BORDERS = [ g, g, g, g ], t.INPUT_BACKGROUND = {
            backgroundColor: h,
            backgroundImage: [],
            backgroundClip: a.BACKGROUND_CLIP.PADDING_BOX,
            backgroundOrigin: a.BACKGROUND_ORIGIN.PADDING_BOX
        }, new c.default("50%")), m = [ p, p ], v = [ m, m, m, m ], y = new c.default("3px"), b = [ y, y ], w = [ b, b, b, b ], E = (t.getInputBorderRadius = function(e) {
            return "radio" === e.type ? v : w;
        }, t.inlineInputElement = function(e, t) {
            if ("radio" === e.type || "checkbox" === e.type) {
                if (e.checked) {
                    var n = Math.min(t.bounds.width, t.bounds.height);
                    t.childNodes.push("checkbox" === e.type ? [ new l.default(t.bounds.left + .39363 * n, t.bounds.top + .79 * n), new l.default(t.bounds.left + .16 * n, t.bounds.top + .5549 * n), new l.default(t.bounds.left + .27347 * n, t.bounds.top + .44071 * n), new l.default(t.bounds.left + .39694 * n, t.bounds.top + .5649 * n), new l.default(t.bounds.left + .72983 * n, t.bounds.top + .23 * n), new l.default(t.bounds.left + .84 * n, t.bounds.top + .34085 * n), new l.default(t.bounds.left + .39363 * n, t.bounds.top + .79 * n) ] : new u.default(t.bounds.left + n / 4, t.bounds.top + n / 4, n / 4));
                }
            } else E(T(e), e, t, !1);
        }, t.inlineTextAreaElement = function(e, t) {
            E(e.value, e, t, !0);
        }, t.inlineSelectElement = function(e, t) {
            var n = e.options[e.selectedIndex || 0];
            E(n ? n.text || "" : "", e, t, !1);
        }, t.reformatInputBounds = function(e) {
            return e.width > e.height ? (e.left += (e.width - e.height) / 2, e.width = e.height) : e.width < e.height && (e.top += (e.height - e.width) / 2, 
            e.height = e.width), e;
        }, function(e, t, n, r) {
            var a = t.ownerDocument.body;
            if (e.length > 0 && a) {
                var i = t.ownerDocument.createElement("html2canvaswrapper");
                (0, d.copyCSSStyles)(t.ownerDocument.defaultView.getComputedStyle(t, null), i), 
                i.style.position = "fixed", i.style.left = n.bounds.left + "px", i.style.top = n.bounds.top + "px", 
                r || (i.style.whiteSpace = "nowrap");
                var u = t.ownerDocument.createTextNode(e);
                i.appendChild(u), a.appendChild(i), n.childNodes.push(o.default.fromTextNode(u, n)), 
                a.removeChild(i);
            }
        }), T = function(e) {
            var t = "password" === e.type ? new Array(e.value.length + 1).join("•") : e.value;
            return 0 === t.length ? e.placeholder || "" : t;
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.parseTextBounds = t.TextBounds = void 0;
        var o = n(38), a = n(1), i = n(9), u = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(8)), l = /[^\u0000-\u00ff]/, s = function(e) {
            return l.test(e);
        }, c = function(e) {
            return o.ucs2.encode([ e ]);
        }, d = t.TextBounds = function e(t, n) {
            r(this, e), this.text = t, this.bounds = n;
        }, f = (t.parseTextBounds = function(e, t, n) {
            for (var r = o.ucs2.decode(e), a = 0 !== t.style.letterSpacing || s(e) ? r.map(c) : g(r), l = a.length, p = n.parentNode ? n.parentNode.ownerDocument.defaultView : null, m = p ? p.pageXOffset : 0, v = p ? p.pageYOffset : 0, y = [], b = 0, w = 0; w < l; w++) {
                var E = a[w];
                if (t.style.textDecoration !== i.TEXT_DECORATION.NONE || E.trim().length > 0) if (u.default.SUPPORT_RANGE_BOUNDS) y.push(new d(E, h(n, b, E.length, m, v))); else {
                    var T = n.splitText(E.length);
                    y.push(new d(E, f(n, m, v))), n = T;
                } else u.default.SUPPORT_RANGE_BOUNDS || (n = n.splitText(E.length));
                b += E.length;
            }
            return y;
        }, function(e, t, n) {
            var r = e.ownerDocument.createElement("html2canvaswrapper");
            r.appendChild(e.cloneNode(!0));
            var o = e.parentNode;
            if (o) {
                o.replaceChild(r, e);
                var i = (0, a.parseBounds)(r, t, n);
                return r.firstChild && o.replaceChild(r.firstChild, r), i;
            }
            return new a.Bounds(0, 0, 0, 0);
        }), h = function(e, t, n, r, o) {
            var i = e.ownerDocument.createRange();
            return i.setStart(e, t), i.setEnd(e, t + n), a.Bounds.fromClientRect(i.getBoundingClientRect(), r, o);
        }, g = function(e) {
            for (var t = [], n = 0, r = !1, a = void 0; e.length; ) p(e[n]) === r ? ((a = e.splice(0, n)).length && t.push(o.ucs2.encode(a)), 
            r = !r, n = 0) : n++, n >= e.length && (a = e.splice(0, n)).length && t.push(o.ucs2.encode(a));
            return t;
        }, p = function(e) {
            return -1 !== [ 32, 13, 10, 9, 45 ].indexOf(e);
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = function() {
            function e(t) {
                r(this, e), this.element = t;
            }
            return o(e, [ {
                key: "render",
                value: function(e) {
                    var t = this;
                    this.options = e, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), 
                    this.canvas.width = Math.floor(e.width) * e.scale, this.canvas.height = Math.floor(e.height) * e.scale, 
                    this.canvas.style.width = e.width + "px", this.canvas.style.height = e.height + "px", 
                    e.logger.log("ForeignObject renderer initialized (" + e.width + "x" + e.height + " at " + e.x + "," + e.y + ") with scale " + e.scale);
                    var n = i(Math.max(e.windowWidth, e.width) * e.scale, Math.max(e.windowHeight, e.height) * e.scale, e.scrollX * e.scale, e.scrollY * e.scale, this.element);
                    return u(n).then(function(n) {
                        return e.backgroundColor && (t.ctx.fillStyle = e.backgroundColor.toString(), t.ctx.fillRect(0, 0, e.width * e.scale, e.height * e.scale)), 
                        t.ctx.drawImage(n, -e.x * e.scale, -e.y * e.scale), t.canvas;
                    });
                }
            } ]), e;
        }();
        t.default = a;
        var i = t.createForeignObjectSVG = function(e, t, n, r, o) {
            var a = "http://www.w3.org/2000/svg", i = document.createElementNS(a, "svg"), u = document.createElementNS(a, "foreignObject");
            return i.setAttributeNS(null, "width", e), i.setAttributeNS(null, "height", t), 
            u.setAttributeNS(null, "width", "100%"), u.setAttributeNS(null, "height", "100%"), 
            u.setAttributeNS(null, "x", n), u.setAttributeNS(null, "y", r), u.setAttributeNS(null, "externalResourcesRequired", "true"), 
            i.appendChild(u), u.appendChild(o), i;
        }, u = t.loadSerializedSVG = function(e) {
            return new Promise(function(t, n) {
                var r = new Image();
                r.onload = function() {
                    return t(r);
                }, r.onerror = n, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(e));
            });
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.FontMetrics = void 0;
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = n(3);
        t.FontMetrics = function() {
            function e(t) {
                r(this, e), this._data = {}, this._document = t;
            }
            return o(e, [ {
                key: "_parseMetrics",
                value: function(e) {
                    var t = this._document.createElement("div"), n = this._document.createElement("img"), r = this._document.createElement("span"), o = this._document.body;
                    if (!o) throw new Error("No document found for font metrics");
                    t.style.visibility = "hidden", t.style.fontFamily = e.fontFamily, t.style.fontSize = e.fontSize, 
                    t.style.margin = "0", t.style.padding = "0", o.appendChild(t), n.src = a.SMALL_IMAGE, 
                    n.width = 1, n.height = 1, n.style.margin = "0", n.style.padding = "0", n.style.verticalAlign = "baseline", 
                    r.style.fontFamily = e.fontFamily, r.style.fontSize = e.fontSize, r.style.margin = "0", 
                    r.style.padding = "0", r.appendChild(this._document.createTextNode("Hidden Text")), 
                    t.appendChild(r), t.appendChild(n);
                    var i = n.offsetTop - r.offsetTop + 2;
                    t.removeChild(r), t.appendChild(this._document.createTextNode("Hidden Text")), t.style.lineHeight = "normal", 
                    n.style.verticalAlign = "super";
                    var u = n.offsetTop - t.offsetTop + 2;
                    return o.removeChild(t), {
                        baseline: i,
                        middle: u
                    };
                }
            }, {
                key: "getMetrics",
                value: function(e) {
                    var t = e.fontFamily + " " + e.fontSize;
                    return void 0 === this._data[t] && (this._data[t] = this._parseMetrics(e)), this._data[t];
                }
            } ]), e;
        }();
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Proxy = void 0;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(8));
        t.Proxy = function(e, t) {
            if (!t.proxy) return Promise.reject("No proxy defined");
            var n = t.proxy;
            return new Promise(function(o, a) {
                var i = r.default.SUPPORT_CORS_XHR && r.default.SUPPORT_RESPONSE_TYPE ? "blob" : "text", u = r.default.SUPPORT_CORS_XHR ? new XMLHttpRequest() : new XDomainRequest();
                if (u.onload = function() {
                    if (u instanceof XMLHttpRequest) if (200 === u.status) if ("text" === i) o(u.response); else {
                        var t = new FileReader();
                        t.addEventListener("load", function() {
                            return o(t.result);
                        }, !1), t.addEventListener("error", function(e) {
                            return a(e);
                        }, !1), t.readAsDataURL(u.response);
                    } else a("Failed to proxy resource " + e.substring(0, 256) + " with status code " + u.status); else o(u.responseText);
                }, u.onerror = a, u.open("GET", n + "?url=" + encodeURIComponent(e) + "&responseType=" + i), 
                "text" !== i && u instanceof XMLHttpRequest && (u.responseType = i), t.imageTimeout) {
                    var l = t.imageTimeout;
                    u.timeout = l, u.ontimeout = function() {
                        return a("Timed out (" + l + "ms) proxying " + e.substring(0, 256));
                    };
                }
                u.send();
            });
        };
    }, function(t, n, r) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        }, i = "function" == typeof Symbol && "symbol" === e(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : e(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
        }, u = o(r(12)), l = o(r(13)), s = r(23), c = r(1), d = function(e, t) {
            "object" === ("undefined" == typeof console ? "undefined" : i(console)) && "function" == typeof console.log && console.log("html2canvas 1.0.0-alpha.4");
            var n = t || {}, r = new l.default("boolean" != typeof n.logging || n.logging);
            "function" == typeof n.onrendered && r.error("onrendered option is deprecated, html2canvas returns a Promise with the canvas as the value");
            var o = e.ownerDocument;
            if (!o) return Promise.reject("Provided element is not within a Document");
            var d = o.defaultView, f = d.pageXOffset, h = d.pageYOffset, g = "HTML" === e.tagName || "BODY" === e.tagName ? (0, 
            c.parseDocumentSize)(o) : (0, c.parseBounds)(e, f, h), p = g.width, m = g.height, v = g.left, y = g.top, b = {
                async: !0,
                allowTaint: !1,
                backgroundColor: "#ffffff",
                imageTimeout: 15e3,
                logging: !0,
                proxy: null,
                removeContainer: !0,
                foreignObjectRendering: !1,
                scale: d.devicePixelRatio || 1,
                target: new u.default(n.canvas),
                x: v,
                y: y,
                width: Math.ceil(p),
                height: Math.ceil(m),
                windowWidth: d.innerWidth,
                windowHeight: d.innerHeight,
                scrollX: d.pageXOffset,
                scrollY: d.pageYOffset
            }, w = (0, s.renderElement)(e, a({}, b, n), r);
            return w.catch(function(e) {
                throw r.error(e), e;
            });
        };
        d.CanvasRenderer = u.default, t.exports = d;
    }, function(e, t, n) {
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.renderElement = void 0;
        var o = function() {
            function e(e, t) {
                var n = [], r = !0, o = !1, a = void 0;
                try {
                    for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (e) {
                    o = !0, a = e;
                } finally {
                    try {
                        !r && u.return && u.return();
                    } finally {
                        if (o) throw a;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), a = (r(n(13)), n(24)), i = r(n(42)), u = r(n(19)), l = r(n(8)), s = n(1), c = n(45), d = n(20), f = n(0), h = r(f);
        t.renderElement = function e(t, n, r) {
            var g = t.ownerDocument, p = new s.Bounds(n.scrollX, n.scrollY, n.windowWidth, n.windowHeight), m = g.documentElement ? new h.default(getComputedStyle(g.documentElement).backgroundColor) : f.TRANSPARENT, v = g.body ? new h.default(getComputedStyle(g.body).backgroundColor) : f.TRANSPARENT, y = t === g.documentElement ? m.isTransparent() ? v.isTransparent() ? n.backgroundColor ? new h.default(n.backgroundColor) : null : v : m : n.backgroundColor ? new h.default(n.backgroundColor) : null;
            return (n.foreignObjectRendering ? l.default.SUPPORT_FOREIGNOBJECT_DRAWING : Promise.resolve(!1)).then(function(l) {
                return l ? function(e) {
                    return r.log("Document cloned, using foreignObject rendering"), e.inlineFonts(g).then(function() {
                        return e.resourceLoader.ready();
                    }).then(function() {
                        return new u.default(e.documentElement).render({
                            backgroundColor: y,
                            logger: r,
                            scale: n.scale,
                            x: n.x,
                            y: n.y,
                            width: n.width,
                            height: n.height,
                            windowWidth: n.windowWidth,
                            windowHeight: n.windowHeight,
                            scrollX: n.scrollX,
                            scrollY: n.scrollY
                        });
                    });
                }(new c.DocumentCloner(t, n, r, !0, e)) : (0, c.cloneWindow)(g, p, t, n, r, e).then(function(e) {
                    var t = o(e, 3), u = t[0], l = t[1], s = t[2];
                    r.log("Document cloned, using computed rendering");
                    var c = (0, a.NodeParser)(l, s, r), h = l.ownerDocument;
                    return y === c.container.style.background.backgroundColor && (c.container.style.background.backgroundColor = f.TRANSPARENT), 
                    s.ready().then(function(e) {
                        !0 === n.removeContainer && (u.parentNode ? u.parentNode.removeChild(u) : r.log("Cannot detach cloned iframe as it is not in the DOM anymore"));
                        var t = new d.FontMetrics(h);
                        r.log("Starting renderer");
                        var o = {
                            backgroundColor: y,
                            fontMetrics: t,
                            imageStore: e,
                            logger: r,
                            scale: n.scale,
                            x: n.x,
                            y: n.y,
                            width: n.width,
                            height: n.height
                        };
                        return Array.isArray(n.target) ? Promise.all(n.target.map(function(e) {
                            return new i.default(e, o).render(c);
                        })) : new i.default(n.target, o).render(c);
                    });
                });
            });
        };
    }, function(e, t, n) {
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.NodeParser = void 0;
        var o = r(n(25)), a = r(n(5)), i = r(n(11)), u = n(17), l = (t.NodeParser = function(e, t, n) {
            n.log("Starting node parsing");
            var r = 0, i = new a.default(e, null, t, r++), u = new o.default(i, null, !0);
            return s(e, i, u, t, r), n.log("Finished parsing node tree"), u;
        }, [ "SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION" ]), s = function e(t, n, r, s, f) {
            if (f > 5e4) throw new Error("Recursion error while parsing node tree");
            for (var h, g = t.firstChild; g; g = h) {
                h = g.nextSibling;
                var p = g.ownerDocument.defaultView;
                if (g instanceof p.Text || g instanceof Text || p.parent && g instanceof p.parent.Text) g.data.trim().length > 0 && n.childNodes.push(i.default.fromTextNode(g, n)); else if (g instanceof p.HTMLElement || g instanceof HTMLElement || p.parent && g instanceof p.parent.HTMLElement) {
                    if (-1 === l.indexOf(g.nodeName)) {
                        var m = new a.default(g, n, s, f++);
                        if (m.isVisible()) {
                            "INPUT" === g.tagName ? (0, u.inlineInputElement)(g, m) : "TEXTAREA" === g.tagName ? (0, 
                            u.inlineTextAreaElement)(g, m) : "SELECT" === g.tagName && (0, u.inlineSelectElement)(g, m);
                            var v = "TEXTAREA" !== g.tagName, y = c(m, g);
                            if (y || d(m)) {
                                var b = y || m.isPositioned() ? r.getRealParentStackingContext() : r, w = new o.default(m, b, y);
                                b.contexts.push(w), v && e(g, m, w, s, f);
                            } else r.children.push(m), v && e(g, m, r, s, f);
                        }
                    }
                } else if (g instanceof p.SVGSVGElement || g instanceof SVGSVGElement || p.parent && g instanceof p.parent.SVGSVGElement) {
                    var E = new a.default(g, n, s, f++), T = c(E, g);
                    if (T || d(E)) {
                        var O = T || E.isPositioned() ? r.getRealParentStackingContext() : r, I = new o.default(E, O, T);
                        O.contexts.push(I);
                    } else r.children.push(E);
                }
            }
        }, c = function(e, t) {
            return e.isRootElement() || e.isPositionedWithZIndex() || e.style.opacity < 1 || e.isTransformed() || f(e, t);
        }, d = function(e) {
            return e.isPositioned() || e.isFloating();
        }, f = function(e, t) {
            return "BODY" === t.nodeName && e.parent instanceof a.default && e.parent.style.background.backgroundColor.isTransparent();
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = (function(e) {
            e && e.__esModule;
        }(n(5)), n(15), function() {
            function e(t, n, o) {
                r(this, e), this.container = t, this.parent = n, this.contexts = [], this.children = [], 
                this.treatAsRealStackingContext = o;
            }
            return o(e, [ {
                key: "getOpacity",
                value: function() {
                    return this.parent ? this.container.style.opacity * this.parent.getOpacity() : this.container.style.opacity;
                }
            }, {
                key: "getRealParentStackingContext",
                value: function() {
                    return !this.parent || this.treatAsRealStackingContext ? this : this.parent.getRealParentStackingContext();
                }
            } ]), e;
        }());
        t.default = a;
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function e(t, n) {
            r(this, e), this.width = t, this.height = n;
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = n(4), i = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(7)), u = function(e, t, n) {
            return new i.default(e.x + (t.x - e.x) * n, e.y + (t.y - e.y) * n);
        }, l = function() {
            function e(t, n, o, i) {
                r(this, e), this.type = a.PATH.BEZIER_CURVE, this.start = t, this.startControl = n, 
                this.endControl = o, this.end = i;
            }
            return o(e, [ {
                key: "subdivide",
                value: function(t, n) {
                    var r = u(this.start, this.startControl, t), o = u(this.startControl, this.endControl, t), a = u(this.endControl, this.end, t), i = u(r, o, t), l = u(o, a, t), s = u(i, l, t);
                    return n ? new e(this.start, r, i, s) : new e(s, l, a, this.end);
                }
            }, {
                key: "reverse",
                value: function() {
                    return new e(this.end, this.endControl, this.startControl, this.start);
                }
            } ]), e;
        }();
        t.default = l;
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.parseBorderRadius = void 0;
        var r = function() {
            function e(e, t) {
                var n = [], r = !0, o = !1, a = void 0;
                try {
                    for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (e) {
                    o = !0, a = e;
                } finally {
                    try {
                        !r && u.return && u.return();
                    } finally {
                        if (o) throw a;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(2)), a = [ "top-left", "top-right", "bottom-right", "bottom-left" ];
        t.parseBorderRadius = function(e) {
            return a.map(function(t) {
                var n = e.getPropertyValue("border-" + t + "-radius").split(" ").map(o.default.create), a = r(n, 2), i = a[0], u = a[1];
                return void 0 === u ? [ i, i ] : [ i, u ];
            });
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = t.DISPLAY = {
            NONE: 1,
            BLOCK: 2,
            INLINE: 4,
            RUN_IN: 8,
            FLOW: 16,
            FLOW_ROOT: 32,
            TABLE: 64,
            FLEX: 128,
            GRID: 256,
            RUBY: 512,
            SUBGRID: 1024,
            LIST_ITEM: 2048,
            TABLE_ROW_GROUP: 4096,
            TABLE_HEADER_GROUP: 8192,
            TABLE_FOOTER_GROUP: 16384,
            TABLE_ROW: 32768,
            TABLE_CELL: 65536,
            TABLE_COLUMN_GROUP: 1 << 17,
            TABLE_COLUMN: 1 << 18,
            TABLE_CAPTION: 1 << 19,
            RUBY_BASE: 1 << 20,
            RUBY_TEXT: 1 << 21,
            RUBY_BASE_CONTAINER: 1 << 22,
            RUBY_TEXT_CONTAINER: 1 << 23,
            CONTENTS: 1 << 24,
            INLINE_BLOCK: 1 << 25,
            INLINE_LIST_ITEM: 1 << 26,
            INLINE_TABLE: 1 << 27,
            INLINE_FLEX: 1 << 28,
            INLINE_GRID: 1 << 29
        }, o = function(e) {
            switch (e) {
              case "block":
                return r.BLOCK;

              case "inline":
                return r.INLINE;

              case "run-in":
                return r.RUN_IN;

              case "flow":
                return r.FLOW;

              case "flow-root":
                return r.FLOW_ROOT;

              case "table":
                return r.TABLE;

              case "flex":
                return r.FLEX;

              case "grid":
                return r.GRID;

              case "ruby":
                return r.RUBY;

              case "subgrid":
                return r.SUBGRID;

              case "list-item":
                return r.LIST_ITEM;

              case "table-row-group":
                return r.TABLE_ROW_GROUP;

              case "table-header-group":
                return r.TABLE_HEADER_GROUP;

              case "table-footer-group":
                return r.TABLE_FOOTER_GROUP;

              case "table-row":
                return r.TABLE_ROW;

              case "table-cell":
                return r.TABLE_CELL;

              case "table-column-group":
                return r.TABLE_COLUMN_GROUP;

              case "table-column":
                return r.TABLE_COLUMN;

              case "table-caption":
                return r.TABLE_CAPTION;

              case "ruby-base":
                return r.RUBY_BASE;

              case "ruby-text":
                return r.RUBY_TEXT;

              case "ruby-base-container":
                return r.RUBY_BASE_CONTAINER;

              case "ruby-text-container":
                return r.RUBY_TEXT_CONTAINER;

              case "contents":
                return r.CONTENTS;

              case "inline-block":
                return r.INLINE_BLOCK;

              case "inline-list-item":
                return r.INLINE_LIST_ITEM;

              case "inline-table":
                return r.INLINE_TABLE;

              case "inline-flex":
                return r.INLINE_FLEX;

              case "inline-grid":
                return r.INLINE_GRID;
            }
            return r.NONE;
        }, a = function(e, t) {
            return e | o(t);
        };
        t.parseDisplay = function(e) {
            return e.split(" ").reduce(a, 0);
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = t.FLOAT = {
            NONE: 0,
            LEFT: 1,
            RIGHT: 2,
            INLINE_START: 3,
            INLINE_END: 4
        };
        t.parseCSSFloat = function(e) {
            switch (e) {
              case "left":
                return r.LEFT;

              case "right":
                return r.RIGHT;

              case "inline-start":
                return r.INLINE_START;

              case "inline-end":
                return r.INLINE_END;
            }
            return r.NONE;
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function(e) {
            switch (e) {
              case "normal":
                return 400;

              case "bold":
                return 700;
            }
            var t = parseInt(e, 10);
            return isNaN(t) ? 400 : t;
        };
        t.parseFont = function(e) {
            return {
                fontFamily: e.fontFamily,
                fontSize: e.fontSize,
                fontStyle: e.fontStyle,
                fontVariant: e.fontVariant,
                fontWeight: r(e.fontWeight)
            };
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.parseLetterSpacing = function(e) {
            if ("normal" === e) return 0;
            var t = parseFloat(e);
            return isNaN(t) ? 0 : t;
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = t.OVERFLOW = {
            VISIBLE: 0,
            HIDDEN: 1,
            SCROLL: 2,
            AUTO: 3
        };
        t.parseOverflow = function(e) {
            switch (e) {
              case "hidden":
                return r.HIDDEN;

              case "scroll":
                return r.SCROLL;

              case "auto":
                return r.AUTO;

              case "visible":
              default:
                return r.VISIBLE;
            }
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.parseTextShadow = void 0;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(0)), o = /^([+-]|\d|\.)$/i;
        t.parseTextShadow = function(e) {
            if ("none" === e || "string" != typeof e) return null;
            for (var t = "", n = !1, a = [], i = [], u = 0, l = null, s = function() {
                t.length && (n ? a.push(parseFloat(t)) : l = new r.default(t)), n = !1, t = "";
            }, c = function() {
                a.length && null !== l && i.push({
                    color: l,
                    offsetX: a[0] || 0,
                    offsetY: a[1] || 0,
                    blur: a[2] || 0
                }), a.splice(0, a.length), l = null;
            }, d = 0; d < e.length; d++) {
                var f = e[d];
                switch (f) {
                  case "(":
                    t += f, u++;
                    break;

                  case ")":
                    t += f, u--;
                    break;

                  case ",":
                    0 === u ? (s(), c()) : t += f;
                    break;

                  case " ":
                    0 === u ? s() : t += f;
                    break;

                  default:
                    0 === t.length && o.test(f) && (n = !0), t += f;
                }
            }
            return s(), c(), 0 === i.length ? null : i;
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.parseTransform = void 0;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(2)), o = function(e) {
            return parseFloat(e.trim());
        }, a = /(matrix|matrix3d)\((.+)\)/, i = (t.parseTransform = function(e) {
            var t = u(e.transform || e.webkitTransform || e.mozTransform || e.msTransform || e.oTransform);
            return null === t ? null : {
                transform: t,
                transformOrigin: i(e.transformOrigin || e.webkitTransformOrigin || e.mozTransformOrigin || e.msTransformOrigin || e.oTransformOrigin)
            };
        }, function(e) {
            if ("string" != typeof e) {
                var t = new r.default("0");
                return [ t, t ];
            }
            var n = e.split(" ").map(r.default.create);
            return [ n[0], n[1] ];
        }), u = function(e) {
            if ("none" === e || "string" != typeof e) return null;
            var t = e.match(a);
            if (t) {
                if ("matrix" === t[1]) {
                    var n = t[2].split(",").map(o);
                    return [ n[0], n[1], n[2], n[3], n[4], n[5] ];
                }
                var r = t[2].split(",").map(o);
                return [ r[0], r[1], r[4], r[5], r[12], r[13] ];
            }
            return null;
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = t.VISIBILITY = {
            VISIBLE: 0,
            HIDDEN: 1,
            COLLAPSE: 2
        };
        t.parseVisibility = function(e) {
            switch (e) {
              case "hidden":
                return r.HIDDEN;

              case "collapse":
                return r.COLLAPSE;

              case "visible":
              default:
                return r.VISIBLE;
            }
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.parseZIndex = function(e) {
            var t = "auto" === e;
            return {
                auto: t,
                order: t ? 0 : parseInt(e, 10)
            };
        };
    }, function(t, n, r) {
        (function(t, o) {
            var a;
            !function(i) {
                function u(e) {
                    throw new RangeError(A[e]);
                }
                function l(e, t) {
                    for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
                    return r;
                }
                function s(e, t) {
                    var n = e.split("@"), r = "";
                    return n.length > 1 && (r = n[0] + "@", e = n[1]), r + l((e = e.replace(S, ".")).split("."), t).join(".");
                }
                function c(e) {
                    for (var t, n, r = [], o = 0, a = e.length; o < a; ) (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < a ? 56320 == (64512 & (n = e.charCodeAt(o++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), 
                    o--) : r.push(t);
                    return r;
                }
                function d(e) {
                    return l(e, function(e) {
                        var t = "";
                        return e > 65535 && (t += M((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), 
                        t += M(e);
                    }).join("");
                }
                function f(e) {
                    return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : w;
                }
                function h(e, t) {
                    return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
                }
                function g(e, t, n) {
                    var r = 0;
                    for (e = n ? L(e / I) : e >> 1, e += L(e / t); e > C * T >> 1; r += w) e = L(e / C);
                    return L(r + (C + 1) * e / (e + O));
                }
                function p(e) {
                    var t, n, r, o, a, i, l, s, c, h, p = [], m = e.length, v = 0, y = R, O = _;
                    for ((n = e.lastIndexOf(P)) < 0 && (n = 0), r = 0; r < n; ++r) e.charCodeAt(r) >= 128 && u("not-basic"), 
                    p.push(e.charCodeAt(r));
                    for (o = n > 0 ? n + 1 : 0; o < m; ) {
                        for (a = v, i = 1, l = w; o >= m && u("invalid-input"), ((s = f(e.charCodeAt(o++))) >= w || s > L((b - v) / i)) && u("overflow"), 
                        v += s * i, c = l <= O ? E : l >= O + T ? T : l - O, !(s < c); l += w) i > L(b / (h = w - c)) && u("overflow"), 
                        i *= h;
                        O = g(v - a, t = p.length + 1, 0 == a), L(v / t) > b - y && u("overflow"), y += L(v / t), 
                        v %= t, p.splice(v++, 0, y);
                    }
                    return d(p);
                }
                function m(e) {
                    var t, n, r, o, a, i, l, s, d, f, p, m, v, y, O, I = [];
                    for (m = (e = c(e)).length, t = R, n = 0, a = _, i = 0; i < m; ++i) (p = e[i]) < 128 && I.push(M(p));
                    for (r = o = I.length, o && I.push(P); r < m; ) {
                        for (l = b, i = 0; i < m; ++i) (p = e[i]) >= t && p < l && (l = p);
                        for (l - t > L((b - n) / (v = r + 1)) && u("overflow"), n += (l - t) * v, t = l, 
                        i = 0; i < m; ++i) if ((p = e[i]) < t && ++n > b && u("overflow"), p == t) {
                            for (s = n, d = w; f = d <= a ? E : d >= a + T ? T : d - a, !(s < f); d += w) O = s - f, 
                            y = w - f, I.push(M(h(f + O % y, 0))), s = L(O / y);
                            I.push(M(h(s, 0))), a = g(n, v, r == o), n = 0, ++r;
                        }
                        ++n, ++t;
                    }
                    return I.join("");
                }
                "object" == (void 0 === n ? "undefined" : e(n)) && n && n.nodeType, "object" == (void 0 === t ? "undefined" : e(t)) && t && t.nodeType;
                var v = "object" == (void 0 === o ? "undefined" : e(o)) && o;
                var y, b = 2147483647, w = 36, E = 1, T = 26, O = 38, I = 700, _ = 72, R = 128, P = "-", x = /^xn--/, N = /[^\x20-\x7E]/, S = /[\x2E\u3002\uFF0E\uFF61]/g, A = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, C = w - E, L = Math.floor, M = String.fromCharCode;
                y = {
                    version: "1.4.1",
                    ucs2: {
                        decode: c,
                        encode: d
                    },
                    decode: p,
                    encode: m,
                    toASCII: function(e) {
                        return s(e, function(e) {
                            return N.test(e) ? "xn--" + m(e) : e;
                        });
                    },
                    toUnicode: function(e) {
                        return s(e, function(e) {
                            return x.test(e) ? p(e.slice(4).toLowerCase()) : e;
                        });
                    }
                }, void 0 !== (a = function() {
                    return y;
                }.call(n, r, n, t)) && (t.exports = a);
            }();
        }).call(n, r(39)(t), r(40));
    }, function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), 
            Object.defineProperty(e, "loaded", {
                enumerable: !0,
                get: function() {
                    return e.l;
                }
            }), Object.defineProperty(e, "id", {
                enumerable: !0,
                get: function() {
                    return e.i;
                }
            }), e.webpackPolyfill = 1), e;
        };
    }, function(t, n) {
        var r;
        r = function() {
            return this;
        }();
        try {
            r = r || Function("return this")() || (0, eval)("this");
        } catch (t) {
            "object" === ("undefined" == typeof window ? "undefined" : e(window)) && (r = window);
        }
        t.exports = r;
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(4);
        t.default = function e(t, n, a) {
            r(this, e), this.type = o.PATH.CIRCLE, this.x = t, this.y = n, this.radius = a, 
            isNaN(t) && console.error("Invalid x value given for Circle"), isNaN(n) && console.error("Invalid y value given for Circle"), 
            isNaN(a) && console.error("Invalid radius value given for Circle");
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                var n = [], r = !0, o = !1, a = void 0;
                try {
                    for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (e) {
                    o = !0, a = e;
                } finally {
                    try {
                        !r && u.return && u.return();
                    } finally {
                        if (o) throw a;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), i = n(1), u = (n(20), n(43)), l = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(11)), s = n(6), c = n(10), d = function() {
            function e(t, n) {
                r(this, e), this.target = t, this.options = n, t.render(n);
            }
            return a(e, [ {
                key: "renderNode",
                value: function(e) {
                    e.isVisible() && (this.renderNodeBackgroundAndBorders(e), this.renderNodeContent(e));
                }
            }, {
                key: "renderNodeContent",
                value: function(e) {
                    var t = this, n = function() {
                        if (e.childNodes.length && e.childNodes.forEach(function(n) {
                            if (n instanceof l.default) {
                                var r = n.parent.style;
                                t.target.renderTextNode(n.bounds, r.color, r.font, r.textDecoration, r.textShadow);
                            } else t.target.drawShape(n, e.style.color);
                        }), e.image) {
                            var n = t.options.imageStore.get(e.image);
                            if (n) {
                                var r = (0, i.calculateContentBox)(e.bounds, e.style.padding, e.style.border), o = "number" == typeof n.width && n.width > 0 ? n.width : r.width, a = "number" == typeof n.height && n.height > 0 ? n.height : r.height;
                                o > 0 && a > 0 && t.target.clip([ (0, i.calculatePaddingBoxPath)(e.curvedBounds) ], function() {
                                    t.target.drawImage(n, new i.Bounds(0, 0, o, a), r);
                                });
                            }
                        }
                    }, r = e.getClipPaths();
                    r.length ? this.target.clip(r, n) : n();
                }
            }, {
                key: "renderNodeBackgroundAndBorders",
                value: function(e) {
                    var t = this, n = !e.style.background.backgroundColor.isTransparent() || e.style.background.backgroundImage.length, r = e.style.border.filter(function(e) {
                        return e.borderStyle !== c.BORDER_STYLE.NONE && !e.borderColor.isTransparent();
                    }), o = function() {
                        var o = (0, s.calculateBackgroungPaintingArea)(e.curvedBounds, e.style.background.backgroundClip);
                        n && t.target.clip([ o ], function() {
                            e.style.background.backgroundColor.isTransparent() || t.target.fill(e.style.background.backgroundColor), 
                            t.renderBackgroundImage(e);
                        }), r.forEach(function(n, r) {
                            t.renderBorder(n, r, e.curvedBounds);
                        });
                    };
                    if (n || r.length) {
                        var a = e.parent ? e.parent.getClipPaths() : [];
                        a.length ? this.target.clip(a, o) : o();
                    }
                }
            }, {
                key: "renderBackgroundImage",
                value: function(e) {
                    var t = this;
                    e.style.background.backgroundImage.slice(0).reverse().forEach(function(n) {
                        "url" === n.source.method && n.source.args.length ? t.renderBackgroundRepeat(e, n) : /gradient/i.test(n.source.method) && t.renderBackgroundGradient(e, n);
                    });
                }
            }, {
                key: "renderBackgroundRepeat",
                value: function(e, t) {
                    var n = this.options.imageStore.get(t.source.args[0]);
                    if (n) {
                        var r = (0, s.calculateBackgroungPositioningArea)(e.style.background.backgroundOrigin, e.bounds, e.style.padding, e.style.border), o = (0, 
                        s.calculateBackgroundSize)(t, n, r), a = (0, s.calculateBackgroundPosition)(t.position, o, r), i = (0, 
                        s.calculateBackgroundRepeatPath)(t, a, o, r, e.bounds), u = Math.round(r.left + a.x), l = Math.round(r.top + a.y);
                        this.target.renderRepeat(i, n, o, u, l);
                    }
                }
            }, {
                key: "renderBackgroundGradient",
                value: function(e, t) {
                    var n = (0, s.calculateBackgroungPositioningArea)(e.style.background.backgroundOrigin, e.bounds, e.style.padding, e.style.border), r = (0, 
                    s.calculateGradientBackgroundSize)(t, n), o = (0, s.calculateBackgroundPosition)(t.position, r, n), a = new i.Bounds(Math.round(n.left + o.x), Math.round(n.top + o.y), r.width, r.height), l = (0, 
                    u.parseGradient)(e, t.source, a);
                    if (l) switch (l.type) {
                      case u.GRADIENT_TYPE.LINEAR_GRADIENT:
                        this.target.renderLinearGradient(a, l);
                        break;

                      case u.GRADIENT_TYPE.RADIAL_GRADIENT:
                        this.target.renderRadialGradient(a, l);
                    }
                }
            }, {
                key: "renderBorder",
                value: function(e, t, n) {
                    this.target.drawShape((0, i.parsePathForBorder)(n, t), e.borderColor);
                }
            }, {
                key: "renderStack",
                value: function(e) {
                    var t = this;
                    if (e.container.isVisible()) {
                        var n = e.getOpacity();
                        n !== this._opacity && (this.target.setOpacity(e.getOpacity()), this._opacity = n);
                        var r = e.container.style.transform;
                        null !== r ? this.target.transform(e.container.bounds.left + r.transformOrigin[0].value, e.container.bounds.top + r.transformOrigin[1].value, r.transform, function() {
                            return t.renderStackContent(e);
                        }) : this.renderStackContent(e);
                    }
                }
            }, {
                key: "renderStackContent",
                value: function(e) {
                    var t = h(e), n = o(t, 5), r = n[0], a = n[1], i = n[2], u = n[3], l = n[4], s = f(e), c = o(s, 2), d = c[0], p = c[1];
                    this.renderNodeBackgroundAndBorders(e.container), r.sort(g).forEach(this.renderStack, this), 
                    this.renderNodeContent(e.container), p.forEach(this.renderNode, this), u.forEach(this.renderStack, this), 
                    l.forEach(this.renderStack, this), d.forEach(this.renderNode, this), a.forEach(this.renderStack, this), 
                    i.sort(g).forEach(this.renderStack, this);
                }
            }, {
                key: "render",
                value: function(e) {
                    var t = this;
                    this.options.backgroundColor && this.target.rectangle(this.options.x, this.options.y, this.options.width, this.options.height, this.options.backgroundColor), 
                    this.renderStack(e);
                    var n = this.target.getTarget();
                    return n.then(function(e) {
                        return t.options.logger.log("Render completed"), e;
                    });
                }
            } ]), e;
        }();
        t.default = d;
        var f = function(e) {
            for (var t = [], n = [], r = e.children.length, o = 0; o < r; o++) {
                var a = e.children[o];
                a.isInlineLevel() ? t.push(a) : n.push(a);
            }
            return [ t, n ];
        }, h = function(e) {
            for (var t = [], n = [], r = [], o = [], a = [], i = e.contexts.length, u = 0; u < i; u++) {
                var l = e.contexts[u];
                l.container.isPositioned() || l.container.style.opacity < 1 || l.container.isTransformed() ? l.container.style.zIndex.order < 0 ? t.push(l) : l.container.style.zIndex.order > 0 ? r.push(l) : n.push(l) : l.container.isFloating() ? o.push(l) : a.push(l);
            }
            return [ t, n, r, o, a ];
        }, g = function(e, t) {
            return e.container.style.zIndex.order > t.container.style.zIndex.order ? 1 : e.container.style.zIndex.order < t.container.style.zIndex.order ? -1 : e.container.index > t.container.index ? 1 : -1;
        };
    }, function(e, t, n) {
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.transformWebkitRadialGradientArgs = t.parseGradient = t.RadialGradient = t.LinearGradient = t.RADIAL_GRADIENT_SHAPE = t.GRADIENT_TYPE = void 0;
        var a = function() {
            function e(e, t) {
                var n = [], r = !0, o = !1, a = void 0;
                try {
                    for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (e) {
                    o = !0, a = e;
                } finally {
                    try {
                        !r && u.return && u.return();
                    } finally {
                        if (o) throw a;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), i = (r(n(5)), n(44)), u = r(n(0)), l = n(2), s = r(l), c = n(3), d = /^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i, f = /^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i, h = /(px)|%|( 0)$/i, g = /^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i, p = /^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i, m = t.GRADIENT_TYPE = {
            LINEAR_GRADIENT: 0,
            RADIAL_GRADIENT: 1
        }, v = t.RADIAL_GRADIENT_SHAPE = {
            CIRCLE: 0,
            ELLIPSE: 1
        }, y = {
            left: new s.default("0%"),
            top: new s.default("0%"),
            center: new s.default("50%"),
            right: new s.default("100%"),
            bottom: new s.default("100%")
        }, b = t.LinearGradient = function e(t, n) {
            o(this, e), this.type = m.LINEAR_GRADIENT, this.colorStops = t, this.direction = n;
        }, w = t.RadialGradient = function e(t, n, r, a) {
            o(this, e), this.type = m.RADIAL_GRADIENT, this.colorStops = t, this.shape = n, 
            this.center = r, this.radius = a;
        }, E = (t.parseGradient = function(e, t, n) {
            var r = t.args, o = t.method, a = t.prefix;
            return "linear-gradient" === o ? T(r, n, !!a) : "gradient" === o && "linear" === r[0] ? T([ "to bottom" ].concat(A(r.slice(3))), n, !!a) : "radial-gradient" === o ? O(e, "-webkit-" === a ? S(r) : r, n) : "gradient" === o && "radial" === r[0] ? O(e, A(S(r.slice(1))), n) : void 0;
        }, function(e, t, n) {
            for (var r = [], o = t; o < e.length; o++) {
                var a = e[o], i = h.test(a), l = a.lastIndexOf(" "), c = new u.default(i ? a.substring(0, l) : a), d = i ? new s.default(a.substring(l + 1)) : o === t ? new s.default("0%") : o === e.length - 1 ? new s.default("100%") : null;
                r.push({
                    color: c,
                    stop: d
                });
            }
            for (var f = r.map(function(e) {
                var t = e.color, r = e.stop;
                return {
                    color: t,
                    stop: 0 === n ? 0 : r ? r.getAbsoluteValue(n) / n : null
                };
            }), g = f[0].stop, p = 0; p < f.length; p++) if (null !== g) {
                var m = f[p].stop;
                if (null === m) {
                    for (var v = p; null === f[v].stop; ) v++;
                    for (var y = v - p + 1, b = (f[v].stop - g) / y; p < v; p++) g = f[p].stop = g + b;
                } else g = m;
            }
            return f;
        }), T = function(e, t, n) {
            var r = (0, i.parseAngle)(e[0]), o = d.test(e[0]), a = o || null !== r || f.test(e[0]), u = a ? null !== r ? I(n ? r - .5 * Math.PI : r, t) : o ? R(e[0], t) : P(e[0], t) : I(Math.PI, t), l = a ? 1 : 0, s = Math.min((0, 
            c.distance)(Math.abs(u.x0) + Math.abs(u.x1), Math.abs(u.y0) + Math.abs(u.y1)), 2 * t.width, 2 * t.height);
            return new b(E(e, l, s), u);
        }, O = function(e, t, n) {
            var r = t[0].match(p), o = r && ("circle" === r[1] || void 0 !== r[3] && void 0 === r[5]) ? v.CIRCLE : v.ELLIPSE, a = {}, i = {};
            r && (void 0 !== r[3] && (a.x = (0, l.calculateLengthFromValueWithUnit)(e, r[3], r[4]).getAbsoluteValue(n.width)), 
            void 0 !== r[5] && (a.y = (0, l.calculateLengthFromValueWithUnit)(e, r[5], r[6]).getAbsoluteValue(n.height)), 
            r[7] ? i.x = y[r[7].toLowerCase()] : void 0 !== r[8] && (i.x = (0, l.calculateLengthFromValueWithUnit)(e, r[8], r[9])), 
            r[10] ? i.y = y[r[10].toLowerCase()] : void 0 !== r[11] && (i.y = (0, l.calculateLengthFromValueWithUnit)(e, r[11], r[12])));
            var u = {
                x: void 0 === i.x ? n.width / 2 : i.x.getAbsoluteValue(n.width),
                y: void 0 === i.y ? n.height / 2 : i.y.getAbsoluteValue(n.height)
            }, s = N(r && r[2] || "farthest-corner", o, u, a, n);
            return new w(E(t, r ? 1 : 0, Math.min(s.x, s.y)), o, u, s);
        }, I = function(e, t) {
            var n = t.width, r = t.height, o = .5 * n, a = .5 * r, i = (Math.abs(n * Math.sin(e)) + Math.abs(r * Math.cos(e))) / 2, u = o + Math.sin(e) * i, l = a - Math.cos(e) * i;
            return {
                x0: u,
                x1: n - u,
                y0: l,
                y1: r - l
            };
        }, _ = function(e) {
            return Math.acos(e.width / 2 / ((0, c.distance)(e.width, e.height) / 2));
        }, R = function(e, t) {
            switch (e) {
              case "bottom":
              case "to top":
                return I(0, t);

              case "left":
              case "to right":
                return I(Math.PI / 2, t);

              case "right":
              case "to left":
                return I(3 * Math.PI / 2, t);

              case "top right":
              case "right top":
              case "to bottom left":
              case "to left bottom":
                return I(Math.PI + _(t), t);

              case "top left":
              case "left top":
              case "to bottom right":
              case "to right bottom":
                return I(Math.PI - _(t), t);

              case "bottom left":
              case "left bottom":
              case "to top right":
              case "to right top":
                return I(_(t), t);

              case "bottom right":
              case "right bottom":
              case "to top left":
              case "to left top":
                return I(2 * Math.PI - _(t), t);

              case "top":
              case "to bottom":
              default:
                return I(Math.PI, t);
            }
        }, P = function(e, t) {
            var n = e.split(" ").map(parseFloat), r = a(n, 2), o = r[0], i = r[1], u = o / 100 * t.width / (i / 100 * t.height);
            return I(Math.atan(isNaN(u) ? 1 : u) + Math.PI / 2, t);
        }, x = function(e, t, n, r) {
            return [ {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: e.height
            }, {
                x: e.width,
                y: 0
            }, {
                x: e.width,
                y: e.height
            } ].reduce(function(e, o) {
                var a = (0, c.distance)(t - o.x, n - o.y);
                return (r ? a < e.optimumDistance : a > e.optimumDistance) ? {
                    optimumCorner: o,
                    optimumDistance: a
                } : e;
            }, {
                optimumDistance: r ? 1 / 0 : -1 / 0,
                optimumCorner: null
            }).optimumCorner;
        }, N = function(e, t, n, r, o) {
            var a = n.x, i = n.y, u = 0, l = 0;
            switch (e) {
              case "closest-side":
                t === v.CIRCLE ? u = l = Math.min(Math.abs(a), Math.abs(a - o.width), Math.abs(i), Math.abs(i - o.height)) : t === v.ELLIPSE && (u = Math.min(Math.abs(a), Math.abs(a - o.width)), 
                l = Math.min(Math.abs(i), Math.abs(i - o.height)));
                break;

              case "closest-corner":
                if (t === v.CIRCLE) u = l = Math.min((0, c.distance)(a, i), (0, c.distance)(a, i - o.height), (0, 
                c.distance)(a - o.width, i), (0, c.distance)(a - o.width, i - o.height)); else if (t === v.ELLIPSE) {
                    var s = Math.min(Math.abs(i), Math.abs(i - o.height)) / Math.min(Math.abs(a), Math.abs(a - o.width)), d = x(o, a, i, !0);
                    l = s * (u = (0, c.distance)(d.x - a, (d.y - i) / s));
                }
                break;

              case "farthest-side":
                t === v.CIRCLE ? u = l = Math.max(Math.abs(a), Math.abs(a - o.width), Math.abs(i), Math.abs(i - o.height)) : t === v.ELLIPSE && (u = Math.max(Math.abs(a), Math.abs(a - o.width)), 
                l = Math.max(Math.abs(i), Math.abs(i - o.height)));
                break;

              case "farthest-corner":
                if (t === v.CIRCLE) u = l = Math.max((0, c.distance)(a, i), (0, c.distance)(a, i - o.height), (0, 
                c.distance)(a - o.width, i), (0, c.distance)(a - o.width, i - o.height)); else if (t === v.ELLIPSE) {
                    var f = Math.max(Math.abs(i), Math.abs(i - o.height)) / Math.max(Math.abs(a), Math.abs(a - o.width)), h = x(o, a, i, !1);
                    l = f * (u = (0, c.distance)(h.x - a, (h.y - i) / f));
                }
                break;

              default:
                u = r.x || 0, l = void 0 !== r.y ? r.y : u;
            }
            return {
                x: u,
                y: l
            };
        }, S = t.transformWebkitRadialGradientArgs = function(e) {
            var t = "", n = "", r = "", o = "", a = 0, i = /^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i, u = /^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i, l = /^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i, s = e[a].match(i);
            s && a++;
            var c = e[a].match(u);
            c && (t = c[1] || "", "contain" === (r = c[2] || "") ? r = "closest-side" : "cover" === r && (r = "farthest-corner"), 
            a++);
            var d = e[a].match(l);
            d && a++;
            var f = e[a].match(i);
            f && a++;
            var h = e[a].match(l);
            h && a++;
            var g = f || s;
            g && g[1] && (o = g[1] + (/^\d+$/.test(g[1]) ? "px" : ""), g[2] && (o += " " + g[2] + (/^\d+$/.test(g[2]) ? "px" : "")));
            var p = h || d;
            return p && (n = p[0], p[1] || (n += "px")), !o || t || n || r || (n = o, o = ""), 
            o && (o = "at " + o), [ [ t, r, n, o ].filter(function(e) {
                return !!e;
            }).join(" ") ].concat(e.slice(a));
        }, A = function(e) {
            return e.map(function(e) {
                return e.match(g);
            }).map(function(t, n) {
                if (!t) return e[n];
                switch (t[1]) {
                  case "from":
                    return t[4] + " 0%";

                  case "to":
                    return t[4] + " 100%";

                  case "color-stop":
                    return "%" === t[3] ? t[4] + " " + t[2] : t[4] + " " + 100 * parseFloat(t[2]) + "%";
                }
            });
        };
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = /([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;
        t.parseAngle = function(e) {
            var t = e.match(r);
            if (t) {
                var n = parseFloat(t[1]);
                switch (t[2].toLowerCase()) {
                  case "deg":
                    return Math.PI * n / 180;

                  case "grad":
                    return Math.PI / 200 * n;

                  case "rad":
                    return n;

                  case "turn":
                    return 2 * Math.PI * n;
                }
            }
            return null;
        };
    }, function(e, t, n) {
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.cloneWindow = t.DocumentCloner = void 0;
        var a = function() {
            function e(e, t) {
                var n = [], r = !0, o = !1, a = void 0;
                try {
                    for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (e) {
                    o = !0, a = e;
                } finally {
                    try {
                        !r && u.return && u.return();
                    } finally {
                        if (o) throw a;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), u = n(1), l = n(21), s = r(n(46)), c = n(3), d = n(6), f = r(n(12)), h = t.DocumentCloner = function() {
            function e(t, n, r, a, i) {
                o(this, e), this.referenceElement = t, this.scrolledElements = [], this.copyStyles = a, 
                this.inlineImages = a, this.logger = r, this.options = n, this.renderer = i, this.resourceLoader = new s.default(n, r, window), 
                this.documentElement = this.cloneNode(t.ownerDocument.documentElement);
            }
            return i(e, [ {
                key: "inlineAllImages",
                value: function(e) {
                    var t = this;
                    if (this.inlineImages && e) {
                        var n = e.style;
                        Promise.all((0, d.parseBackgroundImage)(n.backgroundImage).map(function(e) {
                            return "url" === e.method ? t.resourceLoader.inlineImage(e.args[0]).then(function(e) {
                                return e && "string" == typeof e.src ? 'url("' + e.src + '")' : "none";
                            }).catch(function(e) {
                                t.logger.log("Unable to load image", e);
                            }) : Promise.resolve("" + e.prefix + e.method + "(" + e.args.join(",") + ")");
                        })).then(function(e) {
                            e.length > 1 && (n.backgroundColor = ""), n.backgroundImage = e.join(",");
                        }), e instanceof HTMLImageElement && this.resourceLoader.inlineImage(e.src).then(function(t) {
                            if (t && e instanceof HTMLImageElement && e.parentNode) {
                                var n = e.parentNode, r = (0, c.copyCSSStyles)(e.style, t.cloneNode(!1));
                                n.replaceChild(r, e);
                            }
                        }).catch(function(e) {
                            t.logger.log("Unable to load image", e);
                        });
                    }
                }
            }, {
                key: "inlineFonts",
                value: function(e) {
                    var t = this;
                    return Promise.all(Array.from(e.styleSheets).map(function(n) {
                        return n.href ? fetch(n.href).then(function(e) {
                            return e.text();
                        }).then(function(e) {
                            return p(e, n.href);
                        }).catch(function(e) {
                            return t.logger.log("Unable to load stylesheet", e), [];
                        }) : g(n, e);
                    })).then(function(e) {
                        return e.reduce(function(e, t) {
                            return e.concat(t);
                        }, []);
                    }).then(function(e) {
                        return Promise.all(e.map(function(e) {
                            return fetch(e.formats[0].src).then(function(e) {
                                return e.blob();
                            }).then(function(e) {
                                return new Promise(function(t, n) {
                                    var r = new FileReader();
                                    r.onerror = n, r.onload = function() {
                                        var e = r.result;
                                        t(e);
                                    }, r.readAsDataURL(e);
                                });
                            }).then(function(t) {
                                return e.fontFace.setProperty("src", 'url("' + t + '")'), "@font-face {" + e.fontFace.cssText + " ";
                            });
                        }));
                    }).then(function(n) {
                        var r = e.createElement("style");
                        r.textContent = n.join("\n"), t.documentElement.appendChild(r);
                    });
                }
            }, {
                key: "createElementClone",
                value: function(e) {
                    var t = this;
                    if (this.copyStyles && e instanceof HTMLCanvasElement) {
                        var n = e.ownerDocument.createElement("img");
                        try {
                            return n.src = e.toDataURL(), n;
                        } catch (e) {
                            this.logger.log("Unable to clone canvas contents, canvas is tainted");
                        }
                    }
                    if (e instanceof HTMLIFrameElement) {
                        var r = e.cloneNode(!1), o = x();
                        r.setAttribute("data-html2canvas-internal-iframe-key", o);
                        var a = (0, u.parseBounds)(e, 0, 0), i = a.width, l = a.height;
                        return this.resourceLoader.cache[o] = S(e, this.options).then(function(e) {
                            return t.renderer(e, {
                                async: t.options.async,
                                allowTaint: t.options.allowTaint,
                                backgroundColor: "#ffffff",
                                canvas: null,
                                imageTimeout: t.options.imageTimeout,
                                logging: t.options.logging,
                                proxy: t.options.proxy,
                                removeContainer: t.options.removeContainer,
                                scale: t.options.scale,
                                foreignObjectRendering: t.options.foreignObjectRendering,
                                target: new f.default(),
                                width: i,
                                height: l,
                                x: 0,
                                y: 0,
                                windowWidth: e.ownerDocument.defaultView.innerWidth,
                                windowHeight: e.ownerDocument.defaultView.innerHeight,
                                scrollX: e.ownerDocument.defaultView.pageXOffset,
                                scrollY: e.ownerDocument.defaultView.pageYOffset
                            }, t.logger.child(o));
                        }).then(function(t) {
                            return new Promise(function(n, o) {
                                var a = document.createElement("img");
                                a.onload = function() {
                                    return n(t);
                                }, a.onerror = o, a.src = t.toDataURL(), r.parentNode && r.parentNode.replaceChild((0, 
                                c.copyCSSStyles)(e.ownerDocument.defaultView.getComputedStyle(e), a), r);
                            });
                        }), r;
                    }
                    return e.cloneNode(!1);
                }
            }, {
                key: "cloneNode",
                value: function(e) {
                    var t = e.nodeType === Node.TEXT_NODE ? document.createTextNode(e.nodeValue) : this.createElementClone(e), n = e.ownerDocument.defaultView;
                    this.referenceElement === e && t instanceof n.HTMLElement && (this.clonedReferenceElement = t), 
                    t instanceof n.HTMLBodyElement && _(t);
                    for (var r = e.firstChild; r; r = r.nextSibling) (r.nodeType !== Node.ELEMENT_NODE || "SCRIPT" !== r.nodeName && !r.hasAttribute("data-html2canvas-ignore")) && (this.copyStyles && "STYLE" === r.nodeName || t.appendChild(this.cloneNode(r)));
                    if (e instanceof n.HTMLElement && t instanceof n.HTMLElement) switch (this.inlineAllImages(y(e, t, E)), 
                    this.inlineAllImages(y(e, t, T)), !this.copyStyles || e instanceof HTMLIFrameElement || (0, 
                    c.copyCSSStyles)(e.ownerDocument.defaultView.getComputedStyle(e), t), this.inlineAllImages(t), 
                    0 === e.scrollTop && 0 === e.scrollLeft || this.scrolledElements.push([ t, e.scrollLeft, e.scrollTop ]), 
                    e.nodeName) {
                      case "CANVAS":
                        this.copyStyles || v(e, t);
                        break;

                      case "TEXTAREA":
                      case "SELECT":
                        t.value = e.value;
                    }
                    return t;
                }
            } ]), e;
        }(), g = function(e, t) {
            return (e.cssRules ? Array.from(e.cssRules) : []).filter(function(e) {
                return e.type === CSSRule.FONT_FACE_RULE;
            }).map(function(e) {
                for (var n = (0, d.parseBackgroundImage)(e.style.getPropertyValue("src")), r = [], o = 0; o < n.length; o++) if ("url" === n[o].method && n[o + 1] && "format" === n[o + 1].method) {
                    var a = t.createElement("a");
                    a.href = n[o].args[0], t.body && t.body.appendChild(a);
                    var i = {
                        src: a.href,
                        format: n[o + 1].args[0]
                    };
                    r.push(i);
                }
                return {
                    formats: r.filter(function(e) {
                        return /^woff/i.test(e.format);
                    }),
                    fontFace: e.style
                };
            }).filter(function(e) {
                return e.formats.length;
            });
        }, p = function(e, t) {
            var n = document.implementation.createHTMLDocument(""), r = document.createElement("base");
            r.href = t;
            var o = document.createElement("style");
            return o.textContent = e, n.head && n.head.appendChild(r), n.body && n.body.appendChild(o), 
            o.sheet ? g(o.sheet, n) : [];
        }, m = function(e, t, n) {
            !e.defaultView || t === e.defaultView.pageXOffset && n === e.defaultView.pageYOffset || e.defaultView.scrollTo(t, n);
        }, v = function(e, t) {
            try {
                if (t) {
                    t.width = e.width, t.height = e.height;
                    var n = e.getContext("2d"), r = t.getContext("2d");
                    n ? r.putImageData(n.getImageData(0, 0, e.width, e.height), 0, 0) : r.drawImage(e, 0, 0);
                }
            } catch (e) {}
        }, y = function(e, t, n) {
            var r = e.ownerDocument.defaultView.getComputedStyle(e, n);
            if (r && r.content && "none" !== r.content && "-moz-alt-content" !== r.content && "none" !== r.display) {
                var o = b(r.content), a = o.match(w), i = t.ownerDocument.createElement(a ? "img" : "html2canvaspseudoelement");
                return a ? i.src = b(a[1]) : i.textContent = o, (0, c.copyCSSStyles)(r, i), i.className = O + " " + I, 
                t.className += n === E ? " " + O : " " + I, n === E ? t.insertBefore(i, t.firstChild) : t.appendChild(i), 
                i;
            }
        }, b = function(e) {
            var t = e.substr(0, 1);
            return t === e.substr(e.length - 1) && t.match(/['"]/) ? e.substr(1, e.length - 2) : e;
        }, w = /^url\((.+)\)$/i, E = ":before", T = ":after", O = "___html2canvas___pseudoelement_before", I = "___html2canvas___pseudoelement_after", _ = function(e) {
            R(e, "." + O + E + '{\n    content: "" !important;\n    display: none !important;\n}\n         .' + I + T + '{\n    content: "" !important;\n    display: none !important;\n}');
        }, R = function(e, t) {
            var n = e.ownerDocument.createElement("style");
            n.innerHTML = t, e.appendChild(n);
        }, P = function(e) {
            var t = a(e, 3), n = t[0], r = t[1], o = t[2];
            n.scrollLeft = r, n.scrollTop = o;
        }, x = function() {
            return Math.ceil(Date.now() + 1e7 * Math.random()).toString(16);
        }, N = /^data:text\/(.+);(base64)?,(.*)$/i, S = function(e, t) {
            try {
                return Promise.resolve(e.contentWindow.document.documentElement);
            } catch (n) {
                return t.proxy ? (0, l.Proxy)(e.src, t).then(function(e) {
                    var t = e.match(N);
                    return t ? "base64" === t[2] ? window.atob(decodeURIComponent(t[3])) : decodeURIComponent(t[3]) : Promise.reject();
                }).then(function(t) {
                    return A(e.ownerDocument, (0, u.parseBounds)(e, 0, 0)).then(function(e) {
                        var n = e.contentWindow.document;
                        n.open(), n.write(t);
                        var r = C(e).then(function() {
                            return n.documentElement;
                        });
                        return n.close(), r;
                    });
                }) : Promise.reject();
            }
        }, A = function(e, t) {
            var n = e.createElement("iframe");
            return n.className = "html2canvas-container", n.style.visibility = "hidden", n.style.position = "fixed", 
            n.style.left = "-10000px", n.style.top = "0px", n.style.border = "0", n.width = t.width.toString(), 
            n.height = t.height.toString(), n.scrolling = "no", n.setAttribute("data-html2canvas-ignore", "true"), 
            e.body ? (e.body.appendChild(n), Promise.resolve(n)) : Promise.reject("Body element not found in Document that is getting rendered");
        }, C = function(e) {
            var t = e.contentWindow, n = t.document;
            return new Promise(function(r, o) {
                t.onload = e.onload = n.onreadystatechange = function() {
                    var t = setInterval(function() {
                        n.body.childNodes.length > 0 && "complete" === n.readyState && (clearInterval(t), 
                        r(e));
                    }, 50);
                };
            });
        };
        t.cloneWindow = function(e, t, n, r, o, a) {
            var i = new h(n, r, o, !1, a), u = e.defaultView.pageXOffset, l = e.defaultView.pageYOffset;
            return A(e, t).then(function(r) {
                var o = r.contentWindow, a = o.document, s = C(r).then(function() {
                    return i.scrolledElements.forEach(P), o.scrollTo(t.left, t.top), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || o.scrollY === t.top && o.scrollX === t.left || (a.documentElement.style.top = -t.top + "px", 
                    a.documentElement.style.left = -t.left + "px", a.documentElement.style.position = "absolute"), 
                    i.clonedReferenceElement instanceof o.HTMLElement || i.clonedReferenceElement instanceof e.defaultView.HTMLElement || i.clonedReferenceElement instanceof HTMLElement ? Promise.resolve([ r, i.clonedReferenceElement, i.resourceLoader ]) : Promise.reject("Error finding the " + n.nodeName + " in the cloned document");
                });
                return a.open(), a.write("<!DOCTYPE html><html></html>"), m(n.ownerDocument, u, l), 
                a.replaceChild(a.adoptNode(i.documentElement), a.documentElement), a.close(), s;
            });
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.ResourceStore = void 0;
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(8)), i = n(21), u = function() {
            function e(t, n, o) {
                r(this, e), this.options = t, this._window = o, this.origin = this.getOrigin(o.location.href), 
                this.cache = {}, this.logger = n, this._index = 0;
            }
            return o(e, [ {
                key: "loadImage",
                value: function(e) {
                    var t = this;
                    if (this.hasResourceInCache(e)) return e;
                    if (!g(e) || a.default.SUPPORT_SVG_DRAWING) {
                        if (!0 === this.options.allowTaint || f(e) || this.isSameOrigin(e)) return this.addImage(e, e, !1);
                        if (!this.isSameOrigin(e)) {
                            if ("string" == typeof this.options.proxy) return this.cache[e] = (0, i.Proxy)(e, this.options).then(function(e) {
                                return p(e, t.options.imageTimeout || 0);
                            }), e;
                            if (!0 === this.options.useCORS && a.default.SUPPORT_CORS_IMAGES) return this.addImage(e, e, !0);
                        }
                    }
                }
            }, {
                key: "inlineImage",
                value: function(e) {
                    var t = this;
                    return f(e) ? p(e, this.options.imageTimeout || 0) : this.hasResourceInCache(e) ? this.cache[e] : this.isSameOrigin(e) || "string" != typeof this.options.proxy ? this.xhrImage(e) : this.cache[e] = (0, 
                    i.Proxy)(e, this.options).then(function(e) {
                        return p(e, t.options.imageTimeout || 0);
                    });
                }
            }, {
                key: "xhrImage",
                value: function(e) {
                    var t = this;
                    return this.cache[e] = new Promise(function(n, r) {
                        var o = new XMLHttpRequest();
                        if (o.onreadystatechange = function() {
                            if (4 === o.readyState) if (200 !== o.status) r("Failed to fetch image " + e.substring(0, 256) + " with status code " + o.status); else {
                                var t = new FileReader();
                                t.addEventListener("load", function() {
                                    var e = t.result;
                                    n(e);
                                }, !1), t.addEventListener("error", function(e) {
                                    return r(e);
                                }, !1), t.readAsDataURL(o.response);
                            }
                        }, o.responseType = "blob", t.options.imageTimeout) {
                            var a = t.options.imageTimeout;
                            o.timeout = a, o.ontimeout = function() {
                                return r("Timed out (" + a + "ms) fetching " + e.substring(0, 256));
                            };
                        }
                        o.open("GET", e, !0), o.send();
                    }).then(function(e) {
                        return p(e, t.options.imageTimeout || 0);
                    }), this.cache[e];
                }
            }, {
                key: "loadCanvas",
                value: function(e) {
                    var t = String(this._index++);
                    return this.cache[t] = Promise.resolve(e), t;
                }
            }, {
                key: "hasResourceInCache",
                value: function(e) {
                    return void 0 !== this.cache[e];
                }
            }, {
                key: "addImage",
                value: function(e, t, n) {
                    var r = this;
                    this.logger.log("Added image " + e.substring(0, 256));
                    var o = function(e) {
                        return new Promise(function(o, a) {
                            var i = new Image();
                            if (i.onload = function() {
                                return o(i);
                            }, e && !n || (i.crossOrigin = "anonymous"), i.onerror = a, i.src = t, !0 === i.complete && setTimeout(function() {
                                o(i);
                            }, 500), r.options.imageTimeout) {
                                var u = r.options.imageTimeout;
                                setTimeout(function() {
                                    return a("Timed out (" + u + "ms) fetching " + t.substring(0, 256));
                                }, u);
                            }
                        });
                    };
                    return this.cache[e] = h(t) && !g(t) ? a.default.SUPPORT_BASE64_DRAWING(t).then(o) : o(!0), 
                    e;
                }
            }, {
                key: "isSameOrigin",
                value: function(e) {
                    return this.getOrigin(e) === this.origin;
                }
            }, {
                key: "getOrigin",
                value: function(e) {
                    var t = this._link || (this._link = this._window.document.createElement("a"));
                    return t.href = e, t.href = t.href, t.protocol + t.hostname + t.port;
                }
            }, {
                key: "ready",
                value: function() {
                    var e = this, t = Object.keys(this.cache), n = t.map(function(t) {
                        return e.cache[t].catch(function(t) {
                            return e.logger.log("Unable to load image", t), null;
                        });
                    });
                    return Promise.all(n).then(function(n) {
                        return e.logger.log("Finished loading " + n.length + " images", n), new l(t, n);
                    });
                }
            } ]), e;
        }();
        t.default = u;
        var l = t.ResourceStore = function() {
            function e(t, n) {
                r(this, e), this._keys = t, this._resources = n;
            }
            return o(e, [ {
                key: "get",
                value: function(e) {
                    var t = this._keys.indexOf(e);
                    return -1 === t ? null : this._resources[t];
                }
            } ]), e;
        }(), s = /^data:image\/svg\+xml/i, c = /^data:image\/.*;base64,/i, d = /^data:image\/.*/i, f = function(e) {
            return d.test(e);
        }, h = function(e) {
            return c.test(e);
        }, g = function(e) {
            return "svg" === e.substr(-3).toLowerCase() || s.test(e);
        }, p = function(e, t) {
            return new Promise(function(n, r) {
                var o = new Image();
                o.onload = function() {
                    return n(o);
                }, o.onerror = r, o.src = e, !0 === o.complete && setTimeout(function() {
                    n(o);
                }, 500), t && setTimeout(function() {
                    return r("Timed out (" + t + "ms) loading image");
                }, t);
            });
        };
    } ]);
});