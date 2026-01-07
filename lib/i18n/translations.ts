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
      sysOnline: 'SIGCLR - s',
      available: 'Available',
    },
    // ParallaxHero
    hero: {
      tagline: 'Engineering Clarity in Complex Software Systems',
      subtitle: 'I help teams build resilient, scalable, and maintainable software.',
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
      slogan: "I build systems that don't break, and I write about how they stay that way.",
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
      ctaDetail: 'Get in touch to collaborate on tooling & architecture',
      initiateContact: 'INITIATE CONTACT',
      subscribe: 'SUBSCRIBE',
      comingSoon: '(Coming Soon)',
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
      visitors: 'VISITORS',
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
      sysOnline: 'SIGCLR - 澄讯空间',
      available: '可接单',
    },
    // ParallaxHero
    hero: {
      tagline: '化繁为简，打造清晰的软件系统',
      subtitle: '我专注于把用户需求，做成真正能用的产品。',
      stamp: '澄讯空间 // V0.1.0',
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
      slogan: '我更在意产品是否真的被使用，而不是代码是否写得漂亮。',
      bio1: '我是一名以产品交付为核心的开发者，关注用户需求、功能设计与实际使用体验。',
      bio2: '我擅长从一个模糊的想法或需求出发，完成产品功能设计、界面设计、前端开发，并将项目部署上线。',
      bio3: '在这个过程中，我同样关注工程质量、可维护性，以及 AI 能力在产品中的实际应用，是否能够持续迭代。',
      currentStatus: '当前状态',
      jobTitle: '产品型开发者 / Builder',
      jobDesc: '构建产品，让产品真正被使用、持续迭代',
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
      cta: '聊一聊？',
      ctaDetail: '联系我探讨产品开发与架构设计合作',
      initiateContact: '发起联系',
      subscribe: '订阅',
      comingSoon: '（即将上线）',
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
      projectCode: 'SIGCLR',
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
      visitors: '访客数',
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
