/* fullsize 동영상 */
$(document).ready(function(){
	//1280*720
	var section_name = $(".fullsize");
	var movie_name = $(".fullsize iframe");
	var movie_rate = 1280/720;
	var window_h = $(window).height();
	var window_w = $(window).width();
	var movie_w = window_w;
	var movie_h = window_h;
	var difference = 0;
	
	function movie_size_check(){
		section_name.height(movie_h);
		//가로 세로 비율을 따져서 가로가 더 넓을때 (높이를 기준으로 넓이를 역산)
		if(movie_w/movie_h < movie_rate){
			movie_w = movie_h*movie_rate;
			difference = (window_w - movie_w)/2;
			movie_name.css("margin-left", difference);
		}else{//세로가 더 높을때 (넓이를 기준으로 높이를 역산)
			movie_h = movie_w/movie_rate;
			difference = (window_h - movie_h)/2;
			movie_name.css("margin-top", difference);
		}
		movie_name.css("width", movie_w);
		movie_name.css("height", movie_h);
	}
	movie_size_check();
	
	$(window).resize(function(){
		window_h = $(window).height();
		window_w = $(window).width();
		movie_w = window_w;
		movie_h = window_h;
		movie_size_check();
	});

});

/************** menu ***************/
$(document).ready(function(){
    if($(window).width() > 768){
        $(".openBt i.material-icons").click(function(){
            $(".subMenu").addClass("on");
            $(".cover").addClass("on");
        });
        $(".subMenu i.material-icons").click(function(){
            $(".subMenu").removeClass("on");
            $(".cover").removeClass("on");
        });
    }
    if($(window).width() <= 768){
		$(".openBt i.material-icons").click(function(){
            $("nav").addClass("on");
            $(".cover").addClass("on");
		});
		$(".Mmenu i.material-icons").click(function(){
            $("nav").removeClass("on");
            $(".cover").removeClass("on");
        });
    }
});

/*********** 서브 페이지 탭스타일 ************/
function openTabHorizental(evt, tabName){
	var i, x, tablinks;
	x = document.getElementsByClassName("box"); //선언
	for (i = 0; i < x.length; i++){ //배열의 숫자가 증가하는 짝에 맞추어
		x[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink"); //선언
	for (i = 0; i < x.length; i++){ //배열의 숫자가 증가하는 짝에 맞추어
		tablinks[i].className = tablinks[i].className.replace(" tablinkOn",""); //클래스를 공백으로 바꾼다
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " tablinkOn";
}



/************** art1,2 클릭 **************/
$(document).ready(function(){
	$(".material-icons.plus01").click(function(){
		$(this).toggleClass("rotate");
		$(".art1").toggleClass("height");
	});
	$(".material-icons.plus02").click(function(){
		$(this).toggleClass("rotate");
		$(".art2").toggleClass("height");
	});
});

/*********** 스크롤시 헤더 fixed ************/
$(document).scroll(function(){
	if($(window).width() > 768){
	var scroll = $(window).scrollTop();
        if(scroll > 50){
			$(".tabMenu").addClass("fixBar");
		}else if(scroll < 10){
			$(".tabMenu").removeClass("fixBar");
		}
	}
    if($(window).width() <= 768){
    var scroll = $(window).scrollTop();
        if(scroll > 50){
			$("header").addClass("fixBar");
			$("nav").addClass("fixBar");
			$(".tabMenu").addClass("fixBar");
		}else if(scroll < 10){
			$("header").removeClass("fixBar");
			$("nav").removeClass("fixBar");
			$(".tabMenu").removeClass("fixBar");
		}
	}
});


/********* 카운트 *********/ 
$('.counting').each(function(){
	var $this = $(this),
	countTo = $this.attr('data-count');
	$({ countNum: $this.text()}).animate({
		countNum: countTo
	},{
		duration: 4000,
		easing:'linear',
		step: function() {
			$this.text(Math.floor(this.countNum));
		},
		complete: function(){
			$this.text(this.countNum);
			//alert('finished');
		}
	});  
});

/********** History more 클릭 *********/
$(document).ready(function(){
	$(".more2010").click(function(){
		$(".y2010").slideToggle("slow");
	});
	$(".more2000").click(function(){
		$(".y2000").slideToggle("slow");
	});
	$(".more1990").click(function(){
		$(".y1990").slideToggle("slow");
	});
	$(".more1980").click(function(){
		$(".y1980").slideToggle("slow");
	});
});

/************ scroll TOP Button ***********/
$(document).ready(function(){
	$(".topBt").click(function(){
		$("html, body").animate({
			scrollTop : 0
		}, 500);
	});
});

/***************** map button click******************/
$(document).ready(function(){
	if($(window).width() >= 768){
		$(".headButton").click(function(){
			$(this).toggleClass("displayOn");
			$(".Seoul").toggleClass("displayOn");
		});
		$(".branchButton").click(function(){
			$(this).toggleClass("displayOn");
			$(".Busan").toggleClass("displayOn");
			$(".Gwangju").toggleClass("displayOn");
			$(".Daegu").toggleClass("displayOn");
			$(".Daejeon").toggleClass("displayOn");
			$(".Gangwon").toggleClass("displayOn");
		});
		$(".baseButton").click(function(){
			$(this).toggleClass("displayOn");
			$(".Yeosu").toggleClass("displayOn");
			$(".Incheon").toggleClass("displayOn");
			$(".Daesan").toggleClass("displayOn");
		});
	}
	$(".dubaiButton").click(function(){
		$(this).addClass("displayOn").eq(0).siblings().removeClass("displayOn");
		$(".Dubai").addClass("mapOn");
		$(".Singapore").removeClass("mapOn");
		$(".Huston").removeClass("mapOn");
	});
	$(".singaporeButton").click(function(){
		$(this).addClass("displayOn").eq(0).siblings().removeClass("displayOn");
		$(".Dubai").removeClass("mapOn");
		$(".Singapore").addClass("mapOn");
		$(".Huston").removeClass("mapOn");
	});
	$(".hustonButton").click(function(){
		$(this).addClass("displayOn").eq(0).siblings().removeClass("displayOn");
		$(".Dubai").removeClass("mapOn");
		$(".Singapore").removeClass("mapOn");
		$(".Huston").addClass("mapOn");
	});
});

/*********** 링크로 특정탭 오픈 ************/
$(document).ready(function(){
	//기본탭 오픈
	$("ul.tabMenu li").click(function(){
		$(this).addClass('tablinkOn').siblings().removeClass('tablinkOn');
		$('.box').eq(0).addClass('on').siblings().removeClass('on');
		// $("."+$(this).attr('id')).addClass('on').siblings().removeClass('on');
	});
	//타 페이지에서 해시를 찾아 이동
	var spot = $('#tab01').offset().top;
	if(location.hash == '#tab01'){
		$('.tabMenu').find('li').eq(0).addClass('tablinkOn').siblings().removeClass('tablinkOn');
		$('.section01').eq(0).addClass('on').siblings().removeClass('on');
	} else if(location.hash == '#tab02'){
		$('.tabMenu').find('li').eq(1).addClass('tablinkOn').siblings().removeClass('tablinkOn');
		$('.section02').eq(0).addClass('on').siblings().removeClass('on');
	} else if(location.hash == '#tab03'){
		$('.tabMenu').find('li').eq(2).addClass('tablinkOn').siblings().removeClass('tablinkOn');
		$('.section03').eq(0).addClass('on').siblings().removeClass('on');
	} else if(location.hash == '#tab04'){
		$('.tabMenu').find('li').eq(3).addClass('tablinkOn').siblings().removeClass('tablinkOn');
		$('.section04').eq(0).addClass('on').siblings().removeClass('on');
	}
	//타 페이지 nav 에서 본 페이지 이동 후, 본 페이지에서 오픈된 탭 외에 이동이 안되는 부분을 보완
	$('.tab01_on').click(function(){
		$("html, body").animate({
			scrollTop : spot
		}, 500);
		$('.tabMenu').find('li').eq(0).addClass('tablinkOn').siblings().removeClass('tablinkOn');
		$('.section01.box').addClass('on').siblings().removeClass('on');
	});
	$('.tab02_on').click(function(){
		$("html, body").animate({
			scrollTop : spot
		}, 500);
		$('.tabMenu').find('li').eq(1).addClass('tablinkOn').siblings().removeClass('tablinkOn');
		$('.section02.box').addClass('on').siblings().removeClass('on');
	});
	$('.tab03_on').click(function(){
		$("html, body").animate({
			scrollTop : spot
		}, 500);
		$('.tabMenu').find('li').eq(2).addClass('tablinkOn').siblings().removeClass('tablinkOn');
		$('.section03.box').addClass('on').siblings().removeClass('on');
	});
	$('.tab04_on').click(function(){
		$("html, body").animate({
			scrollTop : spot
		}, 500);
		$('.tabMenu').find('li').eq(3).addClass('tablinkOn').siblings().removeClass('tablinkOn');
		$('.section04.box').addClass('on').siblings().removeClass('on');
	});
});