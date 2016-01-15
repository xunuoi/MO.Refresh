;define("pagelet/list_v2/list_content/list_content.js", 
function(t, e, i) {
    function n(t, e) {
        var i = $(".refresh-tip"),
        n = (parseFloat(i.css("line-height")), $("#pageletIndexHeader").outerHeight());
        i.text(t).css("top", n).show(),
        setTimeout(function() {
            i.fadeOut(function() {
                i.hide()
            })
        },
        2e3)
    }
    var a = t("common/utils/flow.js"),
    s = t("pagelet/list_v2/list_content/pull2refresh_v2.js"),
    l = (t("pagelet/list_v2/list_content/dislike_action.js"), t("common/utils/ads.js")),
    o = {
        init: function(t) {
            var e = this;
            this.reflowCon = $("#top_menu"),
            this.reflowList = this.reflowCon.find(".top_menu_list"),
            this.selectedTab = $(),
            this.restoreTabs(),
            this.allTabs = this.reflowCon.find("a");
            var i = function(t) {
                var i = $(t),
                n = parseInt(i.attr("scroll-left"));
                i.attr("class").indexOf("cur") > -1 || (i.addClass("cur"), e.selectedTab.length && e.selectedTab.removeClass("cur"), e.selectedTab = i, e.reflowCon.scrollLeft(n))
            };
            this.allTabs.on("click", 
            function() {
                i(this)
            }),
            this.getTabPosition();
            var n = this.allTabs.filter("[href*=" + t + "]");
            i(n)
        },
        getTabPosition: function() {
            var t = document.body.clientWidth,
            e = this.reflowList[0].clientWidth,
            i = this.reflowList[0].scrollWidth;
            this.allTabs.each(function() {
                var n,
                a = this.clientWidth,
                s = this.getBoundingClientRect().left;
                n = e / 2 - a / 2 >= s ? 0: s > i - e / 2 - a / 2 ? Math.max(i - e, 0) : -t / 2 + a / 2 + s,
                this.setAttribute("scroll-left", n)
            })
        },
        restoreTabs: function() {
            function t(t) {
                var e = channelItemTemplate;
                for (k in t) e = e.replace("#" + k + "#", t[k]);
                return e
            }
            for (var e = localStorageEnabled ? localStorage.menuDefaults: "", i = e ? e.split(",") : channelCategory.slice(0, channelDefaultCount), n = 0; n
            < i.length; n++) {
                var a = i[n],
                s = $.inArray(a, channelCategory);
                s > 
                -1 && this.reflowList.append(t({
                    category: a,
                    name: channelCategoryName[s]
                }))
            }
        }
    },
    r = {
        last_update: 1416217875388,
        init: function() {
            var t = this;
            this.getSelectedChannel();
            var e = {
                list_content: ".list_content",
                list_top: ".list_top",
                list_bottom: ".list_bottom",
                fresh_btn: "[action-type=fresh]",
                url: "/list/",
                param: {
                    tag: tag,
                    ac: "wap",
                    item_type: item_type || 4,
                    count: 20,
                    format: "json",
                    list_data_v2: 1
                },
                after_flow: function(t, e) {
                    if ("prepend" == t) {
                        var i = e.return_count > 0 ? NETWORKTIPS.RECOMMENDCOUNT.replace("#n#", e.return_count) : NETWORKTIPS.RECOMMENDEMPTY;
                        n(i)
                    }
                    "object" == typeof l && (l.initTaobaoAds({
                        selector: "section.taobaoAd"
                    }), l.initShowEvents({
                        attribute: "data-original"
                    })),
                    $(".time").timeago({
                        daysAgoFormat: "MM-dd"
                    }),
                    $(".video-icon").hide().parents(".list_img_holder").append('
    <span class="video-btn"></span>
    '),
                    listener.trigger("com.toutiao.pageletListContent", "flow-done")
                },
                cache: !0,
                cache_key: "listArticleV9_" + tag
            },
            i = navigator.userAgent;
            i.indexOf("ArticleStreamSdk") > -1 && (e.onArticleClick = function(t, e, i) {
                t.preventDefault(),
                $(".sslocal").remove();
                var n = "http://m.toutiao.com" + i,
                a = document.createElement("iframe");
                a.style.display = "none",
                a.src = "sslocal://detail?groupid=" + e + "&url=" + n,
                $(a).addClass("sslocal"),
                $(document.body).append(a)
            }),
            indexFlow = new a(e),
            o.init(tag, indexFlow),
            $("#pageletListContent").on("click", ".article_link", 
            function() {
                var t = $(this);
                actionLog(t.attr("data-action-label"), t.parent().attr("data-id"), null, {
                    item_id: t.parent().attr("data-item-id") || "0"
                })
            }),
            window.addEventListener("hashchange", 
            function(e) {
                location.hash ? (t.getSelectedChannel(), gaevent("channel", window.tag, ""), indexFlow.cache_key = "listArticle_" + window.tag, indexFlow.reflow({
                    tag: window.tag,
                    item_type: window.item_type
                }), window.gapageview ? gapageview() : "") : e.preventDefault()
            }),
            this.initPullRefresh();
            var i = navigator.userAgent;
            i.indexOf("ArticleStreamSdk") > -1 && r.bindNativeRefreshHandler(function() {
                var t = this;
                this.pullRefresh.addPullTip(this.pullRefresh.options.con),
                this.pullRefresh.movePullTip(100),
                this.pullRefresh.canvasObj.startAuto(),
                indexFlow.refresh(function() {
                    t.pullRefresh.reset(),
                    t.pullRefresh.canvasObj.stopAuto()
                })
            })
        },
        formatNews: function(t) {
            t = "boolean" == typeof t ? t: !1,
            $("#pageletListContent .middle_mode").each(function() {
                var e = $(this);
                if (!e.attr("data-isShown") || !t) {
                    e.attr("data-isShown", "true");
                    var i = e.find("h3"),
                    n = e.find(".item_info"),
                    a = n.height(),
                    s = parseFloat(n.find(".src").css("line-height")),
                    l = responsive.px2px(6),
                    o = i.height(),
                    r = (parseFloat(i.css("line-height")), e.find(".list_img_holder")),
                    c = r.height(),
                    d = responsive.px2px(1);
                    a > s + d ? n.find(".time").hide() : t || n.find(".time").show(),
                    r.length && (c >= o + a ? (e.find(".desc").css("vertical-align", "middle"), r.css("vertical-align", "middle"), e.find(".dislike-news").addClass("mid-space").removeClass("fly-right"), n.css("margin-top", l)) : o + a > c && (e.find(".desc").css("vertical-align", "top"), r.css("vertical-align", "top"), e.find(".dislike-news").removeClass("mid-space").addClass("fly-right"), n.css("margin-top", l + c - o)))
                }
            })
        },
        clearCache: function(t) {
            if (t) {
                var e = localStorage.lastest_cache || 0;
                parseInt(e) < t && localStorage.clear(),
                localStorage.lastest_cache = $.timestamp()
            }
        },
        getSelectedChannel: function() {
            var t = $.hash("channel");
            if (!t) return "";
            var e = parseInt(t.substr(0, 1));
            window.tag = e ? t.substr(1) : t
        },
        initPullRefresh: function() {
            this.pullRefresh = s.init({
                con: "div[pull-fresh]",
                minDistance: 4,
                doRefresh: function() {
                    var t = $.Deferred();
                    return indexFlow.before_flow = function() {
                        t.resolve();
                        var e = $.Deferred();
                        return $(window).one("pullrefresh_pulltip_removed", 
                        function() {
                            e.resolve()
                        }),
                        e
                    },
                    indexFlow.refresh(function() {
                        indexFlow.before_flow = null
                    }),
                    t
                },
                noop: function() {
                    indexFlow.storeFlow()
                }
            })
        },
        bindNativeRefreshHandler: function(t) {
            var e = this;
            window.refreshCallback = function() {
                t.apply(e, arguments)
            },
            window.searchCallback = function() {
                location.href = "http://m.toutiao.com/search/"
            }
        }
    };
    initScrollEvents(),
    r.init(),
    i.exports = Pagelet.extend({
        el: "#pageletListContent",
        channels: {},
        init: function() {},
        addFrostedGlass: function() {
            this.$el.find(".list_content").addClass("frosted-glass")
        },
        removeFrostedGlass: function() {
            this.$el.find(".list_content").removeClass("frosted-glass")
        }
    })
});