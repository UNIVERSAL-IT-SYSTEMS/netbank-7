var li = '<li><a href="./index.html">首页</a></li>'+
            '<li><a href="./news.html">资讯中心</a></li>'+
            '<li><a href="./product.html">产品中心</a></li>'+
            '<li><a href="./solution.html">解决方案</a></li>'+
            '<li><a href="./service.html">服务中心</a></li>'+
            '<li><a href="./example.html">客户案例</a></li>'+
            '<li><a href="./about.html">关于网银</a></li>';
$(".navigator").append(li);
var list =[];
$.each($("[data-target]"),function(){
	var t = $(this).attr("data-target");
	$(this).attr("href","#/"+t);
	list.push(t);
});
$(window).bind('hashchange load',function(){
	var hash = window.location.hash.slice(2);
	if(!hash||!isExist(hash)){
		changePage(list[0]);
	}
	else{
		changePage(hash);
	}
});
function changePage(hash){
	$("#"+hash).addClass("show").siblings(".cont").removeClass("show");
	$('[data-target="'+hash+'"]').closest(".row").addClass("set").siblings(".row").removeClass("set");
}
function isExist(hash){
	for(var i = 0,length = list.length; i < length; i++){
		if(list[i]==hash){
			return true;
		}
	}
	return false;
}
$(".menuicon").bind('click',function(){
	$(".navigator").toggleClass("show");
	$(this).toggleClass("closeState");
});





