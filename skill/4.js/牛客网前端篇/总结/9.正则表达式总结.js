console.log(typeof (1, 2, 3))
var set = (1, 1, 2)
for (var i = 0; i < set.length; i++) {
      console.log(i)
}


let sRGB = 'rgb(1,2,4)'
var regexp = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
var ret = sRGB.match(regexp);
console.log(ret)
console.log(ret[1],ret[2])


const str = 'For more information, see Chapter 3.4.5.1';
const re = /see (chapter \d+(\.\d)*)/i;
const found = str.match(re);
console.log(found)