/**************mobile menu***************/

$(document).ready(function(){
    $(".mMenubt").click(function(){
        $(this).toggleClass("open");  //.nMenubt에 open클래스 추가
        $("nav").toggleClass("displayOn"); //.sub_menu에 displayOn추가
      });
});

/*************** TOP button *****************/
$(document).ready(function(){
  $(".topbt").click(function(){
    $("html, body").animate({
        scrollTop : 0
    }, 500);
  });
});

/************ 메뉴 링크 누르면 메뉴 숨기기 ***********/
$(document).ready(function(){
  $(".mSnb li").click(function(){
      $("nav").removeClass("displayOn");
      $(".mMenubt").removeClass("open");
    });
});