//filter
function findAllOccurrences(arr, target) {
      var result = [];
      arr.filter(function (item, index) {
            return item === target && result.push(index);
      });
      return result;
}
//for
function findAllOccurrences(arr, target) {
      var result = [];
      for (var i = 0; i < arr.length; i++) {
            if (arr[i] === target) {
                  result.push(i);
            }
      }
      return result;
}
//lastIndexOf+slice/splice
function findAllOccurrences(arr, target) {
      var result = [], index = arr.lastIndexOf(target);
      while (index > -1) {
            result.push(index);
            arr.splice(index, 1);//arr=arr.slice(0,index);
            index = arr.lastIndexOf(target);
      }
      return result;
}
//indexOf
function findAllOccurrences(arr, target) {
      var result = [], index = arr.indexOf(target);
      while (index > -1) {
            result.push(index);
            index = arr.indexOf(target, index + 1);
      }
      return result;
}