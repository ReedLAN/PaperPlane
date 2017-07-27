//全屏滚动
$(function(){
	var n=0;
	var imgLength=$(".banner_list a").length;//获取图片的个数	
	var ctWidth=imgLength*100;//所有banner的总宽度
	var itemWidth=1/imgLength*100;//单个banner的宽度
	$(".banner_list").width(ctWidth+"%");//所有banner的占比
	$(".banner_list a").width(itemWidth+"%");//单个banner的占比
	$(".scroll").width(imgLength*22);//轮播圆点的宽度
	if(imgLength>1){
		for(var i=0;i<imgLength;i++){
			var listSpan=$("<span></span>")
			$(".scroll").append(listSpan);//添加实现圆点的标签
		}
	}
	$(".scroll span:eq(0)").addClass("circle").siblings("span").removeClass("circle");//给当前页面的圆点追加样式
	
	$(".bar-right").click(function(){//右箭头点击事件
		if(n==imgLength-1)
		{//当前图片是最后一张图片时
			var ctPosit=(n+1)*100;
			$(".banner").append($(".banner_list").clone());//复制banner-list元素，然后追加到 banner元素
			$(".banner_list:last").css("left","100%");//为第二套图片添加坐标属性
			$(".banner_list:first").animate({"left":"-"+ctPosit+"%"},1000);//第一套图片此时的坐标
			$(".banner_list:last").animate({"left":"0"},1000);//第二套图片此时的坐标
			var setTime0=setTimeout(function () {
            	$(".banner .banner_list:first").remove();//移除第一套图片
            }, 1000);
			n=0;//获取当前图片的圆点的坐标
			$(".scroll span:eq("+n+")").addClass("circle").siblings("span").removeClass("circle");//为当前图片的圆点加上circle样式并移除其他圆点的circle样式
		}
		else
		{//当前图片不是最后一张图片时
			n++;
			var ctPosit=n*100;
			$(".banner_list").animate({"left":"-"+ctPosit+"%"},1000);//banner此时的坐标
			$(".scroll span:eq("+n+")").addClass("circle").siblings("span").removeClass("circle");//为当前图片的圆点加上circle样式并移除其他圆点的circle样式
		}
	})
	
	$(".bar-left").click(function(){//左箭头点击事件
		if(n==0)
		{//当前图片是第一张图片时
			var stPosit=imgLength*100;//所有banner的总宽度
			var etPosit=(imgLength-1)*100;//剩下的banner的宽度
			$(".banner").prepend($(".banner_list").clone());//复制banner-list元素，然后插入到 banner元素
			$(".banner_list:first").css("left","-"+stPosit+"%");//为第一套图片添加坐标属性
			$(".banner_list:last").animate({"left":"100%"},1000);//第二套图片此时的坐标
			$(".banner_list:first").animate({"left":"-"+etPosit+"%"},1000);//第一套图片此时的坐标
			var setTime0=setTimeout(function () {
            	$(".banner .banner_list:last").remove();
            }, 1000);//移除第二套图片
			n=imgLength-1;//获取当前图片的圆点的坐标
			$(".scroll span:eq("+n+")").addClass("circle").siblings("span").removeClass("circle");//为当前图片的圆点加上circle样式并移除其他圆点的circle样式
		}
		else
		{//当前图片不是第一张图片时
			n--;
			var ctPosit=n*100;
			$(".banner_list").animate({"left":"-"+ctPosit+"%"},1000);//banner此时的坐标
			$(".scroll span:eq("+n+")").addClass("circle").siblings("span").removeClass("circle");//为当前图片的圆点加上circle样式并移除其他圆点的circle样式
		}
	})
	
	$(".scroll span").click(function(){//圆点点击事件
		var lsIndex=$(this).index();//获取当前圆点的坐标
		n=lsIndex;
		var ctPosit=n*100;
		$(".banner_list").animate({"left":"-"+ctPosit+"%"},1000);//banner此时的坐标
		$(this).addClass("circle").siblings("span").removeClass("circle");//为当前图片的圆点加上circle样式并移除其他圆点的circle样式
	})
	function rollEnvent(){
		if(n==imgLength-1)
		{//如果现在是最后一张图片
			var ctPosit=(n+1)*100;
			$(".banner").append($(".banner_list").clone());//复制banner-list元素，然后插入到 banner元素
			$(".banner_list:last").css("left","100%");//为第二套图片添加坐标属性
			$(".banner_list:first").animate({"left":"-"+ctPosit+"%"},1000);//第一套图片此时的坐标
			$(".banner_list:last").animate({"left":"0"},1000);//第二套图片此时的坐标
			var setTime0=setTimeout(function () {
            	$(".banner .banner_list:first").remove();
            }, 1000);//移除第一套图片
			n=0;//获取当前图片的圆点的坐标
			$(".scroll span:eq(0)").addClass("circle").siblings("span").removeClass("circle");//为当前图片的圆点加上circle样式并移除其他圆点的circle样式
		}
		else
		{//如果不是最后一张图片
			n++;
			var ctPosit=n*100;
			$(".banner_list").animate({"left":"-"+ctPosit+"%"},1000);//banner此时的坐标
			$(".scroll span:eq("+n+")").addClass("circle").siblings("span").removeClass("circle");//为当前图片的圆点加上circle样式并移除其他圆点的circle样式
		}
	}
	var slidesetInterval=setInterval(rollEnvent,2000);//setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭
	$(".banner").hover(function(){//鼠标悬停事件
		clearInterval(slidesetInterval);},function(){//鼠标移上去时调用的函数
			slidesetInterval=setInterval(rollEnvent,2000);//鼠标离开时调用的函数
	});
})
