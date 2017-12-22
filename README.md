# FrCapture
视频截图组件

版本支持：IE浏览器下没有测试过，chrome和firefox支持

#### 关于使用：
1. 快捷键 ctrl + alt + A
2. 默认初始化过一次，视频源默认是当前页面首个视频，图片默认保存格式是'image/jpeg'
3. ```captureSetting( { video: [可选], type: [可选] }, width: [可选], height: [可选] );```
 
#### 问题一：
chrome浏览器自从M53版本后开始禁用所有由脚本发起的默认响应，由```脚本触发超链接文件下载```是其中之一。
```javascript
// M53版本之前，脚本触发文件下载的方法
var aLink = document.createElement('a');
aLink.download = filename; // a标签的对于可识别文件的下载，要加上HTML5的新属性download

// 事件触发器
var event = document.createEvent('HTMLEvent');
event.initEvent('click', false, false);
aLink.dispatchEvent(event); // 脚本触发
```
**M53之后，可以由 click() 强制执行点击事件做到自动触发**

#### 问题二：
```出现如下报错：Tainted canvases may not be exported.```

这是因为canvas本身的安全机制对跨域作出了限制，其中一些涉及导出的方法，如toDataURL，不能对跨域资源进行操作。
简单的说，就是视频资源和网站不在同一个域下，所以报错。

**FrCapture.js更多是作为一段即时代码，直接放到console控制台中，然后运行。就可以通过快捷键对一个没有截图工具的网站进行视频截图。**

**SnapShot.js则是作为开发时导入的组件，可以给视频添加截图功能。(想法)**
