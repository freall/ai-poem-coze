# 古诗词大冒险 - GitHub Pages 部署指南

## 项目介绍

古诗词大冒险是一个游戏化的诗词学习网页应用，帮助小朋友学习24节气和传统节日的诗词。

## 部署到 GitHub Pages

### 方法一：使用 GitHub Actions 自动部署（推荐）

1. **Fork 本仓库到你的 GitHub 账号**

2. **启用 GitHub Pages**
   - 进入仓库的 `Settings` -> `Pages`
   - 在 `Build and deployment` 中，将 `Source` 设置为 `GitHub Actions`
   - 选择使用我们配置好的 `deploy.yml` 工作流

3. **推送代码**
   - 每次推送代码到 `main` 分支，GitHub Actions 会自动构建并部署到 GitHub Pages

4. **访问网站**
   - 部署完成后，访问 `https://[你的用户名].github.io/[仓库名]/`

### 方法二：手动部署

1. **安装依赖**
   ```bash
   pnpm install
   ```

2. **构建项目**
   ```bash
   pnpm build
   ```

3. **上传构建文件**
   - 将 `out` 目录中的所有文件上传到 GitHub Pages 的 `gh-pages` 分支
   - 或者将 `out` 目录的内容直接上传到 GitHub Pages 的根目录

## 本地开发

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

访问 http://localhost:5000 查看效果

### 生成诗词数据
```bash
pnpm exec tsx scripts/generate-static-data.ts
```

### 生成诗词图片（需要较长时间）
```bash
pnpm exec tsx scripts/generate-all-poem-images.ts
```

## 项目结构

```
├── public/                 # 静态资源
│   ├── data/              # 诗词数据（JSON文件）
│   ├── poems/             # 诗词意境图
│   └── .nojekyll          # GitHub Pages 配置
├── src/
│   ├── app/               # 页面路由
│   ├── components/        # React 组件
│   ├── lib/               # 工具函数
│   └── types/             # TypeScript 类型
├── scripts/               # 构建和生成脚本
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions 部署配置
```

## 注意事项

1. **静态导出**：本项目配置为静态导出（`output: 'export'`），适用于 GitHub Pages 部署
2. **API 路由**：所有 API 路由已被移除，数据从静态 JSON 文件读取
3. **图片优化**：图片优化功能已禁用（`images.unoptimized: true`），以支持静态导出
4. **诗词数量**：当前包含 80 首诗词（24节气 + 传统节日）

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm

## License

MIT
