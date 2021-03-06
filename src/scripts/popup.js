window.onload = function() {
	// addPrototypeMethods();
	ctrlMonitor();
	setWebsiteData();
	// setBookmarkData();
	// bindButtonEvents();
}


/// 记录当前ctrl键是否被按下
var isPressCtrl = false;
/// 记录当前的键盘输入
var currentInput = 0;
/// 监听ctrl键
function ctrlMonitor() {
	var body = document.getElementById('b');
	if(!body) return;
	body.onkeydown = function(e) {
		// debugger;
		if (e.ctrlKey)
			isPressCtrl = true;
	}
	body.onkeyup = function(e) {
		if (e.ctrlKey)
			isPressCtrl = false;
	}

	body.onkeypress=function(e){
		var key=e.which-48,
			select;
		if(currentInput===0){
			if(key>=1&&key<=9){
				currentInput=key;
			}
		}
		else if(currentInput>=1&&currentInput<=9){
			var catalogs=document.querySelectorAll('#website ul');
			var catalog=catalogs[currentInput-1];
			if(typeof catalog!=='undefined'){
				var sites=catalog.querySelectorAll('li');
				var site=sites[key-1];
				if(typeof site!=='undefined'){
					createNewTab(site.getAttribute('data-url'));
					currentInput=0;
				}
			}
		}
	}
}

/// 遍历数据，设置网址
function setWebsiteData() {
	chrome.storage.sync.get(function(result){
		var content = $('#website'),
		 	cataArr=[],
			siteArr=[],
			ul, span,
			li, a, img,
			item,
			i;

		for(i in result){
			item=result[i];
			if(item.type==='cata'){
				cataArr.push(item);
			}
			else if(item.type==='site'){
				siteArr.push(item);
			}
		}

		for(i=0;i<cataArr.length;i++){
			item=cataArr[i];
			ul=document.createElement('ul');
			ul.id=item.id;
			span=document.createElement('span');
			span.innerHTML=item.name;
			ul.appendChild(span);
			content.appendChild(ul);
		}

		for(i=0;i<siteArr.length;i++){
			item=siteArr[i];
			ul=document.querySelector('#'+item.catalog);
			li=document.createElement('li');
			li.setAttribute('data-url',item.url);
			a=document.createElement('a');
			a.innerHTML=item.name;
			// TODO: icon加载失败时使用默认icon代替
			a.addClass('site-item');
			img=document.createElement('img');
			img.addClass('favicon');
			img.src=item.url.replace(/(\.com|cn|net|fm|me|org|name|tv|co|info)(\/.*|$)/, '$1/favicon.ico');
			img.onerror=function(){
				this.src='images/logo_chrome.png';
			}
			a.appendChild(img);
			li.appendChild(a);
			ul.appendChild(li);

			li.onclick=function(){
				var url=this.getAttribute('data-url');
				createNewTab(url);
			}
		}

	})
}

function createNewTab(url){
	chrome.tabs.create({
		url:url,
		// isPressCtrl控制打开的tab是否为活动页
		active: !isPressCtrl
	})
}


/*
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
			bookmark.addClass('a-fadein');
			bookmark.removeClass('f-hide');
		}
		else{
			bookmark.addClass('f-hide');
			$('#title').innerHTML='导航';
			website.addClass('a-fadein');
			website.removeClass('f-hide');
		}
	}
}

*/