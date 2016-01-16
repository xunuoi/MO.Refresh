# MO.Refresh
swipe refresh for html5 canvas,pull to refresh

####Usage

````Javascript
let pullRefresh = Pull2Refresh.init({
            con: "div[pull-fresh]",
            minDistance: 4,
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
