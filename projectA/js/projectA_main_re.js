/******************** 헤더 숨기기 *******************/
$(document).scroll(function(){
    // 스크롤 하며 헤더 숨기기- 변경가능
    var scroll = $(window).scrollTop();
        if(scroll > 300)
            $("header").addClass("hideBar");
        else if(scroll < 280)
            $("header").removeClass("hideBar");
});

/********************** 메뉴 숨기기 ********************/
$(document).scroll(function(){
	var scrollM = $(window).scrollTop();
		if(scrollM > 300)
			$(".Mnav").addClass("hideBar");
		else if(scrollM < 280)
			$(".Mnav").removeClass("hideBar");
  });
  

/************ history slide *************/

$(document).ready(function(){
    //배너 이미지가 모두 로딩된 후에 높이를 계산해야 하므로 $(window).load로 한다.
	
	var window_w = $(window).width();
	var obj_wrap = $(".slide"); //높이 제어
	var obj_name = $(".slide ul"); // 실제 움직일놈
	var obj_child = $(".slide ul li");// 하나의 배너

	//배너 컨트롤버튼
	var ctrl_btn = true;//사용여부 (true, false)
	var ctrl_next = $(".next");
	var ctrl_prev = $(".prev");
	var ctrl_stop = $(".stop");
	var ctrl_play = $(".play");

	var mobile_size = 767;
	var obj_width = obj_wrap.width();
	var obj_move;//li 하나의 넓이값(margin포함넓이)
	var mobile_view = 1;//스마트폰에서 터치로 넘길경우 반드시 모바일은 1개이어야 함.(여러개해도 하나씩 넘어감)
	var pc_view = 3;
	var obj_oneview;
	var obj_length = obj_child.length;
	var obj_index = 1;
	var obj_moveX;
	var obj_left;//기본 왼쪽으로 이동해야하는 값
	var copy_count;

	//자동플레이 여부(true, false)
	var refreshInvervalId;
	var auto_play = true;
	var auto_time = 5000;
	var obj_drag = false;

	//배너 드래그 이동, 사용여부 (true, false)
	var touch_draging = true;//스마트폰 터치 인식

	
	if(touch_draging == true){
		//모바일에서 터치를 인식
		obj_name.on("touchstart", function(a){
			obj_drag = true;
			e = a.originalEvent;
			currX = e.touches[0].pageX
			startX = e.touches[0].pageX;
			obj_name.on("touchmove", function(b){
				if(obj_drag ==  true){
					e = b.originalEvent;
					prevX = currX;
					currX = e.touches[0].pageX;
					moveX = prevX - currX;
					drag_move(moveX);
				}
			});
		});
		$(document).on("touchend", function(){
			if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
				drag_end();
			}
			obj_drag = false;
			obj_name.off("touchmove");
		});
	}
	//drag 혹은 touch 시 오브젝트를 움직이는 함수
	function drag_move(moveX){
		obj_name.offset({
			left : obj_name.offset().left - moveX
		});
	}

	///drag 혹은 touch가 종료되었을때 실행하는 함수
	function drag_end(){
		
		if(moveX > 0){//next
			obj_index++;
		}else{//prev
			obj_index--;
		}

		if(obj_index > obj_length){
			obj_index = obj_length;
		}else if(obj_index<1){
			obj_index = 1;
		}

		obj_moveX = (-(obj_index-1)*obj_move)-obj_left;
		//obj_index로 위치값을 계속 다시 계산하는 이유는 한번 잘못 이동하더라도 다음에 제대로 이동하기 위해서 
		obj_name.animate({
			left : obj_moveX
		}, 300)

	}

	//앞에서 li를 복사해서 뒤로 붙여넣기
	if(pc_view > mobile_view){
		copy_count = pc_view;
	}else{
		copy_count = mobile_view;
	}
	for(var i=0; i<copy_count; i++){
		obj_child.eq(i).clone().appendTo(obj_name);
		obj_child.eq(obj_length-(i+1)).clone().prependTo(obj_name);
	}

	view_count();

	if(ctrl_btn == true){
		ctrl_next.click(function(){
			auto_next();
			time_reset();
		});
		
		ctrl_prev.click(function(){
			obj_index = --obj_index;
			if(obj_index < 0){
				obj_index = (obj_length-1);
				obj_name.css("left", -obj_left-((obj_length-1)*obj_move));
			}
			obj_moveX = (-(obj_index-1)*obj_move)-obj_left;
			obj_name.animate({
				left : obj_moveX
			}, 300);
			time_reset();
		});
		ctrl_stop.click(function(){
			auto_status = "stop";
			clearInterval(refreshInvervalId);
		});
		ctrl_play.click(function(){
			auto_status = "play";
			refreshInvervalId = setInterval(auto_next, auto_time);
		});
	}

	//자동실행을 설정하였을 경우
	if(auto_play == true){
		//배너의 수가 1개이하면 실행하지 않음
		if(obj_length > 1){
			refreshInvervalId = setInterval(auto_next, auto_time);
		}
	}
	
	//윈도우가 리사이즈되면 배너 사이즈 다시 계산
	$(window).resize(function(){
		window_w = $(window).width();
		obj_width = obj_wrap.width();
		view_count();
	});

	$(window).load(function(){
		obj_wrap.height(obj_child.height());
	});
	
	
	function view_count(){
		if(window_w > mobile_size){//pc
			obj_oneview = pc_view;
		}else{//mobile
			obj_oneview = mobile_view;
		}

		obj_child.parent().children().width(obj_width/obj_oneview); //복제가 된 li도 넓이를 제어하기 위해서 이렇게 씀
		obj_move = obj_width/obj_oneview;
		obj_left = obj_move*copy_count;
		obj_wrap.height(obj_child.height()); // 배너의 높이값도 제어 (모바일에서 넓이가 줄면 높이도 줄이기 위해서)
		obj_name.width(((obj_oneview*2)*obj_length)*obj_move+100);//ul의 넓이 제어 (li가 아래로 안떨어지게)
		obj_name.css("left", (-(obj_index-1)*obj_move)-obj_left);
	}

	function auto_next(){
		obj_index = ++obj_index;
		//console.log(obj_index);
		if(obj_index > obj_length){ //더이상 복제한 배너이 없을때 
			obj_index = 1;
			obj_name.css("left", -obj_left+obj_move);
		}
		
		obj_moveX = (-(obj_index-1)*obj_move)-obj_left;
		//obj_index로 위치값을 계속 다시 계산하는 이유는 한번 잘못 이동하더라도 다음에 제대로 이동하기 위해서 
		obj_name.animate({
			left : obj_moveX
		}, 300);
	}

	function time_reset(){
		if(auto_status == play){
			clearInterval(refreshInvervalId);
			refreshInvervalId = setInterval(auto_next, auto_time);
		}
	}
});


/*****************vehicle tab style******************/
function openTabVertical(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("box");//선언
    for (i = 0; i < x.length; i++) { //배열의 숫자가 증가하는 짝에 맞추어
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink"); //선언
    for (i = 0; i < x.length; i++) { //배열의 숫자가 증가하는 짝에 맞추어
      tablinks[i].className = tablinks[i].className.replace(" tablinkOn", ""); //클래스를 공백으로 바꾼다
    }
    document.getElementById(tabName).style.display = "flex"; //display:none;으로 되어있는 안보이는 상태로 된 컨텐츠 박스를 보이게 변경
    evt.currentTarget.className += " tablinkOn"; //공백으로바꾼 탭의 클래스를 바꿔치기
  }


/*************** TOP button *****************/

$(document).ready(function(){
    $(".topbt").click(function(){
        $("html, body").animate({
            scrollTop : 0
        }, 500);
	});
});


/********************* opacity 캐러셀 *********************/

$(document).ready(function(){
        //페이드배너를 감싸고 있는 오브젝트의 이름, 이 오브젝트의 넓이가 페이드배너의 넓이가 됨.
        var obj_wrap=$(".full2");
        //페이드배너 전체를 묶어주는 요소
        var obj_name = $(".full2 .wrap2");
        //보여질 실제 페이드배너를 감싸고 있는 영역
        var obj_child = $(".full2 .wrap2 .card");2
        var obj_child_acitve = "active";
        var obj_child_animate = "ani";

        //페이드배너 드래그 이동, 사용여부 (true, false)
        var touch_draging = true;//스마트폰 터치 인식

        //페이드배너 컨트롤버튼
        var ctrl_btn = false;//사용여부 (true, false)
        var ctrl_next = $(".wrap2 .next");
        var ctrl_prev = $(".wrap2 .prev");
        var ctrl_stop = $(".wrap2 .stop");
        var ctrl_play = $(".wrap2 .play");

        //현재페이드배너 번호 / 전체 페이드배너번호
        var numbering = false;//사용여부 (true, false)
        var curr_num = $(".wrap2 .curr_num");
        var total_num = $(".wrap2 .total_num");

        //페이드배너 리스트
        var paging = true;//사용여부 (true, false)
        var paging_obj = $(".wrap2 .paging button");
        var paging_curr_class = "active";//현재 선택된 페이드배너를 표시할 class명
        var paging_index;

        //자동플레이 여부(true, false)
        var auto_play = true;
        var auto_time = 3000;//1000단위가 1초라고 생각하면 됨
        var refreshInvervalId;
        var auto_status;

        //이 아래 변수는 수정 금지
        var obj_drag = false;
        var obj_index = 0;
        var next_index = obj_index+1;
        //페이드배너의 갯수 계산
        var obj_length = obj_child.length;
        //페이드배너의 넓이 계산
        var obj_width = obj_wrap.width();
        var startX = null;
        var prevX = null;
        var currX = null;
        var moveX = null;
        var afterX = null;
        var e = null;

    if(touch_draging == true){
        //모바일에서 터치를 인식
        obj_name.on("touchstart", function(a){
            obj_drag = true;
            e = a.originalEvent;
            currX = e.touches[0].pageX
            startX = e.touches[0].pageX;
            obj_name.on("touchmove", function(b){
                if(obj_drag ==  true){
                    e = b.originalEvent;
                    prevX = currX;
                    currX = e.touches[0].pageX;
                    moveX = prevX - currX;
                    //drag_move(moveX);
                }
            });
            
        });
        $(document).on("touchend", function(){
            if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
                drag_end();
            }
            obj_drag = false;
            obj_name.off("touchmove");
        });
    }

    ///drag 혹은 touch가 종료되었을때 실행하는 함수
    function drag_end(){
        //console.log(moveX);
        if(moveX > 0){
            next_index = obj_index+1;
        }else{
            next_index = obj_index-1;
        }

        if(next_index > obj_length-1){
            next_index = 0;
        }else if(next_index<0){
            next_index = obj_length-1;
        }
        popup_change(next_index);
        time_reset();
    }

    function popup_change(next_index){
        //console.log(obj_index+", "+next_index);
        if(obj_index != next_index){
            obj_child.eq(next_index).show();
            obj_child.eq(obj_index).fadeOut(500, function(){
                obj_child.eq(next_index).addClass(obj_child_acitve);
                obj_child.eq(obj_index).removeClass(obj_child_acitve);
                obj_child.eq(next_index).addClass(obj_child_animate);
                obj_child.eq(obj_index).removeClass(obj_child_animate);
                obj_index = next_index;
                index_change(obj_index);
            });
        }
        
    }//popup_change

    //index 변경 시 변경해야 할 것들 (paging, numbering)
    function index_change(index){
        if(numbering == true){
            curr_num.html(index+1);
        }
        if(paging == true){
            paging_obj.removeClass(paging_curr_class);
            paging_obj.eq(index).addClass(paging_curr_class);
        }
    }

    function auto_next(){
        if(obj_index >= obj_length -1){
            next_index = 0;
        }else{
            next_index = obj_index+1;
        }
        popup_change(next_index);
    }

    function time_reset(){
        if(auto_status == "play"){
            clearInterval(refreshInvervalId);
            refreshInvervalId = setInterval(auto_next, auto_time);
        }
    }

    if(ctrl_btn == true){
        ctrl_prev.on("click", function(){
            if(obj_index < 1){
                next_index = obj_length-1;
            }else{
                next_index = obj_index-1;
            }
            popup_change(next_index);
            time_reset();
        });
        ctrl_next.on("click", function(){
            auto_next();
            time_reset();
        });
        ctrl_stop.on("click", function(){
            auto_status = "stop";
            clearInterval(refreshInvervalId);
        });
        ctrl_play.on("click", function(){
            auto_status = "play";
            refreshInvervalId = setInterval(auto_next, auto_time);
        });
    }

    if(auto_play == true){
        //페이드배너의 수가 1개이하면 실행하지 않음
        if(obj_length > 1){
            obj_child.eq(obj_index).addClass(obj_child_acitve);
            refreshInvervalId = setInterval(auto_next, auto_time);
            auto_status = "play";
        }
    }else{
        obj_child.eq(obj_index).addClass(obj_child_acitve);
    }
    $(window).load(function(){ 
        obj_child.eq(obj_index).addClass(obj_child_animate);
    });

    //페이지번호를 사용할 경우
    if(numbering == true){
        curr_num.html(obj_index+1);
        total_num.html(obj_length);
    }

    //paging을 사용할 경우
    if(paging == true){
        paging_obj.removeClass(paging_curr_class);
        paging_obj.eq(obj_index).addClass(paging_curr_class);
        paging_obj.on("click", function(){
            paging_index = $(this).index();
            //console.log(paging_index);
            popup_change(paging_index);
            time_reset();
        });
    }

    //높이 재설정
    obj_wrap.height(obj_child.height());
    $(window).load(function(){
        obj_wrap.height(obj_child.height());
    });
    $(window).resize(function(){
        obj_wrap.height(obj_child.height());
    });
});