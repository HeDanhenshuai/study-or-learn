// Array常见方法总结

// 方法都会修改原有的数组
// 1. push 数组末尾添加元素
/**
 * push:向数组末尾增加内容
 * @params
 *   多个任意类型
 * @return 
 *   新增后数组的长度
 */
let arr = [10, 20];
let res = arr.push(30, 'AA');
//基于原生js操作键值对的方法，也可以向末尾追加一项新的内容
arr[arr.length] = 40;
console.log(res);//4
console.log(arr)//[ 10, 20, 30, 'AA', 40 ]



// 2. unshift 数组开始位置增加元素
/**
 * unshift:向数组开始位置增加内容
 * @params
 *   多个任意类型
 * @return
 *   新增后数组的长度
 */
let unshiftarr = arr.unshift(111)
console.log(unshiftarr)  //6


// 3. shift 删除数组中的第一项
/**
 * shift:删除数组中的第一项
 * @params
 *   
 * @return 
 *   删除的哪一项
 * 基于原生js中的delete把数组当做普通的对象 确实可以删除掉某一项内容 但是不会影响数组背身的结构特点（length长度不会改变）项目中不应该这样删除数据
 */
let shiftarr = arr.unshift()
console.log(shiftarr)  //6



// 4. pop 删除数组中的最后一项（重要）
/**
 * pop:删除数组中最后一项
 * @params
 *   
 * @return 
 *   删除的哪一项
 * 基于原生js让数组的长度减掉一位 默认干掉的就是最后一项
 */
let poparray = arr.pop()
console.log(poparray)  //40



// 5. splice 数组增删改(重要)
/**
 * splice:实现数组的增加、删除、修改
 * @params
 *  删除： n,m 都是数字 从索引n开始删除m个元素（m不写 直接删除到末尾）
 *  修改：n,m,x 从索引n开始删除m个元素 用x占据删除的部分
 *  增加：n,0,x 从索引n开始 一个都不删 把x放到索引n的前面 
 * @return 
 *   把删除的部分用新数组储存起来返回
 * 基于这种方法可以清空一个数组，把原始数组中的内容以新数组储存起来（有点类似于数组的克隆，把原来数组克隆一份一模一样的给新数组）
 * arr.splice(0)数组为空
 */


// let splicearr=arr.splice(0)
// console.log(typeof(splicearr))  //null(表示清空数组)
// console.log(arr)
// let  splicearr=arr.splice(1)
// console.log(splicearr)
// console.log(arr)


//下列方法原来数组不会改变
// 6. slice 查找两个索引中间的内容返回到新数组
/**
 * slice:实现数组的查找
 * @params
 *   n,m 都是数字 从索引n开始找到索引为m的地方（不包含m这一项）
 *   m不写就是找到末尾
 * @return 
 *   把找到的内容以一个新数组的形式返回
 数组的克隆，参数0不写也可以
 res=arr.slice(0)
 思考：
 1.如果n/m为负数会怎样？如果n>m了会怎样？如果是小数会怎样？如果是非有效数字会怎样？如果m或n的值比最大索引都大会怎样？
 2.这种克隆方式为浅克隆
 */
console.log(arr)
let sliceArr = arr.slice(-2) //左闭右开原则
console.log(arr[0])
console.log(sliceArr)


// 7. concat 数组拼接
/**
 * concat:实现数组拼接
 * @params
 *   多个任意类型值
 * @return 
 *   拼接后的新数组(原来数组不变)
 */
let concatArr = arr.concat(arr)
console.log(arr)
console.log(concatArr)



// 8. toString 数组转化为字符串
/**
 * toString:把数组转化为字符串
 * @params
 *   没有参数
 * @return 
 *   转换后的字符串，每一项用逗号分隔（原数组不变）
 */
let toStringArr = arr.toString()//数组转化为字符串
console.log(toStringArr)
let splitString = toStringArr.split(',') //字符串转变为数组
console.log(splitString)

// 9. join 数组转化为字符串
/**
 * join:把数组转化为字符串
 * @params
 *   指定的分隔符(字符串格式)
 * @return 
 *   转化后的字符串(原来的数组不变)
 */
let joinArr = arr.join('---')//数组转化为字符串
console.log(joinArr)



// 10. indexof/lastindexof 检测某一项出现在数组中的第一次的索引和最后一次的索引
/**
 * indexof/lastindexof:检测当前项在数组中第一次或者最后一次出现的位置的索引值（IE678不兼容）
 * @params
 *   要检索的这一项的内容
 * @return 
 *   这一项出现的位置索引值（）如果数组中没有这一项 返回的结果是-1
 * 也可以使用es6中的includes方法判断 返回的是布尔值
 */
console.log(arr)
let indexOfArr = arr.indexOf('10') //不存在返回undefined
console.log(indexOfArr)




// 11. reverse 反转数组(原数组改变)
/**
 * reverse:把数组倒过来排列
 * @params
 *   不需要
 * @return 
 *   排列后的新数组
 *	 原来数组改变
 */
console.log(arr)
let reverseArr = arr.reverse()
console.log(reverseArr)

// 12. sort 数组排序
/**
 * sort:实现数组后的排序
 * @params
 *   可有可无，也可以是个函数
 * @return 
 *   排序后的新数组
 *	 原来数组改变
 * sort方法如果不传递参数，是无法处理10以上的数字排序的（默认按照每一项的第一个字符来排，不是我们想要的结果）
 * 想要实现多位数正常排序 需要给sort传递一个函数，函数中返回a-b实现升序 返回b-a实现降序
 */
console.log('----------------')
console.log(arr)
let sortArr = arr.sort()
console.log(sortArr)



// 13. forEach 遍历数组执行回调函数没有返回值
/**
 * forEach:遍历数组中的每一项内容
 * @params
 *   回调函数
 * @return 
 *   没有
 *	 原来数组不变
arr.forEach((item,index)>{
      数组中有多少项，函数就会默认执行多少次
      每一次执行函数：item是数组中当前要操作的这一项，index是当前项的索引
}=)
 */
arr.forEach((element, index) => console.log(element, index));

// 14. includes 判断数组是够包含某一项值
/**
 * includes()方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
 * 参数
 * valueToFind：必须。需要查找的元素值。
 * fromIndex：可选。从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + * * fromIndex 的索引开始搜索。默认为 0。
 * 返回值
 * 布尔值。如果找到指定值返回 true，否则返回 false。
 * 
*/
console.log(arr.includes('aa', 0)) //true
console.log(arr.includes(111, 1))   //false
console.log(arr.includes(111, 46)); // false
// 15. map 遍历数组执行回调返回新数组
/*
map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
map() 方法按照原始数组元素顺序依次处理元素。
注意： map() 不会对空数组进行检测。
注意： map() 不会改变原始数组。
参数：
function(){}:必须，函数，数组中的每个元素都会执行这个函数
currentValue：必须，当前元素的值
index：可选，当前元素的索引
arr：可选，当前元素属于的数组对象
thisValue：可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。
返回值：
返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
*/

console.log(arr)
let mapArr = arr.map(function (currentValue) {
      return currentValue + 'map'
})
console.log(mapArr)




// 16. some 所有元素进行判断 只要有一个满足就返回true
/*
some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
some() 方法会依次执行数组的每个元素：
      如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
      如果没有满足条件的元素，则返回false。
注意： some() 不会对空数组进行检测。
注意： some() 不会改变原始数组。
参数：
function(){}必须。函数，数组中的每个元素都会执行这个函数
      currentValue:必须。当前元素的值
      index:可选。当前元素的索引值
      arr:可选。当前元素属于的数组对象
thisValue:可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
返回值：布尔值。如果数组中有元素满足条件返回 true，否则返回 false。
*/
let someArr = arr.some(function (currentValue) {
      return currentValue === 111
})
console.log(someArr)
// 17. find 返回数组中满足函数的第一个元素值
/*
find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
参数：
callback
      在数组每一项上执行的函数，接收 3 个参数：
      element
            当前遍历到的元素。
      index可选
            当前遍历到的索引。
      array可选
            数组本身。
thisArg可选
      执行回调时用作this 的对象。
返回值：
数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。
*/

let findArr = arr.find(function (currentValue) {
      return currentValue === 111
})
console.log(findArr)

// 18. flat 按照一个指定的深度遍历数组最好是infinity
/*
flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
参数：
depth 可选
      指定要提取嵌套数组的结构深度，默认值为 1。
      Infinity：展开任意深度的嵌套数组
返回值：
      一个包含将数组与子数组中所有元素的新数组。
*/
var newArr = [1, [2, 3], [23, 2, 1]]
var newArray = newArr.flat(1)
console.log(newArray)

// 19. fill 用一个固定的值来填充数组每个都一样
/*
fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。
参数：
      value
            用来填充数组元素的值。
      start 可选
            起始索引，默认值为0。
      end 可选
            终止索引，默认值为 this.length。、
返回值：
      修改后的数组。
*/
//示例：
// [1, 2, 3].fill(4);               // [4, 4, 4]
// [1, 2, 3].fill(4, 1);            // [1, 4, 4]
// [1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
// [1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
// [1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
// [1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
// [1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
// [1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]


// 20. filter 判断数组满足条件的元素返回新数组
/*
filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
参数：
      callback
            用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：
            element
                  数组中当前正在处理的元素。
            index可选
                  正在处理的元素在数组中的索引。
            array可选
                  调用了 filter 的数组本身。
      thisArg可选
            执行 callback 时，用于 this 的值。
返回值：
      一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。
*/
function isBigEnough(element) {
      return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(filtered) // filtered is [12, 130, 44]

// 21. reduce 对每一个元素执行函数，汇总成一个数
/*
reduce() 方法对数组中的每个元素执行一个提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
参数：
	callback
		执行数组中每个值的函数，包含四个参数：
		accumulator
			累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue
		currentValue
			数组中正在处理的元素。
		currentIndex可选
			数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则为1。
		array可选
			调用reduce()的数组
initialValue可选
	作为第一次调用 callback函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。在没有初始值的空数组上调用 reduce 将报错。
返回值：
	函数累计处理的结果
*/
var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
    // 和为 6






// 22. from 让一个类数组转化为数组(数组去重的应用)
/*
Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例
参数：
	arrayLike
		想要转换成数组的伪数组对象或可迭代对象。
	mapFn (可选参数)
		如果指定了该参数，新数组中的每个元素会执行该回调函数。
	thisArg (可选参数)
		可选参数，执行回调函数 mapFn 时 this 对象。
返回值：
	一个新的数组实例
*/
var arr1=[1,1,2,3,4,5,3,4]
let setArr=Array.from(new Set(arr1))
console.log(setArr)


// 23. isArray 判断传递的参数是不是数组
/*
Array.isArray() 用于确定传递的值是否是一个数组
参数：
	obj
		需要检测的值。
返回值：
	如果对象是 Array，则为true; 否则为false。
*/

//示例：
console.log(Array.isArray([]))
console.log(Array.isArray([1]))
console.log(Array.isArray(new Array()))
//true true true


// 24. every 所有元素进行判断都满足了返回true
/*
every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
注意：若收到一个空数组，此方法在一切情况下都会返回 true。
参数：
	callback
		用来测试每个元素的函数，它可以接收三个参数：
		element
			于测试的当前值。
		index可选
			用于测试的当前值的索引。
		array可选
			调用 every 的当前数组。
	thisArg
		执行 callback 时使用的 this 值。
返回值
	如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。
*/



function isBigEnough(element, index, array) {
  return element >= 1;
}
console.log(arr.every(isBigEnough)) // false
// [12, 54, 18, 130, 44].every(isBigEnough); // true


// 25. findIndex 返回数组中满足函数的第一个元素的索引，都不满足返回-1
/*
参数：
	callback
		针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
		element
			当前元素。
		index
			当前元素的索引。
		array
			调用findIndex的数组
返回值：
	  数组中通过提供测试函数的第一个元素的索引。否则，返回-1
*/
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log(arr.findIndex(isPrime)); // -1, not found



// 26. of 创建数组

