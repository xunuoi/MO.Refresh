/**
 * ES6 FILE FOR LabRefresher 
 * 2015-12-06 01:12:42
 */

import Pull2Refresh from './pull2refresh'


class Refresher {

    constructor (){
        this.pullRefresh = Pull2Refresh.init({
            con: "div[pull-fresh]",
            minDistance: 4,
            doRefresh: function() {
 
                let df = $.Deferred()
                // alert('dddd')
                $.get('/about')
                .done(data=>{
                    setTimeout(()=>{
                        
                        let $img = $(data).find('img').eq(1)

                        console.log($img)
                        $('.wrap').append($img)

                        df.resolve()

                    }, 2500)
                    
                })

                return df
                
            },
            noop: function() {
                console.log('noop')
                // indexFlow.storeFlow()
            }
        })
    }


    /*refreshHandler (){
        this.pullRefresh.addPullTip(this.pullRefresh.options.con),
        this.pullRefresh.movePullTip(100),
        this.pullRefresh.canvasObj.startAuto();

        setTimeout(()=>{
            this.pullRefresh.reset(),
            this.pullRefresh.canvasObj.stopAuto()
        }, 1000)
          
    }*/

}



$(()=>{
    let refresher = new Refresher()
    window.rf = refresher
})


