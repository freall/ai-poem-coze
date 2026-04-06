# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
│   └── poems/              # 预生成的诗词意境图
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   ├── start.sh            # 生产环境启动脚本
│   └── generate-poem-images.ts  # 批量生成诗词图片脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── api/            # API 路由
│   │   │   ├── poems/      # 诗词数据API
│   │   │   ├── fetch-doc/  # 文档读取API
│   │   │   └── generate-poem-details/  # 诗词详情生成API（LLM）
│   │   ├── page.tsx        # 主页
│   │   └── poem/[id]/page.tsx  # 诗词详情页
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   ├── utils.ts        # 通用工具函数 (cn)
│   │   └── poem-parser.ts  # 诗词解析工具
│   ├── types/              # TypeScript 类型定义
│   │   └── poem.ts         # 诗词相关类型
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

- **项目理解加速**：初始可以依赖项目下`package.json`文件理解项目类型，如果没有或无法理解退化成阅读其他文件。
- **Hydration 错误预防**：严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。


## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

---

# 古诗词大冒险项目说明

## 项目概述

古诗词大冒险是一个游戏化的诗词学习网页应用，帮助小朋友学习24节气和传统节日的诗词。通过互动问答、精美配图和详细讲解，让诗词学习变得有趣又好记。

## 核心功能

### 1. 诗词分类浏览
- 按节气分类：春季、夏季、秋季、冬季
- 按节日分类：春节、元宵节、清明节、端午节、七夕节、中秋节、重阳节、除夕
- 卡片式展示，每个分类显示诗词数量

### 2. 诗词详情页面
- 展示诗词内容、作者、朝代
- 自动生成作者介绍（使用LLM）
- 自动生成诗词背景介绍（使用LLM）
- 自动生成诗意翻译（使用LLM）
- **使用预生成的诗词意境图**（图片已提前生成，加载速度快）
- 美观的渐变色背景和卡片设计

### 3. 互动问答系统
- 每首诗自动生成3个相关问题（使用LLM）
- 每个问题提供4个选项（单选题）
- 答对显示庆祝动画和提示
- 答错显示正确答案和详细解释
- 进度条显示答题进度
- 最终得分展示

### 4. 游戏化元素
- 精美的渐变色卡片设计
- **预生成的诗词图片**（中国风插画风格）
- 答题成功庆祝动画
- 答错答案解释
- 进度追踪和得分统计

## API 接口

### 1. GET /api/poems
获取诗词分类列表

### 2. GET /api/poems/[id]
获取单个诗词详情

### 3. POST /api/generate-poem-details
生成诗词详细信息（作者介绍、背景、翻译、问题）

参数：
```json
{
  "poemData": {
    "number": 1,
    "title": "立春偶成",
    "author": "张栻",
    "dynasty": "宋",
    "content": "律回岁晚冰霜少...",
    ...
  }
}
```

### 4. POST /api/fetch-doc
读取文档内容（用于解析附件）

参数：
```json
{
  "url": "https://..."
}
```

### 5. GET /poems/poem-[id].jpg
获取预生成的诗词意境图

## 技术实现要点

### 1. 诗词解析
- 使用正则表达式解析Word文档中的诗词数据
- 提取序号、诗题、作者、朝代、诗句等信息
- 按节气和节日分类

### 2. LLM 集成
- 使用 `coze-coding-dev-sdk` 的 LLMClient
- 生成适合小朋友理解的诗词讲解
- 生成3个相关问题和答案

### 3. 图片预生成（优化方案）✨
- **批量生成脚本**：`scripts/generate-poem-images.ts`
- **图片存储**：所有诗词意境图预先生成并保存到 `public/poems/` 目录
- **快速加载**：用户访问时直接从静态资源加载，无需等待AI生成
- **生成命令**：`pnpm exec tsx scripts/generate-poem-images.ts`
- **图片命名规则**：`poem-{number}.jpg`（例如：poem-1.jpg）

### 4. 状态管理
- 使用 React useState 管理诗词数据、答题状态
- 使用 React useEffect 处理数据获取
- 使用 Next.js 路由管理页面导航

### 5. UI/UX 设计
- 渐变色背景（紫色、粉色、橙色）
- 卡片式布局
- 进度条显示
- 动画效果（答对庆祝、答错提示）
- 响应式设计，支持移动端

## 已知问题和注意事项

1. **诗词数量**：当前解析器识别了48首诗词（主要是节气类），节日类诗词需要进一步优化解析逻辑
2. **LLM 生成时间**：诗词详情生成需要几秒钟，显示加载状态
3. **TypeScript 警告**：部分未使用的变量和导入，但不影响功能
4. **图片预生成**：需要预先运行生成脚本，首次部署时需要等待图片生成完成（约3-4分钟）

## 测试命令

```bash
# 代码静态检查
pnpm lint
pnpm ts-check

# 批量生成所有诗词图片（部署前执行）
pnpm exec tsx scripts/generate-poem-images.ts

# 启动开发环境
pnpm dev

# 构建生产版本
pnpm build

# 启动生产环境
pnpm start
```

## 部署流程

### 首次部署
1. 批量生成诗词图片：`pnpm exec tsx scripts/generate-poem-images.ts`
2. 确认图片已生成：`ls public/poems/` （应显示48张图片）
3. 构建项目：`pnpm build`
4. 启动服务：`pnpm start`

## 端口信息

- 开发环境：http://localhost:5000
- 生产环境：通过 DEPLOY_RUN_PORT 环境变量配置（默认 5000）
