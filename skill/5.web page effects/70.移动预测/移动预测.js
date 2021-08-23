function bind() {

      document.onkeydown = event => {
            if (!event) return;
            var code = event.keyCode || '';
            if (!{ '37': 1, '38': 1, '39': 1, '40': 1 }[code]) return;
            event.preventDefault && event.preventDefault();
            //TODO: 请实现按键控制


            // let row=current.parentNode.parentNode.childNodes.length  //19 空格也算
            // let col=current.parentNode.childNodes.length   //19 空格也算
            let tbody = document.querySelector('#jsContainer .game tbody')
            let row = tbody.getElementsByTagName('tr').length //多少行
            let col = document.querySelectorAll('#jsContainer .game tbody tr').length //多少列
            console.log(row, col)
            let td = document.querySelectorAll('#jsContainer .game tbody tr td')
            //
            console.log(td.length)

            //找到current位置
            let curDom = Array.from(td).findIndex((el) => {
                  return el.className === 'current'
            })
            console.log(curDom)


            console.log(td[curDom])
            //判断：current.parentNode(tr)是否为第一个或者最后一个
            //curDom特殊位置：0 1 2 3 4 5 6 7 ... col-1  1*col 2*col-1  2*col 3*col-1  3*col ...(row-1)*col-1 (row-1)*col ...  row*col
            //向上
            let upSpacial = Array.from({ length: col }).map((item, index) => {
                  return index
            })
            if (code === 38) {
                  //curDom特殊位置 0 1 2 3 4 5 6  col
                  if (curDom === 0) {
                        td[curDom].className = ''
                        td[row * col - 1].classList.add('current')
                  }
                  else if (upSpacial.includes(curDom)) {
                        td[curDom].className = ''
                        td[td.length + curDom - col].classList.add('current')
                  } else {
                        td[curDom].className = ''
                        td[curDom - col].classList.add('current')
                  }
            }
            //向下
            let downSpecial = Array.apply(null, { length: col }).map((item, index) => {
                  return index + col * (row - 1)
            })
            // console.log(downSpecial)
            if (code === 40) {
                  //curDom特殊位置 0 1 2 3 4 5 6  col
                  if (curDom === row * col - 1) {
                        td[curDom].className = ''
                        td[0].classList.add('current')
                  }
                  else if (downSpecial.includes(curDom)) {
                        td[curDom].className = ''
                        td[-td.length + curDom + col].classList.add('current')
                  } else {
                        td[curDom].className = ''
                        td[curDom + col].classList.add('current')
                  }
            }
            //向左

            let leftSpecial = Array.from({ length: col }).map((item, index) => {
                  return index * (col)
            })
            // console.log(leftSpecial)
            if (code === 37) {
                  if (leftSpecial.includes(curDom)) {
                        td[curDom].className = ''
                        td[curDom + col - 1].classList.add('current')
                  } else {
                        td[curDom].className = ''
                        td[curDom - 1].classList.add('current')
                  }
            }
            //向右
            let rightSpecial = leftSpecial.map((item, index) => {
                  return item + col - 1
            })
            console.log(rightSpecial)
            if (code === 39) {
                  if (rightSpecial.includes(curDom)) {
                        td[curDom].className = ''
                        td[curDom - col + 1].classList.add('current')
                  } else {
                        td[curDom].className = ''
                        td[curDom + 1].classList.add('current')
                  }
            }
      };
}



function bind() {
      document.onkeydown = event => {
            if (!event) return;
            var code = event.keyCode || '';
            if (!{ '37': 1, '38': 1, '39': 1, '40': 1 }[code]) return;
            event.preventDefault && event.preventDefault();
            //TODO: 请实现按键控制
            var tr = document.querySelectorAll('tr');
            var mL = document.querySelectorAll('tr').length;
            var td = document.querySelectorAll('tr:first-of-type td');
            var nL = document.querySelectorAll('tr:first-of-type td').length;

            var tdAll = document.querySelectorAll('td');
            var temp;
            for (var i = 0; i < tdAll.length; i++) {
                  if (tdAll[i].className == 'current') {
                        temp = i;//记录当前选中元素的下标
                        tdAll[i].className = '';//去除当前选中元素的样式
                        break;
                  }
            }
            var row = parseInt(temp / mL); //根据下标确定当前选中的td在第几行
            var col = temp % nL; //根据下标确定当前选中的td在第几列
            //根据按键操作以及所处位置，切换高亮节点
            if (code == '37') {//左
                  //td:nth-of-type()第一个元素从1开始，所以不能直接用行列的值计算
                  if (col == '0') {//如果在第一列往左移动则到达最后一列
                        tr[row].querySelector('td:nth-of-type(' + Number(nL) + ')').className = 'current'
                  } else {//否则行不变，列-1
                        tr[row].querySelector('td:nth-of-type(' + Number(col) + ')').className = 'current'
                  }
            } else if (code == '39') {//右
                  if (col == nL - 1) {//如果在最后一列往右移动则到达第一列
                        tr[row].querySelector('td:nth-of-type(1)').className = 'current'
                  } else {//否则行不变，列＋1
                        tr[row].querySelector('td:nth-of-type(' + Number(col + 2) + ')').className = 'current'
                  }
            } else if (code == '38') {//上
                  if (row == '0') {//如果在第一行往上移动则到达最后一行
                        tr[mL - 1].querySelector('td:nth-of-type(' + Number(col + 1) + ')').className = 'current'
                  } else {//否则列不变，行-1
                        tr[row - 1].querySelector('td:nth-of-type(' + Number(col + 1) + ')').className = 'current'
                  }
            } else if (code == '40') {//下
                  if (row == mL - 1) {//如果在最后一行往下移动则到达第一行
                        tr[0].querySelector('td:nth-of-type(' + Number(col + 1) + ')').className = 'current'
                  } else {//否则列不变，行+1
                        tr[row + 1].querySelector('td:nth-of-type(' + Number(col + 1) + ')').className = 'current'
                  }
            }
      };
}

var td = document.querySelectorAll('tr:first-of-type td');
let tdf=document.querySelectorAll('tr:nth-of-type(0) td') //null
let tdf1=document.querySelectorAll('tr:nth-of-type(1) td')//（第一个子元素的下标是 1）
let tdf2=document.querySelector('tr td:nth-of-type(2)')

console.log(td,tdf,tdf1,tdf2)

bind()