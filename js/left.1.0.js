/**
 * Created by ZhuXueSong on 2016/11/25.
 */

$(document).ready(function () {
    $("#left_nav_content dl dd>a").click(function () {
        if ($(this).hasClass("checked")) {
            $(this).removeClass("checked").siblings("ul").hide(400);
            return false;
        }
        $("#left_nav_content dl dd>a").removeClass("checked").siblings("ul").hide(400);
        $(this).addClass("checked").siblings("ul").show(400);
        if (!$(this).siblings("ul").hasClass("nav-children-ul")) {
            $(".nav-children-ul li").removeClass("checked");
        }
    });

    $("ul.nav-children-ul li").click(function () {
        if($(this).hasClass("checked")) {
            return false;
        }
        $("ul.nav-children-ul li").removeClass("checked");
        $(this).addClass("checked");
    });
});
