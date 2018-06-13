<?php
    header("Content-type: text/html; charset=utf-8"); 

    $localid=$_GET['localid'];
    $t=$_GET['t'];
    $url='https://ticket-m.mtime.cn/api/proxy/ticket/OnlineLocationCinema/OnlineCinemasByCity.api?locationId='.$localid.'&_='.$t;

    $content= file_get_contents($url);
    echo $content;
?>