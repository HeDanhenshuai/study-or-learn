//自己解法
function second(second) {
    let obj = {
        // day:Math.floor(second/(3600*24)),
        // hour:Math.floor((second-day*3600*24)/3600),
        // min:Math.floor((second-day*3600*24-hour*3600)/60),
        // second:second-day*3600*24-hour*3600-min*60

        //正确
        // day: Math.floor(second / (60 * 60 * 24)),
        // hour: Math.floor((second % (60 * 60 * 24)) / (60 * 60)),
        // min: Math.floor(second % (60 * 60) / 60),
        // second: second % 60,

        //正确
        day: Math.floor(second / 3600 / 24),
        hour: Math.floor(second / 3600 % 24),
        min: Math.floor(second / 60 % 60),
        second: second % 60


    }
    return obj
}

function render(data) {
    //对data数据进行处理
    let addZore = (i) => { return i > 9 ? i : '0' + i }
    let jsCountdown = document.querySelectorAll('#jsCountdown span')
    console.log(jsCountdown)
    if (data.day > 9 || data.day === 0) {
        jsCountdown[0].innerHTML = `<span>${data.day}天</span>`
        if (data.day === 0) {
            // jsCountdown[0].setAttribute("class", "hide")
            jsCountdown[0].innerHTML = `<span>` + '0' + `${data.day}天</span>`
        }

    } else {
        jsCountdown[0].innerHTML = `<span>` + '0' + `${data.day}天</span>`
    }
    console.log(data.hour, data.min)
    jsCountdown[1].innerHTML = `<span>${addZore(data.hour)}:</span>`
    jsCountdown[2].innerHTML = `<span>${addZore(data.min)}:</span>`
    jsCountdown[3].innerHTML = `<span>${addZore(data.second)}</span>`

}


//解法二
// function second(second) {
//     var day = Math.floor(second / (3600 * 24));
//     var hour = Math.floor((second % (3600 * 24)) / 3600);
//     var min = Math.floor(((second % (3600 * 24)) % 3600) / 60);
//     var second = Math.floor((((second % (3600 * 24)) % 3600) % 60) % 60);
//     return { day, hour, min, second }
// }

// function render(data) {
//     let oDiv = document.getElementById("jsCountdown");
//     let aSpans = oDiv.children;

//     if (data.day == 0) aSpans[0].setAttribute("class", "hide");
//     else aSpans[0].innerHTML = `${data.day < 10 ? '0' + data.day : data.day}天`;
//     aSpans[1].innerHTML = `${data.hour < 10 ? '0' + data.hour : data.hour}:`;
//     aSpans[2].innerHTML = `${data.min < 10 ? '0' + data.min : data.min}:`;
//     aSpans[3].innerHTML = `${data.second < 10 ? '0' + data.second : data.second}`;
// }





var timer = setTimeout(function () {
    render(second(3601))
}, 2000)