import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const MAX_HTML_BYTES = 10 * 1024 * 1024; // 10MB
const HTML_KEY_PREFIX = "html:";

const ALLOWED_EXTERNAL_HOSTS = new Set<string>([
  // Tailwind Play CDN
  "cdn.tailwindcss.com",
  // JSDelivr
  "cdn.jsdelivr.net",
  // cdnjs
  "cdnjs.cloudflare.com",
  // Google Fonts
  "fonts.googleapis.com",
  "fonts.gstatic.com",
]);

type KvLike = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
};

function getByteLength(text: string): number {
  return new TextEncoder().encode(text).byteLength;
}

function getFallbackStore(): KvLike {
  const globalWithStore = globalThis as unknown as {
    __HTML_DEPLOY_STORE__?: Map<string, string>;
  };
  if (!globalWithStore.__HTML_DEPLOY_STORE__) {
    globalWithStore.__HTML_DEPLOY_STORE__ = new Map();
  }
  const store = globalWithStore.__HTML_DEPLOY_STORE__;

  return {
    async get(key: string) {
      return store.get(key) ?? null;
    },
    async put(key: string, value: string) {
      store.set(key, value);
    },
  };
}

function normalizeErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return "未知错误";
}

function isAllowedExternalUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  const normalized = trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
  if (!/^https?:/i.test(normalized)) return true;

  try {
    const url = new URL(normalized);
    return ALLOWED_EXTERNAL_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function collectExternalResourceUrls(html: string): string[] {
  const urls: string[] = [];

  // Resource-bearing attributes on common tags (avoid <a href> by only matching these tags)
  const attrRe = /<\s*(script|link|img|source|video|audio|track|iframe)\b[^>]*\b(?:src|href)\s*=\s*(["'])(.*?)\2/gi;
  for (const match of html.matchAll(attrRe)) {
    const value = match[3] ?? "";
    if (/^(?:https?:)?\/\//i.test(value)) urls.push(value);
  }

  // CSS url(...) references
  const cssUrlRe = /url\(\s*(["']?)([^"')\s]+)\1\s*\)/gi;
  for (const match of html.matchAll(cssUrlRe)) {
    const value = match[2] ?? "";
    if (/^(?:https?:)?\/\//i.test(value)) urls.push(value);
  }

  return urls;
}

function basicReview(html: string): { ok: true } | { ok: false; error: string } {
  if (!html.trim()) {
    return { ok: false, error: "HTML 不能为空" };
  }

  const byteLength = getByteLength(html);
  if (byteLength > MAX_HTML_BYTES) {
    return { ok: false, error: "代码大小超过 10MB 限制" };
  }

  // MVP: 允許「少數白名單 CDN」的外鏈（用於樣式/字體/常見前端庫），其餘外鏈一律拒絕。
  // 注意：我們仍透過 CSP 把 JS 的 connect-src 鎖死，阻止 XHR/WebSocket 等“主動連網”。
  const externalUrls = collectExternalResourceUrls(html);
  for (const url of externalUrls) {
    if (!isAllowedExternalUrl(url)) {
      return {
        ok: false,
        error:
          "检测到非白名单的外链资源。仅允许：cdn.tailwindcss.com、cdn.jsdelivr.net、cdnjs.cloudflare.com、fonts.googleapis.com、fonts.gstatic.com。",
      };
    }
  }

  // 避免 CSS @import 引入外部资源（即便 CSP 会挡，MVP 先拒绝）
  if (/@import\b/i.test(html)) {
    return { ok: false, error: "检测到 @import。MVP 模式下不允许引入外部样式。" };
  }

  // 阻挡高风险嵌入类标签（CSP 也会限制，但这里提前拒绝）
  if (/<\s*(?:object|embed|applet)\b/i.test(html)) {
    return { ok: false, error: "检测到 object/embed/applet。出于安全原因暂不支持。" };
  }

  return { ok: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as
      | { html?: unknown }
      | null;

    const html = typeof body?.html === "string" ? body.html : "";

    const review = basicReview(html);
    if (!review.ok) {
      return NextResponse.json({ error: review.error }, { status: 400 });
    }

    const { env } = await getCloudflareContext();
    const kv = (env as { VISIT_COUNTER?: KvLike } | undefined)?.VISIT_COUNTER;
    const store = kv ?? getFallbackStore();

    const id = crypto.randomUUID();
    const key = `${HTML_KEY_PREFIX}${id}`;
    await store.put(key, html);

    const shareUrl = new URL(`/p/${id}`, request.url).toString();
    const rawUrl = new URL(`/api/html/${id}`, request.url).toString();

    return NextResponse.json({ id, url: shareUrl, rawUrl });
  } catch (error) {
    console.error("Failed to deploy html:", error);
    return NextResponse.json(
      { error: normalizeErrorMessage(error) || "部署失败" },
      { status: 500 }
    );
  }
}
