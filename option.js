window.onload=function(){
	initButtonEvent();
	initNav();
	initData();
}

/// 初始化页面按钮事件
function initButtonEvent(){
	var btnSiteCreate=document.querySelector('#btnSiteCreate'),
		btnCataCreate=document.querySelector('#btnCataCreate'),
		btnExport=document.querySelector('#export'),
		btnImport=document.querySelector('#import'),
		importFile=document.querySelector('#import-file');
	btnSiteCreate.onclick=function(){
		showBox(this, BoxType.Sitebox);
	}
	btnCataCreate.onclick=function(){
		showBox(this, BoxType.Catabox);
	}
	btnExport.onclick=function(){
		exportOptionFile(this);
	}
	btnImport.onclick=function(){
		importOptionFile(this);
	}
	importFile.onchange=function(){
		setImportData(this);
	}
}

/// 初始化导航栏
function initNav(){
	var	$nav=document.querySelectorAll('.main .nav'),
		$lis=document.querySelectorAll('.main .nav li'),
		$as=document.querySelectorAll('.main .nav li a'),
		$tabs=document.querySelectorAll('.main .tab'),
		$li,$a,$tab,i,j,k;

	for(i=0;i<$as.length;i++){
		$as[i].onclick=function(){
			$li=this.parentNode;
			$tab=$(this.attributes['href'].value);
			for(j=0;j<$lis.length;j++){
				$lis[j].removeClass('active');
			}
			$li.addClass('active');
			for(k=0;k<$tabs.length;k++){
				$tabs[k].removeClass('active');
			}
			$tab.addClass('active');
		}
	}
}


/// 分类的数据
var cataArr=[];

/// 初始化数据
function initData(){
	var siteTableBody=document.querySelector('#tbSite tbody'),
		ulCatalog=document.querySelector('#ulCatalog');
	chrome.storage.sync.get(function(result){
		window.result=result;
		var siteArr=[],
			item,
			i,
			tr,
			li;

		cataArr=[];
		for(i in result){
			item=result[i];
			if(item.type==='cata'){
				cataArr.push(item);
			}
			else if(item.type==='site'){
				siteArr.push(item);
			}
		}
		
		siteTableBody.innerHTML='';
		for(i=0;i<siteArr.length;i++){
			item=siteArr[i];
			tr=document.createElement('tr');
			tr.id=item.id;
			tr.setAttribute('data-name',item.name);
			tr.setAttribute('data-url',item.url);
			tr.setAttribute('data-catalog',item.catalog);
			tr.innerHTML='<td>'+item.name+'</td><td>'+item.url+'</td><td>'+item.catalog+'</td>';
			tr.onclick=function(){
				showBox(this, BoxType.Sitebox);
			}
			siteTableBody.appendChild(tr);
		}

		ulCatalog.innerHTML='';
		for(i=0;i<cataArr.length;i++){
			item=cataArr[i];
			li=document.createElement('li');
			li.id=item.id;
			li.setAttribute('data-name',item.name);
			li.innerHTML=item.name;
			li.onclick=function(){
				showBox(this, BoxType.Catabox);
			}
			ulCatalog.appendChild(li);
		}
	})
}

/// 显示编辑框
function showBox(ele, boxType){
	var isCreate= ele.type==='button',
	 	body=document.body,
	    mask=document.createElement('div'),
		bodyHeight=document.documentElement.scrollHeight,
		bodyWidth=document.documentElement.scrollWidth,
		tabCatalog=document.querySelector('#tabCatalog'),
		box;

	mask.id='mask';
	body.appendChild(mask);
	mask.style.height=bodyHeight+'px';
	mask.style.width=bodyWidth+'px';

	if(boxType===BoxType.Sitebox){
		box=createSitebox(body, ele, isCreate);
		initSiteEvent(body, mask, box, ele, isCreate);
	}
	else if(boxType===BoxType.Catabox){
		box=createCatabox(body, ele, isCreate);
		initCataEvent(body, mask, box, ele, isCreate);
	}
}

/// 编辑框类型
var BoxType=
	{
		Sitebox:1,
		Catabox:2
	}

/// 初始化地址编辑框按钮事件
function initSiteEvent(body, mask, sitebox, ele, isCreate){
	var btnDelete=document.querySelector('.sitebox .btn-del'),
		btnSiteSave=document.querySelector('.sitebox #btnSiteSave'),
		btnSiteCancel=document.querySelector('.sitebox #btnSiteCancel'),
		btnClose=document.querySelector('.sitebox .close');

	// 删除
	if(!isCreate){
		btnDelete.onclick=function(){
			if(confirm('确定吗？')){
				chrome.storage.sync.remove(ele.id,function(){
					body.removeChild(mask);
					body.removeChild(sitebox);
					initData();
				})
			}
		}	
	}

	// 保存
	btnSiteSave.onclick=function(){
		var name=document.querySelector('.sitebox .name').value,
			url=document.querySelector('.sitebox .url').value,
			catalog=document.querySelector('#selCatalog').value,
			id,
			obj={};
		// TODO: catalog可以为空，catalog不填算未分类
		if(name===''||url===''||catalog===''){
			alert('请输入catalog name');
			return;
		}	

		// 新建保存
		if(isCreate){
			obj[name]={
				id:name,
				name:name,
				url:url,
				catalog:catalog,
				type:'site'
			}
			chrome.storage.sync.set(obj,function(){
				body.removeChild(mask);
				body.removeChild(sitebox);
				initData();
			})

		}
		// 编辑保存
		else{
			id=ele.id;
			obj[id]={
				id:id,
				name:name,
				url:url,
				catalog:catalog,
				type:'site'
			};

			chrome.storage.sync.set(obj,function(){
				body.removeChild(mask);
				body.removeChild(sitebox);
				initData();
			})
		}
	}
	// 关闭编辑框
	btnSiteCancel.onclick=btnClose.onclick=mask.onclick=function(){
		body.removeChild(mask);
		body.removeChild(sitebox);
	}
}

/// 初始化分类编辑框按钮事件
function initCataEvent(body, mask, catabox, ele, isCreate){
	var btnDelete=document.querySelector('.catabox .btn-del'),
	 	btnCataSave=document.querySelector('.catabox #btnCataSave'),
		btnCataCancel=document.querySelector('.catabox #btnCataCancel'),
		btnClose=document.querySelector('.catabox .close');

	// 删除
	if(!isCreate){
		btnDelete.onclick=function(){
			if(confirm('确定吗？')){
				chrome.storage.sync.remove(ele.id,function(){
					body.removeChild(mask);
					body.removeChild(catabox);
					initData();
				})
			}
		}
	}


	// 保存
	btnCataSave.onclick=function(){
		var name=document.querySelector('.catabox .name').value,
			id,
			obj={};

		if(name===''){
			alert('请输入catalog name');
			return;
		}	

		// 新建保存
		if(isCreate){
			obj[name]={
				id:name,
				name:name,
				type:'cata'
			}
			chrome.storage.sync.set(obj,function(){
				body.removeChild(mask);
				body.removeChild(catabox);
				initData();
			})

		}
		// 编辑保存
		else{
			id=ele.id;
			obj[id]={
				id:id,
				name:name,
				type:'cata'
			};

			chrome.storage.sync.set(obj,function(){
				// alert('set okay');
				body.removeChild(mask);
				body.removeChild(catabox);
				// ele.innerHTML=name;
				initData();
			})
		}
	}

	// 关闭编辑框
	btnCataCancel.onclick=btnClose.onclick=mask.onclick=function(){
		body.removeChild(mask);
		body.removeChild(catabox);
	}
}

/// 创建地址编辑框
function createSitebox(container, ele, isCreate){
	var sitebox=document.createElement('div'),
		selValue;
	sitebox.className='sitebox active';
	sitebox.innerHTML=
				'<h3 class="title">'+(isCreate?'新建地址':'编辑地址')+'</h3>'+
				(isCreate?'':'<a class="btn-del">我要删除这个地址</a>')+
				'<span class="close">x</span>'+
				'名称：<input type="text" class="name" placeholder="site name"'+(isCreate?'':'value="'+ele.attributes['data-name'].value+'"')+'/>'+
				'地址：<input type="text" class="url" placeholder="http://"'+(isCreate?'':'value="'+ele.attributes['data-url'].value+'"')+' />'+
				// '分类：<input type="text" class="catalog" placeholder="catalog"'+(isCreate?'':'value="'+ele.attributes['data-catalog'].value+'"')+' />'+
				'分类：<select id="selCatalog"></select>'+
				'<div class="button-wrap">'+
					'<button type="button" class="btn-ok" id="btnSiteSave">保存</button>'+
					'<button type="button" id="btnSiteCancel">取消</button>'+
				'</div>';
	container.appendChild(sitebox);

	sitebox.style.top=getElementOffsetTop(ele)+'px';
	sitebox.style.left=getElementOffsetLeft(ele)+'px';

	selValue=ele.attributes['data-catalog'];
	initSelCatalog(selValue?selValue.value:'');

	return sitebox;
}

/// 初始化地址编辑中的分类选择框
function initSelCatalog (defaultValue) {
	var selCatalog=document.querySelector('#selCatalog'),
		data=cataArr,
		item,i,
		option;

	for(i=0;i<data.length;i++){
		item=data[i];
		option=document.createElement('option');
		option.setAttribute('value',item.id);
		option.innerHTML=item.name;
		if(item.id===defaultValue){
			// TODO: 更好的设置布尔属性的方式
			option.setAttribute('selected','selected');
		}
		selCatalog.appendChild(option);
	}
}

/// 创建分类编辑框
function createCatabox(container, ele, isCreate){
	var catabox=document.createElement('div');
	catabox.className='catabox active';
	catabox.innerHTML=
				'<h3 class="title">'+(isCreate?'新建分类':'编辑分类')+'</h3>'+
				(isCreate?'':'<a class="btn-del">我要删除这个分类</a>')+
				'<span class="close">x</span>'+
				'<input type="text" class="name" placeholder="catalog name"'+(isCreate?'':'value="'+ele.attributes['data-name'].value+'"')+'/>'+
				'<div class="button-wrap">'+
					'<button type="button" class="btn-ok" id="btnCataSave">确定</button>'+
					'<button type="button" id="btnCataCancel">取消</button>'+
					'<button type="button" style="display:none;" id="btnCataSee">看看</button>'+
				'</div>';
	container.appendChild(catabox);

	catabox.style.top=getElementOffsetTop(ele)+'px';
	catabox.style.left=getElementOffsetLeft(ele)+'px';

	return catabox;
}

// 获取元素Offset Top
function getElementOffsetTop(ele){
	var actualTop=ele.offsetTop,
		current=ele.offsetParent;
	while(current!==null){
		actualTop+=current.offsetTop;
		current=current.offsetParent;
	}
	return actualTop;
}

// 获取元素Offset Left
function getElementOffsetLeft(ele){
	var actualLeft=ele.offsetLeft,
		current=ele.offsetParent;
	while(current!==null){
		actualLeft+=current.offsetLeft;
		current=current.offsetParent;
	}
	return actualLeft;
}

function exportOptionFile(a){
	var date=formateDate(new Date),
		type='data:text/txt;',
		data='charset=utf-8,'+JSON.stringify(window.result);

	a.download="jnav-options-"+date+'.txt';
	a.href=type+data;
}

function formateDate(date){
	if(date){
		return [date.getFullYear(),date.getMonth(),date.getDate()].join('');
	}
}

function importOptionFile(a){
	if(confirm('导入配置会覆盖删除现有网址和分类，确定要导入吗？')){
		var input=document.querySelector('#import-file');
		input.click();	
	}
}

function setImportData(input){
	var reader=new FileReader;
	reader.onload=function(e,a,b,c){
		var result=JSON.parse(e.target.result);
		chrome.storage.sync.clear();
		chrome.storage.sync.set(result,initData);
	}
	var input=document.querySelector('#import-file');
	if(input.files.length){
		file=input.files[0];
		reader.readAsText(file);
	}
}