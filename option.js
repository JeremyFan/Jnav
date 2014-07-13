window.onload=function(){
	initButtonEvent();
}

function initButtonEvent(){
	var $btnAdd=$('#btnAdd'),
		$btnGet=$('#btnGet');
	$btnAdd.onclick=function(){
		var item={
			"name":"weibo",
			"text":"新浪微博",
			"url":"http://weibo.com",
			"type":2
		};
		// var array=["http://weibo.com",2];
		var obj={
			url:'http://weibo.com',
			type:'2'
		}
		// var theValue=$('#name').value;
		chrome.storage.local.set({"新浪微博":obj},function(){
			alert('set okay.')
		})
	}

	$btnGet.onclick=function(){
		chrome.storage.local.get(null,function(result){
			debugger
		})
	}
}
