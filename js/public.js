/**
 * Created by fangjunjie on 2018/6/8.
 */

/**
 * 设置屏幕
 */
new function (){
    var _self = this;
    _self.width = 640;//设置默认最大宽度
    _self.fontSize = 100;//默认字体大小
    _self.widthProportion = function(){var p = (document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth)/_self.width;return  p<0.5?0.5:p; /*p>1?1:p<0.5?0.5:p*/};
    _self.changePage = function(){
        document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px");
    }
    _self.changePage();
    window.addEventListener('resize',function(){_self.changePage();},false);
};
/**
 * 获取链接地址参数
 * @param key 参数名
 */
function GetQueryString(key){
    var qs = location.search.substr(1), // 获取url中"?"符后的字串
        args = {}, // 保存参数数据的对象
        items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
        item = null,
        len = items.length;

    for(var i = 0; i < len; i++) {
        item = items[i].split("=");
        var name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
        if(name) {
            args[name] = value;
        }
    }
    return args[key];
}
/**
 * 提示框
 */
function show_alert(msg, renovate, local_url, rep, result){
    if (result != "success" && result != "error") {
        result = "";
    } else {
        result = "alert_" + result;
    }
    var html = '<div class="alert_dialog"><div class="show_alert '+result+'">'+msg+'</div></div>';
    $("body").append(html);
    var i = 0;
    var setI = setTimeout(function(){
        $('.alert_dialog').remove();
        if(renovate == true){
            history.go(0);
        }
        if(local_url != "" && local_url != undefined){
            redirect(local_url, rep);
        }
        if(i >= 1){
            clearTimeout(setI);
        }
        i++;
    }, 1000);
}
/**
 * 是否存在上一步, 存在则返回, 否则跳转到首页
 */
function getReferrer() {
    if(document.referrer == "") {
        redirect("index.html", true);
    } else {
        history.back();
    }
}