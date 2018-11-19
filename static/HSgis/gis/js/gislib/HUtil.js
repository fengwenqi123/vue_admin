/**
 * GIS辅助工具集
 * created by zj on 2018.9.6
 */

var HUtil = (function(){
	return {
		/**
		 * 设置cookie
		 * @param {String} name
		 * @param {String|Number|Boolean} value
		 */
		createCookie : function(name,value){
			$.cookie(name,value,{expires:365});
		},
		/**
		 * 读取cookie
		 * @param {String} name
		 */
		readCookie : function(name){
			return $.cookie(name);
		},
		/**
		 * 删除cookie
		 * @param {String} name
		 */
		deleteCookie : function(name){
			$.cookie(name, null);
		},
		/**
		 * 日期字符串转时间戳 2018-9-26 10:20:01
		 * @param {String} timeStr
		 * @return {Date} timeDate 时间戳  1537928401000
		 */
		strToDateforSecond : function(timeStr){
			var tDate = new Date(timeStr);
			var timeDate = Date.parse(tDate);
			return timeDate;
		}
	};
})()

