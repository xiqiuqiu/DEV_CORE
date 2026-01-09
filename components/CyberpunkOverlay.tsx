"use client";

import { forwardRef } from "react";

interface CyberpunkOverlayProps {
  width: number;
  height: number;
  timestamp?: string;
}

/**
 * CyberpunkOverlay - 赛博朋克风格水印叠加层
 * 用于在截图上叠加网格、Logo、时间戳和"机密文件"标签
 */
const CyberpunkOverlay = forwardRef<HTMLDivElement, CyberpunkOverlayProps>(
  ({ width, height, timestamp }, ref) => {
    const now = timestamp || new Date().toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).replace(/\//g, ".");

    return (
      <div
        ref={ref}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ width, height }}
      >
        {/* Grid Pattern - 网格背景 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 65, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 65, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Scan line effect - 扫描线 */}
        <div
          className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.02) 2px, rgba(0, 255, 65, 0.02) 4px)",
          }}
        />

        {/* Corner brackets - 角落装饰 */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#00ff41]/60" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-[#00ff41]/60" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-[#00ff41]/60" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#00ff41]/60" />

        {/* CLASSIFIED label - 机密标签 */}
        <div className="absolute top-4 left-10 flex items-center gap-2">
          <div className="px-2 py-0.5 bg-red-600/90 border border-red-400/50">
            <span className="font-mono text-[10px] font-bold text-white tracking-wider">
              CLASSIFIED
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#00ff41]/70">
            DOC.ID: {Math.random().toString(36).substring(2, 8).toUpperCase()}
          </span>
        </div>

        {/* Timestamp - 时间戳 */}
        <div className="absolute top-4 right-10">
          <span className="font-mono text-[10px] text-[#00ff41]/80 tracking-wide">
            {now}
          </span>
        </div>

        {/* Status indicators - 状态指示器 */}
        <div className="absolute bottom-4 left-10 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="font-mono text-[9px] text-[#00ff41]/70">
              SYSTEM ONLINE
            </span>
          </div>
          <div className="w-px h-3 bg-[#00ff41]/30" />
          <span className="font-mono text-[9px] text-[#00ff41]/50">
            CAPTURE VERIFIED
          </span>
        </div>

        {/* Logo watermark - 水印 */}
        <div className="absolute bottom-4 right-10 flex items-center gap-2">
          <div className="w-px h-4 bg-[#00ff41]/40" />
          <span
            className="font-mono text-sm font-bold tracking-widest"
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              textShadow: "0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.3)",
            }}
          >
            sigclr.com
          </span>
        </div>

        {/* Border frame - 边框 */}
        <div
          className="absolute inset-2 border border-dashed border-[#00ff41]/20 rounded-sm"
        />

        {/* Vignette effect - 暗角效果 */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.15) 100%)",
          }}
        />
      </div>
    );
  }
);

CyberpunkOverlay.displayName = "CyberpunkOverlay";

export default CyberpunkOverlay;
