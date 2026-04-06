# 快速部署到 GitHub Pages

## 一键部署步骤

### 1. Fork 本仓库
点击右上角 Fork 按钮，将仓库复制到你的账号

### 2. 启用 GitHub Pages
1. 进入仓库 → Settings → Pages
2. **重要**：在 "Build and deployment" 中，选择 **"GitHub Actions"** 作为 Source

### 3. 等待自动部署
- 推送代码到 main 分支后，GitHub Actions 会自动构建和部署
- 大约需要 2-3 分钟完成

### 4. 访问你的网站
访问地址：`https://[你的用户名].github.io/[仓库名]/`

## 如果部署失败

### 检查权限
1. Settings → Actions → General
2. Workflow permissions → 选择 "Read and write permissions"
3. 勾选 "Allow GitHub Actions to create and approve pull requests"
4. Save

### 查看日志
1. 进入 Actions 标签页
2. 点击最新的 workflow
3. 查看失败步骤的日志

## 本地测试

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:5000
```

## 项目信息

- 📚 诗词数量：80首
- 🖼️ 图片数量：79首（还差 poem-76）
- 🎨 风格：中国风插画
- 🎯 目标用户：小朋友

## 需要帮助？

查看完整文档：[GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)
