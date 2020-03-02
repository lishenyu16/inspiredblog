
const getPath = require("./getPath");
/**
 * 【获取entry文件入口】
 *
 * @param {String} path 引入根路径
 * @returns {Object} 返回的entry { "about/aoubt":"./src/about/about.js",...}
 */
module.exports = function getEnty(path){
	let entry = {};
	getPath(path).map((item)=>{ //[index, todo].map
		/**
		 * 下面输出格式为{"about/about":".src/aobout/index.js"}
		 * 这样目的是为了将js打包到对应的文件夹下
		 */
		entry[`${item}/${item}`] = `${path}/${item}/index.js`;
	});
	return entry; //{ 'index/index': 'src/pages/index/index.js', 'todo/todo': 'src/pages/todo/index.js}
};
