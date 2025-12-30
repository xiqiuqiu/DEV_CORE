# Raw Interface Portfolio

一款基于 **Next.js 15** 构建的硬核工业风/布鲁塔利主义（Brutalist）个人作品集网站。项目从 Lovable (Vite) 迁移而来，经过全面重构以支持 **SEO 优化** 和 **Cloudflare Pages** 部署。

## 🚀 技术栈

- **框架**: [Next.js 15 (App Router)](https://nextjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **动画**: [Framer Motion](https://www.framer.com/motion/) + Tailwind Animate
- **字体**: Space Grotesk (标题) & Space Mono (正文)
- **部署**: [Cloudflare Pages](https://pages.cloudflare.com/)

## ✨ 核心特性

- 🛠 **硬核工业视觉**: 采用网格背景、扫描线（Scanline）和颗粒感（Grain）叠加效果。
- 🖥 **交互式终端**: 内置模拟终端组件，支持动态命令交互。
- 📊 **实时遥测数据**: 右侧 Data Panel 展示模拟的实时系统指标与音乐播放器。
- 🔍 **SEO 友好**: 利用 Next.js Metadata API 进行全站 SEO 优化。
- 📱 **响应式设计**: 完美适配从桌面端到移动端的所有屏幕。

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

### 3. 配置环境变量
```bash
# 目前项目为纯前端应用，暂无必需的环境变量
```

### 4. 启动开发服务器
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## ☁️ 部署 (Cloudflare Pages)

本项目已集成 `@opennextjs/cloudflare` 适配器。

### 预览构建
```bash
npm run preview
```

### 生产部署建议
1. 在 Cloudflare 控制面板连接 Git 仓库。
2. 构建命令：`npx @opennextjs/cloudflare build`
3. 输出目录：`.open-next/.output`
4. 确保在 Cloudflare 设置中开启 `nodejs_compat` 标志。

## 📂 目录结构

- `app/`: Next.js 路由与全局样式
- `components/`: 所有的 UI 组件（含 UI 原型及业务模块）
- `hooks/`: 自定义 React Hooks（终端逻辑、水合处理等）
- `lib/`: 工具函数
- `data/`: 静态项目与技能数据
