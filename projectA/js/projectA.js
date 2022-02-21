/**************mobile menu***************/

$(document).ready(function(){
    $(".nav-icon").click(function(){
        $(this).toggleClass("open");  //.nav-icon에 open클래스 추가
        $(".sub_menu").toggleClass("displayOn"); //.sub_menu에 displayOn추가
      });
});