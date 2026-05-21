import type { Locale } from "@/lib/i18n/translations";

interface LocalizedText {
  en: string;
  zh: string;
}

export interface Project {
  id: number;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  seoDescription: LocalizedText;
  url: string;
  tags: LocalizedText[];
  thumbnail?: string; // Optional: project preview image
  highlight?: LocalizedText; // Optional: key value/result
  category: LocalizedText;
  role: LocalizedText;
  status: LocalizedText;
  year: string;
  challenge: LocalizedText;
  solution: LocalizedText;
  impact: LocalizedText;
  features: LocalizedText[];
  stack: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "honeycomb-term-search",
    title: {
      en: "Honeycomb Term Search",
      zh: "蜂巢术搜",
    },
    description: {
      en: 'A high-speed terminology retrieval tool designed for professional translators. Provides millisecond-level queries across massive terminology databases through "Honeycomb" architecture.',
      zh: '专门为专业翻译人员设计的术语高速检索工具。通过"蜂巢"架构提供海量术语库的秒级查询，帮助译者在翻译过程中快速获取精准的行业词汇。',
    },
    seoDescription: {
      en: "A terminology retrieval product case study covering search experience, large-scale glossary lookup, and workflow support for professional translators.",
      zh: "一个面向专业翻译场景的术语检索产品案例，重点展示大规模术语查询、检索体验和翻译工作流支持。",
    },
    highlight: {
      en: "Millisecond-level retrieval for 10M+ terminology entries",
      zh: "支持千万级术语条目的毫秒级检索",
    },
    category: {
      en: "AI Translation Tool",
      zh: "AI 翻译工具",
    },
    role: {
      en: "Product design, frontend architecture, search experience",
      zh: "产品设计、前端架构、检索体验",
    },
    status: {
      en: "Online product",
      zh: "已上线产品",
    },
    year: "2026",
    challenge: {
      en: "Professional translators need to search domain terms quickly without breaking their writing flow. Traditional glossary tools often become slow or fragmented when the term base grows.",
      zh: "专业译者需要在不打断翻译节奏的情况下快速查询行业术语。传统术语工具在术语库变大后容易变慢，检索路径也容易分散。",
    },
    solution: {
      en: "The product focuses on a compact retrieval workflow: fast keyword input, clear result grouping, and a frontend structure that keeps the search path lightweight for repeated daily use.",
      zh: "产品围绕高频检索流程设计：快速输入关键词、清晰分组展示结果，并通过轻量的前端结构减少日常重复查询的操作成本。",
    },
    impact: {
      en: "The result is a focused terminology search experience that helps translators keep context while checking specialized vocabulary.",
      zh: "最终形成了一个聚焦术语查询的工具体验，帮助译者在保持上下文的同时快速确认专业词汇。",
    },
    features: [
      { en: "High-speed terminology lookup", zh: "高速术语检索" },
      { en: "Result grouping for translation scenarios", zh: "面向翻译场景的结果分组" },
      { en: "Responsive interface for repeated use", zh: "适合高频使用的响应式界面" },
    ],
    stack: ["React", "TypeScript", "Search UX", "Product Design"],
    url: "https://frontend.toc.yitransolution.com",
    thumbnail: "/project-covers/honeycomb-term-search.webp",
    tags: [
      { en: "AI", zh: "AI" },
      { en: "Term Search", zh: "术语检索" },
      { en: "Translation Tool", zh: "翻译工具" },
      { en: "Productivity", zh: "效率提升" },
    ],
  },
  {
    id: 2,
    slug: "yitransolution",
    title: {
      en: "YiTranSolution",
      zh: "易解 YiTranSolution",
    },
    description: {
      en: "A comprehensive translation solution platform by YiTran. Provides Translation Management System (TMS), online collaborative translation environment, and terminology management.",
      zh: "易解（YiTran）的综合翻译解决方案平台。提供翻译项目管理（TMS）、在线协作翻译环境以及术语库管理，旨在简化翻译工作流并提高团队协作效率。",
    },
    seoDescription: {
      en: "A translation management platform case study covering project workflow, collaboration, terminology management, and cloud-based translation delivery.",
      zh: "一个翻译管理平台案例，覆盖项目流程、协作翻译、术语管理和云端交付体验。",
    },
    highlight: {
      en: "Reduced translation turnaround time by 40%",
      zh: "翻译周期缩短 40%",
    },
    category: {
      en: "Translation Management Platform",
      zh: "翻译管理平台",
    },
    role: {
      en: "Frontend implementation, workflow design support, delivery optimization",
      zh: "前端实现、流程设计支持、交付体验优化",
    },
    status: {
      en: "Online platform",
      zh: "已上线平台",
    },
    year: "2026",
    challenge: {
      en: "Translation teams need to coordinate projects, terms, files, and reviewers in one place. When these steps are split across tools, delivery becomes harder to track.",
      zh: "翻译团队需要在同一流程里协调项目、术语、文件和审校人员。如果这些环节分散在多个工具中，交付进度会变得难以追踪。",
    },
    solution: {
      en: "The platform brings translation project management, online collaboration, and terminology workflows into a single web experience with clear operational states.",
      zh: "平台将翻译项目管理、在线协作和术语流程整合到统一的 Web 使用体验中，并通过清晰的状态表达降低协作成本。",
    },
    impact: {
      en: "The product supports a more traceable translation workflow and gives teams a single place to manage delivery progress.",
      zh: "产品让翻译流程更容易追踪，也为团队提供了统一管理交付进度的位置。",
    },
    features: [
      { en: "Translation project management", zh: "翻译项目管理" },
      { en: "Online collaborative translation", zh: "在线协作翻译" },
      { en: "Terminology management workflow", zh: "术语管理流程" },
    ],
    stack: ["React", "TypeScript", "TMS", "Collaboration UX"],
    url: "https://frontend.yitransolution.com",
    thumbnail: "/project-covers/yitransolution.webp",
    tags: [
      { en: "AI", zh: "AI" },
      { en: "TMS", zh: "翻译管理" },
      { en: "Collaboration", zh: "项目协作" },
      { en: "Cloud", zh: "云端办公" },
    ],
  },
  {
    id: 3,
    slug: "bicon-automated-trading",
    title: {
      en: "Bicon Automated Trading",
      zh: "Bicon 自动化交易",
    },
    description: {
      en: "A web trading interface for futures and coin trading workflows, focused on fast market reading, clear operational controls, and responsive frontend performance.",
      zh: "一个面向合约与币种交易流程的 Web 交易界面，重点关注行情信息读取、操作控件清晰度和前端响应性能。",
    },
    seoDescription: {
      en: "A trading interface case study covering futures trading UI, market data presentation, and high-performance frontend interaction design.",
      zh: "一个交易界面案例，展示合约交易 UI、行情信息呈现和高性能前端交互设计。",
    },
    highlight: {
      en: "Coin Trading / High Performance",
      zh: "币种交易 / 高性能前端",
    },
    category: {
      en: "Trading Interface",
      zh: "交易系统界面",
    },
    role: {
      en: "Frontend interface implementation and interaction optimization",
      zh: "前端界面实现与交互优化",
    },
    status: {
      en: "Online interface",
      zh: "已上线界面",
    },
    year: "2026",
    challenge: {
      en: "Trading interfaces need to keep dense information readable while keeping important actions easy to reach. Small delays or unclear states can quickly hurt the operating experience.",
      zh: "交易界面需要在高密度信息下保持可读，同时让关键操作容易触达。轻微延迟或状态表达不清都会影响操作体验。",
    },
    solution: {
      en: "The interface emphasizes compact information hierarchy, responsive layouts, and clear action areas so users can scan market context and operate with less friction.",
      zh: "界面强调紧凑的信息层级、响应式布局和清晰的操作区域，让用户能更快读取行情上下文并完成操作。",
    },
    impact: {
      en: "The project presents a practical trading workspace that balances information density with direct operation.",
      zh: "该项目形成了一个兼顾信息密度和直接操作体验的交易工作台。",
    },
    features: [
      { en: "Dense market information layout", zh: "高密度行情信息布局" },
      { en: "Responsive trading workspace", zh: "响应式交易工作台" },
      { en: "Clear action and state presentation", zh: "清晰的操作与状态呈现" },
    ],
    stack: ["React", "TypeScript", "Trading UX", "Responsive UI"],
    url: "https://frontend.futures.trding.xyz/#/",
    thumbnail: "/project-covers/bicon-trading.webp",
    tags: [
      { en: "Coin", zh: "币种" },
      { en: "Trading", zh: "交易" },
      { en: "Frontend", zh: "前端" },
      { en: "Web3", zh: "Web3" },
    ],
  },
  {
    id: 4,
    slug: "omnimind",
    title: {
      en: "OmniMind",
      zh: "通元心智",
    },
    description: {
      en: "OmniMind is a visual idea expansion and inspiration tool powered by LLM (Large Language Models).",
      zh: "OmniMind 是一款由大语言模型（LLM）驱动的视觉化创意扩展与灵感工具",
    },
    seoDescription: {
      en: "An AI mind-mapping product case study covering LLM-powered idea expansion, local-first thinking, and visual knowledge exploration.",
      zh: "一个 AI 思维导图产品案例，展示大模型驱动的灵感扩展、本地优先设计和视觉化知识探索。",
    },
    highlight: {
      en: "LLM-powered visual idea expansion",
      zh: "大模型驱动的视觉化灵感扩展",
    },
    category: {
      en: "AI Ideation Tool",
      zh: "AI 灵感工具",
    },
    role: {
      en: "Product concept, interaction design, frontend implementation",
      zh: "产品概念、交互设计、前端实现",
    },
    status: {
      en: "Independent product",
      zh: "独立产品",
    },
    year: "2026",
    challenge: {
      en: "Idea tools often stop at static notes. For creative exploration, users need a way to branch, compare, and extend ideas while keeping the map understandable.",
      zh: "很多灵感工具停留在静态记录层面。对于创意探索，用户需要在保持结构清晰的同时分叉、比较和扩展想法。",
    },
    solution: {
      en: "OmniMind combines a visual map with LLM-assisted expansion, letting users turn a seed idea into connected directions without losing the surrounding context.",
      zh: "通元心智把视觉化图谱和大模型扩展结合起来，让用户能从一个初始想法延展出多个关联方向，同时保留上下文关系。",
    },
    impact: {
      en: "The tool creates a more exploratory way to use AI, where generated ideas stay connected to a visible thinking structure.",
      zh: "这个工具提供了一种更适合探索的 AI 使用方式，让生成内容始终连接在可见的思考结构中。",
    },
    features: [
      { en: "Visual idea map", zh: "视觉化灵感图谱" },
      { en: "LLM-powered topic expansion", zh: "大模型话题扩展" },
      { en: "Local-first product direction", zh: "本地优先的产品方向" },
    ],
    stack: ["React", "LLM", "Mind Mapping", "Local-first"],
    url: "https://omnimind.sigclr.com/",
    thumbnail: "/project-covers/omnimind.webp",
    tags: [
      { en: "Visual Mind Mapping", zh: "思维导图" },
      { en: "AI-Powered Expansion", zh: "AI驱动话题衍生" },
      { en: "Local-First Architecture", zh: "本地优先" },
      { en: "Cloud Sync (Optional)", zh: "支持云端同步" },
      { en: "Modern UI/UX", zh: "现代 UI/UX" },
    ],
  },
  {
    id: 5,
    slug: "katelyatv",
    title: {
      en: "KatelyaTV",
      zh: "KatelyaTV",
    },
    description: {
      en: "A video streaming platform providing online video watching, channel management, and streaming services.",
      zh: "一个视频播放平台。主要功能是提供视频内容的在线观看、频道分类管理及流媒体播放服务。",
    },
    seoDescription: {
      en: "A streaming product case study covering online playback, channel organization, responsive viewing, and practical media delivery tradeoffs.",
      zh: "一个视频播放产品案例，展示在线播放、频道组织、响应式观看体验和媒体交付中的实际取舍。",
    },
    highlight: {
      en: "Responsive video playback and channel browsing",
      zh: "响应式视频播放与频道浏览",
    },
    category: {
      en: "Streaming Product",
      zh: "视频播放产品",
    },
    role: {
      en: "Frontend product implementation, playback experience, deployment support",
      zh: "前端产品实现、播放体验、部署支持",
    },
    status: {
      en: "Online product",
      zh: "已上线产品",
    },
    year: "2026",
    challenge: {
      en: "Streaming products need to handle browsing, playback, and device differences without making the viewing path feel heavy.",
      zh: "视频产品需要同时处理浏览、播放和不同设备差异，同时不能让观看路径变得笨重。",
    },
    solution: {
      en: "KatelyaTV focuses on a direct viewing flow with organized channels, responsive pages, and practical handling around media playback behavior.",
      zh: "KatelyaTV 关注直接的观看流程，通过频道组织、响应式页面和实际播放行为处理来提升使用稳定性。",
    },
    impact: {
      en: "The product provides a lightweight web viewing experience that can continue evolving around playback compatibility and source management.",
      zh: "产品提供了轻量的 Web 观看体验，并能围绕播放兼容性和源管理持续迭代。",
    },
    features: [
      { en: "Online video playback", zh: "在线视频播放" },
      { en: "Channel and content organization", zh: "频道与内容组织" },
      { en: "Responsive viewing interface", zh: "响应式观看界面" },
    ],
    stack: ["Next.js", "HLS", "TypeScript", "Cloudflare"],
    url: "https://movie.sigclr.com",
    thumbnail: "/project-covers/katelyatv.webp",
    tags: [
      { en: "Streaming", zh: "视频流媒体" },
      { en: "VOD", zh: "在线点播" },
      { en: "IPTV", zh: "IPTV" },
      { en: "Responsive", zh: "响应式设计" },
    ],
  },
  {
    id: 6,
    slug: "legaleagle-ai",
    title: {
      en: "LegalEagle AI",
      zh: "LegalEagle AI",
    },
    description: {
      en: "An AI-powered legal assistant tool. Uses LLM to help legal professionals with document retrieval, contract analysis, and legal consultation.",
      zh: "基于人工智能的法律辅助工具。利用大语言模型（LLM）协助法律专业人士进行法律文献检索、合同/文档自动分析及法律咨询建议，提高法律工作的自动化水平。",
    },
    seoDescription: {
      en: "An AI legal assistant case study covering document retrieval, contract analysis, and LLM-assisted legal workflow design.",
      zh: "一个 AI 法律助手案例，展示文档检索、合同分析和大模型辅助法律工作流设计。",
    },
    highlight: {
      en: "LLM-assisted legal document workflow",
      zh: "大模型辅助法律文档工作流",
    },
    category: {
      en: "AI Legal Assistant",
      zh: "AI 法律助手",
    },
    role: {
      en: "Frontend implementation and AI product workflow design",
      zh: "前端实现与 AI 产品流程设计",
    },
    status: {
      en: "Prototype / online demo",
      zh: "原型 / 在线演示",
    },
    year: "2026",
    challenge: {
      en: "Legal work depends on accurate retrieval and careful document reading. AI assistance must make the workflow faster without hiding the source context.",
      zh: "法律工作依赖准确检索和严谨的文档阅读。AI 辅助既要提升效率，也不能隐藏来源上下文。",
    },
    solution: {
      en: "The product frames AI as an assistant for retrieval, document reading, and consultation support, with an interface that keeps legal materials and generated help connected.",
      zh: "产品把 AI 定位为检索、文档阅读和咨询辅助工具，并通过界面设计让法律材料和生成结果保持关联。",
    },
    impact: {
      en: "The demo shows how legal professionals can use AI support in a more structured and reviewable workflow.",
      zh: "该演示展示了法律专业人员如何在更结构化、可复核的流程中使用 AI 辅助。",
    },
    features: [
      { en: "Legal document retrieval", zh: "法律文档检索" },
      { en: "Contract and file analysis", zh: "合同与文件分析" },
      { en: "LLM-assisted consultation flow", zh: "大模型辅助咨询流程" },
    ],
    stack: ["React", "LLM", "Document UX", "Legal Tech"],
    url: "https://legal-ai-tools-tau.vercel.app",
    thumbnail: "/project-covers/legaleagle-ai.webp",
    tags: [
      { en: "AI", zh: "AI" },
      { en: "Legal Assistant", zh: "法律助理" },
      { en: "Doc Analysis", zh: "文档分析" },
      { en: "Smart Search", zh: "智能检索" },
    ],
  },
  {
    id: 7,
    slug: "excel-keyword-search",
    title: {
      en: "Excel Keyword Search Tool",
      zh: "Excel关键词搜索工具",
    },
    description: {
      en: "A simple and easy-to-use Excel keyword search tool with batch search support across multiple files and an intuitive GUI.",
      zh: "一个简单易用的Excel文件关键词搜索工具，支持批量搜索多个Excel文件中的关键词，并提供直观的GUI界面。",
    },
    seoDescription: {
      en: "A desktop productivity tool case study covering batch Excel keyword search, multi-file scanning, and practical GUI design.",
      zh: "一个桌面效率工具案例，展示 Excel 批量关键词搜索、多文件扫描和实用 GUI 设计。",
    },
    highlight: {
      en: "Batch keyword search across Excel files",
      zh: "跨 Excel 文件批量关键词搜索",
    },
    category: {
      en: "Desktop Productivity Tool",
      zh: "桌面效率工具",
    },
    role: {
      en: "Tool design, implementation, documentation",
      zh: "工具设计、实现与文档整理",
    },
    status: {
      en: "Open-source tool",
      zh: "开源工具",
    },
    year: "2026",
    challenge: {
      en: "Searching across many Excel files is repetitive and slow when users need to open files one by one and check multiple sheets manually.",
      zh: "当用户需要逐个打开大量 Excel 文件并手动检查多个工作表时，关键词查找会变得重复且低效。",
    },
    solution: {
      en: "The tool provides a focused GUI for entering keywords, scanning multiple files, and opening matched results quickly.",
      zh: "工具提供了一个聚焦的图形界面，用于输入关键词、批量扫描多个文件，并快速打开命中结果。",
    },
    impact: {
      en: "It turns a repeated manual search task into a simple batch workflow that is easier for non-technical users to operate.",
      zh: "它把重复的人工查找任务变成了简单的批量流程，也更适合非技术用户操作。",
    },
    features: [
      { en: "Batch Excel file search", zh: "批量 Excel 文件搜索" },
      { en: "Multi-sheet keyword matching", zh: "跨工作表关键词匹配" },
      { en: "Quick result opening", zh: "结果快速打开" },
    ],
    stack: ["Python", "Excel", "GUI", "Automation"],
    url: "https://github.com/xiqiuqiu/easy_file_search",
    thumbnail: "/project-covers/excel-keyword-search.webp",
    tags: [
      { en: "Batch Search", zh: "批量搜索" },
      { en: "Multi-sheet", zh: "跨工作表支持" },
      { en: "Multi-keyword", zh: "多关键词搜索" },
      { en: "Quick Open", zh: "快速打开" },
      { en: "Smart Search", zh: "智能检索" },
    ],
  },
];

// Helper function to get localized project data
export function getLocalizedProjects(locale: Locale) {
  return projects.map((project) => ({
    id: project.id,
    slug: project.slug,
    title: project.title[locale],
    description: project.description[locale],
    seoDescription: project.seoDescription[locale],
    url: project.url,
    tags: project.tags.map((tag) => tag[locale]),
    thumbnail: project.thumbnail,
    highlight: project.highlight?.[locale],
    category: project.category[locale],
    role: project.role[locale],
    status: project.status[locale],
    year: project.year,
    challenge: project.challenge[locale],
    solution: project.solution[locale],
    impact: project.impact[locale],
    features: project.features.map((feature) => feature[locale]),
    stack: project.stack,
  }));
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getLocalizedProject(slug: string, locale: Locale) {
  const project = getProjectBySlug(slug);
  if (!project) return undefined;

  return {
    id: project.id,
    slug: project.slug,
    title: project.title[locale],
    description: project.description[locale],
    seoDescription: project.seoDescription[locale],
    url: project.url,
    tags: project.tags.map((tag) => tag[locale]),
    thumbnail: project.thumbnail,
    highlight: project.highlight?.[locale],
    category: project.category[locale],
    role: project.role[locale],
    status: project.status[locale],
    year: project.year,
    challenge: project.challenge[locale],
    solution: project.solution[locale],
    impact: project.impact[locale],
    features: project.features.map((feature) => feature[locale]),
    stack: project.stack,
  };
}
