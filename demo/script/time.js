/**
 * 时间输出模版
 * @author alwbg@163.com | soei
 * YYYY 年
 * MM  月
 * DD 	日
 * hh mm ss
 * MM|hh|DD|mm|ss|YYYY|YY|ampm|24h|12h
 * new Time( 'YY/mm/MM' ).fire()//输入当前时间
 * new Time( 'hh:mm:ss (凌晨|上午|下午|傍晚) YYYY/MM/DD' ).fire(1280207640000)//输入当前时间
 * 输出结果 > 13:14:00 下午 2010/07/27
 * new Time( '12h:mm:ss (凌晨|上午|下午|傍晚) YYYY/MM/DD' ).fire(1280207640000)//输入当前时间
 * 输出结果 > 01:14:00 下午 2010/07/27
 * 
 * creation-time : 2017-06-22 21:37:15 PM
 */
!function(t,e){"object"==typeof module?module.exports=e():"function"==typeof define?define(e):e()}(this,function(t,e,o){function r(t,e){var o,r=Array.apply(null,arguments);return t=r.shift()||{},e=r.shift(),o=e instanceof Function?e:t[e]||function(){},o.apply(t,r)}function n(t){this.mode=t||"YY/MM/DD",this.ampm.test(this.mode)?(this.mode=this.mode.replace(this.ampm,"ampm"),this.m=RegExp.$1.split("|")):this.m=["am","pm"],this._mode_length__=this.m.length,this.M=this.mode.match(/(?:MM|hh|DD|mm|ss|YYYY|YY|ampm|24h|12h)/g)||[]}return n.prototype.ampm=/\(([^\(\)]*)\)/,n.prototype.getYearShow2=function(t){return t.getFullYear()%100},n.prototype.getHoursTo12=function(t){var e=t.getHours();return e>12?e%12:e},n.prototype.getAmOrPm=function(t){var e=t.getHours();return this.m[Math.floor(e*this._mode_length__/24)]},n.prototype.Map={getMonth:1,YY:"getYearShow2",YYYY:"getFullYear",MM:"getMonth",DD:"getDate",hh:"getHours",mm:"getMinutes",ss:"getSeconds","24h":"getHours","12h":"getHoursTo12",ampm:"getAmOrPm"},n.prototype.date=function(t){return/(string)|number/.test(typeof t)?(RegExp.$1&&(t=String.prototype.replace.call(t,/[\.-]/g,"/")),new Date(t)):new Date},n.prototype.fire=function(t){for(var e,o,n=this.mode,i=this.M,h=this.date(t),s=0,p=i.length;p>s;s++)e=this.Map[i[s]],o=e in this,n=n.replace(i[s],r(o?this:h,e,h)+(o?"":this.Map[e]||0));return this.lt10(n)},n.prototype.lt10=function(t){return t.replace(/(?:(\D)|^)(\d)(?!\d)/g,"$10$2")},this.Time=n,n});