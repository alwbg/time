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
 * creation-time : 2017-06-27 22:17:25 PM
 */
;(function( global, factory ){
	global[ 'global' ] = global; 
	if( typeof exports === 'object' ) {
		factory( require, exports, module );
	} else if (typeof define === 'function') {
		//AMD CMD
		define( 'time', factory );
	} else {
		var module = { exports : {} }
		factory( new Function, module.exports, module );
		global['Time'] = module.exports;
	}
}( this, function( require, exports, module ) {
	function run( O, name ){
		var args = Array.apply( null, arguments ), fx;
		O       = args.shift() || {};
		name    = args.shift();
		fx  	= name instanceof Function ? name : O[ name ] || function(){};
		return fx.apply( O, args );
	}
	//时间格式输出
	function T( mode ){
		mode = mode || 'YY/MM/DD';
		var ampmStr;
		if( this._r_ampm__.test( mode ) ){
			mode 			= mode.replace( this._r_ampm__, 'ampm' );
			ampmStr 		= RegExp.$1.split( '|' );
		} else {
			ampmStr 		= [ 'am', 'pm' ];
		}
		this.mode 			= mode;
		this._ampm_list__ 	= ampmStr;
		this._Date 			= new Date();
		this._mode_length__	= this._ampm_list__.length;
		this.M 				= this.mode.match( /(?:MM|hh|DD|mm|ss|YYYY|YY|ampm|24h|12h)/g ) || [];
	}
	/**
	 * 只是新时间
	 * @param {Date} time Date时间对象
	 */
	T.prototype.setTime = function( time ){
		return this._Date.setTime( time ), this._Date;
	}
	/**
	 * 获取当前时间戳
	 */
	var now = Date.now || function(){
		return new Date;
	}
	/**
	 * 获取时间划分范围
	 * @type {RegExp}
	 */
	T.prototype._r_ampm__ = /\(([^\(\)]*)\)/;

	/**
	 * 获取两位年显示
	 * @param  {Date} date 时间对象
	 * @return {Number}    返回获取的时间
	 */
	T.prototype.getYearShow2 = function( date ){
		return date.getFullYear() % 100
	}
	/**
	 * 获取时间显示格式为 12小时制
	 * @param  {Date} date 时间对象
	 * @return {Number}    返回12制的时间
	 */
	T.prototype.getHoursTo12 = function( date ){
		var hours = date.getHours();
		return hours > 12 ? hours % 12 : hours;
	}
	/**
	 * 获取时间划分段
	 * @param  {Date} date 时间对象
	 * @return {String}    返回匹配到的时间段 ['am', 'pm'] 或者自定义的类型中的一种
	 */
	T.prototype.getAmOrPm = function( date ){
		var hours = date.getHours();
		return this._ampm_list__[ Math.floor(hours * this._mode_length__ / 24) ];
	}
	/**
	 * 时间对象显示对应的方法名称
	 * @type {Object}
	 */
	T.prototype.Map = {
		'getMonth' 	: 1,

		'YY' 		: 'getYearShow2',
		'YYYY' 		: 'getFullYear',
		'MM' 		: 'getMonth',
		'DD' 		: 'getDate',

		'hh' 		: 'getHours',
		'mm' 		: 'getMinutes',
		'ss' 		: 'getSeconds',

		'24h' 		: 'getHours',
		'12h' 		: 'getHoursTo12',

		'ampm' 		: 'getAmOrPm'
	}
	/**
	 * 获取时间对象
	 * @param  {Number} time 时间
	 * @return {Date}        返回设置后的时间对象
	 */
	T.prototype.date = function( time ){
		if( !/(string)|number/.test( typeof time ) ) return this.setTime( now() );
		RegExp.$1 && ( time = String.prototype.replace.call( time, /[\.-]/g, '/' ) );
		return this.setTime( time );
	}
	/**
	 * 执行要显示的函数
	 * @param  {Number} time 时间戳
	 * @return {String}      时间格式化后的字符串
	 */
	T.prototype.fire = function( time ){
		var format = this.mode, L = this.M, key, _date = this.date( time ), isOwn;

		for( var i = 0, len = L.length; i < len; i++ ){
			key 	= this.Map[ L[ i ] ];
			isOwn 	= key in this;
			format 	= format.replace(
				L[ i ],
				run( isOwn ? this : _date, key, _date ) + ( isOwn ? '' : this.Map[ key ] || 0 )
			);
		}
		return this.lt10( format )
	}
	/**
	 * 匹配小于两位显示为两位
	 * @param  {String} val 要显示的数值
	 * @return {String}     输出显示的值
	 */
	T.prototype.lt10 = function( val ){
		return val.replace( /(?:(\D)|^)(\d)(?!\d)/g, '$10$2' );
	}

	module.exports = T;
}))