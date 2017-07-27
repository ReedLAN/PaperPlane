window.onload=test;
window.onresize=test;
function test(){
	waterfall('waterfall','waterfall_single');	
	
	//计算底部图片高度
	var boxId1=document.getElementById("picwallBox1");
	var Width=parseInt(boxId1.offsetWidth);//底部第一列图片的宽度
	var Height=parseInt(boxId1.offsetHeight);//底部第一列图片的高度
	var picSingle=document.getElementsByClassName("picSingle");
	for(var i=0;i<picSingle.length;i++){
		picSingle[i].style.height=Height;//为底部所有列设置相同的高度
	}
	var img=picSingle[picSingle.length-1].getElementsByTagName("img");
	for(var i=0;i<img.length;i++){
		img[i].style.height=Height/2+'px';//第三列的图片高度为底部高度的一半
	}
	
}
function waterfall(parent,waterfall_single){
	//将waterfall下的所有class为waterfall_single的元素取出来
	var oParent=document.getElementById(parent);
	var oSingle=getByClass(oParent,waterfall_single);
	var imgDiv=document.getElementsByClassName("waterfall_img");//将所有的包含图片的div元素取出来
	var img=oParent.getElementsByTagName("img");//获取所有的图片

	//计算整个页面显示的列数（页面宽/waterfall_single的宽）
	var oSingleW=oSingle[0].offsetWidth;//单列的宽度
	var cliW=oParent.offsetWidth;//总宽
	var cols=Math.floor(cliW/oSingleW);//总共的列数，Math.floor() 方法返回小于等于x的最大整数
	//设置parent的宽并居中
	oParent.style.cssText='width:'+oSingleW*cols+'px;margin:auto;';
	var hArr=[];//存放每一列高度的数组
	var marginArr=[];//存放图片hover时向下移动的距离
	var idArr=[];//存放图片ID
	var divArr=[];//存放图片div的ID
	for(var i=0;i<oSingle.length;i++){
		if(i<cols){
			hArr.push(oSingle[i].offsetHeight);//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
		}else{
			var minH=Math.min.apply(null,hArr);//获取第一行的最小高度				
			var index=getMinhIndex(hArr,minH);//获取第一行最小高度的索引
			oSingle[i].style.position='absolute';//绝对定位
			oSingle[i].style.top=minH+'px';
			oSingle[i].style.left=oSingleW*index+'px';
			hArr[index]+=oSingle[i].offsetHeight;
		}
		
		//给图片添加hover样式
		var imgHeight=imgDiv[i].offsetHeight;//获取每个图片的宽度和高度
		var imgWidth=imgDiv[i].offsetWidth;
		imgDiv[i].style.cssText='height:'+imgHeight+'px;width:'+imgWidth+'px;';
		
		img[i].id="img"+i;//给图片添加id		
		var imgIndex="img"+i;
		idArr.push(imgIndex);//将图片ID放入数组中		
		
		imgDiv[i].id="imgDiv"+i;//给包含图片的div添加id
		var imgDivIndex="imgDiv"+i;
		divArr.push(imgDivIndex);//将div的ID放入数组中
		
		var marginWidth=imgWidth*0.1;//计算图片距离左边的宽度
		var marginHeight=imgHeight*0.1;//计算图片距离顶部的高度
		var marginTop=marginWidth-marginHeight;//图片应该向下移动的距离	
		marginArr.push(marginTop);//将所有图片的移动距离放入数组中				
						
		var waterfall=document.getElementById("waterfall");// 找到父元素，添加监听器...
		waterfall.addEventListener("mouseover",function(e){	
			// e.target是鼠标滑过的元素			
			if(e.target && e.target.nodeName.toLowerCase() == "img") {//e.target.nodeName获得的字符串是大写的
				var idNum=e.target.id;//获取当前元素的ID
				var imgSingle=document.getElementById(idNum);
				for (var i=0;i<idArr.length;i++) {					
					if(idArr[i]==idNum){												
						imgSingle.style="margin-top:"+marginArr[i]+"px;";											
					}
				}
			}else if(e.target && e.target.className == "waterfall_img"){
				var idNum=e.target.id;//获取当前元素的ID
				for (var i=0;i<divArr.length;i++) {					
					if(divArr[i]==idNum){
						var img=document.getElementById(idArr[i]);
						img.style="margin-top:"+marginArr[i]+"px;";											
					}else{
						var imgOther=document.getElementById(idArr[i]);
						imgOther.style="margin-top:0;";
					}
				}
			}else{				
				for (var i=0;i<idArr.length;i++){
					var imgOther=document.getElementById(idArr[i]);
					imgOther.style="margin-top:0;";
				}
			}
			
		});	
		waterfall.addEventListener("mouseout",function(e){
			for (var i=0;i<idArr.length;i++){
				var imgOther=document.getElementById(idArr[i]);
				imgOther.style="margin-top:0;";
			}
		});
	}
			
	//计算瀑布流的高度
	var waterH=Math.max.apply(null,hArr);
	oParent.style.cssText='height:'+waterH+'px;';
		
}

//从父元素中获取相应的子元素
function getByClass(parent,clsName){
	var singleArr=new Array(),//用来存储所有获取到的class为waterfall_single的元素
		oElements=parent.getElementsByTagName("*");
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			singleArr.push(oElements[i]);
		}
	}
	return singleArr;
}
//获取当前元素的索引
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}


//底部图片遮罩层事件
function mOver(ele){
	var picSvg=ele.getElementsByTagName("svg")[0];//获取当前父元素里的svg元素
	var picImg=ele.getElementsByTagName("img")[0];//获取当前父元素里的img元素
	var picimgHeight=picImg.offsetHeight;//获取当前图片元素的高度
	var svgHeight=picimgHeight+"px";
	var imgHeight=picimgHeight+1;
	picSvg.setAttribute("height",svgHeight);//给当前的svg设置高度
	picSvg.setAttribute("style","transform: rotateY(180deg);opacity: 1;");
	picImg.style="transform:scale(1.1);";
}
function mOut(ele){
	var picSvg=ele.getElementsByTagName("svg")[0];//获取当前父元素里的svg元素
	var picImg=ele.getElementsByTagName("img")[0];//获取当前父元素里的img元素
	picSvg.setAttribute("style","opacity: 0;");
	var picimgHeight=picImg.offsetHeight;//获取当前图片元素的高度
	console.log(picimgHeight);
	picImg.style="transform:scale(1);";
	picImg.style.height=picimgHeight;
}