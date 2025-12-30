export const translations = {
  en: {
    // TopBar
    nav: {
      index: 'INDEX',
      projects: 'PROJECTS',
      skills: 'SKILLS',
      about: 'ABOUT',
      contact: 'CONTACT',
    },
    status: {
      sysOnline: 'SYS_ONLINE',
      available: 'Available',
    },
    // ParallaxHero
    hero: {
      subtitle: 'Full-stack software developer crafting robust systems and elegant interfaces. Specializing in modern web technologies and scalable architecture.',
      stamp: 'CONFIDENTIAL BUILD // V2.4.1',
      scroll: 'Scroll',
    },
    // ProjectsSection
    projects: {
      title: 'PROJECTS',
      entries: 'ENTRIES',
    },
    // SkillsSection
    skills: {
      title: 'TECH STACK',
      metrics: 'CAPABILITY METRICS',
    },
    // AboutSection
    about: {
      title: 'ABOUT',
      bioData: 'BIO_DATA',
      bio1: "I'm a full-stack developer with 7+ years of experience building high-performance web applications and distributed systems.",
      bio2: "My expertise spans from crafting pixel-perfect user interfaces to architecting scalable backend infrastructure. I'm passionate about clean code, system design, and pushing the boundaries of what's possible on the web.",
      bio3: 'When not coding, I contribute to open-source projects and write technical articles about software architecture and best practices.',
      currentStatus: 'CURRENT STATUS',
      jobTitle: 'Senior Software Engineer',
      jobDesc: 'Building developer tools and infrastructure',
      metricsTitle: 'METRICS',
      yearsExp: 'Years Exp',
      projectsCount: 'Projects',
      commits: 'Commits',
      coffee: 'Coffee',
      openToOpportunities: 'OPEN TO OPPORTUNITIES',
    },
    // ContactSection
    contact: {
      title: 'CONTACT',
      commLinks: 'COMM_LINKS',
      cta: 'Ready to build something extraordinary together?',
      initiateContact: 'INITIATE CONTACT',
      email: 'EMAIL',
      github: 'GITHUB',
      twitter: 'TWITTER',
    },
    // Footer
    footer: {
      allSystemsNominal: 'ALL SYSTEMS NOMINAL',
      localTime: 'LOCAL_TIME:',
    },
    // LeftSidebar
    sidebar: {
      projectCode: 'PRJ_2025_PORTFOLIO',
      active: 'ACTIVE',
    },
    // DataPanel
    dataPanel: {
      telemetryData: 'TELEMETRY DATA',
      realTimeMetrics: 'REAL-TIME SYSTEM METRICS',
      audioStream: 'AUDIO STREAM',
      live: 'LIVE',
      terminal: 'TERMINAL',
      uptime: 'UPTIME',
      latency: 'LATENCY',
      throughput: 'THROUGHPUT',
      memory: 'MEMORY',
    },
    // Language switcher
    language: {
      switchTo: 'Switch to Chinese',
      current: 'EN',
    },
  },
  zh: {
    // TopBar
    nav: {
      index: '首页',
      projects: '项目',
      skills: '技能',
      about: '关于',
      contact: '联系',
    },
    status: {
      sysOnline: '系统在线',
      available: '可接单',
    },
    // ParallaxHero
    hero: {
      subtitle: '全栈软件开发者，专注于构建健壮的系统和优雅的界面。擅长现代 Web 技术和可扩展架构。',
      stamp: '机密构建 // V2.4.1',
      scroll: '向下滚动',
    },
    // ProjectsSection
    projects: {
      title: '项目',
      entries: '个项目',
    },
    // SkillsSection
    skills: {
      title: '技术栈',
      metrics: '能力指标',
    },
    // AboutSection
    about: {
      title: '关于',
      bioData: '个人简介',
      bio1: '我是一名拥有 7 年以上经验的全栈开发者，专注于构建高性能 Web 应用和分布式系统。',
      bio2: '我的专业领域涵盖从精雕细琢的用户界面到可扩展的后端架构。我热衷于整洁的代码、系统设计，以及探索 Web 技术的无限可能。',
      bio3: '工作之余，我会参与开源项目，并撰写关于软件架构和最佳实践的技术文章。',
      currentStatus: '当前状态',
      jobTitle: '高级软件工程师',
      jobDesc: '构建开发者工具和基础设施',
      metricsTitle: '数据统计',
      yearsExp: '年经验',
      projectsCount: '个项目',
      commits: '次提交',
      coffee: '杯咖啡',
      openToOpportunities: '开放合作机会',
    },
    // ContactSection
    contact: {
      title: '联系方式',
      commLinks: '通讯链接',
      cta: '准备好一起创造非凡了吗？',
      initiateContact: '发起联系',
      email: '邮箱',
      github: 'GITHUB',
      twitter: '推特',
    },
    // Footer
    footer: {
      allSystemsNominal: '所有系统正常',
      localTime: '本地时间:',
    },
    // LeftSidebar
    sidebar: {
      projectCode: '项目_2025_作品集',
      active: '运行中',
    },
    // DataPanel
    dataPanel: {
      telemetryData: '遥测数据',
      realTimeMetrics: '实时系统指标',
      audioStream: '音频流',
      live: '直播',
      terminal: '终端',
      uptime: '运行时间',
      latency: '延迟',
      throughput: '吞吐量',
      memory: '内存',
    },
    // Language switcher
    language: {
      switchTo: '切换到英文',
      current: '中',
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = typeof translations[Locale];
