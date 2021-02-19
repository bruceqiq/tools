module.exports = function(n) {
    return function(r) {
        for (var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), c = 1; c < t; c++) e[c - 1] = arguments[c];
        return new Promise(function(t, c) {
            n.apply(void 0, [ Object.assign({}, r, {
                success: t,
                fail: c
            }) ].concat(e));
        });
    };
};