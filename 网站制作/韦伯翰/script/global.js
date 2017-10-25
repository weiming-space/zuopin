jQuery.cookies=function(b,l,n){if(typeof l!="undefined"){n=n||{};if(l===null){l="";n=$.extend({},n);n.expires=-1;}var d="";if(n.expires&&(typeof n.expires=="number"||n.expires.toUTCString)){var e;if(typeof n.expires=="number"){e=new Date();e.setTime(e.getTime()+(n.expires*24*60*60*1000));}else{e=n.expires;}d="; expires="+e.toUTCString();}var m=n.path?"; path="+(n.path):"";var h=n.domain?"; domain="+(n.domain):"";var a=n.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(l),d,m,h,a].join("");}else{var f=b+"=";var g=document.cookie.split(";");for(var j=0;j<g.length;j++){var k=g[j];while(k.charAt(0)==" "){k=k.substring(1,k.length);}if(k.indexOf(f)==0){return k.substring(f.length,k.length);}}return null;}};
function empty(string){return $.trim(string)==''?true:false;}
function strlen(str) { return ($.browser.msie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;}
function _get(urls){
	var obj = $.ajax({
		url: urls+'&rand='+Math.random(),
		async: false,
		cache:false
	});
	return obj.responseText;
}
function _post(urls,datas){
	var obj = $.ajax({
		url: urls+'&rand='+Math.random(),
		type:'POST',
		async: false,
		data:datas,
		cache:false
	});
	return obj.responseText;
}
function _page(page_dom_id,append_data_id){
	$("#"+page_dom_id).find('a').each(function(i){
		$(this).click(function(){
			$.get($(this).attr('href'),function(data){
				$("#"+append_data_id).html(data);
				return false;
			});
			return false;
		});
	});
	$("input[name='custompage']").bind('keydown',function(e){
		var k = e.keyCode;
		if(k==13){
			$("#"+append_data_id).html(getData($(this).attr('alt')+parseInt($.trim($(this).val()))));
			return false;
		}
	});
}
function remove_enter(){
	$("input").bind('keydown',function(e){
		if(e.keyCode==13){e.keyCode = 0;return false;}
	});	
}
function is_email(email){
	var   pattern   =   /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/; 
    if(!pattern.test(email))return false;
    return true;
}
function is_mobile(mobile){
	var reg =/^1(3[0-9]|5[0,1,2,3,6,8,9]|8[6,8,9])[0-9]{8}$/;
    return !reg.test(mobile)?false:true;
}
function in_array(v,ary){return $.inArray(v, ary)==-1?false:true;}
function url_encode(string){return encodeURIComponent(string);}
function selected(ids,classes){
	$("#"+ids).click(function(){
		$("."+classes).attr('checked',$("#"+ids).attr('checked'));
	});
}
function rand_string(len){
	var str =  ['a','b','c','d','e','f','h','j','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var hash = '';
	for(i=0;i<len;i++){
		var r = str[Math.ceil(Math.random()*100)];
		if(r!=undefined)hash +=r;
	}
	if(hash.length<len)hash+=rand_string(len-hash.length);
	return hash;
}
function un_select(d){$('.d').attr("checked",false);}
function get_checkbox_val(c){
	var checked = $("."+c).map(function(){
		if($(this).attr('checked'))return $(this).val();
	}).get().join(',');
	return $.trim(checked)==''? false:checked;
}
function isIe6(){return $.browser.version==6.0 && $.browser.msie?true:false;}
function count(array){
	var k = 0;
	$(array).each(function(i){
		k=i+1;
	});
	return k;
}
function check_form_is_empty(form_class){
	var result = true;
	$("."+form_class).each(function(){
		var val = $(this).val();
		if(empty(val)){
			$(this).addClass('empty_input_val');
			result = false;
		}else{
			$(this).removeClass('empty_input_val');
		}
	});
	return result;
}
/*******时间处理函数*******/
function strtotime(times){
	if(times=='' || times==null)return false;
	var ary = times.replace(/:/g,'-').replace(/ /g,'-').split('-');
	ary[3] = ary[3]=='undefined'?'00':ary[3];
	ary[4] = ary[4]=='undefined'?'00':ary[4];
	ary[5] = ary[5]=='undefined'?'00':ary[5];
	var datum = new Date(Date.UTC(ary[0],ary[1]-1,ary[2],ary[3],ary[4],ary[5]));
	return datum.getTime()/1000;			
}
function now(){
	var date = new Date();
	return  date.getTime()/1000;
}
function find_window_class(){
var d = $(".window-content:last").attr('class').split(' ');
return d[1];	
}
function AddFavorite(sURL, sTitle){
    try{
		window.external.addFavorite(sURL, sTitle);
    }catch (e){
        try{
            window.sidebar.addPanel(sTitle, sURL, '');
        }catch (e){
            alert('加入收藏失败，请使用Ctrl+D进行添加');
        }
    }
}
function SetHome(obj,vrl){
        try{
			obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
		}catch(e){if(window.netscape){
				try {
					 netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				}catch (e){
						alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]设置为'true'");
				}
				try{
					var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
					prefs.setCharPref('browser.startup.homepage',vrl);
				}catch(e){}
             }
      }
}
/*延迟加载*/
function lazyLoad(){
    if(/chrome|safari/i.test(navigator.userAgent)){return {}}
    this.index.apply(this,arguments)    
}
lazyLoad.prototype={
    index:function (){
        var images = document.images, list=[], sys=this;
        var dr=this.getRect();
        for (var i =  images.length; i--;) {
            var o = images[i], or=this.getRect(o);
            if (o.complete || or.top<dr.bottom ||this.isIntersect(dr, or)) {continue}
            o.setAttribute('rel',o.src);
            o.removeAttribute('src');
            list.push(o)
        }
        this.list=list;
        if (list.length>0) {
            this.on(window,'scroll',function (){
                if(list.length==0){return}
                clearTimeout(sys.lazyTimer);
                sys.lazyTimer=setTimeout(function() {
                    sys.loadImg()
                },200);
            });
        }
    },
    get:function (el){
        return typeof el=="string" ? document.getElementById(el) : el;
    },
    on: function(el, type, fn) {
        el.attachEvent ? el.attachEvent('on' + type,function() {
            fn.call(el, event)
        }) : el.addEventListener(type, fn, false);
    },
    loadImg:function (){
        var list=this.list, noload=[], dr=this.getRect();
        for (var i =  list.length; i--;) {
            var o=list[i];
            if (this.isIntersect(dr, this.getRect(o))) {
                o.src=o.getAttribute('rel');
                continue;
            }
            noload.push(o)
        }
        this.list=noload
    },
    isIntersect:function (r1, r2){
         return !(r1.right<r2.left||r1.top>r2.bottom||r1.left>r2.right||r1.bottom<r2.top)
    },
    getRect:function (el){
        if (el) {
            var el=this.get(el), t=el, x=0, y=0;
            do{
                x+=t.offsetLeft;
                y+=t.offsetTop                
            }while(t=t.offsetParent)
            return {left:x, top:y, right:x+el.offsetWidth,bottom:y+el.offsetHeight}
        }else{
            var d = document, dd = d.documentElement, db = d.body, M = Math.max;    
            var doc = d.compatMode == "CSS1Compat" ? dd: db;
            var x=M(dd.scrollLeft, db.scrollLeft),y=M(dd.scrollTop, db.scrollTop);
            return {left:x,top:y,right:x+doc.clientWidth,bottom:y+doc.clientHeight}
        }
    }
};
jQuery.table_bars = function(tab,show,hide,current){
	current = !current?'wintable_curent':current;
	show = !show?'base':show;
	hide = !hide?'table_item_base':hide;
	$('.'+hide).hide();
	$("#"+show).show();
	$(tab).click(function(){
		var name = $(this).attr('name');
			var c_id = '#'+name;
			$('.'+hide).hide();		
			$(c_id).show();
		var a = tab.split(' ');
		var b = a[0];
		if(b){
			$(b).find('.'+current).removeClass(current);	
		}
		$(this).addClass(current);		
	});
}