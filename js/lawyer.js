/**
 * Created by fangjunjie on 2018/6/8.
 */


httpPost("home/law",{"lawyer_id":GetQueryString('lawyer_id')},function (response) {
    response = response.data;
    $('.lawyerMidTopAvatar').attr('src',kAPI_URL_PHOTO+response.avatar);
    $('.lawyerMidTopName').html(response.username);
    $('.lawyerMidTopLevel').html(response.grade);
    if (response.online == 1) {
        $('.lawyerMidTopOnline').attr('src','images/online.png');
    } else {
        $('.lawyerMidTopOnline').attr('src','images/offline.png');
    }
    $('.lawyerMidBottomGoodAt').append('<p>'+response.good_at+'</p>');

    for (var i = 0;i < response.experience.length;i++) {
        var list = '<p>'+response.experience[i].experience+'</p>';
        $('.lawyerMidBottomWorkArea').append(list);
    }
    $('.lawyerMidBottomPoint').append('<p>'+response.viewpoint+'</p>');
});
