# MO.Refresh
swipe refresh for html5 canvas,pull to refresh

模拟Android原生的下拉更新组件SwipeLayout。
Canas/SVG绘制，手机端H5完美兼容，动画平滑、无卡顿，特别适合h5页面的下拉操作



####Usage



````Javascript
let pullRefresh = Pull2Refresh.init({
            con: "div[pull-fresh]", // con是容器元素，能进行下拉更新的触摸区域
            minDistance: 4,
            
            // 这个是触发refres后的事件
            doRefresh: function() {
              let df = $.Deferred()
              setTimeout(()=>{
                  df.resolve()
              }, 2500)
              return df
            },
            noop: function() {
                console.log('noop: not trigger refresh')
            }
})
```
