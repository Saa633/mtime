var t = (new Date()).valueOf();

if (localStorage.cinemaid !== undefined) {
    var cinemaids=localStorage.cinemaid;
}

$(function () {

    $.ajax({
        url: '/mtime/php/cinema.php?cinemaid='+cinemaids+'&t='+t,
        success:function(data){
            let datas=JSON.parse(data);
            let mov=datas.movies;
            let cin=datas.cinema;
            let score='';

            // console.log(cin);

            $('.filmtitle ul li h2').html(cin.name);
            $('.tel').attr('href','tel:'+cin.tel);
            $('.tel').attr('mce_href','tel:'+cin.tel);
            let tags=tagg='';
            for (const k in cin.feature) {
                if (cin.feature.hasOwnProperty(k)) {
                    const a = cin.feature[k];

                    if(a==1){
                        // console.log(k,a)

                        switch (k) {
                            case 'hasCardPay':
                                tags='<i class="i_cine_01"></i>';
                                break;
                            case 'has3D':
                                tags='<i class="i_cine_05"></i>';
                                break;
                            case 'hasIMAX':
                                tags='<i class="i_cine_04"></i>';
                                break;
                            case 'hasVIP':
                                tags='<i class="i_cine_06"></i>';
                                break;
                            case 'hasPark':
                                tags='<i class="i_cine_02"></i>';
                                break;
                            case 'hasWifi':
                                tags='<i class="i_cine_10"></i>';
                                break;
                            default:
                                tags='';
                                break;
                        }
                        tagg+=tags;

                    }

                }
            }
            $('.search_film').html(tagg);


            mov.forEach(e => {
                // console.log(e)
                if(e.ratingFinal>0){
                    score=`<em class="m_score">
                            <i>${e.ratingFinal}</i>
                        </em>`;
                }
                  let oli=`<li data-movid="${e.movieId}" data-des="${e.length} - ${e.type}" class="swiper-slide">
                            <a href="javascript:void(0)">
                                <b>
                                    <img class="m_img img_box" src="${e.img}">
                                </b>
                                <p>
                                    <span>${e.title}</span>
                                </p>
                                ${score}
                            </a>
                        </li>`;
                
                $('.hotmovie ul').append(oli);
            });
          

            var liw = parseFloat($('html').css('font-size')) * 7.6;

            //影片swiper选项卡
            var swiper = new Swiper('.swiper-container', {
                width: liw,
                slidesOffsetBefore : 15,
                slideToClickedSlide: true,
                on:{
                    tap: function(e){
                        let mid=$('.swiper-slide-active').data('movid');
                        console.log(mid);
                        localStorage.setItem("moiveid", mid);

                        $('.minfo h2').html($('.swiper-slide-active a p span').html())
                        $('.minfo p b').html($('.swiper-slide-active').data('des'))

                    },
                  },
            });

        }
    })


    $('.back').on('tap',function () {
        window.history.back(-1);
    })

})
