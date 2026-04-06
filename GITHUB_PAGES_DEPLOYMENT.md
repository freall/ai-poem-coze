# 古诗词大冒险 - GitHub Pages 部署指南

## 项目介绍

古诗词大冒险是一个游戏化的诗词学习网页应用，帮助小朋友学习24节气和传统节日的诗词。

## 部署到 GitHub Pages

### 方法一：使用 GitHub Actions 自动部署（推荐）

#### 步骤1：Fork 本仓库
1. 访问本仓库
2. 点击右上角的 "Fork" 按钮
3. 将仓库 Fork 到你的 GitHub 账号

#### 步骤2：启用 GitHub Pages
1. 进入你 Fork 的仓库
2. 点击 "Settings" 标签页
3. 在左侧菜单中找到 "Pages"
4. 在 "Build and deployment" 部分：
   - **重要**：将 "Source" 设置为 **"GitHub Actions"**
   - 不要选择 "Deploy from a branch"

#### 步骤3：配置 Actions 权限（如果需要）
1. 进入仓库 Settings → Actions → General
2. 找到 "Workflow permissions"
3. 选择 "Read and write permissions"
4. 勾选 "Allow GitHub Actions to create and approve pull requests"
5. 点击 "Save"

#### 步骤4：推送代码
1. 将你的修改推送到你的仓库的 `main` 分支
2. GitHub Actions 会自动触发构建和部署

#### 步骤5：查看部署状态
1. 进入仓库的 "Actions" 标签页
2. 查看最新的工作流运行状态
3. 等待构建和部署完成（通常需要 2-3 分钟）

#### 步骤6：访问网站
- 部署完成后，访问 `https://[你的用户名].github.io/[仓库名]/`
- 示例：如果你的用户名是 `username`，仓库名是 `poem-adventure`，则访问：
  `https://username.github.io/poem-adventure/`

### 常见问题排查

#### 问题1：部署失败，提示权限错误
**解决方法**：
1. 进入仓库 Settings → Actions → General
2. 找到 "Workflow permissions"
3. 选择 "Read and write permissions"
4. 勾选 "Allow GitHub Actions to create and approve pull requests"
5. 点击 "Save"

#### 问题2：部署失败，提示找不到 pnpm
**解决方法**：
- 确保 `.github/workflows/deploy.yml` 文件已正确提交到仓库

#### 问题3：部署成功但访问 404
**解决方法**：
1. 等待 1-2 分钟，GitHub Pages 需要时间来分发内容
2. 确认访问的 URL 正确
3. 清除浏览器缓存后重试

#### 问题4：图片无法加载
**解决方法**：
- 确保所有80首诗词的图片都已生成在 `public/poems/` 目录中
- 检查 GitHub 仓库的文件大小限制（单个文件不超过 100MB）

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
│   ├── poems/             # 诗词意境图（80首）
│   └── .nojekyll          # GitHub Pages 配置
├── src/
│   ├── app/               # 页面路由
│   │   ├── page.tsx       # 主页（静态）
│   │   ├── poem/[id]/     # 诗词详情页（80个静态页面）
│   │   └── robots.ts      # Robots配置
│   ├── components/        # React 组件
│   ├── lib/               # 工具函数
│   └── types/             # TypeScript 类型
├── scripts/               # 构建和生成脚本
│   ├── generate-static-data.ts         # 生成诗词数据
│   ├── generate-all-poem-images.ts    # 生成诗词图片
│   └── generate-single-image.ts       # 生成单首诗词图片
├── out/                   # 构建输出目录
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions 部署配置
```

## 注意事项

1. **静态导出**：本项目配置为静态导出（`output: 'export'`），适用于 GitHub Pages 部署
2. **API 路由**：所有 API 路由已被移除，数据从静态 JSON 文件读取
3. **图片优化**：图片优化功能已禁用（`images.unoptimized: true`），以支持静态导出
4. **诗词数量**：当前包含 80 首诗词（24节气 + 传统节日）
5. **图片数量**：当前包含 79 首诗词的意境图（poem-76暂缺失）

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm

## License

MIT
