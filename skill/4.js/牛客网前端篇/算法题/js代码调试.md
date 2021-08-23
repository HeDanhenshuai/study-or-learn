### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

- 在 Debug 面板中，点击设置按钮打开 `.vscode/launch.json`，选择 "Node.js" 进行初始化构建。

### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ 以及其它版本

- 创建一个新的 Node.js 调试配置，点击调试。在 Node.js 7 版本上默认会加上 `--inspect` 开关。禁用 uncheck `js.debugger.node.use.inspect` IDE 注册表。

### [Chrome 开发工具](https://github.com/ChromeDevTools/devtools-frontend) 55+

- **选项 1**: 在基于 Chromium 内核的浏览器下打开 `chrome://inspect`。点击配置按钮确保你的目标宿主和端口号列入其中。
- **选项 2**: 从 `/json/list` 中拷贝 `devtoolsFrontendUrl`（见上），或者加上 --inspect 以检查提示文本并粘贴到 Chrome 中。

### [Node 监视器](https://github.com/nodejs/node-inspect)

- 由 Node.js 基础库，使用[检查器协议](https://chromedevtools.github.io/debugger-protocol-viewer/v8/)支持的 CLI 调试器。
- 和 Node 绑定在一起的版本，并且可以使用 `node inspect myscript.js`。
- 最新的版本同样可以单独通过（例如 `npm install -g node-inspect`）方式安装，并使用 `node-inspect myscript.js`。