// function dom2json() {
//       const jsContainer = document.querySelector("#jsContainer")

//       function domJson(dom) {
//           var obj = {
//               tag: getTagName(dom)
//           }
//           if (dom.nodeType == 1) {
//               var attrs = getTagAttrs(dom)
//               if (attrs) obj.attributes = attrs;
//               console.log(dom.children)
//               obj.children = Array.from(dom.childNodes).filter(child => {
//                   return !(child.nodeType == 3 && !child.textContent.trim())
//               }).map(child => domJson(child))
//               return obj
//           }
//           if (dom.nodeType == 3) {
//               obj.content = texthandle(dom.textContent)
//               return obj
//           }
//       }
//       //text的处理
//       function texthandle(str) {
//           return str.replace(/\s/g, '')
//       }     
//       //获取标签
//       function getTagName(dom) {
//           return dom.nodeName.toLocaleLowerCase().replace('#', '')
//       }
//       //获取标签的属性
//       function getTagAttrs(dom) {
//           var attr = Array.from(dom.attributes)
//           var obj = {}
//           attr.forEach(atr => obj[atr.name] = atr.value)
//           return attr.length ? obj : null;
//       }
//       //返回json对象
//       return domJson(jsContainer)
//   }



//方法二
function dom2json() {
    let root = document.getElementById('jsContainer');
    return JSON.parse(JSON.stringify(analysisDom(root)))
}
function analysisDom(dom) {
    let templete;
    if (dom.nodeType == 1) {
        templete = {
            tag: '',
            attributes: {},
            children: []
        };
        templete.tag = dom.nodeName.toLocaleLowerCase();
        let len = dom.attributes.length;
        for (let i = 0; i < len; i++) {
            templete.attributes[dom.attributes.item(i).nodeName] = dom.getAttribute(dom.attributes.item(i).nodeName);
        };
        let cLen = dom.childNodes.length
        //取出每层中的节点信息，不断迭代
        if (cLen) {
            for (let i = 0; i < cLen; i++) {
                if (analysisDom(dom.childNodes[i])) {
                    templete.children.push(analysisDom(dom.childNodes[i]))
                }
            }
        }
    } else if (dom.nodeType == 3) {
        let data = dom.textContent.trim();
        if (data) {
            templete = {
                tag: 'text',
                content: data
            }
        }
    }
    return templete
}

// dom2json()
console.log(dom2json())
