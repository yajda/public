/**
 * Created by fangjunjie on 2018/6/8.
 */

//请求地址
var kAPI_URL = "http://121.199.8.244:3309/api/";
var kAPI_URL_PHOTO = "http://121.199.8.244:3309/";

/**
 * ajax请求数据
 * @param url 请求地址
 * @param data 参数字典
 * @param successFunction 成功回调
 * @param successErrorFunction 成功失败回调
 * @param failureFunction 失败回调
 */
function httpPost(url,data,successFunction,successErrorFunction,failureFunction) {
    $.ajax({
        type: "POST",
        url: kAPI_URL + url,
        data: data,
        dataType: "JSON",
        async: false,
        beforeSend : function(){/*拼接所有的地址*/ },
        success : function(response){
            if (response.code != 200) {
                //失败
                if (successErrorFunction == null) { return false; }
                successErrorFunction(response);
            } else {
                //成功
                if (successFunction == null) { return false; }
                successFunction(response);
            }
        },
        error : function(XMLHttpRequest){
            console.log(XMLHttpRequest);
            if (failureFunction == null) { return false; }
            failureFunction(XMLHttpRequest);
        }
    });
}