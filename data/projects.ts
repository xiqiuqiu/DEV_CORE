import type { Locale } from '@/lib/i18n/translations';

interface LocalizedText {
  en: string;
  zh: string;
}

export interface Project {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  url: string;
  tags: LocalizedText[];
  thumbnail?: string;           // Optional: project preview image
  highlight?: LocalizedText;    // Optional: key value/result
}

export const projects: Project[] = [
  {
    id: 1,
    title: {
      en: "Honeycomb Term Search",
      zh: "蜂巢术搜",
    },
    description: {
      en: 'A high-speed terminology retrieval tool designed for professional translators. Provides millisecond-level queries across massive terminology databases through "Honeycomb" architecture.',
      zh: '专门为专业翻译人员设计的术语高速检索工具。通过"蜂巢"架构提供海量术语库的秒级查询，帮助译者在翻译过程中快速获取精准的行业词汇。',
    },
    highlight: {
      en: 'Millisecond-level retrieval for 10M+ terminology entries',
      zh: '支持千万级术语条目的毫秒级检索',
    },
    url: "https://frontend.toc.yitransolution.com",
    tags: [
      { en: "AI", zh: "AI" },
      { en: "Term Search", zh: "术语检索" },
      { en: "Translation Tool", zh: "翻译工具" },
      { en: "Productivity", zh: "效率提升" },
    ],
  },
  {
    id: 2,
    title: {
      en: "YiTranSolution",
      zh: "易解 YiTranSolution",
    },
    description: {
      en: "A comprehensive translation solution platform by YiTran. Provides Translation Management System (TMS), online collaborative translation environment, and terminology management.",
      zh: "易解（YiTran）的综合翻译解决方案平台。提供翻译项目管理（TMS）、在线协作翻译环境以及术语库管理，旨在简化翻译工作流并提高团队协作效率。",
    },
    highlight: {
      en: 'Reduced translation turnaround time by 40%',
      zh: '翻译周期缩短 40%',
    },
    url: "https://frontend.yitransolution.com",
    tags: [
      { en: "AI", zh: "AI" },
      { en: "TMS", zh: "翻译管理" },
      { en: "Collaboration", zh: "项目协作" },
      { en: "Cloud", zh: "云端办公" },
    ],
  },
  {
    id: 3,
    title: {
      en: "Bicon-automated-trading", // 自动抓取的标题
      zh: "Bicon 自动化交易", // 根据网址推测的中文名，请根据实际情况修改
    },
    description: {
      en: "A comprehensive automated trading platform for coin trading.",
      zh: "一个综合的自动化交易平台，用于Coin交易。",
    },
    highlight: {
      en: "Coin Trading / High Performance",
      zh: "币种交易 / 高性能前端", // 推测的亮点
    },
    url: "https://frontend.futures.trding.xyz/#/",
    tags: [
      { en: "Coin", zh: "币种" },
      { en: "Trading", zh: "交易" },
      { en: "Frontend", zh: "前端" },
      { en: "Web3", zh: "Web3" }, // 若涉及加密货币，通常此类域名与Web3相关
    ],
  },
  {
    id: 4,
    title: {
      en: "Zen - Digital Wooden Fish",
      zh: "禅意 - 电子木鱼",
    },
    description: {
      en: "An exquisite digital wooden fish app (prototype from National Center for Traditional Arts).",
      zh: "实现一款精致的电子木鱼（木鱼原型来自国立传统艺术中心）",
    },
    url: "https://zen-wooden-fish-796478408945.us-west1.run.app/",
    tags: [
      { en: "Wooden Fish", zh: "木鱼" },
      { en: "Relaxation", zh: "舒缓" },
      { en: "Classical", zh: "古典意向" },
      { en: "Zen Wisdom", zh: "禅语妙言" },
    ],
  },
  {
    id: 5,
    title: {
      en: "KatelyaTV",
      zh: "KatelyaTV",
    },
    description: {
      en: "A video streaming platform providing online video watching, channel management, and streaming services.",
      zh: "一个视频播放平台。主要功能是提供视频内容的在线观看、频道分类管理及流媒体播放服务。",
    },
    url: "https://katelyatv-b3u.pages.dev",
    tags: [
      { en: "Streaming", zh: "视频流媒体" },
      { en: "VOD", zh: "在线点播" },
      { en: "IPTV", zh: "IPTV" },
      { en: "Responsive", zh: "响应式设计" },
    ],
  },
  {
    id: 6,
    title: {
      en: "LegalEagle AI",
      zh: "LegalEagle AI",
    },
    description: {
      en: "An AI-powered legal assistant tool. Uses LLM to help legal professionals with document retrieval, contract analysis, and legal consultation.",
      zh: "基于人工智能的法律辅助工具。利用大语言模型（LLM）协助法律专业人士进行法律文献检索、合同/文档自动分析及法律咨询建议，提高法律工作的自动化水平。",
    },
    url: "https://legal-ai-tools-tau.vercel.app",
    tags: [
      { en: "AI", zh: "AI" },
      { en: "Legal Assistant", zh: "法律助理" },
      { en: "Doc Analysis", zh: "文档分析" },
      { en: "Smart Search", zh: "智能检索" },
    ],
  },
  {
    id: 7,
    title: {
      en: "Excel Keyword Search Tool",
      zh: "Excel关键词搜索工具",
    },
    description: {
      en: "A simple and easy-to-use Excel keyword search tool with batch search support across multiple files and an intuitive GUI.",
      zh: "一个简单易用的Excel文件关键词搜索工具，支持批量搜索多个Excel文件中的关键词，并提供直观的GUI界面。",
    },
    url: "https://github.com/xiqiuqiu/easy_file_search",
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
    title: project.title[locale],
    description: project.description[locale],
    url: project.url,
    tags: project.tags.map((tag) => tag[locale]),
    thumbnail: project.thumbnail,
    highlight: project.highlight?.[locale],
  }));
}
