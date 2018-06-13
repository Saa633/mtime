/**
 * Created by saa on 2018/6/13.
 */
(function (win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;
    //动态设置像素比
    var iScale = 1 / window.devicePixelRatio;
    console.log(iScale)
    function refreshRem() {
        //获取可视区
        var width = docEl.getBoundingClientRect().width;
        console.log(width)
        var rem = width / 23.4375;

        docEl.style.fontSize = rem + 'px';
        //rem基准以font-size:40px来进行换算
    }
    //onresize事件页面改变大小时
    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 1);
    }, false);
    //onpageshow事件,有缓存时不会加载缓存数据,会加载实时数据
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 1);
        }
    }, false);
    refreshRem();
})(window);