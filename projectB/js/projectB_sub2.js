/************* click photo **************/
$(document).ready(function(){
    $("section.section01 .contents .photo").click(function(){
        $(this).toggleClass("click");  //.nMenubt에 open클래스 추가
    });
});
