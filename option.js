window.onload=function(){
	initButtonEvent();
	initNav();
	initData();
}

function initButtonEvent(){
	var $btnSiteSave=$('#btnSiteSave'),
		$btnSiteCancel=$('#btnSiteCancel'),
		$btnCataSave=$('#btnCataSave'),
		$btnCataCancel=$('#btnCataCancel');

	$btnSiteSave.onclick=function(){
		var name=document.querySelector('.sitebox .name').value,
			url=document.querySelector('.sitebox .url').value,
			catalog=document.querySelector('.sitebox .catalog').value;
			obj={};

		obj[name]={
			name:name,
			url:url,
			catalog:catalog,
			type:'site'
			
		}
		chrome.storage.sync.set(obj,function(){
			alert('set okay.')
		})
	}

	$btnCataSave.onclick=function(){
		var name=document.querySelector('.catabox .name').value,
			obj={};
			obj[name]={
				name:name,
				type:'cata'
			};

		chrome.storage.sync.set(obj,function(){
			alert('set okay');
		})
	}

	$btnCataCancel.onclick=function(){
		var box=document.querySelector('.catabox');
		box.removeClass('active');
	}

	$('#btnCataSee').onclick=function(){
		chrome.storage.sync.get(null,function(result){
			debugger
		})
	}
}

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
			li.innerHTML=item.name;
			li.onclick=function(){
				var box=document.querySelector('.catabox');
				box.addClass('active');
				box.style.top=this.offsetTop+'px';
				box.style.left=this.offsetLeft+'px';
			}
			ulCatalog.appendChild(li);
		}
	})

}
