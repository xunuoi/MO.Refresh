/**
 *  for canvas util
 * @return {[type]} [description]
 */


var o = function() {
    var t = function(t, a, e, o, s, n, r, i) {
            "use strict";
            "string" == typeof a && (a = parseFloat(a)), "string" == typeof e && (e = parseFloat(e)), "string" == typeof o && (o = parseFloat(o)), "string" == typeof s && (s = parseFloat(s)), "string" == typeof n && (n = parseFloat(n)), "string" == typeof r && (r = parseFloat(r));
            2 * Math.PI;
            switch (t.save(), t.beginPath(), t.moveTo(a, e), t.lineTo(o, s), t.lineTo(n, r), i) {
            case 0:
                var h = Math.sqrt((n - a) * (n - a) + (r - e) * (r - e));
                t.arcTo(o, s, a, e, .55 * h), t.fill();
                break;
            case 1:
                t.beginPath(), t.moveTo(a, e), t.lineTo(o, s), t.lineTo(n, r), t.lineTo(a, e), t.fill();
                break;
            case 2:
                t.stroke();
                break;
            case 3:
                var f = (a + o + n) / 3,
                    M = (e + s + r) / 3;
                t.quadraticCurveTo(f, M, a, e), t.fill();
                break;
            case 4:
                var c, p, l, d, h, u = 5;
                if (n == a) h = r - e, c = (o + a) / 2, l = (o + a) / 2, p = s + h / u, d = s - h / u;
                else {
                    h = Math.sqrt((n - a) * (n - a) + (r - e) * (r - e));
                    var y = (a + n) / 2,
                        v = (e + r) / 2,
                        g = (y + o) / 2,
                        T = (v + s) / 2,
                        b = (r - e) / (n - a),
                        F = h / (2 * Math.sqrt(b * b + 1)) / u,
                        P = b * F;
                    c = g - F, p = T - P, l = g + F, d = T + P
                }
                t.bezierCurveTo(c, p, l, d, a, e), t.fill()
            }
            t.restore()
        },
        a = function(t, a, o, s, n, r, i, h, f, M, c, p, l) {
            "use strict";
            h = "undefined" != typeof h ? h : 3, f = "undefined" != typeof f ? f : 1, M = "undefined" != typeof M ? M : Math.PI / 8, c = "undefined" != typeof c ? c : 10, p = "undefined" != typeof p ? p : 1, t.save(), t.lineWidth = p, t.beginPath(), t.arc(a, o, s, n, r, i), t.stroke();
            var d, u, y, v, g;
            if (1 & f && (d = Math.cos(n) * s + a, u = Math.sin(n) * s + o, y = Math.atan2(a - d, u - o), i ? (v = d + 10 * Math.cos(y), g = u + 10 * Math.sin(y)) : (v = d - 10 * Math.cos(y), g = u - 10 * Math.sin(y)), e(t, d, u, v, g, h, 2, M, c)), 2 & f) {
                d = Math.cos(r) * s + a, u = Math.sin(r) * s + o, y = Math.atan2(a - d, u - o), i ? (v = d - 10 * Math.cos(y), g = u - 10 * Math.sin(y)) : (v = d + 10 * Math.cos(y), g = u + 10 * Math.sin(y)), e(t, d - l * Math.sin(r), u + l * Math.cos(r), v - l * Math.sin(r), g + l * Math.cos(r), h, 2, M, c)
            }
            t.restore()
        },
        e = function(a, e, o, s, n, r, i, h, f) {
            "use strict";
            "string" == typeof e && (e = parseFloat(e)), "string" == typeof o && (o = parseFloat(o)), "string" == typeof s && (s = parseFloat(s)), "string" == typeof n && (n = parseFloat(n)), r = "undefined" != typeof r ? r : 3, i = "undefined" != typeof i ? i : 1, h = "undefined" != typeof h ? h : Math.PI / 8, f = "undefined" != typeof f ? f : 10;
            var M, c, p, l, d = "function" != typeof r ? t : r,
                u = Math.sqrt((s - e) * (s - e) + (n - o) * (n - o)),
                y = (u - f / 3) / u;
            1 & i ? (M = Math.round(e + (s - e) * y), c = Math.round(o + (n - o) * y)) : (M = s, c = n), 2 & i ? (p = e + (s - e) * (1 - y), l = o + (n - o) * (1 - y)) : (p = e, l = o), a.beginPath(), a.moveTo(p, l), a.lineTo(M, c), a.stroke();
            var v = Math.atan2(n - o, s - e),
                g = Math.abs(f / Math.cos(h));
            if (1 & i) {
                var T = v + Math.PI + h,
                    b = s + Math.cos(T) * g,
                    F = n + Math.sin(T) * g,
                    P = v + Math.PI - h,
                    k = s + Math.cos(P) * g,
                    m = n + Math.sin(P) * g;
                d(a, b, F, s, n, k, m, r)
            }
            if (2 & i) {
                var T = v + h,
                    b = e + Math.cos(T) * g,
                    F = o + Math.sin(T) * g,
                    P = v - h,
                    k = e + Math.cos(P) * g,
                    m = o + Math.sin(P) * g;
                d(a, b, F, e, o, k, m, r)
            }
        };

        
    return {
        drawArrow: e,
        drawArcedArrow: a
    }


}();


window.CanvasUtils = o

export default o