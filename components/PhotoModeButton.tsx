"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Camera, X, Loader2, Download, Trash2 } from "lucide-react";
import { usePhotoMode } from "@/hooks/usePhotoMode";
import { cn } from "@/lib/utils";

/**
 * 查找最佳截图目标元素
 * 优先级：1. data-photo-target 2. 语义化元素 3. 有意义的容器
 */
function findBestCaptureTarget(element: HTMLElement): HTMLElement | null {
  // 忽略不应截图的元素
  if (element.closest("[data-screenshot-ignore]")) {
    return null;
  }

  // 优先级 1：查找最近的 data-photo-target 元素
  const photoTarget = element.closest("[data-photo-target]") as HTMLElement;
  if (photoTarget) {
    return photoTarget;
  }

  // 优先级 2：查找语义化容器元素
  const semanticSelectors = [
    "article",
    "section",
    ".card",
    ".project-item",
    "[data-capture]",
    ".skill-category",
    ".about-content",
    ".contact-form",
  ].join(", ");
  
  const semanticElement = element.closest(semanticSelectors) as HTMLElement;
  if (semanticElement) {
    return semanticElement;
  }

  // 优先级 3：有一定尺寸的 div 容器（避免截图太小的元素）
  let current: HTMLElement | null = element;
  while (current && current !== document.body) {
    const rect = current.getBoundingClientRect();
    // 元素至少要 100x100 像素才有意义
    if (rect.width >= 100 && rect.height >= 100) {
      // 避免截取整个 main 或过大的容器
      if (!["HTML", "BODY", "MAIN"].includes(current.tagName)) {
        return current;
      }
    }
    current = current.parentElement;
  }

  return null;
}

/**
 * PhotoModeButton - 浮动拍照按钮组件
 * 点击后进入选择模式，用户可点击任意区块进行截图
 * 截图后显示预览面板，支持下载或重拍
 * 
 * 混合模式：
 * - 优先使用 data-photo-target 标记的元素
 * - 回退到 article/section 等语义化元素
 * - 最后使用足够大的容器元素
 */
export default function PhotoModeButton() {
  const [isActive, setIsActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const lastHighlightedRef = useRef<HTMLElement | null>(null);
  const { captureWithOverlay } = usePhotoMode();

  // 进入/退出拍照模式
  const togglePhotoMode = useCallback(() => {
    if (previewUrl) {
      // If preview is showing, close it
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    } else {
      setIsActive((prev) => !prev);
      setHoveredElement(null);
    }
  }, [previewUrl]);

  // 处理元素点击捕获
  const handleCapture = useCallback(
    async (element: HTMLElement) => {
      setIsCapturing(true);
      try {
        const url = await captureWithOverlay(element);
        setPreviewUrl(url);
      } catch (error) {
        console.error("Screenshot failed:", error);
      } finally {
        setIsCapturing(false);
        setIsActive(false);
        setHoveredElement(null);
      }
    },
    [captureWithOverlay]
  );

  // 下载截图
  const handleDownload = useCallback(async () => {
    console.log("[PhotoMode] Download button clicked, previewUrl:", previewUrl);
    if (!previewUrl) return;
    
    try {
      console.log("[PhotoMode] Fetching blob from preview URL...");
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      console.log("[PhotoMode] Blob fetched:", blob.type, blob.size, "bytes");
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, "");
      const filename = `sigclr-capture-${timestamp}.png`;
      console.log("[PhotoMode] Filename:", filename);

      // Method 1: Try modern File System Access API (best control over filename)
      if ('showSaveFilePicker' in window) {
        try {
          const handle = await (window as unknown as { 
            showSaveFilePicker: (options: { suggestedName: string; types: { description: string; accept: Record<string, string[]> }[] }) => Promise<FileSystemFileHandle>;
          }).showSaveFilePicker({
            suggestedName: filename,
            types: [{
              description: 'PNG Image',
              accept: { 'image/png': ['.png'] },
            }],
          });
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
          console.log("[PhotoMode] File saved via File System Access API");
          return;
        } catch (err) {
          // User cancelled or API not supported, fall through to other methods
          console.log("[PhotoMode] File System Access API failed or cancelled, trying fallback...");
        }
      }

      // Method 2: Create a File object (named blob) and use blob URL
      const file = new File([blob], filename, { type: 'image/png' });
      const downloadUrl = URL.createObjectURL(file);
      
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      link.style.display = "none";
      
      // Force download by setting target
      link.target = "_self";
      
      document.body.appendChild(link);
      console.log("[PhotoMode] Clicking link with File-based URL...");
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
      }, 1000);
      
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, [previewUrl]);

  // 关闭预览
  const handleClosePreview = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  // Toggle cursor class on body
  useEffect(() => {
    if (isActive) {
      document.body.classList.add("photo-mode-active");
    } else {
      document.body.classList.remove("photo-mode-active");
    }
    return () => {
      document.body.classList.remove("photo-mode-active");
    };
  }, [isActive]);

  // 清除高亮
  const clearHighlight = useCallback(() => {
    if (lastHighlightedRef.current) {
      lastHighlightedRef.current.style.outline = "";
      lastHighlightedRef.current.style.outlineOffset = "";
      lastHighlightedRef.current = null;
    }
  }, []);

  // 应用高亮
  const applyHighlight = useCallback((element: HTMLElement) => {
    clearHighlight();
    element.style.outline = "2px solid rgba(0, 255, 65, 0.8)";
    element.style.outlineOffset = "4px";
    lastHighlightedRef.current = element;
    setHoveredElement(element);
  }, [clearHighlight]);

  // 动态监听鼠标移动和点击事件
  useEffect(() => {
    if (!isActive) {
      clearHighlight();
      return;
    }

    // 鼠标移动处理 - 动态高亮最佳目标
    const handleMouseMove = (e: MouseEvent) => {
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (!elementUnderCursor) return;

      const target = findBestCaptureTarget(elementUnderCursor);
      
      if (target && target !== lastHighlightedRef.current) {
        applyHighlight(target);
      } else if (!target && lastHighlightedRef.current) {
        clearHighlight();
        setHoveredElement(null);
      }
    };

    // 点击处理 - 截图当前高亮的元素
    const handleClick = (e: MouseEvent) => {
      // 忽略按钮本身和预览面板
      if ((e.target as HTMLElement).closest("[data-screenshot-ignore]")) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (!elementUnderCursor) return;

      const target = findBestCaptureTarget(elementUnderCursor);
      
      if (target) {
        // 清除高亮再截图
        clearHighlight();
        handleCapture(target);
      }
    };

    // Escape 键退出
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearHighlight();
        setIsActive(false);
        setHoveredElement(null);
      }
    };

    // 使用 capture 阶段以优先处理事件
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown);
      clearHighlight();
    };
  }, [isActive, handleCapture, applyHighlight, clearHighlight]);

  return (
    <>
      {/* Overlay when active */}
      {isActive && (
        <div
          className="fixed inset-0 bg-black/20 z-[998] pointer-events-none"
        />
      )}

      {/* Instructions tooltip */}
      {isActive && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[1001] animate-fade-in">
          <div className="px-4 py-2 bg-black/80 border border-[#00ff41]/50 rounded-lg backdrop-blur-sm">
            <p className="font-mono text-sm text-[#00ff41]">
              📸 点击任意高亮区块进行截图 | 按 ESC 退出
            </p>
          </div>
        </div>
      )}

      {/* Screenshot Preview Panel */}
      {previewUrl && (
        <div
          data-screenshot-ignore
          className="fixed bottom-24 right-6 z-[1001] animate-fade-in-up"
        >
          <div className="bg-black/95 border border-[#00ff41]/50 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#00ff41]/30">
              <span className="font-mono text-xs text-[#00ff41]">
                📋 截图预览
              </span>
              <button
                onClick={handleClosePreview}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-[#00ff41]" />
              </button>
            </div>
            
            {/* Preview Image */}
            <div className="p-2">
              <img
                src={previewUrl}
                alt="Screenshot preview"
                className="max-w-[320px] max-h-[240px] object-contain rounded border border-[#00ff41]/20"
              />
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2 px-3 py-2 border-t border-[#00ff41]/30">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#00ff41]/20 hover:bg-[#00ff41]/30 border border-[#00ff41]/50 rounded transition-colors"
              >
                <Download className="w-4 h-4 text-[#00ff41]" />
                <span className="font-mono text-xs text-[#00ff41]">下载</span>
              </button>
              <button
                onClick={() => {
                  handleClosePreview();
                  setIsActive(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded transition-colors"
              >
                <Camera className="w-4 h-4 text-white/70" />
                <span className="font-mono text-xs text-white/70">重拍</span>
              </button>
              <button
                onClick={handleClosePreview}
                className="p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={togglePhotoMode}
        disabled={isCapturing}
        data-screenshot-ignore
        className={cn(
          "fixed bottom-6 right-6 z-[1000]",
          "w-14 h-14 rounded-full",
          "flex items-center justify-center",
          "transition-all duration-300 ease-out",
          "shadow-lg",
          isActive
            ? "bg-red-600 hover:bg-red-700 border-2 border-red-400/50"
            : previewUrl
            ? "bg-[#00ff41] hover:bg-[#00ff41]/90 border-2 border-white/50"
            : "bg-black/80 hover:bg-black border-2 border-[#00ff41]/50 hover:border-[#00ff41]",
          "hover:scale-110 active:scale-95",
          "group"
        )}
        style={{
          boxShadow: isActive
            ? "0 0 20px rgba(220, 38, 38, 0.4)"
            : previewUrl
            ? "0 0 20px rgba(0, 255, 65, 0.6)"
            : "0 0 20px rgba(0, 255, 65, 0.2)",
        }}
      >
        {isCapturing ? (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        ) : isActive ? (
          <X className="w-6 h-6 text-white" />
        ) : previewUrl ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <Camera
            className="w-6 h-6 text-[#00ff41] group-hover:text-white transition-colors"
          />
        )}
      </button>

      {/* Label */}
      {!isActive && !isCapturing && !previewUrl && (
        <div
          data-screenshot-ignore
          className="fixed bottom-6 right-[88px] z-[1000] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="px-3 py-1.5 bg-black/90 border border-[#00ff41]/30 rounded-lg">
            <span className="font-mono text-xs text-[#00ff41]">Photo Mode</span>
          </div>
        </div>
      )}
    </>
  );
}
