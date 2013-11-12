window.onload=function(){
	var a=document.getElementById('aa');
	a.onclick=function(){
		a.style.color='red';
		chrome.tabs.create({
			url:WebsiteUrl.baidu
		});
	}
}


var WebsiteUrl = {
	baidu: 'http://www.baidu.com',
	zhihu: 'http://www.zhihu.com'
}