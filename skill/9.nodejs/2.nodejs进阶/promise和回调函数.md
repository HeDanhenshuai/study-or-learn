参考内容：

https://www.cnblogs.com/zhangguicheng/articles/12607894.html

https://www.cnblogs.com/zhangguicheng/p/12608301.html

通过不同的方式读取在 files 文件夹下的三个文件来引出 promise 在处理异步时与回调函数相比的优势，files 文件夹有三个文件 a.json，b.json，c.json。

```js
// a.json
{
  "content": "this is a.json",
  "next": "b.json"
}
// b.json
{
  "content": "this is b.json",
  "next": "c.json"
}
// c.json
{
  "content": "this is c.json",
  "next": null
}
```



使用回调函数来读取三个文件内容

```js
// 封装连续读取文件的函数
function readFileContent(fileName, callback) {
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  fs.readFile(fullFileName, (err, data) => {
    // 这里使用callback时需要传递一个参数，那么定义的callback函数也有一个参数
    callback(JSON.parse(data.toString()))
  })
}
const fileName = 'a.json'
readFileContent(fileName, aData => {
  console.log(aData);
  // 获取b.json的名称
  const fileName = aData.next;
  // 读取b.json
  readFileContent(fileName, bData => {
    console.log(bData)
    // 获取c.json的名称
    const fileName = bData.next
    // 读取c.json
    readFileContent(fileName, cData => {
      console.log(cData)
    })
  })
})
```



使用promise来读取三个文件内容

```js
// 封装函数利用promise读取三个文件的内容
function readFileContent(fileName) {
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  return new Promise((resolve, reject) => {
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
const fileName = 'a.json'
readFileContent(fileName).then((data) => {
  console.log(JSON.parse(data.toString()));
  const fileName = JSON.parse(data.toString()).next;
  return readFileContent(fileName)
}).then((data) => {
  console.log(JSON.parse(data.toString()));
  const fileName = JSON.parse(data.toString()).next;
  return readFileContent(fileName)
}).then((data) => {
  console.log(JSON.parse(data.toString()));
})
```

**回调函数是异步执行或稍后执行的函数**。

使用了fs.readFile方法，它恰好是一个异步方法。**通常情况下，必须与硬盘驱动器或网络进行通信的操作将是异步的**。**如果他们只需要访问内存中的东西或者在CPU上做一些工作，它们就会是同步的**。其原因是，I / O真的很慢。大概数字是与硬盘驱动器通信比谈内存（例如RAM）慢大约10万倍。

例如下载种子,阅读文件,与数据库交互等,对应的例子,事件绑定,委托等。

回调往往就意味着是异步,而异步就需要时间等待,也就是**它是将来要发生,而不是现在立刻马上,它会稍后执行**,它是使用JavaScript函数的一种约定俗成的称呼,往往字面上有些抽象变得难以捉摸,粗俗理解它就是定义声明函数的功能,只是它比较特殊,它必须得依赖另一个个函数执行,通常回调仅在进行I/O时使用。

