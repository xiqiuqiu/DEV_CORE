export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'KK工具箱 - 蜂巢术搜',
    description: '专门为专业翻译人员设计的术语高速检索工具。通过"蜂巢"架构提供海量术语库的秒级查询，帮助译者在翻译过程中快速获取精准的行业词汇。',
    url: 'https://frontend.toc.yitransolution.com',
    tags: ['AI', '术语检索', '翻译工具', '效率提升'],
  },
  {
    id: 2,
    title: '易解 YiTranSolution',
    description: '易解（YiTran）的综合翻译解决方案平台。提供翻译项目管理（TMS）、在线协作翻译环境以及术语库管理，旨在简化翻译工作流并提高团队协作效率。',
    url: 'https://frontend.yitransolution.com',
    tags: ['AI', '翻译管理', '项目协作', '云端办公'],
  },
  {
    id: 3,
    title: 'KatelyaTV',
    description: '一个视频播放平台。主要功能是提供视频内容的在线观看、频道分类管理及流媒体播放服务。',
    url: 'https://katelyatv-b3u.pages.dev',
    tags: ['视频流媒体', '在线点播', 'IPTV', '响应式设计'],
  },
  {
    id: 4,
    title: 'LegalEagle AI',
    description: '基于人工智能的法律辅助工具。利用大语言模型（LLM）协助法律专业人士进行法律文献检索、合同/文档自动分析及法律咨询建议，提高法律工作的自动化水平。',
    url: 'https://legal-ai-tools-tau.vercel.app',
    tags: ['AI', '法律助理', '文档分析', '智能检索'],
  },
];
