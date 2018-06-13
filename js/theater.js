//加入广告组件
new Ad({
    ele:'#ad'
})
//添加头部导航组件
new HeaderNav({
    ele:'#headerNav',
    cur:1
})
//添加底部组件
new Footer({
    ele:'#footer'
})

$(function(){
    //当前城市，城市id，时间戳，当前经纬度
    var localnm = '北京', localid = 292, t = (new Date()).valueOf(),nlat,nlng;

    //获取定位
    $.ajax({
        type: 'GET',
        url: 'https://apis.map.qq.com/ws/location/v1/ip?&key=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU&output=jsonp',
        dataType: 'jsonp',
        success: function (data) {
            nlat = data.result.location.lat;
            nlng = data.result.location.lng;
            console.log(nlat, nlng)
        },
        error: function (xhr, type) {
            console.log('定位失败');
        }
    })

    //判断本地存储定位城市是否存在
    if (localStorage.localcity !== undefined) {
        localnms = JSON.parse(localStorage.localcity).localnm;
        localids = JSON.parse(localStorage.localcity).localid;
        //城市名字过长，缩小文字字号
        if (localnms.length > 3) {
            $('.cityshow').addClass('smallsize');
        }
        $('.localcity b').html(localnms);
    }
    
    //请求影院数据
    $.ajax({
        type: 'POST',
        url: '/mtime/php/theater.php?localid=' + localids + '&t=' + t,
        success: function (data) {
            let da = JSON.parse(data);
            // console.log(da)

            //默认渲染全部电影院
            da.forEach(e => {
                let s = GetDistance(nlat, nlng, e.baiduLatitude, e.baiduLongitude);
                e['distance']=s;
                // console.log(e)
            });

            da.sort(function (a, b) {
                return a.distance - b.distance;
            })

            let das=JSON.stringify(da)
            localStorage.setItem("cinemalist", das);

            Cinema(da);

        },
        error: function () {
            console.log('shibai')
        }
    })

    //请求存储城区地铁数据
    $.ajax({
        type: 'POST',
        url: '/mtime/php/part.php?localid=' + localids + '&t=' + t,
        success: function (data) {
            let da = JSON.parse(data).data;
            console.log(da)

            //默认渲染城区
            DisData(da.districts);

            //存储城区地铁信息
            let subways = JSON.stringify(da.subways);
            let districts = JSON.stringify(da.districts);
            localStorage.setItem("subways", subways);
            localStorage.setItem("districts", districts);

        }
    })


//================触发事件=====================================

    //点击广告消失
    $('.mclose').on('tap', function () {
        $('#clientDownload').hide();
    })

    // 回到顶部
    $(document).scroll(function () {
        if (document.documentElement.scrollTop > 600) {
            $('.top').show();
        } else {
            $('.top').hide();
        }
    })

    // 搜索框删除按钮显示判断
    $('#searchbar').on('input', function () {
        // console.log($(this).val())
        if ($(this).val().length > 0) {
            $('.delete').show()
        } else {
            $('.delete').hide()
        }
    })

    // 清除搜索内容
    $('.delete').on('tap', function () {
        $('#searchbar').val('');
        $(this).hide();
    })

    //选择电影院
    $('.theaterlist').on('tap', 'li', function () {
        let cid = $(this).data('cinemaid');
        localStorage.setItem("cinemaid", cid);
        window.location.href = 'cinema.html';
    })

    // 离我最近 / 价格最低
    $('.sort ul li').on('tap',function(){
        $(this).find('span').addClass('sel');
        $(this).siblings().find('span').removeClass('sel');

        $('.sel2').hide();

        let da=localStorage.cinemalist;
        da = JSON.parse(da)
        // console.log(da)

        switch ($(this).index()) {
            case 0:
                da.sort(function (a, b) {
                    return a.distance - b.distance;
                })

                // Save(da);
                Cinema(da);
                break;
                
            case 1:
                da.sort(function (a, b) {
                    return a.minPrice - b.minPrice;
                })
                da=da.filter(function(s){
                    return s.minPrice>0;
                })

                // Save(da);
                Cinema(da);
                break;
        
            default:
                break;
        }
    })

    // 筛选
    $('.sel1 li:not(.line)').on('tap', function () {
        $(this).siblings().removeClass('active')
        $(this).addClass('active');
        $('.sel2').show();
        $('.sel2>div').hide();
        // console.log($(this).index())

        switch ($(this).index()) {
            case 0:
                $('.sort').show();
                break;
            case 2:
                $('.part').show();
                break;
            case 4:
                $('.special').show();
                break;
            default:
                break;
        }

    })


    //渲染城区
    $('#dis').on('tap', function () {
        $(this).find('a').addClass('cuur');
        $(this).siblings().find('a').removeClass('cuur');

        let dis = JSON.parse(localStorage.districts);
        DisData(dis);
    })

    //渲染地铁
    $('#sub').on('tap', function () {
        $(this).find('a').addClass('cuur');
        $(this).siblings().find('a').removeClass('cuur');

        let sub = JSON.parse(localStorage.subways);
        SubData(sub)
    })

    //选择渲染电影院
    $('.right').on('tap','dd',function(){
        $(this).find('a').addClass('sel');
        $(this).siblings().find('a').removeClass('sel');
        $('.sel2').hide();

        let aid=$(this).data('id');
        console.log(aid)





    })

















// 共用方法=======================================================================


    //城区
    function DisData(data) {
        let num = 0;
        // console.log(data)
        $('.left').html(`<dd data-id="0">
                        <a class="sel" href="javascript:void(0);">
                            <span>全部</span>
                        </a>
                    </dd>`);
        data.forEach(e => {
            // console.log(e)
            let oli = `<dd data-id="${e.districtId}">
                    <a href="javascript:void(0);">
                        <span>${e.name}</span>
                        <span>(${e.cinemaCount})</span>
                    </a>
                </dd>`;
            $('.left').append(oli);
            num += e.cinemaCount;
        });
        $('.right').html(`<dd data-id="0">
                        <a class="sel" href="javascript:void(0);">
                            <span>全部</span>
                            <span>${num}</span>
                        </a>
                    </dd>`);
        // console.log(num)
        //先移除事件，再绑定新事件
        $('.left').unbind().on('tap', 'dd', function () {
            $(this).find('a').addClass('sel');
            $(this).siblings().find('a').removeClass('sel');

            let disid = $(this).data('id');

            if (disid != 0) {
                let dis = data.filter(function (e) {
                    return e.districtId == disid;
                })
                // console.log(dis)
                $('.right').html(`<dd data-id="0">
                            <a class="sel" href="javascript:void(0);">
                                <span>全部</span>
                                <span>${dis[0].cinemaCount}</span>
                            </a>
                        </dd>`);

                dis[0].businessAreas.forEach(a => {
                    // console.log(a)
                    let oli = `<dd data-id="${a.businessId}">
                    <a href="javascript:void(0);">
                        <span>${a.name}</span>
                        <span>${a.cinemaCount}</span>
                    </a>
                </dd>`;
                    $('.right').append(oli);
                });

            } else {
                $('.right').html(`<dd data-id="0">
                                <a class="sel" href="javascript:void(0);">
                                    <span>全部</span>
                                    <span>${num}</span>
                                </a>
                            </dd>`);
            }

        })

    }



    //地铁
    function SubData(data) {
        let num = 0;
        $('.left').html(`<dd data-id="0">
                        <a class="sel" href="javascript:void(0);">
                            <span>全部</span>
                        </a>
                    </dd>`);
        data.forEach(e => {
            let oli = `<dd data-id="${e.subwayId}">
                    <a href="javascript:void(0);">
                        <span>${e.name}</span>
                        <span>(${e.cinemaCount})</span>
                    </a>
                </dd>`;
            $('.left').append(oli);
            num += e.cinemaCount;
        });
        $('.right').html(`<dd data-id="0">
                        <a class="sel" href="javascript:void(0);">
                            <span>全部</span>
                            <span>${num}</span>
                        </a>
                    </dd>`);

        $('.left').unbind().on('tap', 'dd', function () {

            $(this).find('a').addClass('sel');
            $(this).siblings().find('a').removeClass('sel');

            let disid = $(this).data('id');
            if (disid != 0) {
                let dis = data.filter(function (e) {
                    return e.subwayId == disid;
                })
                // console.log(dis)
                $('.right').html(`<dd data-id="0">
                                <a class="sel" href="javascript:void(0);">
                                    <span>全部</span>
                                    <span>${dis[0].cinemaCount}</span>
                                </a>
                            </dd>`);

                dis[0].stations.forEach(a => {
                    console.log(a)
                    let oli = `<dd data-id="${a.stId}">
                        <a href="javascript:void(0);">
                            <span>${a.stName}</span>
                            <span>${a.cinemaCount}</span>
                        </a>
                    </dd>`;
                    $('.right').append(oli);
                });

            } else {
                $('.right').html(`<dd data-id="0">
                                <a class="sel" href="javascript:void(0);">
                                    <span>全部</span>
                                    <span>${num}</span>
                                </a>
                            </dd>`);
            }
        })
    }

    //存储筛选影院列表
    function Save(data){
        let das=JSON.stringify(data)
        localStorage.setItem("selcinemas", das);
    }

    //渲染电影院
    function Cinema(data) {
        $('.theaterlist').html('');
        data.forEach(e => {
            console.log(e);

            let mprice = e.minPrice > 0 ? `<p class="price">
                                    <b>${e.minPrice / 100}</b>
                                    <span>元起</span>
                                </p>`: '';
            let tags = tagg = '';

            for (const k in e.feature) {
                if (e.feature.hasOwnProperty(k)) {
                    const a = e.feature[k];
                    if (a == 1) {

                        switch (k) {
                            case 'has3D':
                                tags = '<i>3D</i>';
                                break;
                            case 'hasFeature4D':
                                tags = '<i>4D</i>';
                                break;
                            case 'hasFeature4K':
                                tags = '<i>4K</i>';
                                break;
                            case 'hasFeatureDolby':
                                tags = '<i>杜比</i>';
                                break;
                            case 'hasFeatureHuge':
                                tags = '<i>巨幕</i>';
                                break;
                            case 'hasIMAX':
                                tags = '<i>IMAX</i>';
                                break;
                            case 'hasLoveseat':
                                tags = '<i>情侣座</i>';
                                break;
                            case 'hasVIP':
                                tags = '<i>VIP</i>';
                                break;
                            default:
                                tags = '';
                                break;
                        }
                        tagg += tags;

                    }
                }
            }
            let dist=e.distance.toFixed(1);
            let oli = `<li class="cinema" data-cinemaid="${e.cinemaId}">
                    <dl>
                        <dt class="inf">
                            <p class="cname">
                                <span>${e.cinameName}</span>
                            </p>
                            ${mprice}
                        </dt>
                        <dd class="addr">
                            <p>${e.address}</p>
                        </dd>
                        <dd class="tag">
                            ${tagg}
                        </dd>
                        <dd class="distance">
                            <b>${dist}</b>
                            <span>km</span>
                        </dd>
                    </dl>
                </li>`;
            $('.theaterlist').append(oli);
        });
    }

    //进行经纬度转换为距离的计算
    function Rad(d) {
        return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
    }
    //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
    function GetDistance(lat1, lng1, lat2, lng2) {

        var radLat1 = Rad(lat1);
        var radLat2 = Rad(lat2);
        var a = radLat1 - radLat2;
        var b = Rad(lng1) - Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000; //输出为公里
        //s=s.toFixed(4);
        return s;
    }
})