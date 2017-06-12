(function( self, factory ){
	if( ! self.document && ! self.window ){
		factory( require, exports, module )
	} else if( typeof define != 'Undefined' ){
		define( factory )
	} else{
		console.log( 'error message! Need AMD or CMD Code' )
	}
})( this, function( require, exports, module ){
	/**
	 * 时间输出模版
	 * @author alwbg@163.com | soei
	 * @create(16-03-24 16:35) 
	 * @update(17-06-08 22:00) 
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
	 */
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
			return T._ampm_list__[ Math.floor( hours * T._mode_length__ / 24) ];
		}
		date( time ){
			if( ! this._is_str_or_num__.test( typeof time ) ) return this.setTime( Time.now() ), this;
			RegExp.$1 && ( time = String.prototype.replace.call( time, /[\.-]/g, '/' ) );
			return this.setTime( time ), this;
		}
		/**
		 * 格式化时间戳
		 * @param  {NULL|Number} time 需要处理的时间戳
		 * @return {String}      为空输出当前时间格式化后的 非空时间戳数字类型返回结构为时间戳代表的时间
		 */
		fire( time ){
			var L = this.M, key, T = this.date( time ), format = this.mode, args;
			for( var i = 0, len = L.length; i < len; i++ ){
				key = this._map__[ L[ i ] ];
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
	
})