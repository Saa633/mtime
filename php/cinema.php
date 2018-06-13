<?php
    header("Content-type: text/html; charset=utf-8"); 
    $cinemaid=$_GET['cinemaid'];
    $t=$_GET['t'];
    $url='https://m.mtime.cn/Service/callback.mi/Showtime/ShowtimeMovieAndDateListByCinema.api?cinemaId='.$cinemaid.'&t='.$t;

    $content= file_get_contents($url);
    echo $content;
?>