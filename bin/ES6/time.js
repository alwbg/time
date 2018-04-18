class Time extends Date {
	/**
	 * 构造函数
	 * @param  {String} mode 格式化输出模版
	 */
	constructor( mode = 'YY/MM/DD', mark = false ){
		super( mark ? mode : null );
		if( ! mark ){
			this.__init();
			this.__Mode( mode );
		}
	};
	/**
	 * 初始化函数
	 */
	__init(){
		this._map__ = {
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
		this._r_mode__ 	= /(?:MM|hh|DD|mm|ss|YYYY|YY|ampm|24h|12h)/g;
		this._r_ampm__  = /\(([^\(\)]*)\)/;

		this._a_r_lt10__ = [/(?:(\D)|^)(\d)(?!\d)/g, '$10$2' ];

		this._is_str_or_num__ = /(string)|number/;
		return this;
	}
	__Mode( mode ){
		this.source = mode;
		mode = mode + '';
		var ampmStr;
		if( this._r_ampm__.test( mode ) ){
			mode        = mode.replace( this._r_ampm__, 'ampm' );
			ampmStr 	= RegExp.$1.split( '|' );
		} else {
			ampmStr 	= [ 'am', 'pm' ];
		}
		this._ampm_list__ 	    = ampmStr;
		this._mode_length__     = ampmStr.length;
		this.M 	        		= mode.match( this._r_mode__ ) || [];
		this.mode       		= mode;
		return this;		
	}
	/**
	 * 获取两位年显示
	 */
	getYearShow2( T ){
		return T.getFullYear() % 100
	}
	/**
	 * 12h
	 */
	getHoursTo12( T ){
		var hours = T.getHours();
		return hours > 12 ? hours % 12 : hours;
	}

	getAmOrPm( T ){
		var hours = T.getHours();
		//console.log( T._ampm_list__ )
		return T._ampm_list__[ Math.floor( hours * T._mode_length__ / 24) ];
	}
	date( time ){
		if( ! this._is_str_or_num__.test( typeof time ) ) return this.setTime( Time.now() ), this;
		RegExp.$1 && ( time = String.prototype.replace.call( time, /[\.-]/g, '/' ) );
		return this.setTime( time ), this;//new Time( time, true ).__init().__Mode( this.source );
	}

	fire( time ){
		var L = this.M, key, T = this.date( time ), format = this.mode, args;
		//console.log( this == T, typeof T, typeof this, T instanceof Time, T instanceof Date )
		for( var i = 0, len = L.length; i < len; i++ ){
			key = this._map__[ L[ i ] ];
			//console.log( key, Date.prototype.hasOwnProperty( key ) );
			format = format.replace(
				L[ i ],
				this.run( 
					T,
					this[ key ],
					Date.prototype.hasOwnProperty( key ) ? null : [ T ] 
				) + ( this._map__[ key ] || '' )
			);
		}
		return this.lt10( format )
	}
	/**
	 * <10
	 */
	lt10( val ){
		return val.replace( ...this._a_r_lt10__ );
	}
	/**
	 * 执行相应的方法
	 */
	run( T, fx =()=>{}, args ){
	    return fx.apply( T, args );
	}
}
module.exports = Time;