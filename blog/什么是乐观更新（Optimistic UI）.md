---
title: 什么是乐观更新（Optimistic UI）
author: MR.Z
date: 2026-01-19
tags:
  - React
  - 前端性能
  - 乐观更新
  - 用户体验
  - LocalStorage
summary: 拒绝转圈等待！深入探讨前端乐观更新（Optimistic UI）技术，通过"先斩后奏"的策略实现极致响应。本文详解三步工作流与React实现，并诚实分析了跨设备同步等"坑点"。
slug: what-is-optimistic-ui
fileName: 什么是乐观更新（Optimistic UI）.md
---

# 拒绝转圈等待：用乐观更新（Optimistic UI）骗过用户的眼睛

## 那个该死的 Loading

点击发送，转圈，两秒后消息上屏。这流程太熟悉了，也太迟钝了。用户其实不在乎你的 API 到底处理了多久，他们只觉得你的应用卡。

有没有办法不改后端还能让体验丝般顺滑？有，"乐观更新" (Optimistic UI)。说白了就是：**先假装成功，再校对结果。**

## 它是怎么骗人的？

用户点发送，前端直接把消息塞进列表，告诉用户"发好了"。然后悄悄在后台请求 API。

- **成功了**？什么都不用做，或者默默更新一下真实 ID。
- **失败了**？再告诉用户"发送失败"，或者回滚状态。

这种"先斩后奏"的策略，能在这个网络延迟不可避免的世界里，通过欺骗视觉感官，制造出"零延迟"的假象。

## 怎么做？（不用后端配合版）

如果是纯内存操作，刷新一下页面，那个正在"假装发送"的消息就丢了。所以我们要用到 `LocalStorage` 来兜底。

### 核心三步走

1.  **发送时：双写**
    生成一个临时 ID，把消息同时写入 `LocalStorage` 和 UI 列表。然后才去调 API。

2.  **渲染时：合并**
    列表数据 = 后端返回的历史记录 + `LocalStorage` 里的待发送记录。
    _别忘了去重：如果后端已经返回了这条消息，就不要显示本地那条假的了。_

3.  **结果回来后：清理**
    - **成功**：删掉 `LocalStorage` 里的临时数据。
    - **失败**：在 `LocalStorage` 里标记状态为 error，UI 上给个重试按钮。

## React 代码大概长这样

别整复杂的，看核心逻辑：

```javascript
const CONVERSATION_KEY = `chat_pending_${conversationId}`;

// 发送逻辑
const handleSend = async (text) => {
  const tempMsg = {
    id: Date.now(),
    role: "user",
    content: text,
    status: "sending",
  };

  // 1. 先骗用户：存本地，更 UI
  localStorage.setItem(CONVERSATION_KEY, JSON.stringify(tempMsg));
  setMessages((prev) => [...prev, tempMsg]);

  try {
    // 2. 再干正事
    await api.sendMessage(text);

    // 3. 成功了解除伪装
    localStorage.removeItem(CONVERSATION_KEY);
    fetchHistory(); // 重新拉取以确保数据一致
  } catch (error) {
    // 4. 演砸了：标记失败
    tempMsg.status = "error";
    localStorage.setItem(CONVERSATION_KEY, JSON.stringify(tempMsg));
    forceUpdate(); // 触发 UI 更新显示失败状态
  }
};

// 加载逻辑
useEffect(() => {
  api.getHistory().then((serverList) => {
    // 看看本地有没有刚才没发完的
    const cachedMsg = JSON.parse(localStorage.getItem(CONVERSATION_KEY));

    if (cachedMsg && !serverList.some((m) => m.content === cachedMsg.content)) {
      setMessages([...serverList, cachedMsg]);
    } else {
      setMessages(serverList);
    }
  });
}, []);
```

## 真的完美吗？并不是

这招有个致命伤：**跨设备不同步**。

你在电脑上发的消息，因为是存在电脑浏览器的 LocalStorage 里，在你手机上是看不见的。直到后端真正处理完并落库。
如果你的用户频繁在设备间切换（比如发完消息立刻拿起手机看），这可能会是个问题。但在大多数场景下，这个短暂的延迟是可以接受的。

还有就是**代码复杂度的增加**。你要处理去重、合并、请求失败后的重试、极端情况下的缓存清理... 维护成本比简单的"转圈等待"高了不少。

## 总结

乐观更新是典型的"脏活累活前端干"。

如果后端能配合改造成 WebSocket 或者强大的同步机制，那最好。但如果你只能动前端，又想让应用快得像本地 App，这是性价比最高的方案。用不用，取决于你有多得罪不起你的用户体验。
