# Raw Interface Portfolio

一款基于 **Next.js 15** 构建的硬核工业风/布鲁塔利主义（Brutalist）个人作品集网站。项目从 Lovable (Vite) 迁移而来，经过全面重构以支持 **SEO 优化** 和 **Cloudflare Pages** 部署。

## 🚀 技术栈

- **框架**: [Next.js 15 (App Router)](https://nextjs.org/) + [Turbopack](https://nextjs.org/docs/architecture/turbopack)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [CVA](https://cva.style/)
- **动画**: [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://lenis.darkroom.engineering/) 平滑滚动
- **UI组件**: 完整的 [Radix UI](https://www.radix-ui.com/) 组件库 + shadcn/ui
- **数据管理**: [TanStack Query](https://tanstack.com/query)
- **字体**: Space Grotesk (标题) & Space Mono (正文)
- **部署**: [Cloudflare Pages](https://pages.cloudflare.com/) + [OpenNext](https://opennext.js.org/)

## ✨ 核心特性

- 🛠 **硬核工业视觉**: 采用网格背景、扫描线（Scanline）和颗粒感（Grain）叠加效果
- 🖥 **交互式终端**: 内置模拟终端组件，支持动态命令交互
- 📊 **实时遥测数据**: 右侧 Data Panel 展示模拟的实时系统指标与音乐播放器
- 🎨 **主题切换系统**: 支持多主题动态切换，含扫描线过渡动画
- 📸 **Photo Mode**: 一键截图模式，隐藏UI元素生成作品集截图
- 🌐 **国际化支持**: 内置中英文双语支持，动态切换语言
- 🔍 **SEO 友好**: 利用 Next.js Metadata API 进行全站 SEO 优化
- 📱 **响应式设计**: 完美适配从桌面端到移动端的所有屏幕
- 🎭 **页面过渡动画**: 平滑的页面切换和元素淡入效果
- ⚡ **性能优化**: Turbopack 开发模式加速，优化构建性能

## 📦 本地开发

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd raw-interface
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 可用命令

```bash
npm run dev      # 启动开发服务器 (启用 Turbopack)
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint 代码检查
npm run preview  # 本地预览 Cloudflare Pages 构建
npm run deploy   # 构建并部署到 Cloudflare Pages
npm run upload   # 构建并上传到 Cloudflare
```

## ☁️ 部署 (Cloudflare Pages)

本项目已集成 `@opennextjs/cloudflare` 适配器，完美适配 Cloudflare Pages 部署。

### 方法 1: 通过 Git 仓库自动部署

1. 在 Cloudflare Dashboard 连接 Git 仓库
2. 配置构建设置：
   - **构建命令**: `npx @opennextjs/cloudflare build`
   - **输出目录**: `.open-next/.output`
   - **Node.js 版本**: 18.x 或更高
3. 在 Settings → Functions 中开启 `nodejs_compat` 兼容性标志
4. 推送代码即可自动部署

### 方法 2: 通过 Wrangler CLI 部署

```bash
# 本地预览构建
npm run preview

# 部署到 Cloudflare Pages
npm run deploy

# 或仅上传构建产物
npm run upload
```

### 环境变量配置

目前项目为纯前端应用，无需额外环境变量。如需添加 API 密钥等敏感信息，请在 Cloudflare Pages 设置中配置。

## 🎯 自定义配置

### 修改项目内容

1. **更新项目数据**: 编辑 `data/projects.ts`
2. **修改个人信息**: 编辑各个 Section 组件（AboutSection、ContactSection 等）
3. **调整主题颜色**: 编辑 `app/globals.css` 中的 CSS 变量
4. **添加新语言**: 编辑 `lib/i18n/translations.ts`

### 主题系统

项目支持多主题切换，主题定义在 `app/globals.css` 中：

```css
/* 示例主题 */
[data-theme="neon"] {
  --primary: 340 82% 62%;
  --accent: 180 100% 50%;
  /* ... */
}
```

在 DataPanel 中可切换主题，切换时会触发扫描线过渡动画。

### Photo Mode 截图模式

点击右下角的相机按钮进入截图模式：
- 隐藏所有 UI 装饰元素（导航栏、面板、叠加层等）
- 仅保留核心内容区域
- 适合生成干净的作品集截图

## 🛠 开发指南

### 添加新组件

项目使用 shadcn/ui 组件系统：

```bash
# 添加新的 UI 组件
npx shadcx@latest add [component-name]
```

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 配置规则
- 使用 Prettier 格式化代码（建议配置 IDE）
- 组件文件使用 PascalCase 命名

### 性能优化建议

- 使用 Next.js Image 组件优化图片
- 利用 TanStack Query 缓存数据
- 动画组件使用 `will-change` 优化渲染
- 大型组件考虑使用 React.lazy() 懒加载

## 📂 目录结构

```
├── app/                    # Next.js 路由与页面
│   ├── api/               # API 路由
│   ├── layout.tsx         # 全局布局
│   ├── page.tsx           # 首页
│   ├── globals.css        # 全局样式
│   ├── sitemap.ts         # 站点地图
│   └── not-found.tsx      # 404 页面
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 基础组件
│   ├── providers/        # Context Providers
│   ├── ParallaxHero.tsx  # 英雄区域
│   ├── ProjectsSection.tsx # 项目展示
│   ├── SkillsSection.tsx  # 技能展示
│   ├── AboutSection.tsx   # 关于我
│   ├── ContactSection.tsx # 联系方式
│   ├── DataPanel.tsx      # 右侧数据面板
│   ├── LeftSidebar.tsx    # 左侧导航栏
│   ├── TopBar.tsx         # 顶部栏
│   ├── InteractiveTerminal.tsx # 交互式终端
│   ├── PhotoModeButton.tsx     # 截图模式按钮
│   ├── GrainOverlay.tsx   # 颗粒感叠加
│   ├── ScanlineOverlay.tsx # 扫描线效果
│   └── ...               # 其他组件
├── hooks/                 # 自定义 React Hooks
│   ├── useDynamicTitle.ts # 动态标题
│   └── use-mobile.tsx     # 移动端检测
├── lib/                   # 工具函数
│   ├── utils.ts          # 通用工具函数
│   └── i18n/             # 国际化配置
├── data/                  # 静态数据
│   └── projects.ts       # 项目数据（支持国际化）
├── public/               # 静态资源
├── components.json       # shadcn/ui 配置
├── tailwind.config.ts    # Tailwind CSS 配置
├── next.config.ts        # Next.js 配置
├── open-next.config.ts   # OpenNext 配置
├── wrangler.jsonc        # Cloudflare Workers 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目依赖
```

## 🎨 组件说明

### 核心视觉组件
- **GrainOverlay**: Canvas 实现的颗粒感纹理叠加
- **ScanlineOverlay**: CSS 动画实现的扫描线效果
- **LeftSidebar**: 固定左侧导航栏，支持锚点跳转
- **TopBar**: 顶部导航栏，包含语言切换器
- **DataPanel**: 右侧数据面板，显示时钟、系统状态和音乐播放器

### 内容模块
- **ParallaxHero**: 视差滚动英雄区域
- **ProjectsSection**: 项目展示卡片，支持国际化
- **SkillsSection**: 技能标签云展示
- **AboutSection**: 个人简介模块
- **ContactSection**: 联系方式展示
- **InteractiveTerminal**: 模拟终端命令行交互

### 功能组件
- **PhotoModeButton**: 一键进入截图模式
- **PageTransition**: 页面过渡动画效果
- **SmoothScroll**: Lenis 平滑滚动包装器
- **LanguageSwitcher**: 语言切换器（中英文）

## 🌐 国际化

项目内置中英文双语支持：

- 使用 React Context API 管理语言状态
- 所有文本内容支持动态切换
- 项目数据、技能标签等均支持国际化
- URL 路由无需修改，语言状态保存在客户端

如需添加新语言，编辑 `lib/i18n/translations.ts` 和相关数据文件。

## 📝 项目特色

### 视觉设计
- **布鲁塔利主义风格**: 强调原始、粗犷的工业美学
- **网格背景系统**: 动态生成的网格背景，增强科技感
- **多层视觉叠加**: 颗粒纹理 + 扫描线 + 主题色彩，打造独特视觉体验
- **响应式动画**: 基于 Framer Motion 的流畅过渡和交互反馈

### 技术亮点
- **Next.js 15**: 使用最新的 App Router 架构
- **Turbopack**: 开发环境启用高速打包器
- **OpenNext**: 完美适配 Cloudflare Pages 的 Serverless 部署
- **组件化开发**: 基于 shadcn/ui 的可复用组件系统
- **类型安全**: 全面的 TypeScript 类型定义

### 用户体验
- **平滑滚动**: Lenis 提供丝般顺滑的滚动体验
- **交互式元素**: 终端模拟器、可点击的导航、实时数据面板
- **主题系统**: 多种颜色主题，支持动态切换
- **截图模式**: 一键生成干净的作品集截图
- **国际化**: 无缝切换中英文语言

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出改进建议！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [shadcn/ui](https://ui.shadcn.com/) - 优秀的 UI 组件库
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Radix UI](https://www.radix-ui.com/) - 无障碍 UI 基础组件
- [Cloudflare Pages](https://pages.cloudflare.com/) - 快速可靠的部署平台

## 📮 联系方式

如有任何问题或建议，欢迎通过以下方式联系：

- 📧 Email: your-email@example.com
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 🔗 Website: [your-website.com](https://your-website.com)

---

⭐ 如果这个项目对你有帮助，欢迎给个 Star！
