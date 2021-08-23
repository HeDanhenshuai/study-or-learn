
//for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
var a = [];
for (let i = 0; i < 10; i++) {
      a[i] = function () {
            console.log(i);
      };
}
a[6](); // 10


if (false) {
      console.log('false也能够输出')
}
function makeClosures(arr, fn) {
      var result = new Array();
      for (var i = 0; i < arr.length; i++) {
            result[i] = function (num) {
                  return function () {
                        return fn(num);
                  }
            }(arr[i]);
      }
      return result;
}


var arr = []
for (var i = 0; i < 10; i++) {
      // console.log(arr[i])
      let tmp=i
      arr[i]=function (tmp){
            console.log(tmp)
      }

}
arr[2]()