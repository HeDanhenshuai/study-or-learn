//方法1 （forEach）
function square(arr) {
      let newArr = []
      arr.forEach((item, index) => {
            newArr.push(item * item)
      })
      return newArr
}


//map方法
function square(arr) {
      let newArr = arr.map((item, index) => {
            return item * item
      })
      return newArr
}

//
function square(arr) {
      return arr.map(v => v * v)
}