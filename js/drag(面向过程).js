// JavaScript Document

function drag(obj){
	var disX=0;
	var disY=0;
	obj.onmousedown=function(e){
		var e=e||window.event;
		    disX=e.clientX-obj.offsetLeft;
		    disY=e.clientY-obj.offsetTop;
		if(obj.setCapture){
			obj.onmousemove=fnMove;
			obj.onmouseup=fnUp;
			obj.setCapture();
		}else{
			document.onmousemove=fnMove;
			
			document.onmouseup=fnUp;
		};
		return false;
		
	};
	function fnMove(e){
		var e=e||window.event;
		obj.style.left=e.clientX-disX+'px';
		obj.style.top=e.clientY-disY+'px';
	};
	function fnUp(){
		if(obj.releaseCapture){
			obj.onmousemove=null;
			obj.onmouseup=null;
			obj.releaseCapture();
		}else{
			document.onmousemove=null;
			document.onmouseup=null;
		}
	};
	
}