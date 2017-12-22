/**
 * @desc 视频截图组件
 * @author black-white
 * @export {Function} captureSetting
 * @exportParam {Object} setting
 * @setting {HTMLElement} video 视频
 * @setting {String} type 图片的保存格式 default:'image/jpeg'
 * @time 2017-12-10
 * @help 快捷键ctrl + alt + A
 * @support 支持HTML5的浏览器
 */

(function(window, document){
	var video, type, width, height; // 视频 & 图片保存格式 & 宽、高

	var captureSetting = function(setting){
		setting || (setting = {}); 

		// 设置
		video = setting.video || document.getElementsByTagName('video')[0];
		
		// 判断是否存在视频, 不存在, 抛出异常提示
		if(!video){
			throw new Error('the current page there is no HTMLVideoElement');
		}
		
		type = setting.type || 'image/jpeg';
		width = setting.width || video.clientWidth;
		height = setting.height || video.clientHeight;

		return arguments.callee;
	}(); // 自执行初始化一次


	// 兼容IE的事件监听函数
	document.onkeydown = function(e){
		e = e || window.event;
		// 按下ctrl + alt + A
		if(e.keyCode === 65 && e.ctrlKey && e.altKey){
			screenShot(video, type);
		}
	};


	// 视频截图函数
	function screenShot(video, type){
		// 创建画布
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		var context = canvas.getContext('2d');

		// 截图(来自视频)
		context.drawImage(video, 0, 0, canvas.width, canvas.height);

		// 数据格式处理
		type || (type = 'image/jpeg');
		var dataUrl = canvas.toDataURL(type); // 将当前canvas内容 → base64图片

		// 下载
		downloadImg('', dataUrl, type);
	}


	// 数据格式转换: base64 → blob
	function base64Img2Blob(base64Img){
		// 分析base64组成 & 切割处理
		var parts = base64Img.split(';base64,');
		var contentType = parts[0].split(':')[1];
		var raw = window.atob(parts[1]);
		var rawLength = raw.length;

		var arr = new Uint8Array(rawLength);

		for (var i = 0; i < rawLength; i++) {
			arr[i] = raw.charCodeAt(i);
		}

		return new Blob([arr.buffer], {type: contentType}); 
	}
	

	// 图片下载
	function downloadImg(fileName, base64Img){
		var aLink = document.createElement('a');
		aLink.download = fileName;
		var blob = base64Img2Blob(base64Img); // base64 → blob
		aLink.href = window.URL.createObjectURL(blob);
		document.body.appendChild(aLink); // firefox下需要渲染到DOM树中，才能通过click()脚本触发下载
		aLink.click(); // 脚本触发
	}


	// 接口
	window.captureSetting = captureSetting;

})(window, document);

