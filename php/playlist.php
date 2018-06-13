<?php
    header("Content-type: text/html; charset=utf-8"); 
    $cinemaid=$_GET['cinemaid'];
    $movieid=$_GET['movieid'];
    $t=$_GET['t'];
    $data=$_GET['data'];
    $url='https://m.mtime.cn/Service/callback.mi/showtime/ShowTimesByCinemaMovieDate.api?cinemaId='.$cinemaid.'&movieId='.$movieid.'&date='.$data.'&t='.$t;

    $content= file_get_contents($url);
    echo $content;
?>