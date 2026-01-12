"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useDeployHistory } from "@/hooks/useDeployHistory";

export default function SharedPreviewPage() {
  const params = useParams<{ id: string }>();
  const id = (params?.id ?? "").toString();
  const history = useDeployHistory();

  const sharePath = `/p/${id}`;
  const rawPath = `/api/html/${id}`;

  async function copyAbsolute(pathOrUrl: string) {
    try {
      const isAbsolute = /^https?:\/\//i.test(pathOrUrl);
      const text = isAbsolute
        ? pathOrUrl
        : `${window.location.origin}${pathOrUrl}`;
      await navigator.clipboard.writeText(text);
      toast.success("已复制链接");
    } catch {
      toast.error("复制失败", { description: "浏览器可能未授权剪贴板" });
    }
  }

  function save() {
    const base = window.location.origin;
    history.add({
      id,
      url: `${base}${sharePath}`,
      rawUrl: `${base}${rawPath}`,
      title: `已部署网页 ${id}`,
    });
    toast.success("已保存到历史记录");
  }

  if (!id) {
    return (
      <main className="min-h-screen bg-background grid-bg px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>无效链接</CardTitle>
              <CardDescription>缺少部署 ID</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="/deploy">返回部署页</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background grid-bg px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">已部署网页</h1>
            <p className="text-sm text-muted-foreground font-mono">ID: {id}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/deploy">新建部署</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">首页</Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>分享</CardTitle>
            <CardDescription>该页面公开可访问，请勿分享敏感信息。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-end">
              <Button size="sm" variant="outline" onClick={save}>
                保存到历史
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs font-mono text-muted-foreground w-24">分享页</div>
              <a className="text-sm underline" href={sharePath} target="_blank" rel="noreferrer">
                {sharePath}
              </a>
              <Button size="sm" variant="outline" onClick={() => copyAbsolute(sharePath)}>
                复制链接
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs font-mono text-muted-foreground w-24">原始 HTML</div>
              <a className="text-sm underline" href={rawPath} target="_blank" rel="noreferrer">
                {rawPath}
              </a>
              <Button size="sm" variant="outline" onClick={() => copyAbsolute(rawPath)}>
                复制链接
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>预览（沙箱）</CardTitle>
            <CardDescription>
              JS 可运行；不同源；无法联网（CSP connect-src 'none'）。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-end pb-3">
              <Button asChild size="sm" variant="outline" className="bg-transparent">
                <a href={rawPath} target="_blank" rel="noreferrer">
                  新标签页打开
                </a>
              </Button>
            </div>
            <div className="border border-border rounded-md overflow-hidden">
              <iframe
                title="preview"
                src={`/api/html/${id}`}
                className="w-full h-[720px] bg-white"
                sandbox="allow-scripts allow-popups"
                referrerPolicy="no-referrer"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
