"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useDeployHistory } from "@/hooks/useDeployHistory";

type DeployResult = {
  id: string;
  url: string;
  rawUrl: string;
};

function byteLength(text: string): number {
  return new TextEncoder().encode(text).byteLength;
}

function extractTitle(html: string): string | undefined {
  const match = html.match(/<\s*title\b[^>]*>([\s\S]*?)<\s*\/\s*title\s*>/i);
  const raw = match?.[1]?.replace(/\s+/g, " ").trim();
  if (!raw) return undefined;
  return raw.slice(0, 80);
}

export default function DeployPage() {
  const [html, setHtml] = useState<string>("<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Hello</title>\n    <style>body{font-family:system-ui;margin:24px}</style>\n  </head>\n  <body>\n    <h1>It works</h1>\n    <script>document.body.append(' — JS running')</script>\n  </body>\n</html>\n");
  const [isDeploying, setIsDeploying] = useState(false);
  const [result, setResult] = useState<DeployResult | null>(null);
  const history = useDeployHistory();

  const sizeInfo = useMemo(() => {
    const bytes = byteLength(html);
    const mb = bytes / (1024 * 1024);
    return { bytes, mb: Number(mb.toFixed(2)) };
  }, [html]);

  const canDeploy = sizeInfo.bytes > 0 && sizeInfo.bytes <= 10 * 1024 * 1024;

  async function onDeploy() {
    setIsDeploying(true);
    setResult(null);
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });

      const data = (await res.json().catch(() => ({}))) as Partial<DeployResult> & {
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || "部署失败");
      }

      if (!data.id || !data.url || !data.rawUrl) {
        throw new Error("部署返回数据不完整");
      }

      setResult({ id: data.id, url: data.url, rawUrl: data.rawUrl });
      history.add({
        id: data.id,
        url: data.url,
        rawUrl: data.rawUrl,
        title: extractTitle(html),
      });
      toast.success("部署成功", { description: "已生成可公开访问的网页链接" });
    } catch (error) {
      toast.error("部署失败", {
        description: error instanceof Error ? error.message : "未知错误",
      });
    } finally {
      setIsDeploying(false);
    }
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("已复制链接");
    } catch {
      toast.error("复制失败", { description: "浏览器可能未授权剪贴板" });
    }
  }

  return (
    <main className="min-h-screen bg-background grid-bg px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">HTML 部署</h1>
            <p className="text-sm text-muted-foreground font-mono">Paste → Deploy → Share</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">返回首页</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
            <CardDescription>部署后的网页将公开可访问，请勿包含敏感信息。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6">
            <div>1、在编辑框中粘贴你的 HTML 代码</div>
            <div>2、点击「部署网页」按钮</div>
            <div>3、部署成功后，获得可访问的网页链接</div>
            <div>4、点击「复制链接」可以快速分享给他人</div>
            <div className="pt-2 text-muted-foreground">
              小贴士：代码大小限制为 10MB；系统会自动分配唯一的网址。
            </div>
          </CardContent>
        </Card>

        {history.hasEntries && (
          <Card>
            <CardHeader>
              <CardTitle>历史记录</CardTitle>
              <CardDescription>用于回溯已部署页面。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-end">
                <Button variant="outline" size="sm" className="bg-transparent" onClick={history.clear}>
                  清空历史
                </Button>
              </div>
              <div className="space-y-2">
                {history.entries.map((e) => {
                  const created = new Date(e.createdAt);
                  const createdText = Number.isNaN(created.getTime()) ? e.createdAt : created.toLocaleString();
                  return (
                    <div
                      key={e.id}
                      className="border border-border rounded-md px-3 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {e.title ? e.title : `已部署网页 ${e.id}`}
                        </div>
                        <div className="text-xs font-mono text-muted-foreground truncate">
                          {createdText}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button asChild size="sm" variant="outline" className="bg-transparent">
                          <a href={e.url} target="_blank" rel="noreferrer">回溯打开</a>
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent" onClick={() => copy(e.rawUrl)}>
                          复制链接
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => history.remove(e.id)}>
                          删除
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>HTML 编辑</CardTitle>
            <CardDescription>
              断网 + 不同源沙箱预览：JS 可运行，但无法访问网络与同源存储。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-muted-foreground">
                SIZE: {sizeInfo.mb} MB
              </div>
              <Button onClick={onDeploy} disabled={!canDeploy || isDeploying}>
                {isDeploying ? "部署中..." : "部署网页"}
              </Button>
            </div>

            <Textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="min-h-[320px] font-mono text-xs"
              spellCheck={false}
            />

            {!canDeploy && (
              <div className="text-sm text-destructive">
                代码为空或超过 10MB，无法部署。
              </div>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>部署结果</CardTitle>
              <CardDescription>可访问链接（分享给他人）与原始 HTML 地址</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">分享页</div>
                <div className="flex flex-wrap items-center gap-2">
                  <a className="text-sm underline" href={result.url} target="_blank" rel="noreferrer">
                    {result.url}
                  </a>
                  <Button variant="outline" size="sm" className="bg-transparent" onClick={() => copy(result.url)}>
                    复制链接
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">原始 HTML（iframe src）</div>
                <div className="flex flex-wrap items-center gap-2">
                  <a className="text-sm underline" href={result.rawUrl} target="_blank" rel="noreferrer">
                    {result.rawUrl}
                  </a>
                  <Button variant="outline" size="sm" className="bg-transparent" onClick={() => copy(result.rawUrl)}>
                    复制链接
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground">预览</div>
                <div className="flex items-center justify-end">
                  <Button asChild variant="outline" size="sm" className="bg-transparent">
                    <a href={`/api/html/${result.id}`} target="_blank" rel="noreferrer">
                      新标签页打开
                    </a>
                  </Button>
                </div>
                <div className="border border-border rounded-md overflow-hidden">
                  <iframe
                    title="preview"
                    src={`/api/html/${result.id}`}
                    className="w-full h-[520px] bg-white"
                    sandbox="allow-scripts allow-popups"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
