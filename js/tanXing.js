// JavaScript Document

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
function startMove(obj,attr,iTarget,fn){
	var iSpeed=0;
	var iCur=0;
	if(attr=='opacity'){
		iCur=parseInt(parseFloat(getStyle(obj,attr))*100)
	}else{
		iCur=parseInt(getStyle(obj,attr));	
	}
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		iSpeed+=(iTarget-iCur)/5;
		iSpeed*=0.7;
		if(Math.abs(iSpeed)<1&&Math.abs(iCur-iTarget)<1){
			clearInterval(obj.timer);
			obj.style[attr]=iTarget+'px';
			if(fn){
				fn();
			}
		}else{
			if(attr=='opacity'){
				iCur+=iSpeed;
				obj.style.filter='alpha(opacity:'+iCur+')';
				obj.style.opacity=iCur/100;
			}else{
				iCur+=iSpeed;
				obj.style[attr]=iCur+'px';
			}
		}
	},30)
}