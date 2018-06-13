//添加广告组件
var ad=new Ad({
    ele:'#ad'
})

//添加头部导航组件
var hn=new HeaderNav({
    ele:'#headerNav',
    cur:0
})

//添加底部组件
var ff=new Footer({
    ele:'#footer'
})


var localnms='北京',localids=292,t = (new Date()).valueOf();

//判断本地存储定位城市是否存在
if (localStorage.localcity !== undefined) {
    localnms=JSON.parse(localStorage.localcity).localnm;
    localids=JSON.parse(localStorage.localcity).localid;
    //城市名字过长，缩小文字字号
    if(localnms.length>3){
        $('.cityshow').addClass('smallsize');
    }
    $('.cityshow a b').html(localnms)
}

//默认请求北京 正在热映 影片数据
$.ajax({
    type:'POST',  
    url:  '/mtime/php/localmovies.php?localid='+localids+'&t='+t,
    success:function(data){
        let da=JSON.parse(data);
        
        $('#nowmovienum').html(da.ms.length);
        $('#futurenum').html(da.totalComingMovie);

        for (let i = 0; i < 8; i++) {
            const e = da.ms[i];
            // console.log(e);
            let tip='';
            if(e.r>0){
                tip=`<em class="m_score">
                        <i>${e.r}</i>
                    </em>`;
            }else{
                tip='';
            }

            let oli=`<li>
                        <a href="#!/movie/${e.id}/">
                            <div class="mpic">
                                <img src="${e.img}" class="img_box">
                                ${tip}
                            </div>
                            <p>
                                <span>${e.t}</span>
                            </p>
                        </a>
                    </li>`;
            $('#nowmovie').append(oli);
        }
    }, 
    error:function(){  
        console.log('shibai') 
    }
})

//请求渲染 今日热点 数据
$.ajax({
    url:  '/mtime/php/todayhot.php',
    success:function(data){
        let da=JSON.parse(data);
        
        for (let i = 0; i < 3; i++) {
            const e = da.hotPoints[i];
            // console.log(e);

            let tt=new Date(e.publishTime*1000).format("yyyy-MM-dd hh:mm:ss"); 
            // console.log(tt)
            let oli=`<li>
                        <div class="table">
                            <div class="todaypic">
                                <a href="#!/news/movie/${e.id}/">
                                    <img class="m_img img_box" src="${e.img}">
                                </a>
                            </div>
                            <div class="todaytxt">
                                <h2>
                                    <a href="#!/news/movie/${e.id}/">${e.title}</a>
                                </h2>
                                <p>
                                    <span>${e.desc}</span>
                                </p>
                                <p>
                                    <time>${tt}</time>
                                </p>
                            </div>
                        </div>
                    </li>`;
            $('#hotPoints').append(oli);
        }
    }, 
    error:function(){  
        console.log('shibai') 
    }
})


//给Date原型添加 时间戳转换 方法
Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
} 

