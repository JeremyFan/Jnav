window.onload = function() {
	ctrlMonitor();
	setWebsiteData();

	bindButtonEvents();
}

/// 记录当前ctrl键是否被按下
var isPressCtrl = false;
/// 监听ctrl键
function ctrlMonitor() {
	var body = document.getElementById('b');
	body.onkeydown = function(e) {
		if (e.ctrlKey)
			isPressCtrl = true;
	}
	body.onkeyup = function(e) {
		if (e.ctrlKey)
			isPressCtrl = true;
	}
}

/// 遍历数据，设置网址
function setWebsiteData() {
	var content = document.getElementById('website');

	var ul1 = document.getElementById('m-list-1');
	var ul2 = document.getElementById('m-list-2');
	var ul3 = document.getElementById('m-list-3');

	for (var i in Website) {
		var website = Website[i];
		var li = document.createElement('li');
		var a = document.createElement('a');
		a.innerHTML = website.text;
		a.style.backgroundImage = website.logo == undefined ? 'url(http://developer.chrome.com/static/images/chrome-logo.png)' : website.logo;
		li.appendChild(a);
		content.appendChild(li);
		document.getElementById('m-list-'+website.type).appendChild(li);

		// 绑定单击事件
		li.onclick = (function(url) {
			return function() {
				chrome.tabs.create({
					url: url,
					// isPressCtrl控制打开的tab是否为活动页
					active: !isPressCtrl
				});
			}
		})(website.url);
	}
}

function bindButtonEvents(){
	// 切换导航和书签
	var btnr=document.getElementById('btn-r');
	btnr.onclick=function(){
		// var website=document.getElementById('website');
		// var bookmark=document.getElementById('bookmark');
		// website.style.display=website.style.display==''?'none':'';
		// bookmark.style.display=bookmark.style.display==''?'none':'';

		if(website.style.display==''){
			website.style.display='none';
			var title=document.getElementById('title');
			title.innerHTML='书签';
			bookmark.style.display='';
		}
		else{
			bookmark.style.display='none';
			var title=document.getElementById('title');
			title.innerHTML='导航';
			website.style.display='';
		}
	}
}






/// 网址数据
var Website = {
	RedMine: {
		text: 'RedMine',
		url: 'http://192.168.1.21:3000/redmine/',
		logo: 'url(http://192.168.1.21:3000/redmine/favicon.ico?1367421402)',
		type: 0
	},
	Hotmail: {
		text: 'Hotmail',
		url: 'http://www.hotmail.com',
		logo: 'url(https://a.gfx.ms/OLFav.ico)',
		type: 1
	},
	_126mail: {
		text: '126邮箱',
		url: 'http://mail.126.com',
		logo: 'url(http://www.126.com/favicon.ico)',
		type: 1
	},
	noaharkmail: {
		text: 'noahark邮箱',
		url: 'http://mail.noahark.com.cn',
		type: 1
	},
	cnBlogs: {
		text: '博客园',
		url: 'http://www.cnblogs.com',
		logo: 'url(http://static.cnblogs.com/favicon.ico)',
		type: 2
	},
	MSDN: {
		text: 'MSDN库',
		url: 'http://msdn.microsoft.com/library',
		type: 2
	},
	StackOverflow: {
		text: 'StackOverflow',
		url: 'http://stackoverflow.com/',
		logo: 'url(http://cdn.sstatic.net/stackoverflow/img/favicon.ico)',
		type: 2
	},
	Codecademy: {
		text: 'Codecademy',
		url: 'http://wwww.codecademy.com/',
		// logo加载速度太慢，不知道为什么
		// logo:'url(http://www.codecademy.com/favicon.ico)'
		type: 2
	},
	MDN: {
		text: 'MDN',
		url: 'https://developer.mozilla.org',
		logo: 'url(https://developer.cdn.mozilla.net/media/img/favicon.ico)',
		type: 3
	},
	jQuery: {
		text: 'jQuery',
		url: 'http://jquery.com',
		logo: 'url(http://jquery.com/jquery-wp-content/themes/jquery.com/i/favicon.ico)',
		type: 3
	},
	NEC: {
		text: 'NEC',
		url: 'http://nec.netease.com',
		// logo: 'url(http://nec.netease.com/img/favicon.ico)',
		type: 3
	},
	Feedly: {
		text: 'Feedly',
		url: 'http://www.feedly.com/',
		type: 2
	},
	iShare: {
		text: '爱问共享',
		url: 'http://ishare.iask.sina.com.cn/',
		type: 4
	},
	Zhihu: {
		text: '知乎',
		url: 'http://www.zhihu.com/',
		logo: 'url(http://static.zhihu.com/static/favicon.ico)',
		type: 4
	},
	Quara: {
		text: 'Quara',
		url: 'http://www.quora.com/',
		type: 4
	}
}