<?php
    header("Content-type: text/html; charset=utf-8"); 

    $localid=$_GET['localid'];
    $url='https://m.mtime.cn/Service/callback.mi/Showtime/LocationMovies.api?locationId='.$localid;

    $content= file_get_contents($url);
    echo $content;
?>