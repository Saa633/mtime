$(function () {

    //添加广告组件
    var ad=new Ad({
        ele:'#ad'
    })

    // 全局变量  本地城市  本地城市id
    var local = '定位失败', localid;
    //获取定位
    $.ajax({
        type: 'GET',
        url: 'https://apis.map.qq.com/ws/location/v1/ip?&key=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU&output=jsonp',
        dataType: 'jsonp',
        success: function (data) {
            local = data.result.ad_info.city.replace('市', '');
            console.log(local)
        },
        error: function (xhr, type) {
            local = '定位失败';
            localid = '';
        }
    })



    // 城市渲染
    if (localStorage.cityList !== undefined) {
        let dataa = JSON.parse(localStorage.cityList);
        City(dataa);
    }

    //请求城市数据，并存储本地，渲染页面
    $.ajax({
        type: 'GET',
        url: './josn/city.json',
        dataType: 'json',
        success: function (data) {
            // console.log(data)
            let dataa = JSON.stringify(data);
            // console.log(dataa)
            localStorage.setItem("cityList", dataa);
            City(data);
        },
        error: function (xhr, type) {
            alert('Ajax error!')
        }
    })


    //城市渲染 函数
    function City(data) {
        // 城市渲染
        data.locations.forEach(e => {
            // console.log(e)
            let al = '';
            e.city.forEach(a => {
                if (local == a.n) {
                    localid = a.id;
                    console.log(a.n)
                }
                // console.log(a)
                al += `<li data-id="${a.id}" data-name="${a.n}">
                    <a href="javascript:void(0);">${a.n}</a>
                </li>`;
            });
            let ol = `<dd>
                    <p>${e.pinyin}</p>
                    <ul class="clearfix">
                       ${al}
                    </ul>
                </dd>`;
            $('#cities').append(ol);
        });
        console.log(local)
        $('.currentCity').html(`<li data-id="${localid}" data-name="${local}">
                                <a href="javascript:void(0);">${local}</a>
                            </li>`);

        //热门城市
        data.hotCities.forEach(e => {
            // console.log(e)
            let ol = `<li data-id="${e.id}" data-name="${e.n}">
                        <a href="javascript:void(0);">${e.n}</a>
                    </li>`;
            $('#hotcity').append(ol);
        });
    }


    //选择城市
    $('.city_search').on('tap', 'li', function () {
        console.log($(this).data("id"))
        let localid = $(this).data("id");
        let localnm = $(this).children().html();
        localStorage.setItem("localcity", `{"localid":${localid},"localnm":"${localnm}"}`);
        window.history.back(-1).reload();
    })

})
