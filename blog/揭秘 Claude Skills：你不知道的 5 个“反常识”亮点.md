---
title: Claude Skills 的 5 个“反常识”设计
author: MR.Z
date: 2026-01-19
tags:
  - Claude
  - AI
  - Skills
  - Anthropic
  - 提示工程
summary: Claude Skills 并不像传统的函数调用。它更像是一套精密的提示词模板，没有任何代码层面的路由算法，全靠大模型"硬扛"。本文解析它五个反直觉的设计细节。
slug: claude-skills-highlights
fileName: 揭秘 Claude Skills：你不知道的 5 个“反常识”亮点.md
---

# Claude Skills 的 5 个“反常识”设计

通常我们给 AI 加“技能”，想到的都是写代码：定义函数、配置 API、通过 Function Calling 挂载。这很符合程序员的直觉。

但 Anthropic 的 Claude Skills 走了一条完全不同的路。它没有试图把 LLM 塞进代码的框架里，而是反过来，让工具去适应 LLM 的语言本能。

仔细研究一下它的反直觉设计，你会发现这不仅是技术选型的问题，更像是对 AI 未来交互形态的一种赌注。

## 1. 技能不是代码，是“提示词包”

大多数开发者习惯把“技能”等同于“可执行代码”。但在 Claude Skills 里，技能通过 `prompt expansion`（提示词扩展）和 `context modification`（上下文修改）来运作。

简而言之，它不直接“跑”任务。它是把一段写好的、针对特定领域的知识和指令，塞进对话的上下文里，然后让 Claude 自己去推理。

Han Lee 的总结很到位：

> Skills are not executable code... Skills are specialized prompt templates that inject domain-specific instructions into the conversation context.

这其实把“各司其职”的界限打破了。开发者不再是写僵化的接口，而是在写一份份 AI 能读懂的“说明书”。Simon Willison 觉得这种设计“简单得惊人”：一个 Markdown 文件告诉模型怎么做，仅此而已。

## 2. 没有路由算法，全靠 LLM 硬扛

在复杂的 AI 系统里，如何把用户的 query 路由到正确的工具通常是个算法问题：用向量搜索、关键词分类器，或者专门的意图识别模块。

Claude Skills 没有任何这种代码层面的辅助。

它的选择机制非常“暴力”：它把所有可用技能的清单（名字和简介）直接扔给 Claude，然后让模型自己读、自己选。

Claude 面向的其实只有一个通用的“元工具” `Skill`。当它觉得用户需要处理 PDF 时，它就调用 `Skill(command='pdf')`。

这种设计非常依赖模型本身的推理能力。Anthropic 显然在赌：随着模型变强，LLM 本身的模糊判断力，会比人类写死的路由逻辑更靠谱。

## 3. 简单到像个草台班子

第一眼看到 Claude Skills 的实现，你可能会觉得简陋：就这？一个 Markdown 文件配几个脚本？

但这种“简陋”恰恰是它的杀手锏。相比于 Model Context Protocol (MCP) 那种虽然强大但复杂的协议规范，Skills 的门槛极低。只要你会写文档，你就能写 Skill。

这种低门槛意味着极高的可扩展性。不需要繁重的 SDK，不需要复杂的鉴权配置，就是一个文档的事儿。这让社区快速分享和复用技能成为了可能。

## 4. 给 AI 留了套“暗号”

为了不让冗长的技能说明书干扰用户的阅读，Claude Skills 设计了一套双通道机制，利用 `isMeta` 标志来区分受众。

- **给用户看 (isMeta: false)**：简短的状态更新，比如 `<command-message>正在加载 PDF 处理技能...</command-message>`。
- **给 AI 看 (isMeta: true)**：技能文件 `SKILL.md` 的全部内容。这部分直接注入上下文，但对用户隐藏。

这种分离很聪明。它既保证了 AI 拿到了它需要的详尽指令，又没让用户的屏幕被几千字的 Prompt 刷屏。这不仅仅是 UI 优化，更是一种针对 AI 交互特有的信息架构。

## 5. 为了省 Token，它真的很“抠门”

如果一上来就把几百个技能的说明书全塞进 Context，多少 Token 也不够烧的。

Claude Skills 采用了一种极其保守的“渐进式披露”（Progressive Disclosure）策略：

1.  **初始阶段**：只加载所有技能的名字和一句话简介。Han Lee 提到这甚至有个 15000 字符的硬限制，逼着你写简介尽量精简。
2.  **调用阶段**：只有当 Claude 决定用某个技能了，系统才会去加载那个技能对应的 `SKILL.md`。
3.  **执行阶段**：就算加载了 `SKILL.md`，里面引用的外部脚本或文档，也只在真正用到时才会通过 Read 工具按需读取。

这种层层递进的加载方式，是整个系统能 scale 的关键。否则，技能稍微多几个，上下文窗口就爆了。

---

Claude Skills 给人的感觉是“重语言，轻代码”。它不再试图把 AI 变成一个精准执行的机器，而是把指令、知识和工作流都自然语言化，构建了一个更松散、但也许更具生命力的系统。
