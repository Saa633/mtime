<?php
    header("Content-type: text/html; charset=utf-8"); 
    $url='https://m.mtime.cn/Service/callback.mi/PageSubArea/GetFirstPageAdvAndNews.api?';

    $content= file_get_contents($url);
    echo $content;
?>