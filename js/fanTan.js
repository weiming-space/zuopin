// JavaScript Document

function startMove(ele,obj,callback){
	
			clearInterval(ele.timer);

			var nSpeed=0; 


			ele.timer=setInterval(function(){
				var bFlag=0;						   		   
				for(var attr in obj){
					if(!ele[attr+'speed']){
						var nSpeed=0;
					}else{
						nSpeed=ele[attr+'speed'];
					}					   
					//取当前的位置
						if(attr=='opacity'){
							var iCur=parseFloat(getStyle(ele,attr))*100;
						}else{
							var iCur=parseInt(getStyle(ele,attr));				
						}
					
					//计算速度
						if(obj[attr]<iCur){
							var nAddSpeed=-10;
						}else{
							var nAddSpeed=10;
						}
						var nSpeed=nSpeed+nAddSpeed;
						nSpeed*=0.9;
						ele[attr+'speed']=nSpeed;
						
					//检测停止
						if( (nAddSpeed>0 && (iCur+nSpeed)>=obj[attr]) || (nAddSpeed<0&&(iCur+nSpeed)<=obj[attr])){		if(attr=='opacity'){
								ele.style.opacity=obj[attr]/100;
								ele.style.filter='alpha(opacity:'+obj[attr]+')';
								
							}else{
								ele.style[attr]=obj[attr]+'px';
							}
							nSpeed*=-1;
							ele[attr+'speed']=nSpeed;
							bFlag++;
							

						}else{
							var sum=iCur+nSpeed;
							if(attr=='opacity'){
								ele.style.opacity=(sum)/100;
								ele.style.filter='alpha(opacity:'+(iCur+nSpeed)+')';
							}else{
								ele.style[attr]=sum+'px';
							}
							bFlag=0;
							
						}
						

				}					   
				
				if(bFlag>=4){
					clearInterval(ele.timer);
					if(callback){
						callback();
					}
				}
				
				
			},30);
			
};


function getStyle(obj,sAttr)
{
	if(obj.currentStyle){
		return obj.currentStyle[sAttr];
	}else{
		return getComputedStyle(obj,false)[sAttr];
	}
};