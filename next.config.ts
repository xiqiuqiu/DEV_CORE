import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Cloudflare Pages 需要 standalone 输出模式
    output: "standalone",
};

export default nextConfig;
