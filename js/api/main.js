new function () {
    var _self = this;
    _self.width = 640;//设置默认最大宽度
    _self.fontSize = 100;//默认字体大小
    _self.widthProportion = function () {
        var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
        return p < 0.5 ? 0.5 : p;
        /*p>1?1:p<0.5?0.5:p*/
    };
    _self.changePage = function () {
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px");
    }
    _self.changePage();
    window.addEventListener('resize', function () {
        _self.changePage();
    }, false);
};

config = {
    host: "/api/",
    timeOut: 2000
};

/**
 *
 * @param msg 提示信息
 * @param result
 */
function show_alert(msg, result) {
    if (result !== "success" && result !== "error") {
        result = "";
    } else {
        result = "alert_" + result;
    }
    var html = '<div class="alert_dialog"><div class="show_alert ' + result + '">' + msg + '</div></div>';
    $("body").append(html);
    var i = 0;
    var setI = setTimeout(function () {
        $('.alert_dialog').remove();
        if (i >= 1) {
            clearTimeout(setI);
        }
        i++;
    }, config.timeOut);
}

/**
 * ajax请求数据
 * @param url
 * @param data
 * @param async
 * @param calBackFunction
 */
function requestData(url, data, calBackFunction, async) {
    var loading_html = '<div class="alert_dialog loading_dialog" style="position:fixed;top:0;left:0;height:100%;width:100%;z-index:999; background:rgba(0,0,0,0.3);"><div class="show_alert" style="background:transparent; padding: 0; border-radius: 0.1rem; overflow: hidden; box-shadow: none;"><img src="/img/loading_.gif" style="height:0.8rem; width:0.8rem; display:block; margin:0 auto;"/></div></div>';
    url = config.host + url;
    if (async === null || async === undefined) {
        async = true;
    }
    $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        async: async,
        beforeSend: function () {
            $("body").append(loading_html);
        },
        success: function (json) {
            if (json.error === 1001) {
                $(".loading_dialog").remove();
                show_alert(json.msg);
                return false;
            }
            calBackFunction(json);
            $(".loading_dialog").remove();
        },
        error: function (XMLHttpRequest) {
            $(".loading_dialog").remove();
            console.log(XMLHttpRequest);
            show_alert('请检查网络');
        }
    });
}