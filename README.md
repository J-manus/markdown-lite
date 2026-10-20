# markdown-lite

一个很小、零依赖的 Markdown 解析器，适合在需要"够用就好"的地方使用：评论区、聊天消息、命令行工具的帮助文本。

支持：标题（`#` 到 `######`）、段落、无序和有序列表、`**粗体**`、`*斜体*`、`` `行内代码` ``。不支持的语法会原样输出为文本，不会抛错。

## 安装

```bash
npm install markdown-lite
```

## 用法

```ts
import { toHtml } from "markdown-lite";

toHtml("# 你好\n\n这是 **markdown-lite**。");
// <h1>你好</h1>
// <p>这是 <strong>markdown-lite</strong>。</p>
```

如果需要先拿到语法树再自己渲染：

```ts
const doc = parse("- 一\n- 二");
console.log(render(doc));
```

## 开发

```bash
npm install
npm run build   # 编译到 dist/
npm test        # 运行测试（vitest）
```

欢迎贡献！带 `good first issue` 标签的问题都比较独立，适合第一次参与。认领前请先在 issue 下留言，避免重复劳动。

## 许可证

MIT
