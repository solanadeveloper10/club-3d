//FFPlayer 2.0 by Ezra Miller & Sinjin Hawke

/* Soundcloud API */
(function(){var requirejs,require,define,__inflate;(function(e){function a(e,t){var n=t&&t.split("/"),i=r.map,s=i&&i["*"]||{},o,u,a,f,l,c,h;if(e&&e.charAt(0)==="."&&t){n=n.slice(0,n.length-1),e=n.concat(e.split("/"));for(l=0;h=e[l];l++)if(h===".")e.splice(l,1),l-=1;else if(h===".."){if(l===1&&(e[2]===".."||e[0]===".."))return!0;l>0&&(e.splice(l-1,2),l-=2)}e=e.join("/")}if((n||s)&&i){o=e.split("/");for(l=o.length;l>0;l-=1){u=o.slice(0,l).join("/");if(n)for(c=n.length;c>0;c-=1){a=i[n.slice(0,c).join("/")];if(a){a=a[u];if(a){f=a;break}}}f=f||s[u];if(f){o.splice(0,l,f),e=o.join("/");break}}}return e}function f(t,n){return function(){return u.apply(e,s.call(arguments,0).concat([t,n]))}}function l(e){return function(t){return a(t,e)}}function c(e){return function(n){t[e]=n}}function h(r){if(n.hasOwnProperty(r)){var s=n[r];delete n[r],i[r]=!0,o.apply(e,s)}if(!t.hasOwnProperty(r))throw new Error("No "+r);return t[r]}function p(e,t){var n,r,i=e.indexOf("!");return i!==-1?(n=a(e.slice(0,i),t),e=e.slice(i+1),r=h(n),r&&r.normalize?e=r.normalize(e,l(t)):e=a(e,t)):e=a(e,t),{f:n?n+"!"+e:e,n:e,p:r}}function d(e){return function(){return r&&r.config&&r.config[e]||{}}}var t={},n={},r={},i={},s=[].slice,o,u;o=function(r,s,o,u){var a=[],l,v,m,g,y,b;u=u||r,typeof o=="string"&&(o=__inflate(r,o));if(typeof o=="function"){s=!s.length&&o.length?["require","exports","module"]:s;for(b=0;b<s.length;b++){y=p(s[b],u),m=y.f;if(m==="require")a[b]=f(r);else if(m==="exports")a[b]=t[r]={},l=!0;else if(m==="module")v=a[b]={id:r,uri:"",exports:t[r],config:d(r)};else if(t.hasOwnProperty(m)||n.hasOwnProperty(m))a[b]=h(m);else if(y.p)y.p.load(y.n,f(u,!0),c(m),{}),a[b]=t[m];else if(!i[m])throw new Error(r+" missing "+m)}g=o.apply(t[r],a);if(r)if(v&&v.exports!==e&&v.exports!==t[r])t[r]=v.exports;else if(g!==e||!l)t[r]=g}else r&&(t[r]=o)},requirejs=require=u=function(t,n,i,s){return typeof t=="string"?h(p(t,n).f):(t.splice||(r=t,n.splice?(t=n,n=i,i=null):t=e),n=n||function(){},s?o(e,t,n,i):setTimeout(function(){o(e,t,n,i)},15),u)},u.config=function(e){return r=e,u},define=function(e,t,r){t.splice||(r=t,t=[]),n[e]=[e,t,r]},define.amd={jQuery:!0}})(),__inflate=function(name,src){var r;return eval(["r = function(a,b,c){","\n};\n//@ sourceURL="+name+"\n"].join(src)),r},define("lib/api/events",["require","exports","module"],function(e,t,n){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}}),define("lib/api/getters",["require","exports","module"],function(e,t,n){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}}),define("lib/api/setters",["require","exports","module"],function(e,t,n){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}),define("lib/api/api",["require","exports","module","lib/api/events","lib/api/getters","lib/api/setters"],function(e,t,n){function m(e){return!!(e===""||e&&e.charCodeAt&&e.substr)}function g(e){return!!(e&&e.constructor&&e.call&&e.apply)}function y(e){return!!e&&e.nodeType===1&&e.nodeName.toUpperCase()==="IFRAME"}function b(e){var t=!1,n;for(n in i)if(i.hasOwnProperty(n)&&i[n]===e){t=!0;break}return t}function w(e){var t,n,r;for(t=0,n=f.length;t<n;t++){r=e(f[t]);if(r===!1)break}}function E(e){var t="",n,r,i;e.substr(0,2)==="//"&&(e=window.location.protocol+e),i=e.split("/");for(n=0,r=i.length;n<r;n++){if(!(n<3))break;t+=i[n],n<2&&(t+="/")}return t}function S(e){return e.contentWindow?e.contentWindow:e.contentDocument&&"parentWindow"in e.contentDocument?e.contentDocument.parentWindow:null}function x(e){var t=[],n;for(n in e)e.hasOwnProperty(n)&&t.push(e[n]);return t}function T(e,t,n){n.callbacks[e]=n.callbacks[e]||[],n.callbacks[e].push(t)}function N(e,t){var n=!0,r;return t.callbacks[e]=[],w(function(t){r=t.callbacks[e]||[];if(r.length)return n=!1,!1}),n}function C(e,t,n){var r=S(n),i,s;if(!r.postMessage)return!1;i=n.getAttribute("src").split("?")[0],s=JSON.stringify({method:e,value:t}),i.substr(0,2)==="//"&&(i=window.location.protocol+i),i=i.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),r.postMessage(s,i)}function k(e){var t;return w(function(n){if(n.instance===e)return t=n,!1}),t}function L(e){var t;return w(function(n){if(S(n.element)===e)return t=n,!1}),t}function A(e,t){return function(n){var r=g(n),i=k(this),s=!r&&t?n:null,o=r&&!t?n:null;return o&&T(e,o,i),C(e,s,i.element),this}}function O(e,t,n){var r,i,s;for(r=0,i=t.length;r<i;r++)s=t[r],e[s]=A(s,n)}function M(e,t,n){return e+"?url="+t+"&"+_(n)}function _(e){var t,n,r=[];for(t in e)e.hasOwnProperty(t)&&(n=e[t],r.push(t+"="+(t==="start_track"?parseInt(n,10):n?"true":"false")));return r.join("&")}function D(e,t,n){var r=e.callbacks[t]||[],i,s;for(i=0,s=r.length;i<s;i++)r[i].apply(e.instance,n);if(b(t)||t===o.READY)e.callbacks[t]=[]}function P(e){var t,n,r,i,s;try{n=JSON.parse(e.data)}catch(u){return!1}t=L(e.source),r=n.method,i=n.value;if(t&&H(e.origin)!==H(t.domain))return!1;if(!t)return r===o.READY&&a.push(e.source),!1;r===o.READY&&(t.isReady=!0,D(t,l),N(l,t)),r===o.PLAY&&!t.playEventFired&&(t.playEventFired=!0),r===o.PLAY_PROGRESS&&!t.playEventFired&&(t.playEventFired=!0,D(t,o.PLAY,[i])),s=[],i!==undefined&&s.push(i),D(t,r,s)}function H(e){return e.replace(h,"")}var r=e("lib/api/events"),i=e("lib/api/getters"),s=e("lib/api/setters"),o=r.api,u=r.bridge,a=[],f=[],l="__LATE_BINDING__",c="http://wt.soundcloud.dev:9200/",h=/^http(?:s?)/,p,d,v;window.addEventListener?window.addEventListener("message",P,!1):window.attachEvent("onmessage",P),n.exports=v=function(e,t,n){m(e)&&(e=document.getElementById(e));if(!y(e))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(n=n||{},e.src=M(c,t,n));var r=L(S(e)),i,s;return r&&r.instance?r.instance:(i=a.indexOf(S(e))>-1,s=new p(e),f.push(new d(s,e,i)),s)},v.Events=o,window.SC=window.SC||{},window.SC.Widget=v,d=function(e,t,n){this.instance=e,this.element=t,this.domain=E(t.getAttribute("src")),this.isReady=!!n,this.callbacks={}},p=function(){},p.prototype={constructor:p,load:function(e,t){if(!e)return;t=t||{};var n=this,r=k(this),i=r.element,s=i.src,a=s.substr(0,s.indexOf("?"));r.isReady=!1,r.playEventFired=!1,i.onload=function(){n.bind(o.READY,function(){var e,n=r.callbacks;for(e in n)n.hasOwnProperty(e)&&e!==o.READY&&C(u.ADD_LISTENER,e,r.element);t.callback&&t.callback()})},i.src=M(a,e,t)},bind:function(e,t){var n=this,r=k(this);return r&&r.element&&(e===o.READY&&r.isReady?setTimeout(t,1):r.isReady?(T(e,t,r),C(u.ADD_LISTENER,e,r.element)):T(l,function(){n.bind(e,t)},r)),this},unbind:function(e){var t=k(this),n;t&&t.element&&(n=N(e,t),e!==o.READY&&n&&C(u.REMOVE_LISTENER,e,t.element))}},O(p.prototype,x(i)),O(p.prototype,x(s),!0)}),window.SC=window.SC||{},window.SC.Widget=require("lib/api/api")})()


/* Mobile Detect */
var isMobile = false;

/* JAVA SDK 2.0.0 */
var Recorder={swfObject:null,_callbacks:{},_events:{},_initialized:false,options:{},initialize:function(options){this.options=options||{};if(!this.options.flashContainer){this._setupFlashContainer()}this.bind("initialized",function(){Recorder._initialized=true;options.initialized()});this.bind("showFlash",this.options.onFlashSecurity||this._defaultOnShowFlash);this._loadFlash()},clear:function(){Recorder._events={}},record:function(options){options=options||{};this.clearBindings("recordingStart");this.clearBindings("recordingProgress");this.clearBindings("recordingCancel");this.bind("recordingStart",this._defaultOnHideFlash);this.bind("recordingCancel",this._defaultOnHideFlash);this.bind("recordingCancel",this._loadFlash);this.bind("recordingStart",options["start"]);this.bind("recordingProgress",options["progress"]);this.bind("recordingCancel",options["cancel"]);this.flashInterface().record()},stop:function(){return this.flashInterface()._stop()},play:function(options){options=options||{};this.clearBindings("playingProgress");this.bind("playingProgress",options["progress"]);this.bind("playingStop",options["finished"]);this.flashInterface()._play()},upload:function(options){options.audioParam=options.audioParam||"audio";options.params=options.params||{};this.clearBindings("uploadSuccess");this.bind("uploadSuccess",function(responseText){options.success(Recorder._externalInterfaceDecode(responseText))});this.flashInterface().upload(options.url,options.audioParam,options.params)},audioData:function(){return this.flashInterface().audioData().split(";")},request:function(method,uri,contentType,data,callback){var callbackName=this.registerCallback(callback);this.flashInterface().request(method,uri,contentType,data,callbackName)},clearBindings:function(eventName){Recorder._events[eventName]=[]},bind:function(eventName,fn){if(!Recorder._events[eventName]){Recorder._events[eventName]=[]}Recorder._events[eventName].push(fn)},triggerEvent:function(eventName,arg0,arg1){Recorder._executeInWindowContext(function(){for(var cb in Recorder._events[eventName]){if(Recorder._events[eventName][cb]){Recorder._events[eventName][cb].apply(Recorder,[arg0,arg1])}}})},triggerCallback:function(name,args){Recorder._executeInWindowContext(function(){Recorder._callbacks[name].apply(null,args)})},registerCallback:function(fn){var name="CB"+parseInt(Math.random()*999999,10);Recorder._callbacks[name]=fn;return name},flashInterface:function(){if(!this.swfObject){return null}else if(this.swfObject.record){return this.swfObject}else if(this.swfObject.children[3].record){return this.swfObject.children[3]}},_executeInWindowContext:function(fn){window.setTimeout(fn,1)},
_setupFlashContainer:function(){

	this.options.flashContainer=document.createElement("div");
	this.options.flashContainer.setAttribute("id","recorderFlashContainer");
	this.options.flashContainer.setAttribute("style","position: fixed; left: -9999px; top: -9999px; width: 230px; height: 140px; margin-left: 10px; border-top: 6px solid rgba(128, 128, 128, 0.6); border-bottom: 6px solid rgba(128, 128, 128, 0.6); border-radius: 5px 5px; padding-bottom: 1px; padding-right: 1px; background: black;");
	document.body.appendChild(this.options.flashContainer)},
	_clearFlash:function(){var flashElement=this.options.flashContainer.children[0];if(flashElement){this.options.flashContainer.removeChild(flashElement)}},
	_loadFlash:function(){this._clearFlash();

		var flashElement=document.createElement("div");
		flashElement.setAttribute("id","recorderFlashObject");
		flashElement.style.background="black";
		this.options.flashContainer.appendChild(flashElement);
		swfobject.embedSWF(this.options.swfSrc,"recorderFlashObject","231","141","10.1.0",undefined,undefined,{allowscriptaccess:"always"},undefined,function(e){if(e.success){Recorder.swfObject=e.ref;Recorder._checkForFlashBlock()}else{Recorder._showFlashRequiredDialog()}})},
	_defaultOnShowFlash:function(){var flashContainer=Recorder.options.flashContainer;flashContainer.style.left=(window.innerWidth||document.body.offsetWidth)/2-115+"px";flashContainer.style.top=(window.innerHeight||document.body.offsetHeight)/2-70+"px"},_defaultOnHideFlash:function(){var flashContainer=Recorder.options.flashContainer;flashContainer.style.left="-9999px";flashContainer.style.top="-9999px"},_checkForFlashBlock:function(){window.setTimeout(function(){if(!Recorder._initialized){Recorder.triggerEvent("showFlash")}},500)},_showFlashRequiredDialog:function(){Recorder.options.flashContainer.innerHTML="<p>Adobe Flash Player 10.1 or newer is required to use this feature.</p><p><a href='http://get.adobe.com/flashplayer' target='_top'>Get it on Adobe.com.</a></p>";Recorder.options.flashContainer.style.color="black";Recorder.options.flashContainer.style.backgroundColor="#000";Recorder.options.flashContainer.style.textAlign="center";Recorder.triggerEvent("showFlash")},_externalInterfaceDecode:function(data){return data.replace(/%22/g,'"').replace(/%5c/g,"\\").replace(/%26/g,"&").replace(/%25/g,"%")}};if(swfobject==undefined){var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if(typeof j.readyState!=D&&j.readyState=="complete"||typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body)){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){!function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()}()}}if(M.wk){!function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()}()}s(f)}}();
	function f(){
		if(J){return}
		try{

			var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));
			Z.parentNode.removeChild(Z)
		}catch(aa){return}
		J=true;
		var X=U.length;
		//for(var Y=0;Y<X;Y++){U[Y]()}
	}
		function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;!function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()}()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return!a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||!/%$/.test(aa.width)&&parseInt(aa.width,10)<310){aa.width="310"}if(typeof aa.height==D||!/%$/.test(aa.height)&&parseInt(aa.height,10)<137){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+encodeURI(O.location).toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";!function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}}()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";!function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}}()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";!function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}}()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}

	function C(X){return j.createElement(X)}


	function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return Y[0]>X[0]||Y[0]==X[0]&&Y[1]>X[1]||Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=ad&&typeof ad=="string"?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring(Y[X].indexOf("=")+1))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}()}var __hasProp=Object.prototype.hasOwnProperty;window.SC=window.SC||{};window.SC.URI=function(uri,options){var AUTHORITY_REGEXP,URI_REGEXP;if(uri==null){uri=""}if(options==null){options={}}URI_REGEXP=/^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/;AUTHORITY_REGEXP=/^(?:([^@]*)@)?([^:]*)(?::(\d*))?/;this.scheme=this.user=this.password=this.host=this.port=this.path=this.query=this.fragment=null;this.toString=function(){var str;str="";if(this.isAbsolute()){str+=this.scheme;str+="://";if(this.user!=null){str+=this.user+":"+this.password+"@"}str+=this.host;if(this.port!=null){str+=":"+this.port}}str+=this.path;if(this.path===""&&(this.query!=null||this.fragment!=null)){str+="/"}if(this.query!=null){str+=this.encodeParamsWithPrepend(this.query,"?")}if(this.fragment!=null){str+=this.encodeParamsWithPrepend(this.fragment,"#")}return str};this.isRelative=function(){return!this.isAbsolute()};this.isAbsolute=function(){return this.host!=null};this.decodeParams=function(string){var key,params,part,splitted,value,_i,_len,_ref;if(string==null){string=""}params={};_ref=string.split("&");for(_i=0,_len=_ref.length;_i<_len;_i++){part=_ref[_i];if(part!==""){splitted=part.split("=");key=decodeURIComponent(splitted[0]);value=decodeURIComponent(splitted[1]||"").replace(/\+/g," ");this.normalizeParams(params,key,value)}}return params};this.normalizeParams=function(params,name,v){var after,child_key,k,lastP,result,result_i;if(v==null){v=NULL}result=name.match(/^[\[\]]*([^\[\]]+)\]*(.*)/);k=result[1]||"";after=result[2]||"";if(after===""){params[k]=v}else if(after==="[]"){params[k]||(params[k]=[]);params[k].push(v)}else if(result_i=after.match(/^\[\]\[([^\[\]]+)\]$/)||(result_i=after.match(/^\[\](.+)$/))){child_key=result_i[1];params[k]||(params[k]=[]);lastP=params[k][params[k].length-1];if(lastP!=null&&lastP.constructor===Object&&!(lastP[child_key]!=null)){this.normalizeParams(lastP,child_key,v)}else{params[k].push(this.normalizeParams({},child_key,v))}}else{params[k]||(params[k]={});params[k]=this.normalizeParams(params[k],after,v)}return params};this.encodeParamsWithPrepend=function(params,prepend){var encoded;encoded=this.encodeParams(params);if(encoded!==""){return prepend+encoded}else{return""}};this.encodeParams=function(params){var flattened,key,keyValueStrings,kv,paramString,value,_i,_len;paramString="";if(params.constructor===String){return paramString=params}else{flattened=this.flattenParams(params);keyValueStrings=[];for(_i=0,_len=flattened.length;_i<_len;_i++){kv=flattened[_i];key=kv[0];value=kv[1];if(value===null){keyValueStrings.push(key)}else{keyValueStrings.push(key+"="+encodeURIComponent(value))}}return paramString=keyValueStrings.join("&")}};this.flattenParams=function(params,prefix,paramsArray){var key,prefixedKey,value,_i,_len;if(prefix==null){prefix=""}if(paramsArray==null){paramsArray=[]}if(!(params!=null)){if(prefix!=null){paramsArray.push([prefix,null])}}else if(params.constructor===Object){for(key in params){if(!__hasProp.call(params,key))continue;value=params[key];if(prefix!==""){prefixedKey=prefix+"["+key+"]"}else{prefixedKey=key}this.flattenParams(value,prefixedKey,paramsArray)}}else if(params.constructor===Array){for(_i=0,_len=params.length;_i<_len;_i++){value=params[_i];this.flattenParams(value,prefix+"[]",paramsArray)}}else if(prefix!==""){paramsArray.push([prefix,params])}return paramsArray};this.parse=function(uri,options){var authority,authority_result,nullIfBlank,result,userinfo;if(uri==null){uri=""}if(options==null){options={}}nullIfBlank=function(str){if(str===""){return null}else{return str}};result=uri.match(URI_REGEXP);this.scheme=nullIfBlank(result[1]);authority=result[2];if(authority!=null){authority_result=authority.match(AUTHORITY_REGEXP);userinfo=nullIfBlank(authority_result[1]);if(userinfo!=null){this.user=userinfo.split(":")[0];this.password=userinfo.split(":")[1]}this.host=nullIfBlank(authority_result[2]);this.port=parseInt(authority_result[3],10)||null}this.path=result[3];this.query=nullIfBlank(result[4]);if(options.decodeQuery){this.query=this.decodeParams(this.query)}this.fragment=nullIfBlank(result[5]);if(options.decodeFragment){return this.fragment=this.decodeParams(this.fragment)}};this.parse(uri.toString(),options);return this};!function(){var AbstractDialog,ConnectDialog,EchoDialog,PickerDialog,Player,_ref,_ref1,_ref2,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};window.SC||(window.SC={});SC.Helper={merge:function(a,b){var k,newObj,v,_i,_len;if(a.constructor===Array){newObj=Array.apply(null,a);for(_i=0,_len=b.length;_i<_len;_i++){v=b[_i];newObj.push(v)}return newObj}else{newObj={};for(k in a){if(!__hasProp.call(a,k))continue;v=a[k];newObj[k]=v}for(k in b){if(!__hasProp.call(b,k))continue;v=b[k];newObj[k]=v}return newObj}},groupBy:function(collection,attribute){var group,object,value,_i,_len,_name;group={};for(_i=0,_len=collection.length;_i<_len;_i++){object=collection[_i];if(value=object[attribute]){group[_name=object[attribute]]||(group[_name]=[]);group[object[attribute]].push(object)}}return group},loadJavascript:function(src,callback){var elem;elem=document.createElement("script");elem.async=true;elem.src=src;SC.Helper.attachLoadEvent(elem,callback);document.body.appendChild(elem);return elem},extractOptionsAndCallbackArguments:function(optionsOrCallback,callback){var args;args={};if(callback!=null){args.callback=callback;args.options=optionsOrCallback}else if(typeof optionsOrCallback==="function"){args.callback=optionsOrCallback;args.options={}}else{args.options=optionsOrCallback||{}}return args},openCenteredPopup:function(url,width,height){var options;options={};if(height!=null){options.width=width;options.height=height}else{options=width}options=SC.Helper.merge(options,{location:1,left:window.screenX+(window.outerWidth-options.width)/2,top:window.screenY+(window.outerHeight-options.height)/2,toolbar:"no",scrollbars:"yes"});return window.open(url,options.name,this._optionsToString(options))},_optionsToString:function(options){var k,optionsArray,v;optionsArray=[];for(k in options){if(!__hasProp.call(options,k))continue;v=options[k];optionsArray.push(k+"="+v)}return optionsArray.join(", ")},attachLoadEvent:function(element,func){if(element.addEventListener){return element.addEventListener("load",func,false)}else{return element.onreadystatechange=function(){if(this.readyState==="complete"){return func()}}}},millisecondsToHMS:function(ms){var hms,m,mPrefix,sPrefix,tc;hms={h:Math.floor(ms/(60*60*1e3)),m:Math.floor(ms/6e4%60),s:Math.floor(ms/1e3%60)};tc=[];if(hms.h>0){tc.push(hms.h)}m=hms.m;mPrefix="";sPrefix="";if(hms.m<10&&hms.h>0){mPrefix="0"}if(hms.s<10){sPrefix="0"}tc.push(mPrefix+hms.m);tc.push(sPrefix+hms.s);return tc.join(".")},setFlashStatusCodeMaps:function(query){query["_status_code_map[400]"]=200;query["_status_code_map[401]"]=200;query["_status_code_map[403]"]=200;query["_status_code_map[404]"]=200;query["_status_code_map[422]"]=200;query["_status_code_map[500]"]=200;query["_status_code_map[503]"]=200;return query["_status_code_map[504]"]=200},responseHandler:function(responseText,xhr){var error,json;json=SC.Helper.JSON.parse(responseText);error=null;if(!json){if(xhr){error={message:"HTTP Error: "+xhr.status}}else{error={message:"Unknown error"}}}else if(json.errors){error={message:json.errors&&json.errors[0].error_message}}return{json:json,error:error}},FakeStorage:function(){return{_store:{},getItem:function(key){return this._store[key]||null},setItem:function(key,value){return this._store[key]=value.toString()},removeItem:function(key){return delete this._store[key]}}},JSON:{parse:function(string){if(string[0]!=="{"&&string[0]!=="["){return null}else if(window.JSON!=null){return window.JSON.parse(string)}else{return eval(string)}}}};window.SC=SC.Helper.merge(SC||{},{_version:"2.0.0",_baseUrl:"//fractalfantasy.net"/*"//connect.soundcloud.com"*/,options:{site:"soundcloud.com",baseUrl:"//fractalfantasy.net"/*"//connect.soundcloud.com"*/},connectCallbacks:{},_popupWindow:void 0,initialize:function(options){var key,value,_base;if(options==null){options={}}this.accessToken(options["access_token"]);for(key in options){if(!__hasProp.call(options,key))continue;value=options[key];this.options[key]=value}(_base=this.options).flashXHR||(_base.flashXHR=(new XMLHttpRequest).withCredentials===void 0);return this},hostname:function(subdomain){var str;str="";if(subdomain!=null){str+=subdomain+"."}str+=this.options.site;return str}});window.SC=SC.Helper.merge(SC||{},{_apiRequest:function(method,path,query,callback){var data,uri;if(callback==null){callback=query;query=void 0}query||(query={});uri=SC.prepareRequestURI(path,query);uri.query.format="json";if(SC.options.flashXHR){SC.Helper.setFlashStatusCodeMaps(uri.query)}else{uri.query["_status_code_map[302]"]=200}if(method==="PUT"||method==="DELETE"){uri.query._method=method;method="POST"}if(method!=="GET"){data=uri.encodeParams(uri.query);uri.query={}}return this._request(method,uri,"application/x-www-form-urlencoded",data,function(responseText,xhr){var response;response=SC.Helper.responseHandler(responseText,xhr);if(response.json&&response.json.status==="302 - Found"){return SC._apiRequest("GET",response.json.location,callback)}else{return callback(response.json,response.error)}})},_request:function(method,uri,contentType,data,callback){if(SC.options.flashXHR){return this._flashRequest(method,uri,contentType,data,callback)}else{return this._xhrRequest(method,uri,contentType,data,callback)}},_xhrRequest:function(method,uri,contentType,data,callback){var request;request=new XMLHttpRequest;request.open(method,uri.toString(),true);request.setRequestHeader("Content-Type",contentType);request.onreadystatechange=function(e){if(e.target.readyState===4){return callback(e.target.responseText,e.target)}};return request.send(data)},_flashRequest:function(method,uri,contentType,data,callback){return this.whenRecordingReady(function(){return Recorder.request(method,uri.toString(),contentType,data,function(data,xhr){return callback(Recorder._externalInterfaceDecode(data),xhr)})})},post:function(path,query,callback){return this._apiRequest("POST",path,query,callback)},put:function(path,query,callback){return this._apiRequest("PUT",path,query,callback)},get:function(path,query,callback){return this._apiRequest("GET",path,query,callback)},"delete":function(path,callback){return this._apiRequest("DELETE",path,{},callback)},prepareRequestURI:function(path,query){var k,uri,v;if(query==null){query={}}uri=new SC.URI(path,{decodeQuery:true});for(k in query){if(!__hasProp.call(query,k))continue;v=query[k];uri.query[k]=v}if(uri.isRelative()){uri.host=this.hostname("api");uri.scheme=window.location.protocol.slice(0,-1)}if(this.accessToken()!=null){uri.query.oauth_token=this.accessToken();uri.scheme="https"}else{uri.query.client_id=this.options.client_id}return uri},_getAll:function(path,query,callback,collection){if(collection==null){collection=[]}if(callback==null){callback=query;query=void 0}query||(query={});query.offset||(query.offset=0);query.limit||(query.limit=50);return this.get(path,query,function(objects,error){if(objects.constructor===Array&&objects.length>0){collection=SC.Helper.merge(collection,objects);query.offset+=query.limit;return SC._getAll(path,query,callback,collection)}else{return callback(collection,null)}})}});window.SC=SC.Helper.merge(SC||{},{_connectWindow:null,connect:function(optionsOrCallback){var dialog,dialogOptions,options;if(typeof optionsOrCallback==="function"){options={connected:optionsOrCallback}}else{options=optionsOrCallback}dialogOptions={client_id:options.client_id||SC.options.client_id,redirect_uri:options.redirect_uri||SC.options.redirect_uri,response_type:"code_and_token",scope:options.scope||"non-expiring",display:"popup",window:options.window,retainWindow:options.retainWindow};if(dialogOptions.client_id&&dialogOptions.redirect_uri){dialog=SC.dialog(SC.Dialog.CONNECT,dialogOptions,function(params){if(params.error!=null){throw new Error("SC OAuth2 Error: "+params.error_description)}else{SC.accessToken(params.access_token);if(options.connected!=null){options.connected()}}if(options.callback!=null){return options.callback()}});this._connectWindow=dialog.options.window;return dialog}else{throw"Options client_id and redirect_uri must be passed"}},connectCallback:function(){return SC.Dialog._handleDialogReturn(SC._connectWindow)},disconnect:function(){return this.accessToken(null)},_trigger:function(eventName,argument){if(this.connectCallbacks[eventName]!=null){return this.connectCallbacks[eventName](argument)}},accessToken:function(value){var storage,storageKey;storageKey="SC.accessToken";storage=this.storage();if(value===void 0){return storage.getItem(storageKey)}else if(value===null){return storage.removeItem(storageKey)}else{return storage.setItem(storageKey,value)}},isConnected:function(){return this.accessToken()!=null}});window.SC=SC.Helper.merge(SC||{},{_dialogsPath:"/dialogs",dialog:function(dialogName,optionsOrCallback,callback){var a,dialog,options;a=SC.Helper.extractOptionsAndCallbackArguments(optionsOrCallback,callback);options=a.options;callback=a.callback;options.callback=callback;options.redirect_uri=this.options.redirect_uri;dialog=new SC.Dialog[dialogName+"Dialog"](options);SC.Dialog._dialogs[dialog.id]=dialog;dialog.open();return dialog},Dialog:{ECHO:"Echo",CONNECT:"Connect",PICKER:"Picker",ID_PREFIX:"SoundCloud_Dialog",_dialogs:{},_isDialogId:function(id){return(id||"").match(new RegExp("^"+this.ID_PREFIX))},_getDialogIdFromWindow:function(window){var id,loc;loc=new SC.URI(window.location,{decodeQuery:true,decodeFragment:true});id=loc.query.state||loc.fragment.state;if(this._isDialogId(id)){return id}else{return null}},_handleDialogReturn:function(window){var dialog,dialogId;dialogId=this._getDialogIdFromWindow(window);dialog=this._dialogs[dialogId];if(dialog!=null){if(dialog.handleReturn()){return delete this._dialogs[dialogId]}}},_handleInPopupContext:function(){var isiOS5;if(this._getDialogIdFromWindow(window)&&!window.location.pathname.match(/\/dialogs\//)){isiOS5=navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i);if(isiOS5){return window.opener.SC.Dialog._handleDialogReturn(window)}else if(window.opener){return window.opener.setTimeout(function(){return window.opener.SC.Dialog._handleDialogReturn(window)},1)}else if(window.top){return window.top.setTimeout(function(){return window.top.SC.Dialog._handleDialogReturn(window)},1)}}},AbstractDialog:AbstractDialog=function(){AbstractDialog.prototype.WIDTH=456;AbstractDialog.prototype.HEIGHT=510;AbstractDialog.prototype.ID_PREFIX="SoundCloud_Dialog";AbstractDialog.prototype.PARAM_KEYS=["redirect_uri"];AbstractDialog.prototype.requiresAuthentication=false;AbstractDialog.prototype.generateId=function(){return[this.ID_PREFIX,Math.ceil(Math.random()*1e6).toString(16)].join("_")};function AbstractDialog(options){this.options=options!=null?options:{};this.id=this.generateId()}AbstractDialog.prototype.buildURI=function(uri){var paramKey,_i,_len,_ref;if(uri==null){uri=new SC.URI(SC._baseUrl)}uri.scheme=window.location.protocol.slice(0,-1);uri.path+=SC._dialogsPath+"/"+this.name+"/";uri.fragment={state:this.id};if(this.requiresAuthentication){uri.fragment.access_token=SC.accessToken()}_ref=this.PARAM_KEYS;for(_i=0,_len=_ref.length;_i<_len;_i++){paramKey=_ref[_i];if(this.options[paramKey]!=null){uri.fragment[paramKey]=this.options[paramKey]}}uri.port=null;return uri};AbstractDialog.prototype.open=function(){var url;if(this.requiresAuthentication&&SC.accessToken()==null){return this.authenticateAndOpen()}else{url=this.buildURI();if(this.options.window!=null){return this.options.window.location=url}else{return this.options.window=SC.Helper.openCenteredPopup(url,{width:this.WIDTH,height:this.HEIGHT})}}};AbstractDialog.prototype.authenticateAndOpen=function(){var connectDialog,_this=this;return connectDialog=SC.connect({retainWindow:true,window:this.options.window,connected:function(){_this.options.window=connectDialog.options.window;return _this.open()}})};AbstractDialog.prototype.paramsFromWindow=function(){var params,url;url=new SC.URI(this.options.window.location,{decodeFragment:true,decodeQuery:true});return params=SC.Helper.merge(url.query,url.fragment)};AbstractDialog.prototype.handleReturn=function(){var params;params=this.paramsFromWindow();if(!this.options.retainWindow){this.options.window.close()}return this.options.callback(params)};return AbstractDialog}(),EchoDialog:EchoDialog=function(_super){__extends(EchoDialog,_super);function EchoDialog(){_ref=EchoDialog.__super__.constructor.apply(this,arguments);return _ref}EchoDialog.prototype.PARAM_KEYS=["client_id","redirect_uri","hello"];EchoDialog.prototype.name="echo";return EchoDialog}(AbstractDialog),PickerDialog:PickerDialog=function(_super){__extends(PickerDialog,_super);
function PickerDialog() { _ref1 = PickerDialog.__super__.constructor.apply(this, arguments);
    return _ref1 }
PickerDialog.prototype.PARAM_KEYS = ["client_id", "redirect_uri"];
PickerDialog.prototype.name = "picker";
PickerDialog.prototype.requiresAuthentication = true;
PickerDialog.prototype.handleReturn = function() {
    var params, _this = this;
    params = this.paramsFromWindow();
    if (params.action === "logout") { SC.accessToken(null);
        this.open();
        return false } else if (params.track_uri != null) {
        if (!this.options.retainWindow) { this.options.window.close() }
        SC.get(params.track_uri, function(track) {
            return _this.options.callback({ track: track }) });
        return true } };
return PickerDialog
}(AbstractDialog), ConnectDialog: ConnectDialog = function(_super) { __extends(ConnectDialog, _super);

function ConnectDialog() { _ref2 = ConnectDialog.__super__.constructor.apply(this, arguments);
    return _ref2 }
ConnectDialog.prototype.PARAM_KEYS = ["client_id", "redirect_uri", "client_secret", "response_type", "scope", "display"];
ConnectDialog.prototype.name = "connect";
ConnectDialog.prototype.buildURI = function() {
    var uri;
    uri = ConnectDialog.__super__.buildURI.apply(this, arguments);
    uri.scheme = "https";
    uri.host = "soundcloud.com";
    uri.path = "/connect";
    uri.query = uri.fragment;
    uri.fragment = {};
    return uri };
return ConnectDialog }(AbstractDialog)
}
});
SC.Dialog._handleInPopupContext();

window.SC = SC.Helper.merge(SC || {}, { Loader: { States: { UNLOADED: 1, LOADING: 2, READY: 3 }, Package: function(name, loadFunction) {
            return { name: name, callbacks: [], loadFunction: loadFunction, state: SC.Loader.States.UNLOADED, addCallback: function(fn) {
                    return this.callbacks.push(fn) }, runCallbacks: function() {
                    var callback, _i, _len, _ref3;
                    _ref3 = this.callbacks;
                    for (_i = 0, _len = _ref3.length; _i < _len; _i++) { callback = _ref3[_i];
                        callback.apply(this) }
                    return this.callbacks = [] }, setReady: function() { this.state = SC.Loader.States.READY;
                    return this.runCallbacks() }, load: function() { this.state = SC.Loader.States.LOADING;
                    return this.loadFunction.apply(this) }, whenReady: function(callback) {
                    switch (this.state) {
                        case SC.Loader.States.UNLOADED:
                            this.addCallback(callback);
                            return this.load();
                        case SC.Loader.States.LOADING:
                            return this.addCallback(callback);
                        case SC.Loader.States.READY:
                            return callback() } } } }, packages: {}, registerPackage: function(pkg) {
            return this.packages[pkg.name] = pkg } } });
window.SC = SC.Helper.merge(SC || {}, { oEmbed: function(trackUrl, query, callback) {
        var element, uri, _this = this;
        if (callback == null) { callback = query;
            query = void 0 }
        query || (query = {});
        query.url = trackUrl;
        uri = new SC.URI(window.location.protocol + "//" + SC.hostname() + "/oembed.json");
        uri.query = query;
        if (callback.nodeType !== void 0 && callback.nodeType === 1) { element = callback;
            callback = function(oembed) {
                return element.innerHTML = oembed.html } }
        return this._request("GET", uri.toString(), null, null, function(responseText, xhr) {
            var response;
            response = SC.Helper.responseHandler(responseText, xhr);
            return callback(response.json, response.error) }) } });
window.SC = SC.Helper.merge(SC || {}, { _recorderSwfPath: "/recorder.js/recorder-0.9.0.swf", whenRecordingReady: function(callback) {
        return SC.Loader.packages.recording.whenReady(callback) }, record: function(options) {
        if (options == null) { options = {} }
        return this.whenRecordingReady(function() {
            return Recorder.record(options) }) }, recordStop: function(options) {
        if (options == null) { options = {} }
        return Recorder.stop() }, recordPlay: function(options) {
        if (options == null) { options = {} }
        return Recorder.play(options) }, recordUpload: function(query, callback) {
        var flattenedParams, uri;
        if (query == null) { query = {} }
        uri = SC.prepareRequestURI("/tracks", query);
        uri.query.format = "json";
        SC.Helper.setFlashStatusCodeMaps(uri.query);
        flattenedParams = uri.flattenParams(uri.query);
        return Recorder.upload({ method: "POST", url: "https://" + this.hostname("api") + "/tracks", audioParam: "track[asset_data]", params: flattenedParams, success: function(responseText) {
                var response;
                response = SC.Helper.responseHandler(responseText);
                return callback(response.json, response.error) } }) } });
SC.Loader.registerPackage(new SC.Loader.Package("recording", function() {
    if (Recorder.flashInterface()) {
        return SC.Loader.packages.recording.setReady() } else {
        return Recorder.initialize({ swfSrc: SC._baseUrl + SC._recorderSwfPath + "?" + SC._version, initialized: function() {
                return SC.Loader.packages.recording.setReady() } }) } }));
window.SC = SC.Helper.merge(SC || {}, { storage: function() {
        return this._fakeStorage || (this._fakeStorage = new SC.Helper.FakeStorage) } });
Player = function() {
    function Player(_player) { this._player = _player }
    Player.prototype.play = function(position) {
        if (this._player.getState() === "loading" || this._player.getState() === "initialize") {
            return this._player.on("stateChange", function(state) {
                if (state === "idle") {
                    return this.play() } }) } else {
            return this._player.play() } };
    Player.prototype.stop = function() { this._player.pause();
        return this._player.seek(0) };
    Player.prototype.pause = function() {
        return this._player.pause() };
    Player.prototype.seek = function(ms) {
        return this._player.seek(ms) };
    Player.prototype.setVolume = function(volume) {
        return this._player.setVolume(volume) };
    Player.prototype.getVolume = function() {
        return this._player.getVolume() };
    Player.prototype.getType = function() {
        return this._player.getType() };
    Player.prototype.getCurrentPosition = function() {
        return this._player.getCurrentPosition() };
    Player.prototype.getLoadedPosition = function() {
        return this._player.getLoadedPosition() };
    Player.prototype.getDuration = function() {
        return this._player.getDuration() };
    Player.prototype.getState = function() {
        return this._player.getState() };
    return Player }();
window.SC = SC.Helper.merge(SC || {}, { whenStreamingReady: function(callback) {
        return SC.Loader.packages.streaming.whenReady(callback) }, _isNumeric: function(idOrUrl) {
        return idOrUrl.toString().match(/^\d.*$/) }, _prepareTrackUrl: function(idOrUrl) {
        var preparedUrl, url;
        url = this._isNumeric(idOrUrl) ? "/tracks/" + idOrUrl : idOrUrl;
        preparedUrl = SC.prepareRequestURI(url);
        return preparedUrl.toString() }, _prepareStreamUrl: function(idOrUrl) {
        var preparedUrl, url;
        url = this._isNumeric(idOrUrl) ? "/tracks/" + idOrUrl : idOrUrl;
        preparedUrl = SC.prepareRequestURI(url);
        if (!preparedUrl.path.match(/\/stream/)) { preparedUrl.path += "/streams" }
        return preparedUrl.toString() }, _setOnPositionListenersForComments: function(player, comments, callback) {
        var group;
        group = SC.Helper.groupBy(comments, "timestamp");
        return player._player.on("positionChange", function(current, loaded, duration) {
            var collection, key, _i, _len, _ref3;
            collection = [];
            _ref3 = Object.keys(group);
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) { key = _ref3[_i];
                if (key > parseInt(current, 10)) {
                    break }
                collection.push(group[key]);
                delete group[key] }
            collection = [].concat.apply([], collection);
            return callback(collection) }) }, stream: function(idOrUrl, optionsOrCallback, callback) {
        var a, options, stream_url, track_url;
        a = SC.Helper.extractOptionsAndCallbackArguments(optionsOrCallback, callback);
        options = a.options;
        callback = a.callback;
        options.id = "T" + idOrUrl + "-" + Math.random();
        track_url = this._prepareTrackUrl(idOrUrl);
        stream_url = this._prepareStreamUrl(idOrUrl);
        return SC.whenStreamingReady(function() {
            return SC.get(track_url, function(track) { options.duration = track.duration;
                return SC.get(stream_url, function(streams) {
                    var createAndCallback, ontimedcommentsCallback, _this = this;
                    options.src = streams.http_mp3_128_url || streams.rtmp_mp3_128_url;
                    createAndCallback = function(options) {
                        var player;
                        player = new Player(audioManager.createAudioPlayer(options));
                        if (callback != null) { callback(player) }
                        return player };
                    if (ontimedcommentsCallback = options.ontimedcomments) { delete options.ontimedcomments;
                        return SC._getAll(track_url + "/comments", function(comments) {
                            var player;
                            player = createAndCallback(options);
                            return SC._setOnPositionListenersForComments(player, comments, ontimedcommentsCallback) }) } else {
                        return createAndCallback(options) } }) }) }) }, streamStopAll: function() {
        var player, _i, _len, _ref3, _results;
        if (window.audioManager != null) { _ref3 = window.audioManager._players;
            _results = [];
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) { player = _ref3[_i];
                player.pause();
                _results.push(player.seek(0)) }
            return _results } } });
SC.Loader.registerPackage(new SC.Loader.Package("streaming", function() {
    var audioManagerURL;
    if (window.audioManager != null) {
        return SC.Loader.packages.streaming.setReady() } else { audioManagerURL = SC._baseUrl + "/js";
        return SC.Helper.loadJavascript("js/ffplayer/audiomanager3.js", function() { window.audioManager = new AudioManager({ flashAudioPath: SC._baseUrl + "/audiomanager/flashAudio.swf" });
            return SC.Loader.packages.streaming.setReady() }) } }))
}.call(this);


(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))isMobile = true})(navigator.userAgent||navigator.vendor||window.opera);

/*! PLAYER CODE */

// ffplayer.init();

function FFPlayer( OPTIONS ) {

	/**
		options
		-------
		mode:
			'credits' 		-- just credits
			'audio'	  		-- plays an mp3 from server
			'audio playlist'-- plays groups of mp3s (next button)
			'sc'			-- plays track using soundcloud api
			'sc playlist'   -- plays playlist off sc api (next button)
		src:
			audio, audio playlist mode -- path/audio.mp3
			sc, sc playlist mode 	   -- soundcloud track id
		volume:
			true/false -- allows user to have volume control
		download:
			true/false -- allows user to download mp3 file/soundcloud link
		share:
			true/false -- allows user to share track
	*/

	this.imgRoot = OPTIONS.imgRoot;
	this.audioRoot = OPTIONS.audioRoot;
	this.loop = OPTIONS.loop || false;

	this.mode = OPTIONS.mode || 'audio';
	this.src = OPTIONS.src || '';
	this.volume = OPTIONS.volume || false;
	this.download = OPTIONS.download || false;
	this.embed = OPTIONS.embed || false;
	this.title = OPTIONS.title || "";
	this.artist = OPTIONS.artist || "";
	this.songTitle = OPTIONS.songTitle || "";
	this.autoPlay = OPTIONS.autoPlay || false;
	this.embedCode = OPTIONS.embedCode || "";
	this.downloadLink = OPTIONS.downloadLink || "";
	this.link = OPTIONS.link || false;
	this.volume = 1.0;

	var clientID = "ad877fecc7527d59d980232be493f705";

	// this.downloadPage = OPTIONS.downloadPage || true;
	// this.description = "<i> Visual at <a href='http://fractalfantasy.net' target='_blank'>Fractal Fantasy</a> </i>";

	if ( OPTIONS.description ) {

		this.description = " - " + OPTIONS.description;

	} else {

		this.description = "";

	}

	this.useTracklist = OPTIONS.useTracklist || false;

	this.playButton;
	this.playButtonState = -1; // 1: loadingbutton, 2: pause, 3: play

	this.song, this.moveplayhead, this.mouseUp, this.mouseDown;
	this.playlist;

	this.streamUrl;
	this.streamAudioElement;

	this.callbacks = {};

	this.currentPlaylistIndex = 0;
	var that = this;

	var playNextSong = true;

	this.createCredits = function() {

		this.credits = document.createElement( "ul" );
		this.credits.id = "credits";
		this.credits.innerHTML = "<div class='left'><li><b id='playerTitle'>"+ this.title + "</b>&nbsp | &nbsp<span id='playerArtist'>" + this.artist + "</span><br><span id='timer'>0:00</span><span id='playerDescription'>" + this.description + "</span><br> <div id='d_debug' class='embedtxt'></div><div id='titleContainer'><span id='trackTitle'></span></div></li></div>";

	};

	this.createPlayhead = function() {

		this.playhead = document.createElement( "div" );
		this.playhead.id = "playhead";

	};

	this.createTimeline = function(){

		this.timeline = document.createElement( "div" );
		this.timeline.id = "timeline";

		if ( this.mode === "sc playlist" ||
			 this.mode === "audio playlist" ) {

			this.timeline.className = "timelinePlaylist";

		}

		this.timeline.appendChild( this.credits );
		this.timeline.appendChild( this.playhead );
		this.audioContainer.appendChild( this.timeline );

	};

	this.createIcons = function(){

		this.icons = [];
		this.iconIds = [ "volumeContainer", "halfContainer", "muteContainer" ];

		this.iconMarkups = [
			'<img id="volume" class="volume demo-icon icon-volume-up volume-icn" src="' + this.imgRoot + 'volume-full.svg" alt="">',
			'<img id="half" class="volume demo-icon icon-half volume-icn" src="' + this.imgRoot + 'volume-half.svg" alt="">',
			'<img id="mute" class="volume demo-icon icon-mute volume-icn" src="' + this.imgRoot + 'volume-mute.svg" alt="">'
		]

		for ( var i = 0; i < 3; i ++ ) {

			this.icons[i] = document.createElement("div");
			this.icons[i].id = this.iconIds[i];

			if ( this.embed ) {

				this.icons[i].innerHTML = '<a class="embed-button"><img class="demo-icon icon-download download download-icn" src="' + this.imgRoot + 'embed.svg" alt=""></a>';

			}

			if ( this.download ) {

				this.icons[i].innerHTML += '<a class="download-button" id="download-button" '+ (this.link ? '' : 'download=""') +'target="_blank" href='+ this.downloadLink +'><img class="demo-icon icon-download embed embed-icn" src="' + this.imgRoot + 'download.svg" alt=""></a>';

			}

			if ( this.volume ) {

				this.icons[i].innerHTML += '<a class="volume-button">' + this.iconMarkups[i] + '</a>';

			}

			this.iconContainer.appendChild( this.icons[i] );

		}

		this.embedIcon = document.createElement("div");
		this.embedIcon.className = "container-share-embed";
		// this.embedIcon.innerHTML = '<div class="block-embed"><form class="block-embed-form"><label for="btn-input-embed">EMBED</label><input id="btn-input-embed" type="text" value="<iframe width=&quot;80%&quot; height=&quot;61&quot; scrolling=&quot;no&quot; frameborder=&quot;0&quot; src=&quot;http://fractalfantasy.net/ffplayer.html&quot;></iframe>"><br><label for="btn-input-embed">URL</label><input id="btn-input-embed" type="text" value="http://fractalfantasy.net/#/3/mixtape"></form></div>';
		this.embedIcon.innerHTML = this.embedCode;
		this.iconContainer.appendChild( this.embedIcon );

	};

	this.createPlayer = function(){

		this.container = document.createElement("div");
		this.container.id = "ffplayer";

		this.playButton = document.createElement("button");
		this.playButton.id = "pButton";
		this.playButton.className = "play";
		this.playButtonState = 3;

		if( this.mode === "sc playlist" ||
		    this.mode === "audio playlist" ){

			this.nextButton = document.createElement("button");
			this.nextButton.id = "fwd";
			this.nextButton.className = "next";

		}

		this.audioContainer = document.createElement("div");
		this.audioContainer.id = "audioplayer";
		this.iconContainer = document.createElement("div");
		this.iconContainer.id = "icons";

		this.container.appendChild(this.playButton);

		if( this.mode === "sc playlist" ||
			this.mode === "audio playlist" ){

			this.container.appendChild(this.nextButton);

		}

		this.container.appendChild(this.audioContainer);
		this.container.appendChild(this.iconContainer);

		this.createCredits();
		this.createPlayhead();
		this.createTimeline();
		this.createIcons();

		document.body.appendChild(this.container);

	};

	this.init = function(){

		this.createPlayer();
		this.initMusic();

	};

	this.createSong = function( src ) {

		this.song = document.createElement( "audio" );
		//this.song = document.getElementById( 'music' );

		this.song.preload = "auto";
		this.song.src = src;
		this.song.load();

		var alreadyPlayed = false;

		this.song.getDuration = function() {

			return this.duration;

		};

		this.song.getState = function() {

			if( ! this.paused ) {

				return "playing";

			} else if ( this.seeking ) {

				return "seeking";

			// } else if (this.loading){
			// 	return "loading";
			// } else if (this.initialize){
			// 	return "initialize";

			} else if ( this.paused ) {

				return "paused";

			}

		}

		this.song.getCurrentPosition = function() {

			return this.currentTime;

		};

		this.song.seek = function( time ) {

			this.currentTime = time;

			executeCallbacks( "seek", time );

		};

		this.song.setVolume = function( val ) {
			
			this.volume = val;
			// console.log("setting volume",this, this.volume)
		};

		this.song.addEventListener( "timeupdate", function() {

			that.update();

		} );

		this.song.addEventListener( "canplay", function() {
		//this.song.addEventListener( "canplaythrough", function() {

			// if(!alreadyPlayed){

				if ( OPTIONS.autoPlay ) {

					//console.log( "autoplay", this, this.song, that.song );

					//this.play();
					handleSongPlay( that.song );


				}

				// play();
				//alert(src+" canplaythrough");
			// }
			// alreadyPlayed = true;

		} );

		this.song.addEventListener( "ended", function() {

			if ( that.mode === "audio playlist" ) {

				skipForward();

				//alert(src+" ended");

			}

		} );

	};

	this.initMusic = function() {

		if ( this.mode === "audio" ) {

			document.getElementById('playerTitle').innerHTML = that.title;
			document.getElementById('playerArtist').innerHTML = that.artist;

			if ( that.songTitle && ! that.useTracklist ) {

				document.getElementById('titleContainer').innerHTML = that.songTitle;

			}

			this.createSong( this.src );

    		 this.song.volume = this.volume;

		} else if ( this.mode === "sc" ) {

			SC.initialize( { "client_id": clientID } );

			//220575924
			// SC.stream("/playlists/115049597", {

			SC.get( "/tracks/" + this.src, {

				autoPlay: !isMobile && OPTIONS.autoPlay,
				useHTML5Audio: true,
				preferFlash: false

			}, function ( sound ) {

				that.playlist = sound;

				if ( that.title.length > 0 ) {

					document.getElementById( 'playerTitle' ).innerHTML = that.title;

				} else {

					document.getElementById( 'playerTitle' ).innerHTML = that.playlist.title;

				}

				if ( that.artist.length > 0 ) {

					document.getElementById( 'playerArtist' ).innerHTML = that.artist;

				} else {

					document.getElementById( 'playerArtist' ).innerHTML = that.playlist.user.username;

				}

				SC.stream( "/tracks/" + sound.id, {

					autoPlay: !isMobile && OPTIONS.autoPlay,
					useHTML5Audio: true,
					preferFlash: false

				}, function ( sound ) {

					that.song = sound;
					that.song.setVolume( that.volume )
					that.song._player.on( "buffering", function( state ) {

			      		console.log( "buffering ");
			  	  		that.update();

					} );

					that.song._player.on( "positionChange", function( state ) {

						that.update();

					} );

					that.playButton.style.display = "block";

				} );

			} );

		} else if ( this.mode === "audio playlist" ) {

			this.createSong( this.src[0] );

		} else if ( this.mode === "sc playlist" ) {

			SC.initialize( { "client_id": clientID } );

			//220575924
			// SC.stream("/playlists/115049597", {

			SC.get( "/playlists/" + this.src, {

				autoPlay: ! isMobile && OPTIONS.autoPlay,
				useHTML5Audio: true,
				preferFlash: false

			}, function ( sound ) {

				//console.log( "SC playlist", sound );

				that.playlist = sound;

				if ( that.title.length > 0 ) {

					document.getElementById( 'playerTitle' ).innerHTML = that.title;

				} else {

					document.getElementById( 'playerTitle' ).innerHTML = that.playlist.title;

				}

				if ( that.artist.length > 0 ) {

					document.getElementById( 'playerArtist' ).innerHTML = that.artist;

				} else {

					document.getElementById( 'playerArtist' ).innerHTML = that.playlist.user.username;

				}
				// that.credits.innerHTML = "<div class='left'><li><b>"+ that.title + "</b> | " + this.artist + "<br><span id='timer'>0:00</span> - " + this.description + "<br> <div id='d_debug' class='embedtxt'></div><div id='titleContainer'><span id='trackTitle'></span></div></li></div>";

				var streamUrl = sound.tracks[ ffplayer.currentPlaylistIndex ].stream_url;
				that.streamUrl = streamUrl + '?client_id=' + clientID;

				executeCallbacks( "streamUrl" );

				SC.stream( "/tracks/" + sound.tracks[ ffplayer.currentPlaylistIndex ].id, {

					autoPlay: ! isMobile && OPTIONS.autoPlay,
					useHTML5Audio: true,
					preferFlash: false

				}, function ( sound ) {

					that.song = sound;
					that.song.setVolume( that.volume )
					that.song._player.on( "positionChange", function( state ) {

						that.update();

					} );

					that.song._player.on( "stateChange", function( state ) {

  				  		if ( state === "ended" ) {

  				  			skipForward();

  				  		}

					} );

					that.playButton.style.display = "block";

					var streamAudioElement = sound._player._html5Audio;
					that.streamAudioElement = streamAudioElement;

					executeCallbacks( "streamAudio", ffplayer.currentPlaylistIndex );

				} );

			} );
		}

	}

	var playerTitle = document.getElementById('playerTitle');
	var playerArtist = document.getElementById('playerArtist');
	var playerDescription = document.getElementById('playerDescription');

	this.init();

	var renderer;
	var duration; // Duration of audio clip

	var pButton = this.playButton;
	var audioplayer = this.audioContainer;
	var playhead = this.playhead;
	var timeline = this.timeline;
	var timer = document.getElementById('timer');
	var icons = document.getElementById('icons');
	var volume = document.getElementById('volume');

	var volumeContainer = document.getElementById('volumeContainer');
	var half = document.getElementById('half');
	var mute = document.getElementById('mute');
	var volumeBar = document.getElementById('volumeBar');
	var innerVolume = document.getElementById('innerVolume');
	var download = document.getElementsByClassName('download');
	var embedButton = document.getElementsByClassName('embed-button');

	if( this.mode === "sc playlist" ||
		this.mode === "audio playlist" ) {

		var timelineWidth = window.innerWidth - (volumeContainer.offsetWidth + 90);

	} else {

		var timelineWidth = window.innerWidth - (volumeContainer.offsetWidth + 60);

	}

	var timelineHeight = 60;
	var counter = 0;
	var volumeBarHeight = 120;
	var volumeAmt = 1.0;
	var trackTitle = document.getElementById("trackTitle");
	var mix = document.getElementById("mix");
	var song;
	var updater;

	var currentDuration;
	var currentTime = 0;
	var relativePosition;
	var volumeCounter = 0;
	var currentTrack;

	var mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

	if ( mobile ) {

		// alert("MOBILE DEVICE!!");
		$('#volumeContainer').css('display', 'none'); // OR you can use $('.navWrap').hide();

	} else {

	   // alert("NOT A MOBILE DEVICE!!");

	}

	if ( this.volume ) {

		volume.addEventListener( "click", function( event ) {

			$(volume).closest('#volumeContainer').css('display', 'none');
			$(half).closest('#halfContainer').css('display', 'block');
			$(mute).closest('#muteContainer').css('display', 'none');

			that.volume = 0.5;
			that.song.setVolume( that.volume );

		} );

		half.addEventListener( "click", function( event ) {

			$(volume).closest('#volumeContainer').css('display', 'none');
			$(half).closest('#halfContainer').css('display', 'none');
			$(mute).closest('#muteContainer').css('display', 'block');

			that.volume = 0.0;
			that.song.setVolume( that.volume );

		} );

		mute.addEventListener( "click", function( event ) {

			$(volume).closest('#volumeContainer').css('display', 'block');
			$(half).closest('#halfContainer').css('display', 'none');
			$(mute).closest('#muteContainer').css('display', 'none');

			that.volume = 1.0;
			that.song.setVolume( that.volume );

		} );

	}

	var embedClickCounter = 0;

	if ( this.embed ) {

		embedButton[0].addEventListener( "click", function( event ) {

			if ( embedClickCounter % 2 === 0 ) {

				that.embedIcon.className = "container-share-embed show";

			} else {

				that.embedIcon.className = "container-share-embed";

			}

			embedClickCounter ++;

		} );

		embedButton[1].addEventListener( "click", function( event ) {

			if ( embedClickCounter % 2 === 0 ) {

				that.embedIcon.className = "container-share-embed show";

			} else {

				that.embedIcon.className = "container-share-embed";

			}

			embedClickCounter ++;

		} );

		embedButton[2].addEventListener( "click", function( event ) {

			if ( embedClickCounter % 2 === 0 ) {

				that.embedIcon.className = "container-share-embed show";

			} else {

				that.embedIcon.className = "container-share-embed";

			}

			embedClickCounter ++;

		} );

	}

	var onvolume = false;

	this.playButton.addEventListener( "click", play, true );

	if ( that.mode === "sc playlist" ||
		 that.mode === "audio playlist" ) {

		this.nextButton.addEventListener( "click", skipForward, true );

	}

	audioplayer.addEventListener( "touchstart", function(e) {

		e.preventDefault();

		that.moveplayhead( e );
		onplayhead = true;

		window.addEventListener( 'touchmove', that.moveplayhead, true );

	} );

	window.addEventListener( 'touchcancel', function() {

		window.removeEventListener( 'touchmove', that.moveplayhead, true );
		onplayhead = false;

	}, false );

	window.addEventListener( 'touchend', function() {

		window.removeEventListener( 'touchmove', that.moveplayhead, true );
		onplayhead = false;

	}, false );

	function clickPercent( e ) {

		return ( e.pageX - timeline.offsetLeft ) / timelineWidth;

	}

	function volumeClickPercent( e ) {

		return ( ( window.innerHeight - e.pageY ) - timelineHeight ) / volumeBarHeight;

	}

	var onplayhead = false;

	this.moveplayhead = function( e ) {

		if ( e.touches ) {

			var newMargLeft = e.touches[0].pageX - timeline.offsetLeft;

		} else {

			var newMargLeft = e.pageX - timeline.offsetLeft;

		}

		if ( newMargLeft >= 0 && newMargLeft <= timelineWidth ) {

			playhead.style.marginLeft = newMargLeft + "px";

		}

		if ( newMargLeft < 0 ) {

			playhead.style.marginLeft = "0px";

		}

		if ( newMargLeft > timelineWidth ) {

			playhead.style.marginLeft = timelineWidth + "px";

		}

		var newTime = ( 1 - ( ( timelineWidth - newMargLeft ) / timelineWidth ) ) * currentDuration;
		currentTime = newTime;
		that.song.seek( currentTime );

		executeCallbacks( 'scrub', currentTime );

	};

	this.mouseDown = function ( event ) {

		onplayhead = true;
		that.moveplayhead( event );

		window.addEventListener( 'mousemove', that.moveplayhead, true );
		window.addEventListener( 'touchmove', that.moveplayhead, true );

	};

	this.mouseUp = function ( event ) {

		if ( onplayhead === true ) {

			that.moveplayhead( event );

			window.removeEventListener( 'mousemove', that.moveplayhead, true );
			window.removeEventListener( 'touchmove', that.moveplayhead, true );

		}

		onplayhead = false;

	};

	timeline.addEventListener( 'mousedown', that.mouseDown, false );
	window.addEventListener( 'mouseup', that.mouseUp, false );

	//

	function executeCallbacks( event, arg ) {

		var playCallbackList = that.callbacks[ event ];

		if ( playCallbackList ) {

			for ( var i = 0, il = playCallbackList.length; i < il; i ++ ) {

				playCallbackList[ i ]( arg );

			}

		}

	}

	// Play and Pause

	var counter = 0;

	function play() {

		if ( that.song.getState() !== "playing" ) {

			// console.log( "[Player] PLAY called" );

			executeCallbacks( "play" );

			handleSongPlay( that.song );
			that.song.seek( currentTime );

			pButton.className = "";
			pButton.className = "pause";
			that.playButtonState = 2;

		} else {

			console.log( "[Player] PAUSE called" );

			executeCallbacks( "pause" );

			that.song.pause();

			pButton.className = "";
			pButton.className = "play";
			that.playButtonState = 3;

		}

	}

	function skipForward( data ) {

		//console.log(data);
		//console.log( "[Player] Switching from [" + that.song.src + "]" );

		executeCallbacks( "skip" );

		if ( that.mode === "sc playlist" ) {

			ffplayer.currentPlaylistIndex ++;

			if ( ffplayer.currentPlaylistIndex >= that.playlist.tracks.length ) {

				ffplayer.currentPlaylistIndex = 0;

				executeCallbacks( "end" );

				if ( ! that.loop ) playNextSong = playNextSong && false;

			}

			if ( playNextSong ) {

				SC.initialize( { "client_id": clientID } );

				SC.get( "/playlists/" + that.src , {

					autoPlay: !isMobile,
					useHTML5Audio: true,
					preferFlash: false

				}, function ( sound ) {

					var streamUrl = sound.tracks[ ffplayer.currentPlaylistIndex ].stream_url;
					that.streamUrl = streamUrl + '?client_id=' + clientID;

					executeCallbacks( "streamUrl" );

					SC.stream( "/tracks/" + sound.tracks[ ffplayer.currentPlaylistIndex ].id, {

						autoPlay: !isMobile,
						useHTML5Audio: true,
						preferFlash: false

					}, function ( sound ) {

						that.song.pause();

						sound._player.on( "positionChange", function( state ) {

							that.update();

						});

						sound._player.on( "stateChange", function( state ) {

							if ( state === "ended" ) {

								skipForward();

							}

						});

						that.song = sound;
						that.song.setVolume( that.volume )

						that.playButton.style.display = "block";
						that.playButton.className = "";
						that.playButton.className = "play";
						that.playButtonState = 3;

						handleSongPlay( that.song );
						that.update();

						var streamAudioElement = sound._player._html5Audio;
						that.streamAudioElement = streamAudioElement;

						executeCallbacks( "streamAudio", ffplayer.currentPlaylistIndex );

					} );

				} );

			}

		} else if ( that.mode === "audio playlist" ) {
			// ffplayer.currentPlaylistIndex ++;
			if (data ==undefined){
				ffplayer.currentPlaylistIndex ++;
			}else {
				console.log("ffplayer has the song");
				ffplayer.currentPlaylistIndex = data;
			}

			if ( ffplayer.currentPlaylistIndex >= that.src.length ) {

				ffplayer.currentPlaylistIndex = 0;

				executeCallbacks( "end" );

				if ( ! that.loop ) playNextSong = playNextSong && false;

			}

			if ( playNextSong ) {

				that.song.src = that.src[ ffplayer.currentPlaylistIndex ];
				that.song.load();
				handleSongPlay( that.song );
			//	that.song.setVolume( that.volume );

				executeCallbacks( "streamAudio", ffplayer.currentPlaylistIndex );

			} else {

				that.song.pause();
				that.song.src = "";

			}

			//console.log( "[Player] to [" + that.song.src + "]" );

		}

	}

	function skipBack( e ) {

		//console.log( "[Player] Switching from [" + that.song.src + "]" );

		executeCallbacks( "skipback" );

		if ( that.mode === "sc playlist" ) {

			ffplayer.currentPlaylistIndex --;

			if ( ffplayer.currentPlaylistIndex < 0  ) {

				ffplayer.currentPlaylistIndex = that.playlist.tracks.length - 1;

				executeCallbacks( "start" );

				if ( ! that.loop ) playNextSong = playNextSong && false;

			}

			if ( playNextSong ) {

				SC.initialize( { "client_id": clientID } );

				SC.get( "/playlists/" + that.src , {

					autoPlay: !isMobile,
					useHTML5Audio: true,
					preferFlash: false

				}, function ( sound ) {

					var streamUrl = sound.tracks[ ffplayer.currentPlaylistIndex ].stream_url;
					that.streamUrl = streamUrl + '?client_id=' + clientID;

					executeCallbacks( "streamUrl" );

					SC.stream( "/tracks/" + sound.tracks[ ffplayer.currentPlaylistIndex ].id, {

						autoPlay: !isMobile,
						useHTML5Audio: true,
						preferFlash: false

					}, function ( sound ) {

						that.song.pause();

						sound._player.on( "positionChange", function( state ) {

							that.update();

						});

						sound._player.on( "stateChange", function( state ) {

							if ( state === "ended" ) {

								skipForward();

							}

						});

						that.song = sound;
						that.song.setVolume( that.volume )

						that.playButton.style.display = "block";
						that.playButton.className = "";
						that.playButton.className = "play";
						that.playButtonState = 3;

						handleSongPlay( that.song );
						that.update();

						var streamAudioElement = sound._player._html5Audio;
						that.streamAudioElement = streamAudioElement;

						executeCallbacks( "streamAudio", ffplayer.currentPlaylistIndex );

					} );

				} );

			}

		} else if ( that.mode === "audio playlist" ) {

			ffplayer.currentPlaylistIndex --;

			if ( ffplayer.currentPlaylistIndex < 0 ) {

				ffplayer.currentPlaylistIndex = that.src.length - 1;

				executeCallbacks( "start" );

				if ( ! that.loop ) playNextSong = playNextSong && false;

			}

			if ( playNextSong ) {

				that.song.src = that.src[ ffplayer.currentPlaylistIndex ];
				that.song.load();

				handleSongPlay( that.song );
				that.song.setVolume( that.volume );

				executeCallbacks( "streamAudio", ffplayer.currentPlaylistIndex );

			} else {

				that.song.pause();
				that.song.src = "";

			}

			//console.log( "[Player] to [" + that.song.src + "]" );

		}

	}

	this.update = function() {

		// updater = requestAnimationFrame(update);

		currentDuration = this.song.getDuration();
		var dur = this.getDuration( currentDuration );
		var str = dur.minutes + ":" + dur.seconds;

		currentTime = this.song.getCurrentPosition();

		// currentTime = song._player._prevCurrentPosition;

		if ( this.mode === "audio" || this.mode === "audio playlist" ) currentTime *= 1000;

		var time = this.getDuration( currentTime );

		if ( time.seconds < 10 ) {

			time.seconds = "0" + time.seconds;

		}

		var str = time.minutes + ":" + time.seconds;
		timer.innerHTML = str;

		if ( this.mode === "audio" || this.mode === "audio playlist" ) currentTime /= 1000;

		relativePosition = currentTime / currentDuration;

		playhead.style.marginLeft = ( timelineWidth * relativePosition ) + "px";
		this.updateTitle();
		this.checkText();

		checkPlayPause();

	};

	this.updateTitle = function() {

		if ( this.useTracklist ) {

			for ( var i = 0; i < tracklist.length; i ++ ) {

				if ( this.mode === "audio" ||
					 this.mode === "audio playlist" ) {

					if ( currentTime > tracklist[i].time ) {

						currentTrack = tracklist[i];
						trackTitle.innerHTML = tracklist[i].title;

					}

				} else {

					if ( currentTime > tracklist[i].time * 1000 ) {

						currentTrack = tracklist[i];
						trackTitle.innerHTML = tracklist[i].title;

					}

				}

			}

		}

		// currentTrack =

		if ( this.mode === "sc playlist" ) {

			trackTitle.innerHTML = this.playlist.tracks[ ffplayer.currentPlaylistIndex ].title;

		} else if ( this.mode === "audio playlist" ) {
			
			if (this.songTitle[ ffplayer.currentPlaylistIndex ] !== undefined){
				// console.log("songtitle");
				trackTitle.innerHTML = this.songTitle[ ffplayer.currentPlaylistIndex ];
			}else {
				// console.log(this.src);
				trackTitle.innerHTML = this.src[ ffplayer.currentPlaylistIndex ].replace('.mp3','').replace(this.audioRoot,'');
			}
		}

	};

	function handleSongPlay( song ) {

		if ( that.mode === "sc playlist" ) {

			var scInfo = song;
			var realSong = scInfo._player._html5Audio;
			var promise = realSong.play();

			// iOS Safari needs also this one

			scInfo.play();

		} else {

			var promise = song.play();

		}

		if ( promise !== undefined ) {

			promise.then( function () {

				// Autoplay started!

				// console.log( "FFPlayer [autoPlay started]" );

			} ).catch( function( error ) {

				// Autoplay was prevented.
				// Show a "Play" button so that user can start playback.

				// console.log( "FFPlayer [autoPlay prevented]" );
				executeCallbacks( "autoplayPrevented" );

			} );

		}

		/*
		if ( promise !== undefined ) {

			promise.then( _ => {

				// Autoplay started!

				console.log( "FFPlayer [autoPlay started]" );

			} ).catch( error => {

				// Autoplay was prevented.
				// Show a "Play" button so that user can start playback.

				console.log( "FFPlayer [autoPlay prevented]" );
				executeCallbacks( "autoplayPrevented" );

			} );

		}
		*/

	}

	function checkPlayPause(){

		//window.requestAnimationFrame( checkPlayPause );

		switch ( that.song.getState() ) {

			case "seeking":

				if ( that.playButtonState !== 1 ) {

					that.playButton.className = "loadingbutton";
					that.playButtonState = 1;

				}

				break;

			// case "loading":
			// that.playButton.className = "";
			// that.playButton.className = "loading";
			// break;
			// case "initialize":
			// that.playButton.className = "";
			// that.playButton.className = "loading";
			// break;

			case "playing":

				if ( that.playButtonState !== 2 ) {

					that.playButton.className = "pause";
					that.playButtonState = 2;

				}

				break;

			case "paused":

				if ( that.playButtonState !== 3 ) {

					that.playButton.className = "play";
					that.playButtonState = 3;

				}

				break;

		}

	}

	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize() {

		if( that.mode === "sc playlist" ||
			that.mode === "audio playlist" ) {

			timelineWidth = window.innerWidth - ( volumeContainer.offsetWidth + 90 );

		} else {

			timelineWidth = window.innerWidth - ( volumeContainer.offsetWidth + 60 );

		}

	}

	this.checkText = function() {

		var txt = $("#trackTitle");
		var delta = txt.parent().width() - txt.width();

		if ( this.useTracklist ) {

			if ( currentTrack.tooLong )	{

				txt.addClass("marquee");

			} else {

				txt.removeClass("marquee");

			}

		} else {

			txt.addClass("marquee");

		}

	};

	this.getDuration = function( millis ) {

		var dur = {};
		var units = [
			{label:"millis",    mod:1000},
			{label:"seconds",   mod:60},
			{label:"minutes",   mod:60},
			{label:"hours",     mod:24},
			{label:"days",      mod:31}
		];

		// calculate the individual unit values...

		units.forEach(function(u){
			millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
		});

		// convert object to a string representation...

		dur.toString = function(){
			return units.reverse().map(function(u){
				return dur[u.label] + " " + (dur[u.label]==1?u.label.slice(0,-1):u.label);
			}).join(', ');
		};

		return dur;

	};

	this.addCallback = function ( event, callback ) {

		if ( this.callbacks[ event ] === undefined ) this.callbacks[ event ] = [];

		var callbackList = this.callbacks[ event ];
		var callbackIndex = callbackList.length;

		callbackList.push( callback );

		return callbackIndex;

	};

	this.nextSong = function (data) {
		//console.log(data, "Data");
		skipForward(data);

	};

	this.playSong = function (data) {
		ffplayer.currentPlaylistIndex = data;	
		that.song.src = that.src[ ffplayer.currentPlaylistIndex ];
		that.song.load();
		handleSongPlay( that.song );
		that.song.setVolume( that.volume );
		executeCallbacks( "streamAudio", ffplayer.currentPlaylistIndex );
	};
	this.stop = function (data) {
		that.song.pause();
		that.song.src = "";
	};
	

	this.previousSong = function () {

		skipBack();

	};

}




