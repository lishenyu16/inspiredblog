
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");//生成html文件
const getPath = require("./getPath");
let htmlArr = [];
function createHtml(page_path){
	getPath(page_path).map((item)=>{
		let infoJson ={},infoData={};
		try{
			// 读取pageinfo.json文件内容，如果在页面目录下没有找到pageinfo.json 捕获异常
			infoJson = fs.readFileSync(`${page_path}/${item}/pageinfo.json`,"utf-8");//
			infoData = JSON.parse(infoJson);
		}catch(err){
			infoData = {};
		}
		htmlArr.push(new HtmlWebpackPlugin({
			title:infoData.title ? infoData.title : "Inspirations",
			meta:{
				keywords: infoData.keywords ? infoData.keywords : "blogs",
				description:infoData.description ? infoData.description : "inspired blogs"
			},
			chunks:[`${item}/${item}`], //引入的js: myStory/myStory.bundle.js
			template: "./src/pages/index.html",
			filename : item == "index" ? "index.html" : `${item}/index.html`, //html位置
			minify:{//压缩html
				collapseWhitespace: true,
				preserveLineBreaks: true
			},
			// favicon: "./src/pages/logo.png"
		}));
	});
	return htmlArr;
}


module.exports = createHtml;
