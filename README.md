# TaskApp - 原生 JS 面向对象版

你好，欢迎来到 TaskApp 的原生 JS 版本！👋

这个项目旨在通过纯粹的 HTML、CSS 和面向对象的 JavaScript，重现 [Vue 版本](https://github.com/kaijuTAT/DEMO/tree/master/task-app) 的所有核心功能。它是一个绝佳的示例，用于展示如何在不依赖任何现代前端框架的情况下，构建一个结构清晰、可维护的单页面应用 (SPA)。

---

## ✨ 核心功能

- **任务管理**: 轻松添加、编辑、删除和标记任务为完成状态。
- **实时搜索**: 在任务列表中即时筛选，快速定位你关心的任务。
- **数据持久化**: 所有任务数据都会安全地保存在你的浏览器本地存储中，刷新页面也不会丢失。
- **面向对象设计**: 代码通过 `Task`, `Store`, 和 `UI` 三个核心类进行组织，实现了数据、逻辑和视图的清晰分离。

---

## 🚀 技术栈

- **HTML5**: 负责应用的骨架结构。
- **CSS3**: 负责应用的全部样式，力求与 Vue 版本视觉一致。
- **JavaScript (ES6+)**: 使用 `class`、`static` 方法、箭头函数等现代 JS 特性，以面向对象的方式构建所有交互逻辑。

---

## 🛠️ 如何开始

无需任何构建工具，直接在浏览器中打开即可！

1.  **克隆仓库**
    ```bash
    git clone https://github.com/kaijuTAT/DEMO.git
    ```

2.  **打开文件**
    在你的文件浏览器中，找到 `demo/task-app-vanilla-oo` 目录，然后直接用浏览器打开 `index.html` 文件。

    就是这么简单！

---

## 📂 项目结构

我们采用了经典的前端分层结构：

```
.
├── js/
│   ├── app.js      # 应用主入口，负责事件监听和协调
│   ├── store.js    # Store 类，负责数据处理和本地存储
│   ├── task.js     # Task 类，作为数据模型
│   └── ui.js       # UI 类，封装所有 DOM 操作
├── index.html      # 应用的 HTML 骨架
├── style.css       # 所有的 CSS 样式
└── README.md       # 你正在阅读的这个文件
```

---

## 🤝 贡献

我们非常欢迎各种形式的贡献！如果你发现了 Bug，或者有任何让这个项目变得更好的想法，请随时提 [Issue](https://github.com/kaijuTAT/DEMO/issues) 或 [Pull Request](https://github.com/kaijuTAT/DEMO/pulls)。

---

希望你喜欢这个原生 JS 版本！别忘了给个 Star ⭐ 哦！
