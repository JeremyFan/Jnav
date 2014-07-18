window.onload=function(){
	initButtonEvent();
	initNav();
	initData();
}

function initButtonEvent(){
	var btnCataCreate=document.querySelector('#btnCataCreate');
	btnCataCreate.onclick=function(){
		showCatabox(this);
	}
}
// 	var $btnSiteSave=$('#btnSiteSave'),
// 		$btnSiteCancel=$('#btnSiteCancel'),
// 		$btnCataSave=$('#btnCataSave'),
// 		$btnCataCancel=$('#btnCataCancel');

// 	$btnSiteSave.onclick=function(){
// 		var name=document.querySelector('.sitebox .name').value,
// 			url=document.querySelector('.sitebox .url').value,
// 			catalog=document.querySelector('.sitebox .catalog').value;
// 			obj={};

// 		obj[name]={
// 			name:name,
// 			url:url,
// 			catalog:catalog,
// 			type:'site'
			
// 		}
// 		chrome.storage.sync.set(obj,function(){
// 			alert('set okay.')
// 		})
// 	}

// 	$btnCataSave.onclick=function(){
// 		var name=document.querySelector('.catabox .name').value,
// 			obj={};
// 			obj[name]={
// 				name:name,
// 				type:'cata'
// 			};

// 		chrome.storage.sync.set(obj,function(){
// 			alert('set okay');
// 		})
// 	}

// 	$btnCataCancel.onclick=function(){
// 		var box=document.querySelector('.catabox');
// 		box.removeClass('active');
// 	}

// 	$('#btnCataSee').onclick=function(){
// 		chrome.storage.sync.get(null,function(result){
// 			debugger
// 		})
// 	}
// }

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

function initData(){
	var siteTableBody=document.querySelector('#tbSite tbody'),
		ulCatalog=document.querySelector('#ulCatalog');
	chrome.storage.sync.get(function(result){
		var cataArr=[],
			siteArr=[],
			item,
			i,
			tr,
			li;

		for(i in result){
			item=result[i];
			if(item.type==='cata'){
				cataArr.push(item);
			}
			else if(item.type==='site'){
				siteArr.push(item);
			}
		}
		
		for(i=0;i<siteArr.length;i++){
			item=siteArr[i];
			tr=document.createElement('tr');
			tr.innerHTML='<td>'+item.name+'</td><td>'+item.url+'</td><td>'+item.catalog+'</td>';
			siteTableBody.appendChild(tr);
		}

		for(i=0;i<cataArr.length;i++){
			item=cataArr[i];
			li=document.createElement('li');
			li.id=item.id;
			li.innerHTML=item.name;
			li.onclick=function(){
				showCatabox(this);
			}
			ulCatalog.appendChild(li);
		}
	})
}

/// 显示sitebox
function showSitebox(ele){
	
}

/// 显示catabox
function showCatabox(ele){
	var isCreate= ele.type==='button',
	 	body=document.body,
	    mask=document.createElement('div'),
		bodyHeight=document.documentElement.scrollHeight,
		bodyWidth=document.documentElement.scrollWidth,
		tabCatalog=document.querySelector('#tabCatalog'),
		catabox=document.createElement('div'),
		btnCataSave,btnCataCancel,btnClose;

	mask.id='mask';
	body.appendChild(mask);
	mask.style.height=bodyHeight+'px';
	mask.style.width=bodyWidth+'px';

	catabox.className='catabox active';
	catabox.innerHTML=
				'<h3 class="title">'+(isCreate?'新建分类':'编辑分类')+'</h3>'+
				'<span class="close">x</span>'+
				'<input type="text" class="name" placeholder="catalog name" '+(isCreate?'':'value="'+ele.innerHTML+'"')+'/>'+
				'<div class="button-wrap">'+
					'<button type="button" class="btn-ok" id="btnCataSave">确定</button>'+
					'<button type="button" id="btnCataCancel">取消</button>'+
					'<button type="button" style="display:none;" id="btnCataSee">看看</button>'+
				'</div>';
	body.appendChild(catabox);

	catabox.style.top=getElementOffsetTop(ele)+'px';
	catabox.style.left=getElementOffsetLeft(ele)+'px';
	// catabox.addClass('show');

	btnCataSave=document.querySelector('.catabox #btnCataSave');
	btnCataCancel=document.querySelector('.catabox #btnCataCancel');
	btnClose=document.querySelector('.catabox .close');

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
				// alert('set okay');
				body.removeChild(mask);
				body.removeChild(catabox);
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
				ele.innerHTML=name;
			})
		}

	}

	// 关闭编辑框
	btnCataCancel.onclick=btnClose.onclick=mask.onclick=function(){
		body.removeChild(mask);
		body.removeChild(catabox);
	}
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