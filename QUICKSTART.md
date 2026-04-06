# 🚀 快速开始部署到 Vercel

## 🎯 最简单的部署方式（推荐）

### 方式1：通过 Vercel 网站一键部署 ⭐ 最简单

**步骤：**

1. **访问 Vercel**
   - 打开 [vercel.com/new](https://vercel.com/new)

2. **导入 GitHub 仓库**
   - 点击 "Import Project"
   - 选择你的仓库：`freall/ai-poem-coze`
   - 点击 "Import"

3. **配置项目**
   Vercel 会自动识别项目配置，直接点击 "Deploy" 即可！

4. **等待部署完成**
   - 约 1-2 分钟
   - 部署成功后会显示一个 `.vercel.app` 地址

5. **访问你的网站**
   - 点击生成的 URL
   - 即可看到你的古诗词大冒险应用！

**就这么简单！** 🎉

---

### 方式2：使用 Vercel CLI（适合开发者）

```bash
# 1. 安装 Vercel CLI（只需一次）
pnpm add -g vercel

# 2. 登录 Vercel（只需一次）
vercel login
# 会打开浏览器，登录你的 GitHub 账号

# 3. 部署到预览环境
vercel
# 按提示操作：
# - Set up and deploy? Y
# - Which scope? 选择你的账号
# - Link to existing project? Y
# - What's your project's name? ai-poem-coze（或自定义）
# - In which directory is your code? ./

# 4. 部署到生产环境
vercel --prod
```

---

## ✨ 部署后的功能

部署成功后，你将获得：

### ✅ 完整功能
- 📖 48首诗词浏览和学习
- 🎨 所有预生成的中国风插画
- 🤖 AI 生成的诗词讲解和问答
- 🎮 互动问答挑战系统

### 🌐 网站地址
- **预览环境**：`https://ai-poem-coze-xxx.vercel.app`（每次推送自动更新）
- **生产环境**：`https://ai-poem-coze.vercel.app`（使用 `vercel --prod` 部署）

### 🔄 自动部署
每次推送到 GitHub 的 `main` 分支，Vercel 会自动：
1. 拉取最新代码
2. 安装依赖
3. 构建项目
4. 部署到云端
5. 提供新的访问地址

---

## 🎯 自定义域名（可选）

### 使用 Vercel 域名

1. 在 Vercel 项目中进入 "Settings" → "Domains"
2. 添加你的域名，例如：`poem.example.com`
3. 点击 "Add"

### 配置 DNS（如果使用自己的域名）

根据你的域名服务商添加 DNS 记录：

```
Type: CNAME
Name: poem
Value: cname.vercel-dns.com
```

或使用 A 记录：
```
Type: A
Name: poem
Value: 76.76.21.21
```

---

## 📊 监控和管理

### 查看部署历史
1. 访问 [vercel.com/dashboard](https://vercel.com/dashboard)
2. 点击你的项目 `ai-poem-coze`
3. 进入 "Deployments" 标签页
4. 查看所有部署记录

### 查看函数日志（API 路由）
1. 在项目 Dashboard 中进入 "Logs" 标签页
2. 可以实时查看：
   - API 调用日志
   - 错误信息
   - 性能数据

### 查看分析数据
1. 进入 "Analytics" 标签页
2. 查看：
   - 访问量
   - 页面浏览量
   - 用户地理位置
   - 设备类型

---

## 🔧 环境变量（高级）

如果需要自定义配置，在 Vercel 中添加环境变量：

1. 进入 "Settings" → "Environment Variables"
2. 添加变量：

```env
NODE_ENV=production
```

3. 重新部署项目

---

## 🚨 常见问题

### Q: 部署失败，显示 "Build failed"？
**A**: 检查以下几点：
- 确保所有依赖都在 `package.json` 中
- 运行 `pnpm build` 本地测试
- 查看 Vercel 的构建日志

### Q: 图片加载不出来？
**A**: 确保所有 48 张图片都已生成：
```bash
ls public/poems/
# 应该看到 poem-1.jpg 到 poem-48.jpg
```

### Q: API 路由 404？
**A**: 确保使用 Vercel 部署（不是 GitHub Pages），Vercel 完全支持 Next.js API。

### Q: 如何回滚到上一个版本？
**A**: 在 Vercel Dashboard：
1. 进入 "Deployments"
2. 找到之前的成功部署
3. 点击 "..." → "Promote to Production"

---

## 🎉 部署成功！

部署完成后，你的网站将：

✅ 在全球 CDN 上加速
✅ 自动 HTTPS 加密
✅ 支持无限次重新部署
✅ 实时日志监控
✅ 性能分析报告

**立即体验你的古诗词大冒险！** 🚀

---

## 📞 获取帮助

- **Vercel 文档**：https://vercel.com/docs
- **Next.js 文档**：https://nextjs.org/docs
- **GitHub 仓库**：https://github.com/freall/ai-poem-coze

---

**准备好了吗？** 现在就去 [vercel.com/new](https://vercel.com/new) 开始部署吧！🚀
