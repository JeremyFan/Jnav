window.onload = function() {
	addPrototypeMethods();
	ctrlMonitor();
	setWebsiteData();
	setBookmarkData();

	bindButtonEvents();
}

// 增加原型方法
function addPrototypeMethods() {
	// 添加样式
	HTMLElement.prototype.addClass = function(className) {
		this.className += ' ' + className;
	}
	// 删除样式
	HTMLElement.prototype.removeClass = function(className) {
		this.className = this.className.replace(' ' + className, '');
	}
}

// 增加一个获取元素的方法
function $(eleId) {
	eleId = eleId.replace('#', '');
	return document.getElementById(eleId);
}
/// 记录当前ctrl键是否被按下
var isPressCtrl = false;
/// 监听ctrl键
function ctrlMonitor() {
	var body = document.getElementById('b');
	body.onkeydown = function(e) {
		// debugger;
		if (e.ctrlKey)
			isPressCtrl = true;
	}
	body.onkeyup = function(e) {
		if (e.ctrlKey)
			isPressCtrl = false;
	}
}

/// 遍历数据，设置网址
function setWebsiteData() {
	var content = $('#website');
	for (var i in Website) {
		var website = Website[i];
		var li = document.createElement('li');
		var a = document.createElement('a');
		a.innerHTML = website.text;
		a.style.backgroundImage = website.logo == undefined ? 'url(images/logo_chrome.png)' : website.logo;
		li.appendChild(a);
		content.appendChild(li);
		$('#m-list-'+website.type).appendChild(li);

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

function setBookmarkData(){
	var content=$('#bookmark');
	var bmTree;
	chrome.bookmarks.getTree(function(data){
		data[0].children.forEach(function(item){
			processNode(item);
		});
	});
}


function processNode(item) {
	if (item.children) {
		// debugger;
		var ul        =document.createElement('ul');
		var container = document.createElement('ul');
		var a         = document.createElement('a');
		
		a.innerHTML      = '[+]'+item.title;
		ul.id            = 'ul_' + item.id;
		ul.appendChild(a);
		container.id     ='ul-container_'+item.id;
		ul.appendChild(container);

		var li=document.createElement('li');
		li.appendChild(ul);
		// id=1和id=2时是‘书签栏’和‘其他书签’两个文件夹，直接添加到bookmark
		// id>2时，添加到所属文件夹
		var content = (item.id <= 2) ? $('#bm-tree') : $('#ul-container_' + item.parentId);

		content.appendChild(li);

		a.onclick = function() {
			// 文件夹折叠/展开符号
			a.innerHTML = a.innerHTML.indexOf('[+]')==0 ? a.innerHTML.replace('[+]', '[ - ]') : a.innerHTML.replace('[ - ]', '[+]');
			// 如果p已经被展开过，则不用再去加载子节点
			if (this.expand) {
				if (this.nextSibling.className.indexOf('f-hide') == -1)
					this.nextSibling.addClass('f-hide');
				else
					this.nextSibling.removeClass('f-hide');
				return;
			}
			item.children.forEach(function(child) {
				processNode(child);
				a.expand = true;
			});
		}
	}
	if (item.url) {
		var li = document.createElement('li'),
			a=document.createElement('a');
		a.innerHTML = item.title;
		a.className='bm-atom';
		a._href=item.url;
		li.appendChild(a);
		$('#ul-container_' + item.parentId).appendChild(li);

		li.onclick=function(){
			// 打开标签页
			chrome.tabs.create({
				url:a._href,
				active: !isPressCtrl
			});
		}
	}
}


function bindButtonEvents(){
	// 切换导航和书签
	var website=$('#website'),
		bookmark=$('#bookmark');
	$('#btn-r').onclick=function(){
		if(website.className.indexOf('f-hide')==-1){
			website.addClass('f-hide');
			$('#title').innerHTML='书签';
			bookmark.removeClass('f-hide');
		}
		else{
			bookmark.addClass('f-hide');
			$('#title').innerHTML='导航';
			website.removeClass('f-hide');
		}
	}
}