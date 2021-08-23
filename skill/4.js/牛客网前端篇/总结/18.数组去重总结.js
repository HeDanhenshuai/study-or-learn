//依赖于原数组，去重后返回一个新数组
function remove(arr, item) {
    return arr.filter(function (val, index, arr) {
        return val != item
    })
}
//常规方法建立一个新数组，然后把符合要求的放入
function remove(arr, item) {
    var a = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != item) {
            a.push(arr[i]);
        }
    }
    return a;
}
console.log(remove([1, 2, 2, 3, 4, 2, 2], 2))





//直接在原数组中进行操作
//基本方法：利用改变原数组中的方法splice： 参数index（位置下标）、len（从下标起修改的个数，0，1，2，3，……）、item（）。
function removeWithoutCopy(arr, item) {
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] === item) {
            arr.splice(i, 1)
            i--
        }
    }
    return arr
}

function removeWithoutCopy(arr, item) {
    while (arr.indexOf(item) !== -1) {
        arr.splice(arr.indexOf(item), 1);
    }
    return arr;
}


console.log(removeWithoutCopy([1, 2, 2, 3, 4, 2, 2], 2))




