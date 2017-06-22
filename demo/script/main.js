define( 'main', function( require, exports, modules ){
	var Time = require( 'time' );
	var t = new Time( 'hh:mm:ss (凌晨|上午|下午|傍晚) YYYY/MM/DD' )
	console.log( 'Time', t.fire(1280207640000) )
	//输出 : Time 13:14:00 下午 2010/07/27
	console.log( 'Time', t.fire() )// 获取当前时间
	//输出 : Time 21:44:00 傍晚 2017/06/22
} )