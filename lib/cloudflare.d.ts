// Cloudflare KV binding types
export interface CloudflareEnv {
  VISIT_COUNTER: KVNamespace;
}

declare global {
  interface CloudflareEnv {
    VISIT_COUNTER: KVNamespace;
  }
}
