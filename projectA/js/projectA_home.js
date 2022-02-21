/*************** TOP button *****************/

$(document).ready(function(){
    $(".topbt").click(function(){
        $("html, body").animate({
            scrollTop : 0
        }, 500);
    });
});