# 🚀 部署指南

本项目提供多种部署方案，推荐使用 **Vercel** 进行自动部署。

## 📦 部署选项对比

| 平台 | 支持API | 自动部署 | 推荐度 | 说明 |
|------|---------|---------|--------|------|
| **Vercel** | ✅ 完全支持 | ✅ 一键部署 | ⭐⭐⭐⭐⭐ | Next.js官方推荐，最佳体验 |
| **Netlify** | ✅ 完全支持 | ✅ 一键部署 | ⭐⭐⭐⭐ | 功能强大，支持插件 |
| **GitHub Pages** | ❌ 不支持 | ✅ 自动部署 | ⭐⭐⭐ | 仅支持静态页面 |

## 🎯 推荐方案：Vercel

### 为什么选择 Vercel？

- ✅ Next.js 官方推荐平台
- ✅ 完全支持 API 路由
- ✅ 自动 HTTPS 和 CDN
- ✅ 零配置部署
- ✅ 免费额度充足

### 一键部署步骤

#### 方法1：使用 Vercel CLI（推荐）

```bash
# 1. 安装 Vercel CLI
pnpm add -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel

# 4. 部署到生产环境
vercel --prod
```

#### 方法2：通过 Vercel 网站部署

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 导入你的 GitHub 仓库：`https://github.com/freall/ai-poem-coze`
4. Vercel 会自动识别 Next.js 项目
5. 配置环境变量（如需要）：
   ```
   COZE_WORKSPACE_PATH=/workspace/projects
   DEPLOY_RUN_PORT=5000
   ```
6. 点击 "Deploy"

### 自动部署设置

配置完成后，每次推送到 GitHub 的 `main` 分支，Vercel 会自动：

1. 拉取最新代码
2. 运行 `pnpm install` 安装依赖
3. 运行 `pnpm build` 构建项目
4. 自动部署到生产环境
5. 提供 HTTPS 访问地址

### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```env
NODE_ENV=production
COZE_WORKSPACE_PATH=/workspace/projects
DEPLOY_RUN_PORT=5000
```

### 自定义域名（可选）

1. 在 Vercel 项目设置中选择 "Domains"
2. 添加你的自定义域名
3. 配置 DNS 记录（Vercel 会提供指引）

## 🌐 备选方案：Netlify

### 部署步骤

#### 方法1：使用 Netlify CLI

```bash
# 1. 安装 Netlify CLI
pnpm add -g netlify-cli

# 2. 登录 Netlify
netlify login

# 3. 初始化项目
netlify init

# 4. 部署
netlify deploy --prod
```

#### 方法2：通过 Netlify 网站部署

1. 访问 [netlify.com](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 导入 GitHub 仓库
4. 配置构建设置：
   ```
   Build command: pnpm build
   Publish directory: .next
   ```
5. 点击 "Deploy site"

### 自动部署设置

每次推送到 GitHub，Netlify 会自动构建和部署。

## ⚠️ GitHub Pages（不推荐）

**重要提示**：本项目使用了 Next.js API 路由（`/api/*`），GitHub Pages 只支持静态内容，无法运行这些 API。

### 如果必须使用 GitHub Pages

你需要将项目转换为纯静态版本：

1. 预先生成所有诗词详情和图片
2. 移除所有 API 路由
3. 修改 `next.config.ts` 添加 `output: 'export'`
4. 修改前端代码，直接读取预生成的数据

这会大大降低功能，**不推荐**使用此方案。

## 📋 部署检查清单

### 部署前检查

- [ ] 所有代码已提交到 GitHub
- [ ] 所有 48 张诗词图片已生成
- [ ] TypeScript 类型检查通过：`pnpm ts-check`
- [ ] ESLint 检查通过：`pnpm lint`
- [ ] 本地构建成功：`pnpm build`

### Vercel 部署检查

- [ ] 项目已导入 Vercel
- [ ] 环境变量已配置
- [ ] 部署成功无错误
- [ ] API 路由可正常访问
- [ ] 静态图片可正常加载
- [ ] 自定义域名已配置（如需要）

## 🔍 验证部署

部署完成后，访问以下地址验证功能：

- ✅ 主页：`https://your-domain.vercel.app/`
- ✅ 诗词详情：`https://your-domain.vercel.app/poem/1`
- ✅ API 测试：`https://your-domain.vercel.app/api/poems`
- ✅ 图片加载：`https://your-domain.vercel.app/poems/poem-1.jpg`

## 📊 监控和日志

### Vercel 监控

1. 访问 Vercel 项目 Dashboard
2. 查看 "Deployments" 标签页
3. 点击任意部署查看：
   - 构建日志
   - 函数日志（API 路由）
   - 性能指标
   - 错误报告

### 查看实时日志

```bash
# 使用 Vercel CLI
vercel logs
```

## 🔄 更新部署

每次更新代码后：

```bash
# 1. 提交代码
git add .
git commit -m "描述你的更改"
git push origin main

# 2. Vercel 会自动部署
# 3. 几分钟后访问新版本
```

## 🆘 常见问题

### Q: 部署失败怎么办？

A: 检查 Vercel Dashboard 的部署日志，常见原因：
- 依赖安装失败：检查 `package.json` 和 `pnpm-lock.yaml`
- 构建错误：运行 `pnpm build` 本地测试
- 环境变量缺失：确保在 Vercel 中配置

### Q: API 路由 404 错误？

A: 确保：
- 使用 Vercel 或 Netlify（支持 API）
- 不要使用 GitHub Pages（不支持 API）
- API 路由文件在 `src/app/api/` 目录

### Q: 图片加载失败？

A: 检查：
- `public/poems/` 目录包含所有 48 张图片
- 图片文件名格式正确：`poem-[id].jpg`
- Vercel 已完全部署（包括静态资源）

### Q: 如何回滚到上一个版本？

A: 在 Vercel Dashboard：
1. 进入 "Deployments" 标签页
2. 找到之前的成功部署
3. 点击 "..." → "Promote to Production"

## 📞 技术支持

- Vercel 文档：https://vercel.com/docs
- Netlify 文档：https://docs.netlify.com
- Next.js 部署：https://nextjs.org/docs/deployment

## 🎉 开始部署

选择推荐的 Vercel 方案：

```bash
# 安装 Vercel CLI
pnpm add -g vercel

# 登录并部署
vercel login
vercel
vercel --prod
```

几分钟内，你的项目就会在云端运行！🚀
