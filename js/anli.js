/**
 * Created by fangjunjie on 2018/6/8.
 */





httpPost("home/anli",{"anli_id":GetQueryString('anli_id')},function (response) {
    response = response.data;

    $('.anliMid img').attr('src',kAPI_URL_PHOTO + response.img);
    $('.anliMid h1').html(response.title);
    $('.anliMid h2').html(response.brief);
    $('.anliMid span').html(response.item_type_name);
    $('.anliMid p').html(response.content);

    $('.anliFooter span').eq(0).html(response.praise)
    $('.anliFooter span').eq(1).html(response.collect)
});

