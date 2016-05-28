(function(){
FastClick.attach(document.body);
function pageInit(){
	runPage();
	positionInit();
	eventBind();

}
function positionInit(){
	$(".page4 .unit .part").not(":first-child").css({
		"top": $(window).height()-$(".unit").position().top
	});
    if($(window).width()<800){
        $("body").addClass("mobilemodel");
    }
    else{
        $("body").removeClass("mobilemodel");
        $.each($(".canv"),function(){
            var app = new Build(this);
            app.run();
        });
    }
}
function eventBind(){
	$(".menuicon").bind('click',function(){
		$(".navigator").toggleClass("show");
		$(this).toggleClass("closeState");
	});
    $(".page6 .box .top .tx").bind("mouseenter",function(){
        $(this).closest(".box").removeClass("state1 state2 state3 state4 state5 state6 state7 state8").addClass("state"+($(this).index()-0+1));
    });
    $(".page8 .box .mappoint").bind("mouseenter",function(){
        $(this).addClass("selected").siblings(".mappoint").removeClass("selected");
        $(this).closest(".box").find(".addressbox").removeClass("show").eq($(this).index()).addClass("show");
    });
    $(window).bind('resize',function(){
        var w = $(this).width();
        if(w<800&&!$("body").hasClass("mobilemodel")){
            window.location.reload();
        }
        else if(w>=800&&$("body").hasClass("mobilemodel")){
            window.location.reload();
        }
    });
    if($(window).width()<800){
        $(window).bind('scroll',function(){
            var de = $(window).scrollTop()-$(".page8").offset().top+150;
            if(de-150>0&&de-150<1100){
                $(".page8 .contain").css("background-position","left "+de+"px");
            }
            else if(de-150<0){
                $(".page8 .contain").css("background-position","left 150px");
            }
            else{
                $(".page8 .contain").css("background-position","left 1250px");
            }
        });
        $(".navBar>li").bind('click',function(){
            var top = $(".page"+($(this).index()-0+1)).offset().top-45;
            $("body").animate({"scrollTop":top+"px"},500);
            $(".menuicon").trigger("click");
        });

    }
}

function runPage(){
	if($(window).width()>800){
		var runPage = new FullPage({

			id : 'pageContain',                            // id of contain
			slideTime : 800,                               // time of slide
			continuous : false,                            // create an infinite feel with no endpoints
			effect : {                                     // slide effect
		        	transform : {
		        		translate : 'Y',				   // 'X'|'Y'|'XY'|'none'
		        		scale : [1, 1],				       // [scalefrom, scaleto]
		        		rotate : [0, 0]				       // [rotatefrom, rotateto]
		        	},
		        	opacity : [0, 1]                       // [opacityfrom, opacityto]
		    	},                           
			mode : 'wheel,touch,nav:navBar',               // mode of fullpage
			easing : 'ease'                                // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
		     ,onSwipeStart : function(index, thisPage) {   // callback before pageChange
		       // return 'stop';
		     }
		     ,beforeChange : function(index, thisPage) {   // callback before pageChange
		       // return 'stop';
		     }
		     ,callback : function(index, thisPage) {       // callback when pageChange
		       // alert(index);
		     }
		});
        $(document).bind('keydown',function(e){
            
            var keycode = e.keyCode||e.which;
            if(keycode==38||keycode==37){
                e.preventDefault();
                runPage.prev();
            }
            else if(keycode==40||keycode==39){
                e.preventDefault();
                runPage.next();
            }
        })
	}
	else{
		$("[data-subminheight]").each(function(){
			$(this).css("min-height",$(window).height()-$(this).attr("data-subminheight"));
		});
	}
}
window.pageInit = pageInit;
})();
// var move
window.onload = function() {
    $(".page1 .veryCenterbox .pagehead").addClass("fadeInUp");
	// 轮播移动
    var bannerMove = (function() {
    	var width = parseFloat($(".banner").css("width"));
        var padding = parseFloat($(".banner").css("padding-left"));
        // var move=width+padding*2;
        var move = $(".banner").width();
    	// console.log($(".banner").last().index());
    	$(".bannerWrap")
    	.prepend($(".banner").eq(-1))
    	.prepend($(".banner").eq(-1));
    	$(".banner").eq(2).css('opacity', '0.2');
    	$(".banner").eq(6).css('opacity', '0.2');	
        var opacity = function(x, y) {
            $(".banner").each(function(index, el) {
                if ($(this).offset().left + x < 0 || ($(this).offset().left + $(this).width()) + x > $(window).width()) {
                    $(this).css('opacity', '0.2');
                    if (y !== 0) {
                        $(this).css('transition', 'opacity 0.5s');
                    }
                } else {
                    $(this).css('opacity', '1');
                    if (y !== 0) {
                        $(this).css('transition', 'opacity 0.5s');
                    }
                }
            });
        };
        opacity(0, 0);
        var bannerMove=function(x){
        	var place = parseFloat($(".bannerWrap").css('left'));
            var now = place + move * x;
            $(".bannerWrap").css("left", now);
            $(".bannerWrap").css("transition", "left 0.5s");
            opacity(width*x, 1);
        };
        $(".prevBox").on('click', function(event) {
        	var place = parseFloat($(".bannerWrap").css('left'));
            console.log(place)
        	event.preventDefault();
        	$(".bannerWrap").css("transition", "left 0s");
        	$(".bannerWrap").prepend($(".banner").eq(-1));
            console.log( $(".bannerWrap").css("left"));
        	$(".bannerWrap").css("left", place-move);
            // debugger;
        	bannerMove(1);
        });
        $(".nextBox").on('click', function(event) {
        	var place = parseInt($(".bannerWrap").css('left'));
        	event.preventDefault();
        	$(".bannerWrap").css("transition", "left 0s");
        	$(".bannerWrap").append($(".banner").eq(0));
        	$(".bannerWrap").css("left", place+move);
        	bannerMove(-1);
        });
    })();
};








