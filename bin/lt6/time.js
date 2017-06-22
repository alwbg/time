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
 * creation-time : 2017-06-22 18:35:54 PM
 */
;(function (global, factory) {
	if (typeof module === 'object') {
		//modejs
		module.exports = factory();
	} else if (typeof define === 'function') {
		//AMD CMD
		define(factory);
	} else {
		//window
		factory();
	}
}(this, function ( require, exports, module ) {	function run( O, name ){
		var args = Array.apply( null, arguments ), fx;
		O       = args.shift() || {};
		name    = args.shift();
		fx  	= name instanceof Function ? name : O[ name ] || function(){};
		return fx.apply( O, args );
	}
	//时间格式输出
	function T( mode ){
		this.mode 	= mode || 'YY/MM/DD';
		if( this.ampm.test( this.mode ) ){
			this.mode 	= this.mode.replace( this.ampm, 'ampm' );
			this.m 		= RegExp.$1.split( '|' );
		} else {
			this.m 		= [ 'am', 'pm' ];
		}
		this._mode_length__ 	= this.m.length;
		this.M 		= this.mode.match( /(?:MM|hh|DD|mm|ss|YYYY|YY|ampm|24h|12h)/g ) || [];
	}
	T.prototype.ampm = /\(([^\(\)]*)\)/;

	T.prototype.getYearShow2 = function( date ){
		return date.getFullYear() % 100
	}
	T.prototype.getHoursTo12 = function( date ){
		var hours = date.getHours();
		return hours > 12 ? hours % 12 : hours;
	}
	T.prototype.getAmOrPm = function( date ){
		var hours = date.getHours();
		return this.m[ Math.floor(hours * this._mode_length__ / 24) ];
		//return hours > 12 ? this.pm : this.am
	}
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
	T.prototype.date = function( time ){
		if( !/(string)|number/.test( typeof time ) ) return new Date();
		RegExp.$1 && ( time = String.prototype.replace.call( time, /[\.-]/g, '/' ) );
		return new Date( time );
	}
	T.prototype.fire = function( time ){
		var format = this.mode, L = this.M, key, _date = this.date( time ), isOwn;

		for( var i = 0, len = L.length; i < len; i++ ){
			key = this.Map[ L[ i ] ];
			isOwn = key in this;
			format = format.replace(
				L[ i ],
				run( isOwn ? this : _date, key, _date ) + ( isOwn ? '' : this.Map[ key ] || 0 )
			);
		}
		return this.lt10( format )
	}
	T.prototype.lt10 = function( val ){
		return val.replace( /(?:(\D)|^)(\d)(?!\d)/g, '$10$2' );
	}

	this.Time = T;
	return T
}));