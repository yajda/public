/**
 * Created by fangjunjie on 2018/6/8.
 */




$('.downloadButton').click(function () {
   //下载

    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        window.location.href = "";
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        window.location.href = "https://itunes.apple.com/cn/app/wei/id1395694598";
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        alert("winphone手机");
        window.location.href = "";
    }
});

