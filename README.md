# 社团招新智能匹配平台

一个面向高校新生的前端原型，帮助用户通过 AI 测评或标签快选发现适合自己的社团，并完成浏览、推荐、详情查看和报名的完整流程。

## 本地启动

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

构建成功后会生成 `dist/` 目录。

## 部署方式

### 方案一：Vercel

1. 把当前项目推到 GitHub
2. 打开 [Vercel](https://vercel.com/)
3. 选择 `Add New Project`
4. 导入这个仓库
5. Framework 选择 `Vite`
6. Build Command 保持 `npm run build`
7. Output Directory 保持 `dist`
8. 点击 Deploy

### 方案二：Netlify

1. 把当前项目推到 GitHub 后导入 Netlify
2. Build command 填 `npm run build`
3. Publish directory 填 `dist`
4. 点击 Deploy

### 方案三：Netlify Drop

1. 先运行 `npm run build`
2. 打开 [Netlify Drop](https://app.netlify.com/drop)
3. 把 `dist/` 目录直接拖进去
4. 立即获得可访问链接

## 演示建议

- 首页先展示平台价值和双入口
- 再演示标签快选和 AI 测评两条路径
- 结果页重点讲“为什么推荐”
- 最后进入社团详情页和报名页，完成闭环
