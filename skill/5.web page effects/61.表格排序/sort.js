// //例如 sort('price', 'asc') 表示按照price列从低到高排序
// //例如 sort('sales','desc') 表示按照sales列从高到低排序 

// //获取price
// var price = Array.from(document.querySelectorAll('#jsList tr td:nth-child(2)'))
// //获取sales
// var sales = Array.from(document.querySelectorAll('#jsList tr td:nth-child(3)'))
// var tbody = document.getElementById('jsList')
// console.log(tbody)
// var concatArr = {
//       price: price.map((ele) => {
//             return ele.innerHTML
//       }),
//       sales: sales.map((ele) => {
//             return ele.innerHTML
//       })
// }
// console.log(concatArr)
// function sort(type, order) {
//       if (type === 'price') {
//             priceSort(order)
//       }
//       if (type === 'sales') {
//             salesSort(order)
//       }
// }
// function priceSort(order) {
//       //对price按照order进行排序
//       //升序
//       if (order === 'asc') {
//             var innerText
//             //对price进行排序
//             for (var i = 0; i < concatArr.price.length; i++) {

//             }
//             innerText += `<tr><td>${i}</td><td>${}</td><td>${}</td></tr>`
//             //dom渲染
//             tbody.innerHTML = innerText
//       }
//       //降序
//       if (order === 'desc') {

//       }
// }



// function salesSort(order) {
//       //对sales按照order进行排序
//       //升序
//       if (order === 'asc') {

//       }
//       //降序
//       if (order === 'desc') {

//       }
// }


function sort(type, order) {
      var oJsList = document.getElementById("jsList");
      var aTr = oJsList.getElementsByTagName("tr");
      var len = aTr.length;
      var col;
      switch (type) {
            case 'id':
                  col = 0;
                  break;
            case 'price':
                  col = 1;
                  break;
            case 'sales':
                  col = 2;
                  break;
      }
      aTr = Array.prototype.slice.call(aTr);
      aTr.sort(function (val1, val2) {
            // console.log(val1)
            // console.log(val2)
            var v1 = parseFloat(val1.getElementsByTagName("td")[col].innerText);
            var v2 = parseFloat(val2.getElementsByTagName("td")[col].innerText);
            // console.log(v1, v2);
            if (order == "asc") {
                  return v1 - v2;
            } else {
                  return v2 - v1;
            }
      });
      for (var i = 0; i < len; i++) {
            oJsList.appendChild(aTr[i]);
      }
}



var oJsList = document.getElementById("jsList");
var aTr = oJsList.querySelectorAll("tr td:nth-child(3)")[2].innerText;
sort('sales', 'desc')
console.log(aTr)
var timer = setTimeout(() => {
      sort('sales', 'asc')
      var oJsList = document.getElementById("jsList");
      var aTr = oJsList.querySelectorAll("tr td:nth-child(3)")[2].innerText
      console.log(aTr)
}, 5000)
