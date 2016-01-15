
/**
 * TouchPull JS
 * 
 */
import './responsive'

import TouchPull from "./touchPull"
import CanvasUtils from "./canvasUtils"

var i = function(e) {
    function t(e) {
        return e * (Math.PI / 180)
    }

    function n(e, t) {
        var n = [0, 0],
            i = [n[0], n[1] + e],
            r = [n[0] + e / 2, n[1] + e / 2],
            s = [n[0], n[1] + e / 2],
            o = t,
            a = [];
        a.push("M" + n.join(",")), a.push("L" + i.join(",")), a.push("L" + r.join(",")), a.push("L" + n.join(",")), o.find("path").attr("d", a.join(" ")), o[0].setAttribute("refX", s[0]), o[0].setAttribute("refY", s[1])
    }

    function i(i) {
        i = e.extend({
            x: 0,
            y: 0,
            radius: 0,
            margin: 0,
            startDegree: 0,
            endDegree: 0,
            arrowSize: 0,
            arrowObj: e("#markerArrow"),
            pathObj: e("#svgPath"),
            color: "#ff0000"
        }, i);
        var r = i.radius,
            s = i.margin,
            o = r + s + r * Math.sin(t(i.endDegree)),
            a = r + s - r * Math.cos(t(i.endDegree)),
            l = r + s + r * Math.sin(t(i.startDegree)),
            u = r + s - r * Math.cos(t(i.startDegree));
        l = responsive.px2px(l), u = responsive.px2px(u), r = responsive.px2px(r), o = responsive.px2px(o), a = responsive.px2px(a);
        var c = [
            ["M" + l, u].join(",")
        ];
        c.push([
            ["A" + r, r].join(","), "0", [i.endDegree - i.startDegree > 180 ? "1" : "0", "1"].join(","), [o, a].join(",")
        ].join(" "));
        var h = c.join(" ");
        e(i.pathObj).attr("d", h).css("stroke", i.color), e(i.arrowObj).find("path").css("fill", i.color), n(i.arrowSize, e(i.arrowObj))
    }
    return {
        drawArc: i
    }

}(window.jQuery || window.Zepto, window);


!function(e, t) {
    var n = t.document,
        r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(e) {
            window.setTimeout(e, 1e3 / 60)
        },
        s = {
            con: "",
            minDistance: 4
        },
        o = ["onPullStart", "onMove", "onRelease", "needRefresh", "doRefresh", "noop"],
        a = 30,
        l = 10,
        u = 300,
        c = 85 * (responsive || {
            dpr: 1
        }).dpr,
        h = 10,
        p = function(e) {
            var t = 5 * e / 12;
            return t
        },
        f = function() {
            var e = document.createElement("canvas"),
                t = !(!e.getContext || !e.getContext("2d")),
                n = navigator.userAgent.toLowerCase(),
                i = (n.match(/chrome\/([\d.]+)/), n.match(/version\/([\d.]+).*safari/)),
                r = (n.match(/firefox\/([\d.]+)/), n.match(/mx[\d.]+/)),
                s = !1;
            return r && i && (s = !0), !t && s
        }(),
        d = function() {
            return !0
        }();


    function v(i) {
        "string" == typeof i.con && (i.con = n.querySelector(i.con));
        var r = {},
            a = this;
        e.each(o, function(e, t) {
            r[t] = a["_" + t].bind(a)
        }), this.options = e.extend({}, s, r, i), this.shouldRefresh = !1, this.isRefreshing = !1, this.$pullTip = null, r.onPullEnd = this._onPullEnd.bind(this), i = e.extend({}, r, i), this.touchPull = t.TouchPull.init(i), this.refreshTimes = 0
    };

    v.prototype = {
        _onPullStart: function(e) {
            this.isRefreshing || (e.preventDefault(), this.addPullTip(this.options.con))
        },
        _onMove: function(e, t) {
            if (!this.isRefreshing) {
                e.preventDefault();
                var n = p(t);
                n = this.isRefreshing ? n + this.minRefreshDistance : n, this.movePullTip(n), this.changePullTip(n, this.options.con)
            }
        },
        _onPullEnd: function(e, n) {
            if (!this.isRefreshing) {
                var i = this;
                this.options.needRefresh(n), this.options.onRelease().then(function() {
                    "function" == typeof gaevent && t.gaevent("refresh", "drag_refresh_new"), i.options.needRefresh() ? ("function" == typeof gaevent && t.gaevent("refresh", "drag_refresh_OK_new"), t._vis_opt_queue = t._vis_opt_queue || [], t._vis_opt_queue.push(function() {
                        _vis_opt_goal_conversion(13359)
                    }), i.isRefreshing = !0, i.refreshTimes += 1, i.options.doRefresh().always(function() {
                        i.reset()
                    })) : (i.reset(), i.options.noop())
                })
            }
        },
        transitionDefer: null,
        onTransitionEnd: function() {
            var e = this;
            e.shouldRefresh ? e.canvasObj.startAuto() : e.reset(), setTimeout(function() {
                e.transitionDefer.resolve()
            }, !1)
        },
        _onRelease: function() {
            if (this.transitionDefer = e.Deferred(), this.pullTipExist()) {
                var t = this.$pullTip[0];
                t.addEventListener("webkitTransitionEnd", this.onTransitionEnd.bind(this), !1);
                var n = this.shouldRefresh ? this.minRefreshDistance : 0,
                    i = !0;
                this.movePullTip(n, "all " + u + "ms linear", i)
            } else this.transitionDefer.resolve();
            return this.transitionDefer
        },
        _doRefresh: function() {
            var t = e.Deferred();
            return t.resolve(), t
        },
        _noop: function() {},
        _needRefresh: function(e) {
            return e = p(e), !this.shouldRefresh && e >= this.minRefreshDistance && (this.shouldRefresh = !0), this.shouldRefresh
        },
        pullTipExist: function() {
            return this.$pullTip && this.$pullTip[0]
        },
        reset: function() {
            var e = this.isRefreshing;
            this.isRefreshing = !1, this.shouldRefresh = !1, this.removePullTip(e)
        },
        canvasObj: function() {
            function n() {
                var e = (W + 1) % q.length;
                return W = e, e
            }

            function s(e) {
                return 360 + e - I
            }

            function o() {
                k || b.clearRect(0, 0, 2 * y, 2 * _)
            }

            function l(e) {
                if (!f) {
                    var t = e.start,
                        n = e.end,
                        i = e.lineWidth,
                        r = e.color,
                        s = e.counterClockwise,
                        a = e.co,
                        l = e.clearRect;
                    l && o(), b.save(), b.globalCompositeOperation = a, b.beginPath(), b.arc(y, _, j, R(t), R(n), s), b.lineWidth = i, b.strokeStyle = r, b.stroke(), b.restore()
                }
            }

            function c() {
                if (!f) {
                    var e = B.speed,
                        t = B.startAngle,
                        i = z,
                        r = B.color,
                        o = B.lineWidth,
                        a = B.counterClockwise,
                        u = B.globalCompositeOperation,
                        c = X || +new Date;
                    i = +new Date, e = 360 / S * (i - c), X = i, z += e, i = Math.min(Q, z);
                    var h = "draw" === H;
                    if (!k && (l({
                            start: t,
                            end: i,
                            color: r,
                            lineWidth: o,
                            counterClockwise: a,
                            co: u,
                            clearRect: h
                        }), z >= Q))
                        if (b.closePath(), B = "erase" !== H ? U : F, H = "erase" !== H ? "erase" : "draw", "draw" === H) {
                            L = B.color;
                            var p = n(L);
                            B.color = q[p], B.startAngle = (B.startAngle - I) % 360, z = B.startAngle, Q = s(z)
                        } else z = B.startAngle = F.startAngle
                }
            }

            function p(e) {
                if (!f) {
                    var t = F.speed,
                        n = F.startAngle,
                        i = F.startAngle,
                        r = q[0];
                    if (!isNaN(e)) {
                        e = Math.min(D.minRefreshDistance - a, e);
                        var s = e / (D.minRefreshDistance - a),
                            o = (Q - h) * s - F.startAngle;
                        t = o
                    }
                    i += t, N = i, v({
                        start: n,
                        end: i,
                        color: r,
                        distance: e
                    })
                }
            }

            function d() {
                var t = D.minRefreshDistance - a,
                    n = t / S * 1.3,
                    i = q[0],
                    s = t,
                    o = +new Date,
                    l = e.Deferred(),
                    u = function() {
                        if (s >= 0) {
                            var e = +new Date;
                            s -= n * (e - o), o = e;
                            var t = s / (D.minRefreshDistance - a),
                                c = (Q - h) * t - F.startAngle,
                                p = N - c;
                            p = Math.min(p, N), v({
                                start: p,
                                end: N,
                                color: i,
                                distance: s
                            }), r(u)
                        } else l.resolve()
                    };
                return r(u), l
            }

            function v(n) {
                var r = n.distance,
                    s = k ? 10 : 25,
                    l = O,
                    u = r / (D.minRefreshDistance - a);
                isNaN(r) || (s *= u, l = O * u), o(), k ? i.drawArc({
                    x: y,
                    y: _,
                    radius: j,
                    margin: P,
                    startDegree: n.start,
                    endDegree: n.end,
                    arrowSize: s,
                    arrowObj: e(A).find("#markerArrow"),
                    pathObj: e(A).find("#svgPath"),
                    color: n.color
                }) : (b.strokeStyle = n.color, b.fillStyle = n.color, t.CanvasUtils.drawArcedArrow(b, y, _, j, R(n.start), R(n.end), !1, 1, 2, R(45), s, O, l))
            }

            function w(e) {
                var t = 0;
                if (e) {
                    e = e.replace("matrix(", "").replace(")", ""), e = e.replace(/\s+/gi, "");
                    var n = e.split(",");
                    t = n[5] || 0
                }
                return t
            }

            function m() {
                var e = w(D.$pullTip.css("transform"));
                if (!(a > e)) {
                    var t = u,
                        n = e / t,
                        i = e,
                        s = +new Date,
                        o = function() {
                            if (i > a && D.$pullTip) {
                                var e = +new Date,
                                    t = n * (e - s);
                                i -= t, T(i - a), p(i - a), g(i - a), s = e, r(o)
                            }
                        };
                    r(o)
                }
            }

            function g(t) {
                var n = 1 * t / (D.minRefreshDistance - a);
                e(A).css("opacity", n)
            }

            function T(e, t) {
                var n = e;
                t || (n = Math.max(0, (e - a) / D.minRefreshDistance * 360)), A.style.webkitTransition = "none", A.style.webkitTransform = "rotate(" + n + "deg)"
            }

            function R(e) {
                return e * (Math.PI / 180)
            }

            function x(e) {
                clearTimeout(Y), e = e || 8e3, Y = setTimeout(function() {
                    D.reset()
                }, e)
            }
            var D = null,
                A = null,
                b = null,
                k = !1,
                y = 100,
                _ = 100,
                j = 50,
                P = 0,
                O = 15,
                C = !1,
                E = 5,
                $ = 0,
                M = 1500,
                S = 1e3,
                q = ["green", "red", "blue", "#f3b000"],
                L = q[0],
                W = 1,
                F = {
                    startAngle: $,
                    speed: E,
                    color: q[0],
                    counterClockwise: !1,
                    globalCompositeOperation: "source-out",
                    lineWidth: O
                },
                U = {
                    startAngle: $,
                    speed: E,
                    color: "white",
                    counterClockwise: !1,
                    globalCompositeOperation: "destination-out",
                    lineWidth: O + 40
                },
                z = $,
                N = $,
                B = F,
                H = "draw",
                I = 50,
                Q = 0,
                X = 0,
                Y = -1;
            return {
                init: function(e, t) {
                    this.reset(), X = 0, C = !1, A = e.find("#load-tip-svg")[0] || e.find("#load-tip-canvas")[0], b = A.getContext ? A.getContext("2d") : A, k = A.getContext ? !1 : !0, N = z = $, F.startAngle = U.startAngle = $, Q = s(z), W = 1, F.color = q[W], H = "draw", B = F, D = t, k ? (P = 9, y = _ = j = (40 - 2 * P) / 2) : (y = _ = 100, P = 0, j = 50)
                },
                reset: function() {
                    A = null, b = null
                },
                drawArrowedArcByDis: function(e) {
                    p(e)
                },
                drawArc: function(e) {
                    f ? console.log("not support") : c(e)
                },
                clearCurrent: function() {
                    f ? console.log("not support") : m()
                },
                rotate: T,
                changeOpacity: g,
                autoRotate: function() {
                    var e = A.style.webkitTransform;
                    e = e.replace("rotate(", "").replace("deg", "").replace(")", "");
                    var t = parseFloat(e),
                        n = 360 / M,
                        i = this,
                        s = +new Date,
                        o = function() {
                            if (C) {
                                var e = +new Date,
                                    a = t + n * (e - s);
                                s = e, i.rotate(a, !0), t = a, r(o)
                            }
                        };
                    r(o)
                },
                autoDraw: function() {
                    if (!f) {
                        var t = function() {
                                C && (k ? (C = !1, e(b).attr("class", "spinner")) : (c(), r(t)))
                            },
                            n = d();
                        n.done(function() {
                            r(t)
                        })
                    }
                },
                startAuto: function() {
                    C = !0, D.touchPull.detachEvent(), this.autoDraw(), this.autoRotate(), x()
                },
                stopAuto: function() {
                    C = !1, D.touchPull.initEvent(), clearTimeout(Y)
                }
            }
        }(),
        initCanvas: function() {
            this.canvasObj.init(this.$pullTip, this)
        },
        addPullTip: function(t) {
            this.removePullTip(), t = this.options.con;
            var n = this.$pullTip;
            if (!n) {
                var i = [];
                if (i.push("<div class='list_top'>"), i.push("<div class='list_top_con v2'>"), d) i.push("<canvas id='load-tip-canvas' width='200' height='200' class='" + (f ? "not-support" : "") + "'></canvas>");
                else {
                    var r = responsive.px2px(5),
                        s = responsive.px2px(20),
                        o = responsive.px2px(11),
                        a = responsive.px2px(10),
                        u = responsive.px2px(70),
                        c = responsive.px2px(3.5),
                        h = ["M0,0", "L0," + a, "L" + r + "," + r, "L0,0"].join(" ");
                    i.push('<svg id="load-tip-svg" class="">                                <marker id="markerArrow" markerWidth="' + a + '" markerHeight="' + a + '" refX="0" refY="' + r + '"                                   orient="auto" markerUnits="userSpaceOnUse">                                    <path d="' + h + '" style="fill: #660000;" />                                </marker>                                <path stroke-width="' + c + '" stroke-linecap="round" id="svgPath" marker-end="url(#markerArrow)" d="M125,25 A100,100 0 0,1 125,25"                                      style="stroke:#660000; fill:none;"/>                                    <circle style="stroke-dasharray:' + u + ';" id="svgCircle" class="path" fill="none" stroke-width="' + c + '" stroke-linecap="round" cx="' + s + '" cy="' + s + '" r="' + o + '"></circle>                             </svg>')
                }
                i.push("</div></div>"), this.$pullTip = e(i.join("")).insertAfter("body"), n = this.$pullTip, this.minRefreshDistance = n.outerHeight();
                var p = n[0];
                p.style.webkitTransition = "none", p.style.webkitTransform = "translate3d(0," + l + "px,0)", p.style.top = t.getBoundingClientRect().top - this.minRefreshDistance + "px", this.initCanvas()
            }
        },
        movePullTip: function(e, t, n) {
            if (this.pullTipExist()) {
                var i = Math.min(c, e);
                this.$pullTip[0].style.webkitTransition = t || "none", this.$pullTip[0].style.webkitTransform = "translate3d(0," + i + "px,0)", 0 === e ? this.canvasObj.clearCurrent() : e > a && (this.shouldRefresh ? this.isRefreshing || n === !0 || this.canvasObj.rotate(e) : (c - 5 >= e && this.canvasObj.rotate(e), this.canvasObj.drawArrowedArcByDis(e - a), this.canvasObj.changeOpacity(e - a)))
            }
        },
        changePullTip: function() {
            this.pullTipExist()
        },
        removePullTip: function(t) {
            if (this.pullTipExist())
                if (t) {
                    var n = this;
                    n.canvasObj.stopAuto(), n.$pullTip[0].style.webkitTransition = "all 100ms linear", n.$pullTip.css("opacity", .1), n.$pullTip[0].style.webkitTransform += " scale(0.1)"
                } else this.$pullTip[0].removeEventListener("webkitTransitionEnd", this.onTransitionEnd, !1), this.$pullTip.remove(), this.$pullTip = null, e(window).trigger("pullrefresh_pulltip_removed")
        }
    },

    t.PullRefresh = {
        init: function(e) {
            return new v(e)
        }
    }
    
}(window.jQuery || window.Zepto, window)



export default window.PullRefresh

