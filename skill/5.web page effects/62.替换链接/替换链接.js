function link() {
      const elm = document.querySelector('#jsContainer');
      let reg = /(https?:\/\/)?(www\.\w+(\.(com|cn))*([?]\w+=\w*(&\w+=\w*)*)?(#\w+)?)/g
      elm.innerHTML = elm.innerHTML.replace(reg, function (...args) {            
            if (args[1]) {
                  return `<a target="_blank" href="${args[1]}${args[2]}">${args[0]}</a>`;
            } else {
                  return `<a target="_blank" href="http://${args[2]}">${args[0]}</a>`;
            }
      })
}


function link() {
      let dom = document.getElementById("jsContainer");
    
      dom.innerHTML = dom.innerText.replace(/(http(s)?:\/\/|www\.)[\w\.\?\=\&#%]+/g, $1=> {
        console.log($1);
        return `<a href="${/^www/.test($1) ? 'http://'+$1 : $1}" target="_blank">${$1}</a>`
      });
    }

    
link()