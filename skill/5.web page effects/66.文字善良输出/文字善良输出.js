// function output(str) {
//       let content = document.querySelector('.content')
//       let span = content.querySelectorAll('.word')
//       let blink = content.querySelector('.blink')
//       console.log(span)
//       for (var i = 0; i < span.length; i++) {
//             content.removeChild(span[i])
//       }
//       var i = 0
//       var timer = setInterval(() => {
//             newDom = document.createElement('span')
//             newDom.textContent = ` ${str[i]}`
//             newDom.classList.add('word')
//             newDom.classList.add(`color${Math.ceil(Math.random() * 24)}`)
//             content.insertBefore(newDom, blink)
//             i++
//             if (i === str.length) {
//                   clearInterval(timer)
//             }         
//       }, 200)

// }


function output(str) {
      var strArr = str.split('')
      //3 删除除jsBlink以外的span节点
      var blinkEl = document.getElementById('jsBlink')
      var children = blinkEl.parentNode.children
      var length = children.length
      for (var i = length - 2; i >= 0; i--) {
        children[i].parentNode.removeChild(children[i])
      }
      console.log(blinkEl.parentNode)
      //2 span标签部分
      var spanFactory = function (s) {
        var el = document.createElement('span')
        el.classList.add('word')
        if(s==='女'||s==='朋'||s==='友')
        el.style.fontSize=50+'px'
        el.classList.add('color' + (Math.floor(Math.random() * 24) + 1))
        el.innerHTML = s
        return el
      }
      //1每隔2s取出一个字符,但是它没有及时清除定时器,这一点没我做的好
      var time = function () {
        if (strArr.length === 0) return
        var s = strArr.shift()
        if (s === '\n') {
          blinkEl.parentNode.insertBefore(
            document.createElement('br'),
            blinkEl
          )
        } else {
          if ([' ', '<', '>'].includes(s)) {
            s = { ' ': '&nbsp;', '<': '&lt;', '>': '&gt;' }[s]
          }
          blinkEl.parentNode.insertBefore(spanFactory(s), blinkEl)
        }

        timer = setTimeout(time, 200)
      }
      time()
    }





output('好想找个\n女朋友!\n是假的\nHAH<>\n被骗了吧,小笨蛋!')

