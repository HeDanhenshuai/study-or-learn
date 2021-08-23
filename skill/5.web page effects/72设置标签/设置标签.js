var tagInput = {
    isInited: false,
    init: init,
    bindEvent: bindEvent,
    addTag: addTag,
    removeTag: removeTag
};
tagInput.init();

function init() {
    var that = this;
    console.log(this)//这里的this指的是tagInput
    if (that.isInited) return;
    that.isInited = true;
    // 请修改这一行代码，保存class为js-input的输入框的dom元素引用
    // that.input = null;
    //向tagInput中添加对象input，该input对象为一个DOM节点
    that.input = document.getElementsByClassName('js-input')[0]
    that.bindEvent();
}

function bindEvent() {
    var that = this;
    var input = that.input;
    if (!input) return;
    input.addEventListener('keydown', function (event) {
        var code = event.keyCode
        // 请修改这一行代码，判断用户是否按了回车键
        var isEnter = false;
        // 请修改这一行代码，判断用户是否按了删除键
        var isDelete = false;
        if (code === 13) {
            isEnter = true
        } else if (code === 8) {
            isDelete = true
        }
        (isEnter || isDelete) && event.preventDefault();
        isEnter && that.addTag();
        isDelete && that.removeTag();
    });
    input.parentNode.addEventListener('click', function () {
        input.focus(); //父节点鼠标聚焦
    });
}

function addTag() {
    //增加标签
    // <span class="tag">前端</span>
    var that = this;
    var input = that.input
    console.log(that.input.value)
    //内容判断是否重复
    let tmp = Array.from(input.parentNode.getElementsByClassName('tag')).findIndex((item, index) => {
        return item.innerText === input.value.trim()
    })
    console.log(tmp)
    if (tmp === -1 || tmp === null) {
        //创建一个节点 <span class="tag">前端</span>
        var spanLabel = document.createElement('span')
        spanLabel.classList.add('tag')
        spanLabel.textContent = that.input.value.trim()
        //插入
        input.parentNode.insertBefore(spanLabel, input)
        //完成后清空输入框内容
        that.input.value = ''
        console.log(that)
    }
    //完成后清空输入框内容
    that.input.value = ''
}

function removeTag() {
    //移除标签
    var that = this;
    var input = that.input
    console.log(input.parentNode.getElementsByClassName('tag'))
    let tagSpanL = input.parentNode.getElementsByClassName('tag').length
    //找到最后一个节点tag
    if (tagSpanL) {
        var tagSpan = input.parentNode.getElementsByClassName('tag')[tagSpanL - 1]
        console.log(tagSpan)
        input.parentNode.removeChild(tagSpan)
    } else {
        return
    }
    console.log(that)
}


// var tagInput = {
//     isInited: false,
//     init: init,
//     bindEvent: bindEvent,
//     addTag: addTag,
//     removeTag: removeTag
// };
// tagInput.init();

// function init() {
//     var that = this;
//     if (that.isInited) return;
//     that.isInited = true;
//     // 请修改这一行代码，保存class为js-input的输入框的dom元素引用
//     that.input = document.getElementsByClassName('js-input')[0];
//     that.bindEvent();
// }

// function bindEvent() {
//     var that = this;
//     var input = that.input;
//     if (!input) return;
//     input.addEventListener('keydown', function (event) {
//         // 请修改这一行代码，判断用户是否按了回车键
//         var isEnter = (event.keyCode===13);
//         // 请修改这一行代码，判断用户是否按了删除键
//         var isDelete = (event.keyCode===8);

//         (isEnter || isDelete) && event.preventDefault();
//         isEnter && that.addTag();
//         isDelete && that.removeTag();
//     });
//     input.parentNode.addEventListener('click', function () {
//         input.focus();
//     });
// }

// function addTag() {
//     var that = this;
//     var input = that.input;
//     var curInput = input.value.trim();
//     var allTag = document.getElementsByClassName('tag');
//     var allTagName = [];
//     [].forEach.call(allTag, item=>{
//         allTagName.push(item.innerText.trim());       
//     });
//     if(curInput && allTagName.indexOf(curInput) ===-1 ){
//         // 输入不为空而且标签不重复
//         var newSpan = document.createElement('span');
//         newSpan.setAttribute('class', 'tag');
//         newSpan.innerText = curInput;
//         input.parentElement.insertBefore(newSpan, input);
//     }
//     input.value = '';
// }

// function removeTag() {
//     var that = this;
//     var input = that.input;
//     var curInput = input.value.trim();
//     var allTag = document.getElementsByClassName('tag');
//     if(curInput===''){
//        if(allTag.length > 0){
//             // 输入为空且存在标签，则删除最后一个span标签
//             allTag[allTag.length-1].remove();
//         }
//         return;
//     }
//     // 输入不为空，则删除文本最后一个字符
//     // input.value = curInput.slice(0, -1);
// }