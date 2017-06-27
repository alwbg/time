/**
 * 模块加载器
 * @autor alwbg@163.com | soei
 * @Date 2015/4/23
 * @update 2016/1/8 修改低版本的加载问题.
 * @update 2016/4/12 修改获取模块ID问题 短ID和长ID的对称性
 * @update 2016/4/15 整理映射表
 *         1. 修改了获取模版ID的相关逻辑
 *         2. 修改了加载中的模块对应的映射表
 *         3. 修改计算模版ID 计算及存的逻辑, 只做计算不存储
 *         4. 修改只删除AMD模块执行创建的费对象问题
 * @update 2017/6/23 新增对HTML内的runJs代码块的支持
 *         <!--其中先执行代码块内的代码,再执行main模块的代码-->
 *         <script src="runjs.js" main="main" >
 *         		//module-name = "__runjs.inner__"
 *         		var $ = require( 'query' );
 *         		$( 'test' ).appendTo( 'body' );
 *         		//exports 为方法块内部对象
 *         		exports.run = function(){
 *         		}
 *         		//为模块间传递参数
 *         		return {
 *         			language : {zh:{},en:{}}
 *         		}
 *         </script>
 * 目前支持的
 * - firefox2.0以上(低版本由于不能安装没办验证)
 * - webkit 534版本及以上, 低版本未验证
 * - IE5以上
 * - opera
 * creation-time : 2017-06-26 16:19:16 PM
 */
!function(t){"use strict";function e(t){return document.createElement(t)}function n(t,e){return(e||document).getElementsByTagName(t)}function r(t,e){this.id=t,this.exports=e,K[t]=e}function i(t,e){this.id=t,this.module=e,this.moduleID=e.id,this.wake()}function o(t,e){new r(t,e),e.id=t,new i("declare",e).done()}function a(t){if("string"==typeof t){var e=new RegExp("^\\[object "+t+"\\]$");return function(t){return e.test(O.toString.call(t))}}return function(e){return e instanceof t}}function s(){if(document.currentScript)return document.currentScript;var t,e,r,i,o=n("script");try{___I__Will__Error_____()}catch(a){i=a,t=a.stack}if(t&&(t=t.replace(G,D),r=Q.getScriptByUri(t,o)))return r;for(e=0;r=o[e++];)if("interactive"===r.readyState)return r;return Q.getScriptByUri(Q.currentLoad||i.sourceURL,o)}function u(t,e,n,r){var i,o,a,s,u;for(u=N.call(arguments),o=u.pop(),u.push(o),/false|true/gi.test(o)||u.push(!1),o=u.pop(),a=u.pop();s=u.shift();)for(i in a)!o&&s.hasOwnProperty&&s.hasOwnProperty(i)||(s[i]=a[i])}function c(t,e,n){n=n||this;for(var r=t.split("."),i=0;t=r[i++];)if(t in n){if(n=n[t],ct(n)){I("%c"+t+" 's type not Object! need Object {} ","color:red");break}}else n=n[t]={};return u(n,e),n}function l(t,e,n){it(e)&&Z.factory[ot(t)?M:k].call(n,t,e)}function f(){}function p(t,n,r){r||(r=t);var i=e(t.type);l(t.attr,function(t,e){this.setAttribute(t,e)},i),this.argument=[i,n,r],this.onload(t.isScript).onerror(i),nt.appendChild(i),I("%c正在加载模块 -> "+t.uri,"color:#e0e")}function d(t){t=Z.toRealMI(t);var e;if(e=Z.isInModules(t))return e;if(e=Z.isInStorage(t)){var n,i=new r(t,{}),o=e.data();return I("%c正在创建模块 : "+t,"color:blue"),n=o.length?Z.factory.require(e):o.factory.apply(e,[h,i.exports,i,t]),it(n)?i.exports=n:u(i.exports,n),i.rebulid(),e.done(),i.exports}}function h(t,e){return ft(t)&&void 0===e?d(t):(it(t)&&(e=t,t=[]),h.async(t,e))}function g(t,e,n){var o,a=at(this)?this+b:Z.pickMI(),s=0;if(lt(t)||lt(e)&&++s)return s||(e=t,t=a),t=Z.moduleId(t,a),new i(T,new r(t,e)).done();var u=pt.checkByType(U,[t,e,n],[a,[],function(){}]);t=u[0],e=u[1],n=u[2],n.cmd=!e.length;var c=Z.moduleId(t,a);(o=Z.isInStorage(c))||(o=new i(T,{id:c,deps:e,factory:n,length:e.length,alias:t})),o.isInActive()&&o.run()}function y(t){m(t||W,function(){for(var t,e=[],n={};t=z.pop();)if(ut(t)&&!t.isDone()&&t.isInStorage()&&!(t.module.factory in n))if(n[t.module.factory]=0,t.isReady())pt.runFx(Z.factory[t.id],t),t.done();else if(e.push(t),t.id==T)break;$.apply(z,e)})}function m(e,n){if(!Q.isSimplyLoad){if(!e.length)return I("%c依赖列队加载完毕","color:#3e3"),pt.runFx(n);var r,i=e.shift();if(I("%c准备加载模块 -> "+i,"color:#666"),r=Z.isInStorage(i))r.run();else{if(Z.isInLoading(i))return I("%c已在加载列表 -> "+i,"color:#e06");var o=Z.uri.get(i);Q.currentLoad=o.uri,H&&(Q.isSimplyLoad=!0),new p(o,function(e){I("该标签 : ",e.type,".sheet = ",!!this.argument[0].sheet," : ",e.uri,"color:red"),Q.isSimplyLoad=!1;var n=e.uri;if(n in tt){var r=tt[n]||[],i=r.exports;i&&g.call(n,r.deps,function(){return t[i]})}!Z.isInStorage(n)&&g.call(n,{}),y()})}m(e,n)}}function v(){Y&&h.async(Y)}function I(){t.DEBUG&&E.apply(t,L.slice.call(arguments))}function S(){var t=N.call(arguments).join("");gt||(gt=document.createElement("div"),gt.id="debugBox",document.body.appendChild(gt)),yt||(yt=/(?:^\%c|color\:(.*)$)/g);var e=document.createElement("div"),n=t.replace(yt,b);n!=t&&(e.style.color=RegExp.$1),e.innerHTML=n,gt.appendChild(e),e.setAttribute("debug","true"),gt.scrollTop+=e.offsetHeight+10}function E(){try{var t=Array.apply(null,arguments);console.log.apply(console,t)}catch(e){try{S(N.call(arguments).join("\r\n\r\n"))}catch(e){}}}var R,x="deps-name",T="define",_="require",A="main",k="object",M="array",b="",D="$1",w="$1$2",L=[],O=Object.prototype,$=L.push,N=L.slice,U=["String",Array,Function],j=location.pathname.replace(/[^\/]*$/,b),F=navigator.userAgent,q=F.replace(/.*webkit\/([\d]+).*/i,D)<=534,B=F.replace(/.*firefox\/([\d\.]+).*/i,D)<9;I(F);var H=q||B,C=/^function\s*\(\s*([^\),\s]+)/,P="\\s*\\(\\s*(?:'([^']+)'|\"([^\"]+)\")\\s*\\)",G=/[\D\d]*(?:at|@).*((?:http(?:s|)|file)\:(?:\:(?!\d)|[^\:])*)(?:\:\d*){1,}(?:\)|\r|\n|)$/i,X="#",Q=t._Qma||{},J=Q.v||b,Y=null,z=[],W=[],K={},V={},Z={},tt=Q.depends||{},et={};Z.requireIDs={},u(et,Q.alias),Q.comp=function(t,e){var n=t.getAttribute(x);return e=e.split(X)[0],n==e||e==t.src},Q.tmp={getAttribute:function(){return location.host}},Q.getScriptByUri=function(t,e){for(var n,r=e.length;(n=e[--r])&&(R==n||!this.comp(n,t)););return n||this.tmp},Z.moduleStorage={},Z.toRealMI=function(t){return Z.uri.real(et[t]||t)},Z.isInStorage=function(t){return Z.moduleStorage[this.toRealMI(t)]},Z.isInLoading=function(t){var t=t.realMI(),e=V[t];return!e&&(V[t]=t),e},Z.pickMI=function(){return s().getAttribute(x)},Z.moduleIdRMap={},Z.moduleId=function(t,e){var n=this.moduleIdRMap[t]||(this.moduleIdRMap[t]=new RegExp(t+"$"));return n.test(e)||(e=e+X+t),et[t]=(e||t).realMI()},Z.isInModules=function(t){return K[t]},Z.pull=function(t,e){var n=e.cmd&&C.test(t)?"|"+RegExp.$1:b;return new RegExp("[^a-z](?:"+_+n+")"+P,"ig")},String.prototype.has=function(t){return at(t)&&(t=this.indexOf(t)>-1),st(t)&&(t=t.test(this)),t},String.prototype.realMI=function(){return Z.toRealMI(this)};var nt=(n("script"),n("head")[0]);r.prototype.rebulid=function(){return K[this.id]=this.exports,this},u(i.prototype,{active:{},storage:Z.moduleStorage,echo:E,each:l,tools:new f,data:function(){return this.module},wake:function(){return this.storage[this.moduleID]=this,this},stack:function(){return z.push(this),this},remove:function(){return this.id==_&&delete this.storage[this.moduleID],this},space:function(){return delete K[this.moduleID],this.remove()},depend:function(){var t=this.data();return t.alias in tt&&$.apply(t.deps,(tt[t.alias]||{}).deps||[]),it(t.factory)&&$.apply(t.deps,pt.getDeps(t.factory)),t.deps||[]},isInActive:function(){return this.moduleID in this.active},run:function(){if(this.isDone())return this;var t=this.depend();return l(t,function(t,e){this[e.realMI()]=!0},this.active),I("%c检索模块依赖 -> "+this.moduleID+" : ["+t+"] \r\n","color:#070"),$.apply(W,t),this.stack(),y(),this},done:function(){return this.loaded=!0,this},isDone:function(){return this.loaded},isInStorage:function(){return this.moduleID in this.storage},isReady:function(){for(var t,e=this.data().deps,n=e.length;t=e[--n];)if(!Z.isInStorage(t))return I("%c所依赖的模块["+t+"] [未加载完成]","color:#777"),!1;return!0}});var rt=a("Object"),it=a("Function"),ot=a("Array"),at=a("String"),st=a(RegExp),ut=a(i),ct=a("(?:Number|Boolean|Null|String|Undefined)"),lt=function(t){return t&&rt(t)},ft=a("(?:(?!Array)|String)");c("alias",{},Q),c("types",{},Q),c("pick",{},Q),Z.factory={array:function(t,e,n,r){for(n=0,r=t.length>>0;r>n&&!e.call(this,n,t[n],t);n++);},object:function(t,e,n){for(n in t)if(e.call(this,n,t[n],t))break},push:function(t,e,n){return t.push(n)},add:function(t,e,n){t[e]=n}};var pt=new f,dt=c("format.function",{SEP:"{@}",START:"{%}",LEFT:"{",RIGHT:"}",map:{},NUM:1e6,_ONLY_REQUIRE:/(require\s*\([^\),]*,\s*function\s*\([^\)]*\)\s*\{)/,REQUIRE:/(?:(require\s*\([^\),]*,\s*function\s*\([^\)]*\)\s*\{)|(\{)|(\}))/g,REPLACE:function(t){return this.map[t]||(this.map[t]=new RegExp("\\"+this.START+t+"(?:(?!\\"+this.SEP+t+").|\\n)*\\"+this.SEP+t))}},Z);if(u(f.prototype,{ANNOTATION_REG:/(?:(\/\*+(?:[^*]|\*[^\/])*\*\/))|(?:([^\/'":])\/\/.*$)[\r\n]*/gm,runFx:function(t,e){var n=N.call(arguments),r=n.shift();return r instanceof Function?r.apply(this,n):void 0},getDeps:function(t){var e=t.toString();e=e.replace(this.ANNOTATION_REG,b),dt._ONLY_REQUIRE.test(e)&&(e=this.removeAsyncRequire(e));var n={mark:Z.pull(e,t),pick:[],map:Z.requireIDs};return l(e.match(n.mark)||[],function(t,e){e=e.replace(this.mark,w),e in this.map||(this.map[e]=!0,this.pick.push(e))},n),n.pick},removeAsyncRequire:function(t){var e=dt.LEFT,n=dt.RIGHT,r=dt.SEP,i=dt.START,o=!1,a=0,s=dt.NUM;for(t=t.replace(dt.REQUIRE,function(t,u){return u?(s=1,a++,o=!0,i):o&&(t==e&&s++,t==n&&s--,0==s)?(o=!1,s=dt.NUM,r):b});-1!=t.indexOf(i)&&a--;)t=t.replace(dt.REPLACE(b),b);return t},checkByType:function(t,e,n){if(!ot(e))return i;n||(n=[]);for(var r,i=[],o=0,s=t.length;(r=e.shift())||s>o;)a(t[o])(r)?i.push(r):(r&&e.unshift(r),i.push(n[o])),o++;return i},pick:function(t,e,n){if(!ot(e))return t;var r,i=n||{},o=Z.factory[ot(n)?"push":"add"];return l(e,function(e,n){r=n in t,r&&this.fx(this.box,n,t[n])},{box:i,fx:o}),i},toArray:function(t){return N.call(t)},merge:u}),R=s(),pt.config={JS:".js",CSS:".css",".js":"script",".css":"link",data:{link:{type:"text/css",rel:"stylesheet"}},src:{link:"href",script:"src"},info:function(t){return"%cError: at ["+t+"] Modules do not exist or load timed out!"}},u(p.prototype,{onload:function(t){return this[H&&!t?"load":"moduleLoad"].apply(this,this.argument),this},onerror:function(t){var e=this;return t.onerror=function(){e.task&&e.task.space(),I(pt.config.info(e.attr.src),"color:red")},this},load:function(t,e,n){var r=0,i=this;I("进入低版本样式加载模式 > ",t.href,"color:#9bd807");var o=100,a=15e3;!function s(){return t.sheet||r>a?e.call(i,n):(r+=o,void setTimeout(s,o))}()},moduleLoad:"onreadystatechange"in R?function(t,e,n){var r=this;t.onreadystatechange=function(t){/^(?:complete|loaded)$/.test(this.readyState)&&pt.runFx.call(r,e,n)}}:function(t,e,n){var r=this;t.onload=function(t){pt.runFx.call(r,e,n)}}}),h.async=function(t,e){at(t)&&(t=[t.realMI()]);var n=t.length,r=new i(_,{id:at(this)?this:_+ +new Date,deps:t,length:n,factory:e});for(r.async=!!n;n--&&Z.isInModules(t[n]););0>n?Z.factory.require(r):r.run()},h.use=h.async,c("factory",{require:function(t){var e=t.data(),n=e.deps.slice(0,e.length);return l(n,function(t,e){this[t]=d(e)},n),n.unshift(e.factory),pt.runFx.apply(t.remove(),n)}},Z),c("uri",{DOT_EXTNAME:/\.(js(?=$|#))/,HAS_EXT:/(?:(\.(?:css|js))|(.))(\?|\#|$)/,DOT:/(?:[^\/]*\/[^\/]*\.{2}\/|\/\.(?!\.))/,get:function(t){var e=Q.types[t];e||(t=t.split(X)[0]);var n=this.extname(t).toLowerCase(),r=this.path(/^(?:http[s]?|file)\:/.test(t)?t:t.realMI(),n),i={uri:t,type:pt.config[n],attr:{async:!0},suffix:n};return i.isScript=n==pt.config.JS,i.attr[x]=i.uri,i.attr[pt.config.src[i.type]]=r,u(i.attr,pt.config.data[i.type]),i},real:function(t){if(this.DOT.test(t))for(t=j+t;this.DOT.test(t);)t=t.replace(this.DOT,b);return t.replace(this.DOT_EXTNAME,b)},extname:function(t){var e=Z.toRealMI(t),n=Q.types[t];return n||(this.HAS_EXT.test(e),n=RegExp.$1 in pt.config?RegExp.$1:pt.config.JS),I(e,">",this.HAS_EXT.test(e)," : |",n,"|","color:#07afd8"),n},path:function(t,e){var n=/\?|#/.test(t)?"&":"?";return t=t.replace(this.HAS_EXT,"$2"+e+"$3"),t+(J&&n+J)||b}},Z),u(t,{define:g,require:h,modules:K},!0),o(_,h),o("_tools__",pt.pick(pt,["runFx","checkByType","pick"])),g.toString=h.toString=function(){return"function(){[native code]}"},Y=R.getAttribute(A),R.innerHTML){var ht="__runjs.inner__";g.call(ht,new Function("require","exports","module","__module_name",R.innerHTML)),h(ht,function(){v(),y()})}else v();t.DEBUG=t.DEBUG||!1,t.appendChild=S;var gt,yt}(window);