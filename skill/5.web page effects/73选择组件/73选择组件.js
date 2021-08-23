

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
//选项卡html部分
function fInitHtml() {
    var that = this;
    // 请补全代码，拼接html字符串
    // var sHtml = '';
    var sHtml = `<div class="checkgroup${that.isMultiple ? "" : " radius"}">`;
	for (let i = 0; i < that.options.length; i++) {
		sHtml += `<div data-val="${that.options[i].value}" class="item">${that.options[i].text}</div>`;
	}
	sHtml += "</div>";
    // console.log(sHtml)
    //#jsCheckGroup节点中的内容写入sHtml
    that.renderTo.innerHTML = sHtml;
    // 请补全代码，获取checkgroup的dom元素引用
    that.el = document.querySelector('#jsCheckGroup .checkgroup');
    console.log(that.el)
}

function fInitEvent() {
    var that = this;
    that.el && that.el.addEventListener('click', function (event) {
        var item = event.target;
        //每个选项都有一个item类选择器，执行that.toggleEl(item),此处的contains方法也可以用来判断节点的包含关系
        item.classList.contains('item') && that.toggleEl(item);
    });
}

function fToggleEl(item) {
    // 根据当前是单选还是多选，以及当前元素是否选中，高亮/取消���亮指定的选项dom元素
    var that = this;
    // console.log('执行了fToggleEl')
    if (that.isSelected(item)) {
        // 请补全代码
        item.classList.remove('selected')

    } else if (that.isMultiple) {
        // 请补全代码
        item.classList.add("selected");
    } else {
        // 请补全代码
        //触发事件，既没有选中，也不是多选的条件执行下列代码
        let itemList = document.getElementsByClassName("item");
		for (let i = 0, len = itemList.length; i < len; i++) {
			if (fIsSelected(itemList[i])) {
				itemList[i].classList.remove("selected");
				break;
			}
		}
		item.classList.add("selected");
    }
}

function fIsSelected(item) {
    // 请补全代码，判断item是否选中
    // return item;
    return item.classList.contains('selected')
}


function fVal(values) {
    var that = this;
    //values
    console.log(values)
    if (arguments.length === 0) {
        // 请补全代码，获取高亮的选项元素
        // var items = null;
        var items=document.getElementsByClassName('selected')
        // 请补全代码，获取高亮的选项元素的data-val
        var result = [];
        Array.from(items).forEach((item,index)=>{
            result.push(item)
        })
        return result;
    }
    !that.isMultiple && values.length > 1 && (values.length = 1);
    // 请补全代码，获取所有的选项元素
    //var items = null;
    var items=document.getElementsByClassName("item");
    // 请补全代码，在指定元素上加上高亮的class
    for(let i = 0; i<items.length; i++){
		let item = items[i];
        //下面的item.attributes["data-val"].value可以用item.dataset.val语句代替
		if (values.includes(item.attributes["data-val"].value)) {
			item.classList.add("selected")
		} else {
			item.className = 'item';
		}
	}

}

var jsDom=document.getElementById('jsCheckGroup')
var options = [{ text: '选项a', value: 'a' },
{ text: '选项b', value: 'b' },
{ text: '选项c', value: 'c' },
{ text: '选项d', value: 'd' }];
var checkgroupzz = new CheckGroup(jsDom,options,true)
// console.log(checkgroupzz)
checkgroupzz.val(['a','d'])
