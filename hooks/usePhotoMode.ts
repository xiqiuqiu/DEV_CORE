"use client";

import { useCallback, useRef } from "react";
import { screenshot } from "@renoun/screenshot";

interface UsePhotoModeOptions {
  scale?: number;
  format?: "png" | "jpeg" | "webp";
  quality?: number;
}

/**
 * usePhotoMode - Photo Mode 核心逻辑 Hook
 * 使用 @renoun/screenshot 捕获元素并叠加赛博朋克水印
 */
export function usePhotoMode(options: UsePhotoModeOptions = {}) {
  const { scale = 2, format = "png", quality = 0.95 } = options;
  const lastUrlRef = useRef<string | null>(null);

  /**
   * 在 Canvas 上绘制赛博朋克水印
   */
  const drawCyberpunkOverlay = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const now = new Date().toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).replace(/\//g, ".");

      const docId = Math.random().toString(36).substring(2, 8).toUpperCase();

      // Grid pattern - 网格
      ctx.strokeStyle = "rgba(0, 255, 65, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 24 * scale;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Corner brackets - 角落装饰
      const cornerSize = 24 * scale;
      const cornerOffset = 12 * scale;
      const cornerWidth = 2 * scale;
      ctx.strokeStyle = "rgba(0, 255, 65, 0.6)";
      ctx.lineWidth = cornerWidth;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(cornerOffset, cornerOffset + cornerSize);
      ctx.lineTo(cornerOffset, cornerOffset);
      ctx.lineTo(cornerOffset + cornerSize, cornerOffset);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(width - cornerOffset - cornerSize, cornerOffset);
      ctx.lineTo(width - cornerOffset, cornerOffset);
      ctx.lineTo(width - cornerOffset, cornerOffset + cornerSize);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(cornerOffset, height - cornerOffset - cornerSize);
      ctx.lineTo(cornerOffset, height - cornerOffset);
      ctx.lineTo(cornerOffset + cornerSize, height - cornerOffset);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(width - cornerOffset - cornerSize, height - cornerOffset);
      ctx.lineTo(width - cornerOffset, height - cornerOffset);
      ctx.lineTo(width - cornerOffset, height - cornerOffset - cornerSize);
      ctx.stroke();

      // CLASSIFIED label - 机密标签
      const labelX = 40 * scale;
      const labelY = 18 * scale;
      const labelPadX = 8 * scale;
      const labelPadY = 4 * scale;
      const fontSize = 10 * scale;

      ctx.font = `bold ${fontSize}px "Space Mono", monospace`;
      const labelText = "CLASSIFIED";
      const labelWidth = ctx.measureText(labelText).width;

      // Label background
      ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
      ctx.fillRect(labelX, labelY - fontSize - labelPadY, labelWidth + labelPadX * 2, fontSize + labelPadY * 2);

      // Label border
      ctx.strokeStyle = "rgba(248, 113, 113, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(labelX, labelY - fontSize - labelPadY, labelWidth + labelPadX * 2, fontSize + labelPadY * 2);

      // Label text
      ctx.fillStyle = "white";
      ctx.fillText(labelText, labelX + labelPadX, labelY);

      // Doc ID
      ctx.fillStyle = "rgba(0, 255, 65, 0.7)";
      ctx.font = `${fontSize}px "Space Mono", monospace`;
      ctx.fillText(`DOC.ID: ${docId}`, labelX + labelWidth + labelPadX * 3, labelY);

      // Timestamp - 时间戳
      ctx.fillStyle = "rgba(0, 255, 65, 0.8)";
      ctx.font = `${fontSize}px "Space Mono", monospace`;
      const timestampWidth = ctx.measureText(now).width;
      ctx.fillText(now, width - 40 * scale - timestampWidth, labelY);

      // Status indicators - 底部左侧状态
      const statusY = height - 16 * scale;
      const statusFontSize = 9 * scale;

      // Green dot
      ctx.beginPath();
      ctx.arc(44 * scale, statusY - 4 * scale, 4 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#00ff41";
      ctx.fill();

      // Status text
      ctx.font = `${statusFontSize}px "Space Mono", monospace`;
      ctx.fillStyle = "rgba(0, 255, 65, 0.7)";
      ctx.fillText("SYSTEM ONLINE", 54 * scale, statusY);

      // Separator
      ctx.fillStyle = "rgba(0, 255, 65, 0.3)";
      ctx.fillRect(130 * scale, statusY - 8 * scale, 1 * scale, 12 * scale);

      // Capture verified
      ctx.fillStyle = "rgba(0, 255, 65, 0.5)";
      ctx.fillText("CAPTURE VERIFIED", 138 * scale, statusY);

      // Logo watermark - 右下角 Logo
      const logoFontSize = 14 * scale;
      ctx.font = `bold ${logoFontSize}px "Space Mono", monospace`;
      const logoText = "sigclr.com";
      const logoWidth = ctx.measureText(logoText).width;

      // Separator line
      ctx.fillStyle = "rgba(0, 255, 65, 0.4)";
      ctx.fillRect(width - 44 * scale - logoWidth - 10 * scale, statusY - 10 * scale, 1 * scale, 16 * scale);

      // Logo with glow effect
      ctx.shadowColor = "rgba(0, 255, 65, 0.5)";
      ctx.shadowBlur = 10 * scale;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.fillText(logoText, width - 40 * scale - logoWidth, statusY);
      ctx.shadowBlur = 0;

      // Border frame - 虚线边框
      ctx.setLineDash([8 * scale, 4 * scale]);
      ctx.strokeStyle = "rgba(0, 255, 65, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(8 * scale, 8 * scale, width - 16 * scale, height - 16 * scale);
      ctx.setLineDash([]);

      // Vignette effect - 暗角
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 1.5
      );
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.15)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    },
    [scale]
  );

  /**
   * 捕获元素并生成带水印的截图
   */
  const captureWithOverlay = useCallback(
    async (element: HTMLElement): Promise<string> => {
      // Revoke previous URL to prevent memory leak
      if (lastUrlRef.current) {
        URL.revokeObjectURL(lastUrlRef.current);
      }

      // Capture the element
      const canvas = await screenshot.canvas(element, {
        scale,
      });

      // Draw cyberpunk overlay
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawCyberpunkOverlay(ctx, canvas.width, canvas.height);
      }

      // Convert to blob and create URL
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) {
              resolve(b);
            } else {
              reject(new Error("Failed to create blob from canvas"));
            }
          },
          `image/${format}`,
          quality
        );
      });

      if (!blob || blob.size === 0) {
        throw new Error("Generated blob is empty");
      }

      const url = URL.createObjectURL(blob);
      lastUrlRef.current = url;
      return url;
    },
    [scale, format, quality, drawCyberpunkOverlay]
  );

  /**
   * 下载截图
   */
  const downloadScreenshot = useCallback(
    async (element: HTMLElement, filename?: string) => {
      const url = await captureWithOverlay(element);
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, "");
      const name = filename || `sigclr-capture-${timestamp}.${format}`;

      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return url;
    },
    [captureWithOverlay, format]
  );

  return {
    captureWithOverlay,
    downloadScreenshot,
  };
}
