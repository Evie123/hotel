var g_next_load_url = '';
var g_next_callback = null;
function SubShowClass(C,i,c,l,I){var V=this,v=V;V.parentObj=V.$(C);if(V.parentObj==null&&C!="none"){throw new Error("SubShowClass(ID)参数错误:ID 对像不存在!(value:"+C+")")};V.lock=false;V.label=[];V.defaultID=c==null?0:c;V.selectedIndex=V.defaultID;V.openClassName=l==null?"selected":l;V.closeClassName=I==null?"":I;V.mouseIn=false;var O=function(){v.mouseIn=true},o=function(){v.mouseIn=false};if(C!="none"&&C!=""){if(V.parentObj.attachEvent){V.parentObj.attachEvent("onmouseover",O)}else{V.parentObj.addEventListener("mouseover",O,false)}};if(C!="none"&&C!=""){if(V.parentObj.attachEvent){V.parentObj.attachEvent("onmouseout",o)}else{V.parentObj.addEventListener("mouseout",o,false)}};if(typeof(i)!="string"){i="onmousedown"};i=i.toLowerCase();switch(i){case "onmouseover":V.eventType="mouseover";break;case "onmouseout":V.eventType="mouseout";break;case "onclick":V.eventType="click";break;case "onmouseup":V.eventType="mouseup";break;default:V.eventType="mousedown"};V.autoPlay=false;V.autoPlayTimeObj=null;V.spaceTime=5000};SubShowClass.prototype={version:"1.31",author:"mengjia",_setClassName:function(l,I){var o=this,i;i=l.className;if(i){i=i.replace(o.openClassName,"");i=i.replace(o.closeClassName,"");i+=" "+(I=="open"?o.openClassName:o.closeClassName)}else{i=(I=="open"?o.openClassName:o.closeClassName)};l.className=i},addLabel:function(labelID,contID,parentBg,springEvent,blurEvent){var t=this,labelObj=this.$(labelID),contObj=this.$(contID);if(labelObj==null&&labelID!="none"){throw new Error("addLabel(labelID)参数错误:labelID 对像不存在!(value:"+labelID+")")};var TempID=this.label.length;if(parentBg==""){parentBg=null};this.label.push([labelID,contID,parentBg,springEvent,blurEvent]);var tempFunc=function(){t.select(TempID)};if(labelID!="none"){if(labelObj.attachEvent){labelObj.attachEvent("on"+this.eventType,tempFunc)}else{labelObj.addEventListener(this.eventType,tempFunc,false)}};if(TempID==this.defaultID){if(labelID!="none"){this._setClassName(labelObj,"open")};if(this.$(contID)){contObj.style.display=""};if(this.ID!="none"){if(parentBg!=null){this.parentObj.style.background=parentBg}};if(springEvent!=null){eval(springEvent)}}else{if(labelID!="none"){this._setClassName(labelObj,"close")};if(contObj){contObj.style.display="none"}};var mouseInFunc=function(){t.mouseIn=true},mouseOutFunc=function(){t.mouseIn=false};if(contObj){if(contObj.attachEvent){contObj.attachEvent("onmouseover",mouseInFunc)}else{contObj.addEventListener("mouseover",mouseInFunc,false)};if(contObj.attachEvent){contObj.attachEvent("onmouseout",mouseOutFunc)}else{contObj.addEventListener("mouseout",mouseOutFunc,false)}}},select:function(num,force){if(typeof(num)!="number"){throw new Error("select(num)参数错误:num 不是 number 类型!(value:"+num+")")};if(force!=true&&this.selectedIndex==num){return};var i;for(i=0;i<this.label.length;i++){if(i==num){if(this.label[i][0]!="none"){this._setClassName(this.$(this.label[i][0]),"open")};if(this.$(this.label[i][1])){this.$(this.label[i][1]).style.display=""};if(this.ID!="none"){if(this.label[i][2]!=null){this.parentObj.style.background=this.label[i][2]}};if(this.label[i][3]!=null){eval(this.label[i][3])}}else if(this.selectedIndex==i||force==true){if(this.label[i][0]!="none"){this._setClassName(this.$(this.label[i][0]),"close")};if(this.$(this.label[i][1])){this.$(this.label[i][1]).style.display="none"};if(this.label[i][4]!=null){eval(this.label[i][4])}}};this.selectedIndex=num},random:function(){var O=this;if(arguments.length!=O.label.length){throw new Error("random()参数错误:参数数量与标签数量不符!(length:"+arguments.length+")")};var l=0,o;for(o=0;o<arguments.length;o++){l+=arguments[o]};var I=Math.random(),i=0;for(o=0;o<arguments.length;o++){i+=arguments[o]/l;if(I<i){O.select(o);break}}},order:function(){var O=this;if(arguments.length!=O.label.length){throw new Error("order()参数错误:参数数量与标签数量不符!(length:"+arguments.length+")")};if(!(/^\d+$/).test(SubShowClass.sum)){return};var i=0,o;for(o=0;o<arguments.length;o++){i+=arguments[o]};var I=SubShowClass.sum%i;if(I==0){I=i};var l=0;for(o=0;o<arguments.length;o++){l+=arguments[o];if(l>=I){O.select(o);break}}},play:function(spTime){var t=this;if(typeof(spTime)=="number"){this.spaceTime=spTime};clearInterval(this.autoPlayTimeObj);this.autoPlayTimeObj=setInterval(function(){t.autoPlayFunc()},this.spaceTime);this.autoPlay=true},autoPlayFunc:function(){var i=this;if(i.autoPlay==false||i.mouseIn==true){return};i.nextLabel()},nextLabel:function(){var t=this,index=this.selectedIndex;index++;if(index>=this.label.length){index=0};this.select(index);if(this.autoPlay==true){clearInterval(this.autoPlayTimeObj);this.autoPlayTimeObj=setInterval(function(){t.autoPlayFunc()},this.spaceTime)}},previousLabel:function(){var t=this,index=this.selectedIndex;index--;if(index<0){index=this.label.length-1};this.select(index);if(this.autoPlay==true){clearInterval(this.autoPlayTimeObj);this.autoPlayTimeObj=setInterval(function(){t.autoPlayFunc()},this.spaceTime)}},stop:function(){var i=this;clearInterval(i.autoPlayTimeObj);i.autoPlay=false},$:function(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}};SubShowClass.readCookie=function(O){var o="",l=O+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(l);if(i!=-1){i+=l.length;var I=document.cookie.indexOf(";",i);if(I==-1)I=document.cookie.length;o=unescape(document.cookie.substring(i,I))}};return o};SubShowClass.writeCookie=function(i,l,o,c){var O="",I="";if(o!=null){O=new Date((new Date).getTime()+o*3600000);O="; expires="+O.toGMTString()};if(c!=null){I=";domain="+c};document.cookie=i+"="+escape(l)+O+I};SubShowClass.sum=SubShowClass.readCookie("SSCSum");if((/^\d+$/).test(SubShowClass.sum)){SubShowClass.sum++}else{SubShowClass.sum=1};SubShowClass.writeCookie("SSCSum",SubShowClass.sum,12);

function getDateStart() {
	var startdate = $("#start_date").val();
	var starthour = $("#start_hour").val();
	var startminute = $("#start_minute").val();
	var start = startdate.replace(new RegExp('-', 'g'),'')  + starthour+startminute;
	return start;
}

function getDateEnd() {
	var enddate = $("#end_date").val();
	var endhour = $("#end_hour").val();
	var endminute = $("#end_minute").val();
	var end = enddate.replace(new RegExp('-', 'g'),'') + endhour + endminute;
	return end;
}
function btnCallbackNew(data) {
    if( data.msg != undefined ) {
		if (data.title != undefined && data.title)
			showMessage(data.msg,data.title);
		else
			showMessage(data.msg);
		return;
    }
    if (data.err != undefined)
    {
    	ferror(data.err,data.title);
    }
}
function btnCallbackRefresh(data) {
    if( data.msg != undefined ) {
    	if (data.title != undefined && data.title)
			ferror(data.msg,data.title);
		else
			ferror(data.msg);
		setTimeout("window.location.reload();",2000);
		return;
    }
    if (data.err != undefined)
    	ferror(data.err);
}
function btnCallbackHref(data) {
	if( data.msg != undefined )
	{
		if (data.title != undefined && data.title)
			ferror(data.msg,data.title);
		else
			ferror(data.msg);
		setTimeout("window.location.href = g_next_load_url;",2000);
		return;
    }
    if (data.err != undefined)
    	ferror(data.err);
}
function fajax(url,params,callback,ifcache) {
    jQuery.ajaxSetup({
        cache: ifcache
    });
    jQuery.ajax({
        type: "POST",
        url: url,
        data: params,
        cache: false,
        dataType: 'json',
        success: callback
    });
}
function fget(url,params,refresh)
{
	if (refresh === true)
		fajax(url,params,btnCallbackRefresh);
	else if (typeof refresh=='function')
	{
		fajax(url,params,refresh);
	}
	else if (typeof refresh=='string' && refresh.length>0)
	{
		g_next_load_url = refresh;
		fajax(url,params,btnCallbackHref);
	}
	else
	{
		fajax(url,params,btnCallbackNew);
	}
}
function fpost(form_id,refresh)
{
	var data = $('#'+form_id).serialize();
	var url = $('#'+form_id).attr('action');
	if (refresh === true)
		fajax(url,data,btnCallbackRefresh);
	else if (typeof refresh=='function')
	{
		fajax(url,data,refresh);
	}
	else if (typeof refresh=='string' && refresh.length>0)
	{
		g_next_load_url = refresh;
		fajax(url,data,btnCallbackHref);
	}
	else
	{
		fajax(url,data,btnCallbackNew);
	}
}
function fpost2(data,url,refresh)
{
	if (refresh === true)
		fajax(url,data,btnCallbackRefresh);
	else if (typeof refresh=='function')
	{
		fajax(url,data,refresh);
	}
	else if (typeof refresh=='string' && refresh.length>0)
	{
		g_next_load_url = refresh;
		fajax(url,data,btnCallbackHref);
	}
	else
	{
		fajax(url,data,btnCallbackNew);
	}
}
function show_loading(str){
	if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
		$("body","html").css({height: "100%", width: "100%"});
		$("html").css("overflow","hidden");
		if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
			$("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
			$("#TB_overlay").click(tb_remove);
		}
	}else{//all others
		if(document.getElementById("TB_overlay") === null){
			$("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
			$("#TB_overlay").click(tb_remove);
		}
	}
	
	if(tb_detectMacXFF()){
		$("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
	}else{
		$("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
	}
	
	//if(caption===null){caption="";}
	$("body").append("<div id='TB_load' style='text-align:center;'><strong style='color:#fff;' id='ayk_alert_text'>"+str+"</strong><img src='/images/loadingAnimation.gif' /></div>");//add loader to the page
	$('#TB_load').show();
}
function close_loading(){
	tb_remove();
}