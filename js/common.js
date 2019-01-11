/**
 * Created by ZhuXueSong on 2016/11/25.
 */

var config = [];
config['timeOut'] = 1500;
config['base'] = "/index.php/";

var loadDialog = '<div id="LoadingDialog" style="z-index: 9999; width: 100%; height: 100%; position: fixed; top: 0; cursor: progress; background: transparent;"></div>';

/**
 * ajax 加载数据
 * @param url 地址
 * @param data post数据
 * @param calBackFunction 回掉函数
 */
function requestData(url, data, calBackFunction) {
    url = config.base + url;
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "JSON",
        timeout: 15000,
        beforeSend : function(){
            $("body").append(loadDialog);
        },
        success : function(json){
            $("#LoadingDialog").remove();
            calBackFunction(json);
        },
        error : function(XMLHttpRequest){
            $("#LoadingDialog").remove();
            console.log(XMLHttpRequest);
            show_alert('请检查网络', false);
        }
    });
}

/**
 * 验证表单
 * 对表单内含有".check"类的表单循环，
 * 如果有reg即正则表达式的则按照表达式规则验证，
 * 否则判断是否为空
 * 提示信息为表单中alert属性
 * @param formId 需要验证的表单ID
 * @returns {boolean} 返回false则验证失败，返回true则验证成功
 */
function confirmFormValue(formId) {
    var result = true;
    $("#" + formId + " .check").each(function () {
        var reg = $(this).attr("reg");
        if (reg != "" && reg != undefined) {
            var regNew = new RegExp(reg);
            if (!regNew.test($(this).val())) {
                show_alert($(this).attr("alert"), false);
                result = false;
                return false;
            }
        } else if (trim($(this).val()) == "") {
            show_alert($(this).attr("alert"), false);
            result = false;
            return false;
        }
    });
    return result;
}

function redirect(url) {
    window.location.href = url;
}

/**
 * 提示信息
 * @param msg 信息内容
 * @param result 提示方式（false为错误信息，否则为成功信息）
 * @param local_url 提示完成后需要跳转的地址，不穿不跳转
 * @param time 提示显示时间（单位：毫秒）
 * @param renovate 传true则刷新页面
 * @param title 提示内容标题
 */
function show_alert(msg, result, local_url, time, renovate, title) {
    var iconClass = "success-icon";
    if (result === false) {
        iconClass = "error-icon";
    }
    if (title == "" || title == null || title == undefined) {
        title = "提示信息";
        if (result === false) {
            title = "错误信息";
        }
    }
    var alertHtml = '<div class="show_alert"><div class="alert_content"><h1>' + title + '</h1><i class="' + iconClass + '"></i><div class="table_cel"><h2>' + msg + '</h2></div></div></div>';
    $("body").append(alertHtml);
    time = parseInt(time) > 0 ? parseInt(time) : config.timeOut;
    var i = 0;
    var setI = setTimeout(function () {
        $('.show_alert').remove();
        if (renovate == true) {
            location.reload();
        }
        if (local_url != "" && local_url != undefined && local_url != null) {
            window.location.href = local_url;
        }
        if (i >= 1) {
            clearTimeout(setI);
        }
        i++;
    }, time);
}

/**
 * 提示信息并返回
 * @param msg 信息内容
 * @param result 提示方式（false为错误信息，否则为成功信息）
 * @param time 提示显示时间（单位：毫秒）
 * @param title 提示内容标题
 */
function show_alert_back(msg, result, time, title) {
    var iconClass = "success-icon";
    if (result === false) {
        iconClass = "error-icon";
    }
    if (title == "" || title == null || title == undefined) {
        title = "提示信息";
        if (result === false) {
            title = "错误信息";
        }
    }
    var alertHtml = '<div class="show_alert"><div class="alert_content"><h1>' + title + '</h1><i class="' + iconClass + '"></i><div class="table_cel"><h2>' + msg + '</h2></div></div></div>';
    $("body").append(alertHtml);
    time = parseInt(time) > 0 ? parseInt(time) : config.timeOut;
    var i = 0;
    var setI = setTimeout(function () {
        $('.show_alert').remove();
        if (i >= 1) {
            clearTimeout(setI);
        }
        //history.back();
        //location.reload();
        self.location = document.referrer;
        i++;
    }, time);
}

/**
 * 美化多选框按钮
 * @param object
 */
function checkboxFunction(object) {
    var obj = $(object);
    if (obj[0].checked) {
        obj.parent().addClass("checked");
    } else {
        obj.parent().removeClass("checked");
    }
}


/**
 * 时间戳转换
 * @param time 到秒的时间戳,如果穿传空,则为当前时间
 * @param his 是否到时分秒
 * @returns {string}
 */
function get_date(time, his) {
    if (time != "") {
        time = new Date(time * 1000);
    } else {
        time = new Date();
    }
    var year = time.getFullYear();
    var month = parseInt(time.getMonth()) + 1;
    var day = time.getDate();
    month = (month >= 10) ? month : "0" + month;
    day = (day >= 10) ? day : "0" + day;
    if (his == true) {
        var hours = time.getHours();
        hours = (hours >= 10) ? hours : "0" + hours;
        var min = time.getMinutes();
        min = (min >= 10) ? min : "0" + min;
        var sen = time.getSeconds();
        sen = (sen >= 10) ? sen : "0" + sen;
        return year + '年' + month + '月' + day + '日 ' + hours + ':' + min + ':' + sen;
    } else {
        return year + '-' + month + '-' + day;
    }
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g,"");
}


function showBigImageShow(url) {
    var html = ' <div class="dialog_box" onclick="$(this).remove();" id="bigImageShow" style="z-index: 3;"><div style="display: table; height: 100%; width: 100%;"><div style="display: table-cell; text-align: center; vertical-align: middle"><img style="max-height: 600px !important; max-width: 800px !important;" src="' + url + '"></div></div></div>';
    $("body").append(html);
}