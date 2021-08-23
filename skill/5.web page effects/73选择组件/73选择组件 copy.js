function CheckGroup(renderTo, options, isMultiple) {
	var that = this;
	that.renderTo = renderTo;
	that.options = options;
	that.isMultiple = !!isMultiple;
	that.initHtml();
	that.initEvent();
}
CheckGroup.prototype.initHtml = fInitHtml;
CheckGroup.prototype.initEvent = fInitEvent;
CheckGroup.prototype.toggleEl = fToggleEl;
CheckGroup.prototype.isSelected = fIsSelected;
CheckGroup.prototype.val = fVal;

function fInitHtml() {
	var that = this;
	// 请补全代码，拼接html字符串
	var sHtml = `<div class="checkgroup${that.isMultiple ? "" : " radius"}">`;
	for (let i = 0; i < that.options.length; i++) {
		sHtml += `<div data-val="${that.options[i].value}" class="item">${that.options[i].text}</div>`;
	}
	sHtml += "</div>";
	that.renderTo.innerHTML = sHtml;
	// 请补全代码，获取checkgroup的dom元素引用
	that.el = document.getElementsByClassName("checkgroup")[0];
}

function fInitEvent() {
	var that = this;
	that.el && that.el.addEventListener('click', function(event) {
		var item = event.target;
		item.classList.contains('item') && that.toggleEl(item);
	});
}

function fToggleEl(item) {
	// 根据当前是单选还是多选，以及当前元素是否选中，高亮/取消���亮指定的选项dom元素
	var that = this;
	if (that.isSelected(item)) {
		// 请补全代码
		item.classList.remove("selected");
	} else if (that.isMultiple) {
		// 请补全代码
		item.classList.add("selected");
	} else {
		// 请补全代码
		let itemList = document.getElementsByClassName("item");
		for (let i = 0, len = itemList.length; i < len; i++) {
			if (itemList[i].classList.contains("selected")) {
				itemList[i].classList.remove("selected");
				break;
			}
		}
		item.classList.add("selected");
	}
}

function fIsSelected(item) {
	// 请补全代码，判断item是否选中
	return item.classList.contains("selected");
}

function fVal(values) {
	var that = this;
	if (arguments.length === 0) {
		// 请补全代码，获取高亮的选项元素
		var items = document.getElementsByClassName("selected");
		// 请补全代码，获取高亮的选项元素的data-val
		var result = [];
		for(let i = 0; i<items.length; i++){
			let item = items[i];
			result.push(item.attributes["data-val"].value);
		}
		return result;
	}!that.isMultiple && values.length > 1 && (values.length = 1);
	// 请补全代码，获取所有的选项元素
	var items = document.getElementsByClassName("item");
	// 请补全代码，在指定元素上加上高亮的class
	for(let i = 0; i<items.length; i++){
		let item = items[i];
		if (values.includes(item.attributes["data-val"].value)) {
			item.classList.add("selected")
		} else {
			item.className = 'item';
		}
	}
}