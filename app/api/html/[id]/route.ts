import { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const HTML_KEY_PREFIX = "html:";

type KvLike = {
  get: (key: string) => Promise<string | null>;
};

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
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const key = `${HTML_KEY_PREFIX}${id}`;

  try {
    const { env } = await getCloudflareContext();
    const kv = (env as { VISIT_COUNTER?: KvLike } | undefined)?.VISIT_COUNTER;
    const store = kv ?? getFallbackStore();

    const html = await store.get(key);

    if (!html) {
      return new Response("Not found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    console.error("Failed to fetch html:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
}
