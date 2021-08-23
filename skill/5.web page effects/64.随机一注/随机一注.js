randomFn();
//redmax=33
//bluemax=16
function randomFn() {
      function getRandomInt(max) {
            return Math.ceil(Math.random() * max);
      }
      var red = document.querySelectorAll('.red .balls-wp b')
      var blue = document.querySelectorAll('.blue .balls-wp b')
      var parentred =document.querySelector('.red .balls-wp')
      console.log(parentred)
      //redblue选中输出字符串
      let redBlue = ''

      //选中的红球号
      let redball = []

      //选中的蓝球号
      let blueball;

      //红球
      while (redball.length < 6) {
            let tmp = getRandomInt(33)
            if (!redball.includes(tmp)) {
                  redBlue += tmp
                  redball.push(tmp)
            }
            if (redball.length === 5) {
                  let tmp = getRandomInt(33)
                  if (!redball.includes(tmp)) {
                        redBlue += tmp + ','
                        redball.push(tmp)
                  }
            }
      }
      //篮球
      blueball = getRandomInt(16)

      // console.log(redBlue)
      // console.log(blueball)


      //篮球效果(active效果)
      // blue[blueball-1].setAttribute("class", "active")
      blue[blueball - 1].className = "active"
      var parentblue = blue[blueball - 1].parentNode
      parentblue.insertBefore(blue[blueball - 1], parentblue.firstChild);
      console.log(parentblue)


      ///六个红球效果(active效果),先排列
      redball = redball.sort((a, b) => { return b-a })
      console.log(redball)
      
      for (i of redball) {
            // red[i - 1].className = "active"
            console.log(red[i-1])
            red[i - 1].setAttribute("class", "active")            
            //动态查找更新
            var childrenRed=parentred.getElementsByTagName('b')[0]
            parentred.insertBefore(red[i - 1], childrenRed);
      }
      // redball = redball.sort((a, b) => { return a-b })

      return redBlue += '|' + blueball.reverse()

}