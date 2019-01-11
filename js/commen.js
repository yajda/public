    /**
     * 引入js文件
     */
    //document.write("<script type='text/javascript' src='/admin/js/jquery.min.js?v=2.1.4'></script>");
    //document.write("<script type='text/javascript' src='/admin/js/bootstrap.min.js?v=3.3.5'></script>");
    //document.write("<script type='text/javascript' src='../admin/js/content.min.js?v=1.0.0'></script>");
    document.write("<script type='text/javascript' src='/admin/js/plugins/toastr/toastr.min.js'></script>");
    // document.write('<div id="Voice"></div>');
    //
    // //查询是否有新订单
    // var x = setInterval(function () {
    //     getOrder();
    // },30000);
    //
    // //检查订单状态
    // function getOrder(){
    //     $AJAX(
    //         "/system/statistics/order",
    //         {},
    //         function (res){
    //             if(res.response == 200){
    //                 showAlert("success","有新的订单消息，请前往查看","success");
    //                 $("#Voice").html('<audio controls="controls" id="audio_player" style="display:none;"> <source src="/src/orderPrompt.mp3" > </audio><embed id="MPlayer_Alert" src="/src/orderPrompt.mp3" loop="false" width="0px" height="0px" /></embed>');
    //             }
    //         }
    //     );
    // }

    var i = -1;
    var toastCount=0;

    /**
     * 消息提示
     * @param Type 消息类型  success,error
     * @param Content 消息内容
     * @param Title 消息标题
     */
    function showAlert(Type,Content,Title){
        var shortCutFunction=Type;
        var msg=Content;
        var title=Title;
        var $showDuration="300";
        var $hideDuration="8000";
        var $timeOut="8000";
        var $extendedTimeOut="1000";
        var $showEasing="swing";
        var $hideEasing="linear";
        var $showMethod="fadeIn";
        var $hideMethod="fadeOut";
        var toastIndex=toastCount++;
        toastr.options={
            closeButton:true, //关闭按钮
            debug:false,
            progressBar:true,
            positionClass:"toast-top-center",
            onclick:null
        };
        if($("#addBehaviorOnToastClick").prop("checked")){
            toastr.options.onclick=function(){
                //alert("You can perform some custom action after a toast goes away")
            }
        }
        if($showDuration.length){
            toastr.options.showDuration=$showDuration
        }
        if($hideDuration.length){
            toastr.options.hideDuration=$hideDuration
        }
        if($timeOut.length){
            toastr.options.timeOut=$timeOut
        }
        if($extendedTimeOut.length){
            toastr.options.extendedTimeOut=$extendedTimeOut
        }
        if($showEasing.length){
            toastr.options.showEasing=$showEasing
        }
        if($hideEasing.length){
            toastr.options.hideEasing=$hideEasing
        }
        if($showMethod.length) {
            toastr.options.showMethod=$showMethod
        }
        if($hideMethod.length){
            toastr.options.hideMethod=$hideMethod
        }
        var $toast=toastr[shortCutFunction](msg,title);
        $toastlast=$toast;
        if($toast.find("#okBtn").length){
            $toast.delegate("#okBtn","click",function(){
                //alert("you clicked me. i was toast #"+toastIndex+". goodbye!");
                $toast.remove()
            })
        }
        if($toast.find("#surpriseBtn").length){
            $toast.delegate("#surpriseBtn","click",function(){
                //alert("Surprise! you clicked me. i was toast #"+toastIndex+". You could perform an action here.")
            })
        }
    }

    /**
     * 公用ajax
     * @param url 访问地址
     * @param postData  参数json
     * @param Callback  回调
     */
    function $AJAX(url, postData, Callback){
        var requestType = "json";

        $.post(url, postData, function(res){
            Callback(res);
        }, requestType)
    }

    //创建cookie
    function setCookie(name,value)
    {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }

    //获取cookie
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return "";
    }

    //删除cookie
    function delCookie(name)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        else
            console.log(false);
    }

    //清除所有cookie
    function clearCookie(){
        var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
        }
    }
