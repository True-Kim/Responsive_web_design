/******************** 스크롤하며 header, nav 숨기기 *******************/
$(document).scroll(function(){
  var scroll = $(window).scrollTop();
  //768px 이상에서
  if($(window).width() >= 768){
    if(scroll > 300){
      $("header").addClass("hideBar");
      $("nav").addClass("hideBar");
    }
    else if(scroll < 280){
      $("header").removeClass("hideBar");
      $("nav").removeClass("hideBar");
    }
  //모바일에서 header와 nav를 숨기지 않는다
  } else if($(window).width() < 768){
      $("header").removeClass("hideBar");
      $("nav").removeClass("hideBar");
    }
});