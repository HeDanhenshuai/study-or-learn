var sPackage='a.b.d.g'
var oNameSpace={a: {test: 1, b: 2}}
var arr = sPackage.split(".");
console.log(arr )
console.log(1 in arr )
for(i in sPackage){
      console.log(sPackage[i])
}
// console.log(1 in sPackage )

// console.log(arr[0] in oNameSpace )


var obj={3: {1: 1, b: 2}}
console.log(1 in obj)
console.log(3 in obj)