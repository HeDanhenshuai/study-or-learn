function suggest(items) {
      let value = document.querySelector('.js-input').value.trim()
      const sDom = document.querySelector('.js-suggest')
      const ulDom = sDom.querySelector('ul')
      let list = value
            ? items.filter((str) => {
                  return new RegExp(
                        value
                              .split('')
                              .map((s) => {
                                    return (
                                          (['(', ')', '[', ']', '.', '*', '+', '?'].includes(s) ? '\\' : '') +
                                          s +
                                          '.*?'
                                    )
                              })
                              .join(''),
                        'g'
                  ).test(str)
            })
            : []
      if ( list.length) {
            sDom.classList.remove('hide')
            ulDom.innerHTML = list.map((str) => '<li>' + str + '</li>').join('')
      } else {
            ulDom.innerHTML = ''
            sDom.classList.add('hide')
      }
}
document.querySelector('.js-input').addEventListener("input",function(e){
      console.log(e.data)
      suggest([
            'XXXXXX不匹配数据',
            'XXXXXXXXXXXXXXX根据输入框的值',
            'XXXXXXXXXXXXXXXX从给定字符串数组中筛选出匹配的数据，依次显示在li节点中XXXXXXXXXXXXXXXXXXXXXXXX',
            'XXXXXXXXXXXXXXXXXXXXX如果没有匹配的数据，请移除所有li节点，并隐藏.js-suggest节点XXXXXXXXXXXXXXXXXXXXXXXXXXX',
      ])
  })

