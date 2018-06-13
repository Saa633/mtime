/**
 * Created by saa on 2018/6/13.
 */
var ua = navigator.userAgent;
var iphoneplus = ua.indexOf('Device iPhone7,1') >= 0 ? true : false;
if (iphoneplus) {
    //iPhone 6 plus处理样式
    if (window.screen.width > 400) {
        document.documentElement.style.fontSize = '11.71875px';
    } else {
        document.documentElement.style.fontSize = '10.7px';
    }
} else {
    //适配所有机型
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
}