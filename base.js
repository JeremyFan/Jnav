// 增加原型方法
(function addPrototypeMethods() {
	// 添加样式
	HTMLElement.prototype.addClass = function(className) {
		this.className += ' ' + className;
	}
	// 删除样式
	HTMLElement.prototype.removeClass = function(className) {
		this.className = this.className.replace(' ' + className, '');
	}
})();

// 增加一个获取元素的方法
function $(eleId) {
	eleId = eleId.replace('#', '');
	return document.getElementById(eleId);
}