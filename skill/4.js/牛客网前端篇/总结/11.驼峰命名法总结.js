function cssStyle2DomStyle(sName) {
      let sArr = sName.split('-')
      let flag = false
      let str = ''
      for (var i = 0; i < sArr.length; i++) {
            if (sArr[i] != '' && flag === false) {
                  str = str + sArr[i]
                  flag = true
            } else {
                  str = str + sArr[i].charAt(0).toUpperCase() + sArr[i].slice(1)
            }
      }
      return str
}



function cssStyle2DomStyle1(sName) {
      const reg = /-(.)/g;
      return sName.replace(reg, (match, g1, index) => {
            if (index === 0) return g1;
            return g1.toUpperCase();
      });
}

//可行
console.log(cssStyle2DomStyle1('-   -css-font-size-  aa-'))
//可行
console.log(cssStyle2DomStyle('-   -css-font-size-  aa-'))


// var namea = 'dfa以aaa bbb ccc';
// var uw = namea.replace(/\b\w+\b/g, function (word) {
//       return word.substring(0, 1).toUpperCase() + word.substring(1);
// }
// );

// console.log(uw)
// var sName = '-   -css-font-size-  aa'
// var arr = sName.split('');
// console.log(arr)

function cssStyle2DomStyle3(sName) {
      //split切割函数
      var arr = sName.split('');
      //判断第一个是不是 - ，是的话就删除、
      if(arr.indexOf('-') ==0 ){
          arr.splice(0,1);
      }
      
      //处理剩余的 -
      for(var i = 0;i < arr.length; i++){
          if(arr[i] == '-'){
              arr.splice(i ,1);
              arr[i] = arr[i].toUpperCase();
          }
      }
      //根据某个字符将数组转成字符串
      return arr.join('');
  }

// console.log(cssStyle2DomStyle3('d-ds-'))