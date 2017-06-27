时间格式化输出
================
```javascript
/*YYYY 年
MM  月
DD   日
hh mm ss
MM|hh|DD|mm|ss|YYYY|YY|ampm|24h|12h */
/*1*/
require( 'time', function( Time ){
    new Time( 'YY/mm/MM' ).fire()//输入当前时间  
} )
/*2*/
var Time = require( 'time' );
new Time( 'hh:mm:ss (凌晨|上午|下午|傍晚) YYYY/MM/DD' ).fire(1280207640000)//输入当前时间
//输出结果 > 13:14:00 下午 2010/07/27
/*3.*/
new Time( '12h:mm:ss (凌晨|上午|下午|傍晚) YYYY/MM/DD' ).fire(1280207640000)//输入当前时间
//输出结果 > 01:14:00 下午 2010/07/27
```
