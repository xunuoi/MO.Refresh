/**
 * For TouchPull
 */


!function(t, i) {
    var s = i.document,
        n = {
            NONE: 0,
            NOOP: 1,
            UP: 2,
            RIGHT: 3,
            DOWN: 4,
            LEFT: 5,
            LEFT_RIGHT: 6
        },
        o = {
            con: "",
            minDistance: 4,
            onPullStart: function() {},
            onMove: function() {},
            onPullEnd: function() {}
        };



    function h(i) {
        "string" == typeof i.con && (i.con = s.querySelector(i.con)), this.options = t.extend({}, o, i), this.hasTouch = !1, this.direction = n.NONE, this.distanceX = this.startY = this.startX = 0, this.isPull = !1, this.initEvent()
    };


    h.prototype = {
        initEvent: function() {
            var t = this;
            this._touchStart = function(i) {
                t.__start(i)
            }, this._touchMove = function(i) {
                t.__move(i)
            }, this._touchEnd = function(i) {
                t.__end(i)
            }, this.options.con.addEventListener("touchstart", this._touchStart, !1), this.options.con.addEventListener("touchmove", this._touchMove, !1), this.options.con.addEventListener("touchend", this._touchEnd, !1)
        },
        detachEvent: function() {
            this.options.con.removeEventListener("touchstart", this._touchStart, !1), this.options.con.removeEventListener("touchmove", this._touchMove, !1), this.options.con.removeEventListener("touchend", this._touchEnd, !1)
        },
        __start: function(t) {
            t = t.targetTouches, 1 === t.length && (this.startX = t[0].pageX, this.startY = t[0].pageY, this.direction = n.NONE, this.distanceX = 0, this.hasTouch = !0, this.startScrollY = i.scrollY)
        },
        __move: function(t) {
            if (this.hasTouch) {
                if (this.direction === n.UP) return;
                var i = t.targetTouches[0];
                if (this.direction === n.NONE) {
                    this.distanceX = i.pageX - this.startX, this.distanceY = i.pageY - this.startY;
                    var s = Math.abs(this.distanceY),
                        o = Math.abs(this.distanceX);
                    o + s > this.options.minDistance && (this.direction = o > 1.73 * s ? n.LEFT_RIGHT : s > 1.73 * o ? this.distanceY < 0 ? n.UP : n.DOWN : n.NOOP, this.startScrollY < 10 && this.distanceY > 0 && (this.direction = n.DOWN)), this.startScrollY < 10 && this.direction === n.DOWN && this.distanceY > this.options.minDistance && (this.isPull = !0, this.options.onPullStart(t, this.distanceY))
                }
                this.isPull && this.direction === n.DOWN && (this.distanceY = i.pageY - this.startY, this.refreshY = parseInt(this.distanceY * this.options.pullRatio), this.options.onMove(t, this.distanceY))
            }
        },
        __end: function(t) {
            !this.hasTouch || n.LEFT_RIGHT !== this.direction && n.DOWN !== this.direction || (this.direction === n.LEFT_RIGHT && (t.preventDefault(), this.options.onPullEnd(t, this.distanceX, n.LEFT_RIGHT)), this.direction === n.DOWN && this.isPull && (t.preventDefault(), this.options.onPullEnd(t, this.distanceY, n.DOWN))), this.hasTouch = !1, this.isPull = !1
        }
    };

    i.TouchPull = {
        init: function(t) {
            return new h(t)
        },
        DIRECTION: n
    };


}(window.jQuery || window.Zepto, window);
 

export default window.TouchPull
