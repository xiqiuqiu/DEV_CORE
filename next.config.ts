import type { NextConfig } from "next";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Required for using getCloudflareContext() during local development (next dev)
if (process.env.NODE_ENV === "development") {
    initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
    /* 配置选项 */
};

export default nextConfig;
