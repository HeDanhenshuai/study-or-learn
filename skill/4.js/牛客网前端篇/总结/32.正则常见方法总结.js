// https://www.w3school.com.cn/jsref/jsref_obj_regexp.asp
var Stra = '02212aax12'
//RegExp 对象属性


//如何创建
new RegExp('ab+c', 'i'); // 首个参数为字符串模式的构造函数
new RegExp(/ab+c/, 'i'); // 首个参数为常规字面量的构造函数


// 1.JavaScript RegExp g 修饰符


//RegExp 对象方法
var regex = new RegExp(/\d+/,'gi');
var parseStra=parseInt(regex.exec(Stra)[0])
console.log(parseStra)
//支持正则表达式的 String 对象的方法
var afterStra = parseInt(Stra.match(regex)[1]);
console.log(afterStra)