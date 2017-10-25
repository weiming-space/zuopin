
var DOM={};//定义一个对象，把下面的方法都置为此对象的属性，起了一个分组的作用。也叫命名空间。

/*getNextEle公共方法，
作用和下面的getNextOne方法一样
这个用的是递归方法
用来获得一个元素的下一个元素节点,
但传参数的时候要注意，要传一个元素的nextSibling
*/
function getNextEle(node) {
  if(node.nodeType == 1) {
	return node;
  }
  if (node.nextSibling) {
    return arguments.callee(node.nextSibling);//递归一下
  }
  return null;
}

/*
getPreEle方法，是个公共方法，
用来获得一个元素的上一个兄弟元素节点
和上面的方法是一个类型
但传参数的时候要注意，要传一个元素的nextSibling
*/
function getPreEle(nextNode){//用的是递归方法
	if(nextNode.nodeType===1){
		return nextNode;	
	}else{
		return arguments.callee(nextNode.nextSibling);
	}
	return null;
}

/*
getNextOne公共方法，
这个用的是循环方法
用来获得一个元素的下一个元素节点,
注意参数和getNextEle方法是不同的
*/
function getNextOne(ele){
	var next=ele.nextSibling
	while(next){//循环的方式
		if(next.nodeType===1){
			return next;
		}
		next=next.nextSibling;
	}
	return null;
}


DOM.getNextAll=function(ele,tagName){
	/*
	获取ele下面的所有弟弟元素节点
	第二个参数可选，表示获取指定标签名的弟弟元素节点	
	*/	
	var a=[];
	var next=getNextOne(ele);
	//调用公共方法，获得此元素的下一个（弟弟）元素节点
	if(tagName&&typeof tagName=='string'){
		//如果传了第二个参数
		while(next){//如果弟弟存在
			if(next.tagName.toLowerCase()==tagName.toLowerCase())
			//如果当前的标签名和指定的标签名相同
			a.push(next);//则放到数组里
			next=getNextOne(next)//让next等于当前的下一个元素节点，进行新一轮的判断		
		}
	}else{
	//如果没有传第二个参数
		while(next){
			a.push(next);
			next=getNextOne(next)
		}
	}
	return a;	
}


DOM.insertAfter=function (oldEle,newEle){
	/*
	和DOM方法insertBefore对应，把newEle追加在oldEle的后面
	*/
	if(oldEle&&oldEle.nodeType&&oldEle.nodeType===1&&newEle&&newEle.nodeType&&newEle.nodeType===1){
		if(oldEle.nextSibling){
			//如果oldEle对象有弟弟节点，则追加在它弟弟的前面
			oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling)	
		}else{
			//否则让它的父节点追加（追加成最后一个子元素）
				oldEle.parentNode.appendChild(newEle)
		}
	}else{
		throw new Error('参数错误')	
	}
}

DOM.prepend=function(newNode,parentEle){
	/*
	此方法和appendChild方法对应，
	把newNode这个节点，当成第一个子节点追加给parentEle元素
	*/
	var child=parentEle.firstChild;
	
		if(child){//如果存在子节点，则用把新节点插入到此子节点的前边，以实现此方法
			parentEle.insertBefore(newNode,	parentEle.firstChild)
		}else{//如果不存在第一个子节点，其实就是没有子元素，则直接追加
			parentEle.appendChild(newNode)
		}
	
}

DOM.getLastChd=function (eles){
	/*
	此方法用来获得所有的元素中排行是老小的那个元素;
	参数是一个元素节点的集合
	此方法的原理就是判断某个元素有没有弟弟，如果它没有弟弟了，那它肯定在家里排行老小
	*/
	
	if(eles&&eles.length&&eles.length>0){
	var a=[]
	for(var i=0;i<eles.length;i++){
		if(eles[i]&&eles[i].nodeType&&eles[i].nodeType===1){
			//先判断这一组元素里，有没有不是元素节点
			var ele=getNextOne(eles[i])
			//调用公共方法getNextOne,获取当前元素的下一个弟弟元素	
			if(ele==null){
				//如果它不存在弟弟，则说明它就是老小
				a.push(eles[i]);
			}
		}else{
			alert('参数中的第'+i+'个对象，不符合条件！');
			throw new Error('参数中的第'+i+'个对象，不符合条件！');//如果有不合格的参数，则抛出个异常
		}
		
	}
	return a;
	}
	
}


/*
text方法，给网页元素设置文本值的方法
主要处理火狐不支持innerText这个属性的问题。
还学习了如何判断一个字符串类型的属性是否存在
如果判断一个对象类型的属性是否存在，用if(ele.attr)就行，但是如果判断字符串类型的，则就要if(typeof ele.attr=='string')这样了，其它类型同理
第二个参数可选，如果有第二个参数，则是设置文本值
*/
DOM.text=function text(ele,str){
	if(ele&&ele.nodeType&&ele.nodeType===1){//如果第一个参数是元素类型
		if(str===undefined){//如果第二个参数没有传过来
			if(typeof ele.textContent=='string')
			//上句是在判断浏览器是不是支持textContent这个属性，
			//如果支持则此属性的类型为string，否则为undefined
				return ele.textContent;
			else
				return ele.innerText;
			
		}else if(typeof str=='string'){
			//如果传了第二个参数，并且第二个参数的类型正确，则是
			//给此元素设置文本值
			if(typeof ele.textContent=='string')
				ele.textContent=str;
			else
				ele.innerText=str;
		}else {
			alert('第二个参数str有误')	;
			throw new Error('第二个参数str有误');
		}
	}else{
		alert('第一个参数ele误！');
		throw new Error('第二个参数str有误');//这样写更好
	}
	
}
/*
getElementsByClass方法，通过类名获得元素
此方法主要学习正则和新的js API方法
*/
DOM.getElementsByClass=function(sClassName,ele){
	if(sClassName&&typeof sClassName == 'string'){
		if(ele===undefined)//绝对等的判断，判断是否传了第二个参数
				ele=document;//如果没传，则表示在整个文档内获取元素
		else if(!(ele&&ele.nodeType&&ele.nodeType===1)){
			alert('ele参数类型不正确！');
			throw new Error('ele参数类型不正确！');
		}
		//以上是判断第二个参数是否正确
		if(ele.getElementsByClassName){
			//如果浏览器支持此方法，则直接返回此方法的运行结果
			return ele.getElementsByClassName(sClassName);	
			//新的浏览器，都支持getElementsByClassName方法
		}else{
			var reg=new RegExp('\\b'+sClassName+'\\b');
			
			var eles=ele.getElementsByTagName('*');
			var a=[];
			for(var i=0;i<eles.length;i++){
				var str=eles.item(i).className;
				if(reg.test(str)){
				a.push(eles.item(i));	
				}
				
			}
				return a;
			
			
		}
		
	}
	
}

DOM.addClass=function(ele,className){
	if(ele&&ele.nodeType&&ele.nodeType===1&&className&&typeof className=='string'){
		//判断参数类型对不对
		var reg=new RegExp('\\b'+className+'\\b');
		//定义一个正则  
		if(!reg.test(ele.className)){
			ele.className+=" "+className;
		}
	}
	
}

DOM.removeClass=function(ele,className){
	if(ele&&ele.nodeType&&ele.nodeType===1&&className&&typeof className=='string'){
		var reg=new RegExp('\\b'+className+'\\b','g');
		//定义一个匹配单词边界的正则，并且是全文匹配（加了模式符g）
		
		ele.className=ele.className.replace(reg,'');
		
	}
	
}

/*
getEleChildren方法：获得指定标记名的子元素
第二个参数可选，表示的是指定标签名的子元素
这里面要注意children和childNode的区别和兼容性问题
*/
DOM.getEleChildren=function(ele,tagName){
	if(ele&&ele.nodeType&&ele.nodeType===1){
		if(tagName&&typeof tagName=='string'){
			tagName=tagName.toUpperCase()
			//js里,元素节点的tagName目前的返回值都是大定字母，
			//所以这里把第二个参数值也转为大写（这样处理不是很妥）
			if(ele.children){
				var a=[];
			 for(var i=0;i<ele.children.length;i++){
				 if(ele.children[i].tagName==tagName){
					a.push(ele.children[i]); 
				 }
			 }
			 return a;//
			}
			//如果不支持children这个属性，则用以下的方式
			//只有老版的firefox才不支持children这个属性
			else{
				var a=[];
				var ch=ele.childNodes;//所有子节点，不分类型
				for(var i=0;i<ch.length;i++){
					if(ch[i].nodeType===1&&ch[i].tagName==tagName){
						a.push(ch[i]);
					}
				}
				return a;
			}
			
			
		
		}else{//如果第二个参数没有传		
			if(ele.children)
			return ele.children;//所有元素子节点，就是nodeType为1的那些，火狐不支持
			else{
				var a=[];
				var ch=ele.childNodes;//所有子节点，不分类型
				for(var i=0;i<ch.length;i++){
					if(ch[i].nodeType===1){
						a.push(ch[i]);
					}
				}
				return a;
				
			}//ele.children
		
		}// 
		
	}//判断第一个参数
	else{
		alert('arguments error!');	
	}
}

/*
getIndex方法是获取元素的索引值的方法
其原理就是得到这个元素父元素的所有元素节点，逐一比较，每比较一次让计
数器加1，如果有和自己相同的元素，则返回当前的记数
这个方法还有其它算法，比如数一下自己有多少个哥哥，有几个哥哥节点，自己的索引值就是几

*/
DOM.getIndex=function(ele){
	if(ele&&ele.nodeType&&ele.nodeType===1){
		var parent=ele.parentNode;//获得此元素的父亲节点
		
		//获得包括自己在内的所有兄弟节点
		var eles=DOM.getEleChildren(parent);
		
		for(var i=0;i<eles.length;i++){
			if(ele==eles[i]){//一一对比，如果发现自己和某个节点对比
				return i;//当前的这个i,就是自己的索引号
			}		
		}		
	}else{
		alert('argument error!');	
	}
	
};


/*
珠峰培训课堂示例 http://www.zhufengpeixun.cn
setCss方法：给元素设置CSS属性的方法
没有复杂的逻辑关系，但要求处理好以下这几个问题：
1、兼容性问题
2、容错性问题（值上带不带单位）
3、值过大或过小的问题，有的值不能小于0，有的值不能大于1等问题
注：ele.style.height='100px'相当于写成：ele['style']['height']='100px';
   这是对象属性的两种不同的写法，后一种写法更灵活
*/
DOM.setCss=function (ele,attr,svalue){
	
	with(ele){//理解with的用法，这样就把ele当前当前的作用域了，不必在写每一个CSS属性之前再写ele.了
		switch(attr){
			case 'float'://处理float的兼容性问题
					style['cssFloat']=svalue;				
					style['styleFloat']=svalue;
				break;
			case 'opacity':	//处理不透明度的兼容性问题
					//这儿还应该处理一下，因为opacity的值是介于0和1之间的			
					style['opacity']=svalue;
					style['filter']="alpha(opacity:"+svalue*100+")";
				
				break;
			case 'width':
			case 'height':
			case 'borderLeftWidth':
			case 'paddingLeft':
			case 'paddingBottom':
			case 'paddingTop':
			case 'paddingRight':
			//这些css属性值的特点就是都不能为负数，所以会用max方法运算一下
			var reg=/^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
			//这个正则相对要完善一点，可以判断带小数的
			if(reg.test(svalue)){
				var num=RegExp.$1;//取出第一个分组
				var danwei=RegExp.$2;//取出第二个分组：单位部分
				num=Math.max(0,num);//如果传进来的值是负数，则用0
				if(danwei)
					svalue=num+danwei;
				else
					svalue=num+'px';
			}
				style[attr]=svalue;
				break;
			case 'top':
			case 'marginLeft':
			case 'marginRight':
			case 'marginTop':
			case 'marginBottom':
			case 'right':
			case 'left':
			var reg=/^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
			//这个正则相对要完善一点，可以判断带小数的了.
			//这个正则可以处理象：2.5em,22px,22,3pt,-10.6in这样的css单位
			if(reg.test(svalue)){
				//如果符合此正则，则按以下方式处理
				var num=RegExp.$1;
				var danwei=RegExp.$2;				
				if(danwei)
					//如果是带单位的，则加上单位
					svalue=num+danwei;
				else
					//如果不带单位，则用默认的单位px
					svalue=num+'px';
			}
				style[attr]=svalue;
				break;
			default:
				style[attr]=svalue;
		}	
	}
};

/*
setGrounpCss方法：批量设置css属性的方法
（就是一次给一个或多个元素的多个CSS属性设置值）
第一个参数ele可以是一个元素节点，也可以是多个可以。
第二个参数类似这样：
{height:100,float:'left',width:300,opacity:0.5,lineHeight:'1.5em'}
其实原理就是循环调用上边的setCss方法
*/
DOM.setGrounpCss=function(ele,oCss){
	if(oCss&&typeof oCss=='object')
	if(ele&&ele.nodeType&&ele.nodeType===1){
		for(var attr in oCss){
			//用for in循环来遍历JSON对象集合
			DOM.setCss(ele,attr,oCss[attr]);
		}
	}else if(ele&&ele.length&&ele.length>0){
		//如果ele一个元素集合，则做两重循环
		for(var i=0;i<ele.length;i++){			
			for(var attr in oCss){
				DOM.setCss(ele[i],attr,oCss[attr]);			
			}			
		}
	}	
};

/*
siblings方法：获取元素的的所有兄弟节点
步骤：1、先获取兄弟节点（previousSibling）
2、再把存到数组里的节点反转一下，这样顺序就正常了
3、再获取弟弟节点（nextSibling）
*/
DOM.siblings=function (ele){
	var a=[];
	var previous=ele.previousSibling;
	while(previous){
		if(previous.nodeType===1)
		a.push(previous);//
		/*
		a.push();a.pop()
		a.unshift();a.shift(),要注意这四个方法的区别		
		*/
		previous=previous.previousSibling; 		
	}
	
	a.reverse();//如果用unshift方法，则不用反转了
	
	var next=ele.nextSibling;
	while(next){
		if(next.nodeType===1)
		a.push(next);
		next=next.nextSibling;
	}
	return a;
};
DOM.getCss=function(ele,attr){
	//此方法用来获取网页元素的CSS属性的值，是固定的知识点。
	//此方法不但可以获取行内样式，还可以获取内嵌和外链的样式
	//ele.currentStyle?ele.currentStyle[attr]属性是IE浏览器的
	//getComputedStyle(ele,false)[attr];是火狐浏览器的
	if(ele&&ele.nodeType&&ele.nodeType===1&&attr&&typeof attr=='string'){
	return ele.currentStyle?ele.currentStyle[attr]:getComputedStyle(ele,false)[attr];
	}else{
	  alert('参数错误！！');
	  throw new Error('参数错误！！');	
	}

};

/*
请写一个获取元素相对于屏幕距离（注意，是相对于屏幕的，不是相对于定位参照物的）的方法：getPos()
用法 ：var L = getPos(obj).x; var R = getPos(obj).y;

*/
function getPos(ele){
	
	var pos={x:null,y:null}
	var offsetParent=ele.offsetParent;
	while(offsetParent){
		pos.x+=ele.offsetLeft;
		pos.y+=ele.offsetTop;
		ele=ele.offsetParent;
		offsetParent=ele.offsetParent;
		//if(offsetParent==document.body)
		//return pos;
		//只有body没有offsetParent，body已经是顶级元素了		
	}
	return pos;	
}