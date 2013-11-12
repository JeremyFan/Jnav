

window.onload=function(){
	ctrlMonitor();
	setWebsiteData();
}

/// 记录当前ctrl键是否被按下
var isPressCtrl=false;
/// 监听ctrl键
function ctrlMonitor(){
	var body=document.getElementById('b');
	body.onkeydown=function(e){
		if(e.ctrlKey)
			isPressCtrl=true;
	}
	body.onkeyup=function(e){
		if(e.ctrlKey)
			isPressCtrl=true;
	}
}

/// 遍历数据，设置网址
function setWebsiteData(){
	var content=document.getElementById('website');

	for(var i in Website){
		var website=Website[i];
		var a=document.createElement('a');
		a.innerHTML=website.text;
		a.style.backgroundImage=website.logo;
		content.appendChild(a);

		a.onclick=function(){
			chrome.tabs.create({
				url:website.url,
				// isPressCtrl控制打开的tab是否为活动页
				active:!isPressCtrl
			});
		}
	}
}

/// 网址数据
var Website = {
	cnBlogs:{
		text:'博客园',
		url:'http://www.cnblogs.com',
		logo:'url(http://static.cnblogs.com/favicon.ico)'
	},
	jQuery:{
		text:'jQuery',
		url:'http://jquery.com',
		logo:'url(http://jquery.com/jquery-wp-content/themes/jquery.com/i/favicon.ico)'
	},
	NEC:{
		text:'NEC',
		url:'http://nec.netease.com',
		logo:'url(http://nec.netease.com/img/favicon.ico)'
	}
}
